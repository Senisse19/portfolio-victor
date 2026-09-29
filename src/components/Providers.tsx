"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/context/LanguageContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <LanguageProvider>{children}</LanguageProvider>
        </MotionConfig>
    );
}
