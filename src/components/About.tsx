"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ecosystemItemCount } from "@/data/ecosystem";
import { metrics, siteCopy, type Metric } from "@/data/portfolio";

export default function About() {
    const { language } = useLanguage();
    const copy = siteCopy[language];
    const aboutMetrics: Metric[] = [
        metrics[0],
        { value: String(ecosystemItemCount), label: { pt: "soluções no ecossistema de automação", en: "solutions in the automation ecosystem" } },
        ...metrics.slice(1),
    ];

    return (
        <section id="about" className="py-16 md:py-24 relative overflow-hidden">
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
                        <span>{copy.sections.aboutEyebrow}</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
                        {copy.sections.aboutTitle}
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                        {copy.sections.aboutBody}
                    </p>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {copy.sections.aboutStory}
                    </p>
                </motion.div>

                {/* Right: Metrics Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                >
                    {aboutMetrics.map((metric) => (
                        <div
                            key={metric.value}
                            className="bg-surface p-5 md:p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
                        >
                            <p className="text-3xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary mb-2">
                                {metric.value}
                            </p>
                            <p className="text-gray-400 text-sm md:text-base">{metric.label[language]}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
