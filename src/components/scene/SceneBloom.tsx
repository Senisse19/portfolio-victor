"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

const BLOOM = { intensity: 0.45, luminanceThreshold: 0.08, luminanceSmoothing: 0.3, radius: 0.6 };

// Split into its own chunk so devices that never enable bloom (mobile, reduced motion,
// PerformanceMonitor decline) don't pay to download/parse the postprocessing pipeline.
export default function SceneBloom() {
    return (
        <EffectComposer multisampling={0}>
            <Bloom mipmapBlur {...BLOOM} />
        </EffectComposer>
    );
}
