"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { experiences, siteCopy } from "@/data/portfolio";

export default function Experience() {
    const { language } = useLanguage();
    const copy = siteCopy[language];

    return (
        <section id="experience" className="py-16 md:py-24 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        {copy.sections.experienceEyebrow}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">{copy.sections.experienceTitle}</h2>
                </motion.div>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-8 md:space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

                            <div className="md:flex items-start justify-between group">
                                <div className="md:w-1/3 mb-2 md:mb-0 md:text-right md:pr-12">
                                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{exp.company}</h4>
                                    <span className="text-sm text-gray-400 font-mono">{exp.period[language]}</span>
                                    {exp.contract && (
                                        <span className="ml-2 px-2 py-0.5 bg-surface rounded-full text-xs font-semibold text-blue-300">{exp.contract}</span>
                                    )}
                                </div>

                                <div className="md:w-2/3 bg-surface/50 p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                        {exp.role[language]}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base">{exp.summary[language]}</p>
                                    {exp.highlights.length > 0 && (
                                        <ul className="mt-3 space-y-1 text-gray-400 text-sm list-disc pl-5 marker:text-primary">
                                            {exp.highlights.map((highlight) => (
                                                <li key={highlight.pt}>{highlight[language]}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
