"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const IDLE_TIMEOUT_MS = 2000;
const FALLBACK_DELAY_MS = 200;

const Scene3D = dynamic(() => import("./Scene3D"), {
    ssr: false,
    loading: () => <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background" />,
});

// The neural scene is purely decorative (aria-hidden), but its Three.js/GSAP chunk is
// ~1.1MB uncompressed. Fetching and evaluating it during hydration competes with the
// critical rendering path and measurably delays LCP/TBT on throttled mobile CPUs.
// Deferring the import to idle time keeps the same single persistent canvas, it just
// starts loading once the browser isn't busy painting the real content.
function useIsIdle() {
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        if (typeof window.requestIdleCallback !== "function") {
            const timeout = setTimeout(() => setIsIdle(true), FALLBACK_DELAY_MS);
            return () => clearTimeout(timeout);
        }
        const id = window.requestIdleCallback(() => setIsIdle(true), { timeout: IDLE_TIMEOUT_MS });
        return () => window.cancelIdleCallback(id);
    }, []);

    return isIdle;
}

export default function NeuralBackground() {
    const isIdle = useIsIdle();

    if (!isIdle) {
        return <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background" />;
    }

    return <Scene3D />;
}
