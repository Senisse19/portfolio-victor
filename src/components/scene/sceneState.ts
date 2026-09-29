export type ScenePreset = {
    cameraDepth: number;
    offsetX: number;
    density: number;
    pointOpacity: number;
    lineOpacity: number;
    highlight: number;
    spin: number;
    glow: number;
};

export type SceneState = ScenePreset & {
    heroExit: number;
    pageProgress: number;
    pointerX: number;
    pointerY: number;
};

export const SCENE_SECTION_IDS = ["hero", "about", "skills", "experience", "projects", "explorador", "contact"] as const;

export type SceneSectionId = (typeof SCENE_SECTION_IDS)[number];

const HERO_PRESET: ScenePreset = {
    cameraDepth: 4,
    offsetX: 0,
    density: 1,
    pointOpacity: 0.85,
    lineOpacity: 0.16,
    highlight: 0,
    spin: 1,
    glow: 1,
};

export const SCENE_PRESETS: Record<SceneSectionId, ScenePreset> = {
    hero: HERO_PRESET,
    about: { cameraDepth: 5.6, offsetX: 1.4, density: 0.75, pointOpacity: 0.5, lineOpacity: 0.09, highlight: 0, spin: 0.7, glow: 0.3 },
    skills: { cameraDepth: 4.6, offsetX: 0, density: 1, pointOpacity: 0.75, lineOpacity: 0.24, highlight: 0.6, spin: 1.5, glow: 0.55 },
    experience: { cameraDepth: 6.2, offsetX: -1.4, density: 0.65, pointOpacity: 0.45, lineOpacity: 0.08, highlight: 0.1, spin: 0.6, glow: 0.25 },
    projects: { cameraDepth: 5.2, offsetX: 1.1, density: 0.85, pointOpacity: 0.55, lineOpacity: 0.12, highlight: 0.25, spin: 0.9, glow: 0.35 },
    explorador: { cameraDepth: 6, offsetX: -1, density: 0.7, pointOpacity: 0.45, lineOpacity: 0.1, highlight: 0.15, spin: 0.7, glow: 0.25 },
    contact: { cameraDepth: 4.9, offsetX: 0, density: 0.9, pointOpacity: 0.75, lineOpacity: 0.17, highlight: 0.35, spin: 1.2, glow: 0.8 },
};

export const REDUCED_MOTION_PRESET: ScenePreset = {
    ...SCENE_PRESETS.about,
    offsetX: 0,
    glow: 0.5,
};

export function createSceneState(preset: ScenePreset): SceneState {
    return { ...preset, heroExit: 0, pageProgress: 0, pointerX: 0, pointerY: 0 };
}
