"use client";

import { motion } from "framer-motion";
import { User, Code, Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface rounded-full text-primary text-sm font-medium mb-6">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span>{t.about.badge}</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
                        {t.about.title} <span className="text-primary">{t.about.titleHighlight}</span>.
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                        {t.about.p1}
                    </p>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {t.about.p2}
                    </p>
                </motion.div>

                {/* Right: Stats/Features Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                >
                    <div className="bg-surface p-5 md:p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-primary mb-4">
                            <Brain size={20} className="md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t.about.stats.aiSolutions}</h3>
                        <p className="text-gray-400 text-sm md:text-base">{t.about.stats.aiDesc}</p>
                    </div>

                    <div className="bg-surface p-5 md:p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                            <Code size={20} className="md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{t.about.stats.fullStack}</h3>
                        <p className="text-gray-400 text-sm md:text-base">{t.about.stats.fsDesc}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
