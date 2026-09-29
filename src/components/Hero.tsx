"use client";

import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig, siteCopy } from "@/data/portfolio";

export default function Hero() {
    const { language } = useLanguage();
    const copy = siteCopy[language];

    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-28">
            {/* Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-32 h-32 md:w-40 md:h-40 bg-surface rounded-full border-4 border-primary/20 mb-8 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                >
                    <Image
                        src="/profile.png"
                        alt={copy.hero.photoAlt}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-surface/70 border border-white/10 rounded-full text-xs md:text-sm text-gray-300"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden="true" />
                    {copy.hero.availability}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary mb-4"
                >
                    {copy.hero.eyebrow}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-5xl mx-auto text-3xl md:text-6xl font-bold font-display text-white tracking-tight mb-4"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-primary">
                        {copy.hero.title}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed font-light"
                >
                    {copy.hero.description}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-8 md:mb-10 text-xs md:text-sm font-mono text-gray-400"
                >
                    {copy.hero.since} · {copy.hero.stack}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 md:px-8 md:py-4 bg-primary text-white rounded-full font-semibold transition-transform hover:scale-105 flex items-center gap-2 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-sm md:text-base"
                    >
                        {copy.actions.viewWork} <ArrowRight size={20} />
                    </a>
                    <a
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 md:px-8 md:py-4 bg-surface text-gray-200 border border-white/10 rounded-full font-semibold transition-all hover:bg-surface/80 hover:border-primary/50 flex items-center gap-2 text-sm md:text-base"
                    >
                        {copy.actions.linkedin} <Linkedin size={20} />
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="hidden md:flex absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                aria-hidden="true"
            >
                <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
