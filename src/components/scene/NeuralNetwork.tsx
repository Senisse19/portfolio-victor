"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import type { SceneState } from "./sceneState";

const CONNECTION_THRESHOLD = 1.5;
const HIGHLIGHT_COLOR = new THREE.Color("#FFFFFF");
const MAX_POINT_HIGHLIGHT = 0.3;
const MAX_LINE_HIGHLIGHT = 0.5;
const POINTER_PARALLAX = 0.35;
const SCROLL_DRIFT_Y = 0.6;
const SCROLL_TURN = 0.9;
const HERO_EXIT_TILT = 0.45;
const HERO_EXIT_SHRINK = 0.22;
const COMPACT_OFFSET_FACTOR = 0.3;

// Seeded PRNG (mulberry32) keeps the render pure while still looking random
function createRandom(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function createPoints(count: number, radius: number) {
    const random = createRandom(count);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(random());
        const theta = random() * 2 * Math.PI;
        const phi = Math.acos(2 * random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

// Pairs are emitted grouped by their higher index, so the first N points always own a
// contiguous prefix of the line buffer; density can then be animated with drawRange alone.
function createConnections(points: Float32Array, count: number) {
    const vertices: number[] = [];
    const vertexCountUpTo = new Uint32Array(count + 1);
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < j; i++) {
            const dx = points[j * 3] - points[i * 3];
            const dy = points[j * 3 + 1] - points[i * 3 + 1];
            const dz = points[j * 3 + 2] - points[i * 3 + 2];
            if (Math.hypot(dx, dy, dz) >= CONNECTION_THRESHOLD) continue;
            vertices.push(points[i * 3], points[i * 3 + 1], points[i * 3 + 2]);
            vertices.push(points[j * 3], points[j * 3 + 1], points[j * 3 + 2]);
        }
        vertexCountUpTo[j + 1] = vertices.length / 3;
    }
    return { positions: new Float32Array(vertices), vertexCountUpTo };
}

type NeuralNetworkProps = {
    scene: SceneState;
    primaryColor: string;
    count: number;
    isCompact: boolean;
    radius?: number;
};

export default function NeuralNetwork({ scene, primaryColor, count, isCompact, radius = 4 }: NeuralNetworkProps) {
    const points = useMemo(() => createPoints(count, radius), [count, radius]);
    const connections = useMemo(() => createConnections(points, count), [points, count]);
    const baseColor = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);

    const layoutRef = useRef<THREE.Group>(null);
    const spinRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const pointMaterialRef = useRef<THREE.PointsMaterial>(null);
    const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
    const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);

    // drei's PointMaterial is a <primitive>, which R3F never auto-disposes on unmount.
    useEffect(() => {
        const pointMaterial = pointMaterialRef.current;
        return () => pointMaterial?.dispose();
    }, []);

    useFrame(({ camera }, delta) => {
        const layout = layoutRef.current;
        const spin = spinRef.current;
        if (!layout || !spin) return;

        spin.rotation.x -= (delta / 30) * scene.spin;
        spin.rotation.y -= (delta / 20) * scene.spin;

        const offsetFactor = isCompact ? COMPACT_OFFSET_FACTOR : 1;
        layout.position.x = scene.offsetX * offsetFactor;
        layout.rotation.x = scene.heroExit * HERO_EXIT_TILT;
        layout.rotation.y = scene.pageProgress * SCROLL_TURN;
        layout.scale.setScalar(1 - scene.heroExit * HERO_EXIT_SHRINK);

        camera.position.x = THREE.MathUtils.damp(camera.position.x, scene.pointerX * POINTER_PARALLAX, 3, delta);
        camera.position.y = THREE.MathUtils.damp(
            camera.position.y,
            scene.pointerY * POINTER_PARALLAX - scene.pageProgress * SCROLL_DRIFT_Y,
            3,
            delta,
        );
        camera.position.z = scene.cameraDepth;
        camera.lookAt(0, -scene.pageProgress * SCROLL_DRIFT_Y, 0);

        const visiblePoints = Math.max(2, Math.round(count * scene.density));
        pointsRef.current?.geometry.setDrawRange(0, visiblePoints);
        lineGeometryRef.current?.setDrawRange(0, connections.vertexCountUpTo[visiblePoints]);

        const pointMaterial = pointMaterialRef.current;
        if (pointMaterial) {
            pointMaterial.opacity = scene.pointOpacity;
            pointMaterial.color.lerpColors(baseColor, HIGHLIGHT_COLOR, scene.highlight * MAX_POINT_HIGHLIGHT);
        }
        const lineMaterial = lineMaterialRef.current;
        if (lineMaterial) {
            lineMaterial.opacity = scene.lineOpacity;
            lineMaterial.color.lerpColors(baseColor, HIGHLIGHT_COLOR, scene.highlight * MAX_LINE_HIGHLIGHT);
        }
    });

    return (
        <group ref={layoutRef}>
            <group ref={spinRef}>
                <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
                    <PointMaterial
                        ref={pointMaterialRef}
                        size={0.045}
                        color={primaryColor}
                        sizeAttenuation
                        transparent
                        opacity={0.85}
                        depthWrite={false}
                    />
                </Points>

                <lineSegments frustumCulled={false}>
                    <bufferGeometry ref={lineGeometryRef}>
                        <bufferAttribute attach="attributes-position" args={[connections.positions, 3]} />
                    </bufferGeometry>
                    <lineBasicMaterial ref={lineMaterialRef} color={primaryColor} transparent opacity={0.16} depthWrite={false} />
                </lineSegments>
            </group>
        </group>
    );
}
