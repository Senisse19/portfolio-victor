"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENE_PRESETS, SCENE_SECTION_IDS, type ScenePreset, type SceneState } from "./sceneState";

const SECTION_ACTIVATION_LINE = "55%";
const PRESET_TRANSITION_SECONDS = 1.4;
const REFRESH_DEBOUNCE_MS = 150;

function transitionTo(scene: SceneState, glow: HTMLElement | null, { glow: glowOpacity, ...preset }: ScenePreset) {
    gsap.to(scene, { ...preset, duration: PRESET_TRANSITION_SECONDS, ease: "power2.inOut", overwrite: "auto" });
    if (glow) gsap.to(glow, { opacity: glowOpacity, duration: PRESET_TRANSITION_SECONDS, ease: "power2.inOut", overwrite: "auto" });
}

function createScrubbedTriggers(scene: SceneState) {
    gsap.to(scene, {
        heroExit: 1,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: `bottom ${SECTION_ACTIVATION_LINE}`, scrub: 0.6 },
    });
    gsap.to(scene, {
        pageProgress: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.8 },
    });
}

function createSectionTriggers(scene: SceneState, glow: HTMLElement | null) {
    for (const id of SCENE_SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        ScrollTrigger.create({
            trigger: section,
            start: `top ${SECTION_ACTIVATION_LINE}`,
            end: `bottom ${SECTION_ACTIVATION_LINE}`,
            onToggle: ({ isActive }) => {
                if (isActive) transitionTo(scene, glow, SCENE_PRESETS[id]);
            },
        });
    }
}

// Expanding the project explorer or switching language changes section heights without a
// window resize, which would leave every trigger measuring stale offsets.
function refreshOnLayoutChange() {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE_MS);
    });
    observer.observe(document.body);
    return () => {
        clearTimeout(timeout);
        observer.disconnect();
    };
}

export function useScrollChoreography(scene: SceneState, glowRef: RefObject<HTMLElement | null>, isEnabled: boolean) {
    useEffect(() => {
        if (!isEnabled) return;
        gsap.registerPlugin(ScrollTrigger);
        const glow = glowRef.current;
        const context = gsap.context(() => {
            createScrubbedTriggers(scene);
            createSectionTriggers(scene, glow);
        });
        const stopRefreshing = refreshOnLayoutChange();

        return () => {
            stopRefreshing();
            context.revert();
            gsap.killTweensOf(glow ? [scene, glow] : scene);
        };
    }, [scene, glowRef, isEnabled]);
}
