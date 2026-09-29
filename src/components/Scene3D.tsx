"use client";

import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import NeuralNetwork from "./scene/NeuralNetwork";
import { createSceneState, REDUCED_MOTION_PRESET, SCENE_PRESETS, type SceneState } from "./scene/sceneState";
import { usePageVisible, usePrefersReducedMotion } from "./scene/useBrowserSignals";
import { useScrollChoreography } from "./scene/useScrollChoreography";

const SceneBloom = lazy(() => import("./scene/SceneBloom"));

const COMPACT_QUERY = "(max-width: 767px)";
const FINE_POINTER_QUERY = "(pointer: fine)";
const PARTICLES = { compact: 60, wide: 120 };
const MAX_DPR = { compact: 1.5, wide: 2 };
const MIN_DPR = 0.75;

type DeviceProfile = {
    isCompact: boolean;
    hasFinePointer: boolean;
    supportsWebGL: boolean;
    maxDpr: number;
    colors: { background: string; primary: string };
};

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

// Browsers cap live WebGL contexts, so the probe context is released instead of waiting for GC.
function hasWebGL() {
    try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
        context?.getExtension("WEBGL_lose_context")?.loseContext();
        return Boolean(context);
    } catch {
        return false;
    }
}

function readCssColor(variable: string, fallback: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || fallback;
}

function detectDeviceProfile(): DeviceProfile {
    const isCompact = window.matchMedia(COMPACT_QUERY).matches;
    return {
        isCompact,
        hasFinePointer: window.matchMedia(FINE_POINTER_QUERY).matches,
        supportsWebGL: hasWebGL(),
        maxDpr: Math.min(window.devicePixelRatio || 1, isCompact ? MAX_DPR.compact : MAX_DPR.wide),
        colors: {
            background: readCssColor("--background", "#0C1423"),
            primary: readCssColor("--primary", "#3B82F6"),
        },
    };
}

function usePointerParallax(scene: SceneState, isEnabled: boolean) {
    useEffect(() => {
        if (!isEnabled) return;
        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            scene.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
            scene.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            scene.pointerX = 0;
            scene.pointerY = 0;
        };
    }, [scene, isEnabled]);
}

export default function Scene3D() {
    const [device] = useState(detectDeviceProfile);
    const prefersReducedMotion = usePrefersReducedMotion();
    const isPageVisible = usePageVisible();
    const [scene] = useState(() => createSceneState(SCENE_PRESETS.hero));
    const [staticScene] = useState(() => createSceneState(REDUCED_MOTION_PRESET));
    const [dpr, setDpr] = useState(device.maxDpr);
    const [isBloomAllowed, setIsBloomAllowed] = useState(!device.isCompact);
    const glowRef = useRef<HTMLDivElement>(null);

    const isAnimated = !prefersReducedMotion;
    useScrollChoreography(scene, glowRef, isAnimated);
    usePointerParallax(scene, isAnimated && device.hasFinePointer && !device.isCompact);

    const activeScene = isAnimated ? scene : staticScene;
    const glowOpacity = isAnimated ? SCENE_PRESETS.hero.glow : REDUCED_MOTION_PRESET.glow;
    const frameloop = !isPageVisible ? "never" : isAnimated ? "always" : "demand";

    const adaptDpr = ({ factor }: { factor: number }) =>
        setDpr(Math.round((MIN_DPR + factor * (device.maxDpr - MIN_DPR)) * 4) / 4);

    return (
        <div aria-hidden="true" data-neural-background className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
            {device.supportsWebGL && (
                <CanvasBoundary>
                    <Canvas
                        // R3F forces pointer-events: auto on its wrapper, overriding the inherited none
                        style={{ pointerEvents: "none" }}
                        dpr={dpr}
                        frameloop={frameloop}
                        camera={{ position: [0, 0, SCENE_PRESETS.hero.cameraDepth] }}
                        gl={{ antialias: !device.isCompact, powerPreference: "high-performance" }}
                    >
                        <color attach="background" args={[device.colors.background]} />
                        <PerformanceMonitor onChange={adaptDpr} onDecline={() => setIsBloomAllowed(false)}>
                            <NeuralNetwork
                                scene={activeScene}
                                primaryColor={device.colors.primary}
                                count={device.isCompact ? PARTICLES.compact : PARTICLES.wide}
                                isCompact={device.isCompact}
                            />
                            {isAnimated && isBloomAllowed && (
                                <Suspense fallback={null}>
                                    <SceneBloom />
                                </Suspense>
                            )}
                        </PerformanceMonitor>
                    </Canvas>
                </CanvasBoundary>
            )}

            <div
                ref={glowRef}
                style={{ opacity: glowOpacity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] will-change-[opacity]"
            />
        </div>
    );
}
