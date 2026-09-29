"use client";

import { motion } from "framer-motion";
import { Brain, Globe, Terminal, Workflow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { capabilities, siteCopy, type CapabilityGroup } from "@/data/portfolio";

const styles: Record<CapabilityGroup["id"], { icon: React.ReactNode; color: string; bg: string }> = {
    automation: { icon: <Workflow size={24} />, color: "text-purple-400", bg: "bg-purple-500/10" },
    fullstack: { icon: <Terminal size={24} />, color: "text-green-400", bg: "bg-green-500/10" },
    "ai-data": { icon: <Brain size={24} />, color: "text-blue-400", bg: "bg-blue-500/10" },
    "infra-growth": { icon: <Globe size={24} />, color: "text-orange-400", bg: "bg-orange-500/10" },
};

export default function Skills() {
    const { language } = useLanguage();
    const copy = siteCopy[language];

    return (
        <section id="skills" className="py-16 md:py-24 bg-surface/30 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        {copy.sections.capabilitiesEyebrow}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">{copy.sections.capabilitiesTitle}</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {capabilities.map((group, index) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-surface border border-white/5 rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className={`w-12 h-12 ${styles[group.id].bg} ${styles[group.id].color} rounded-lg flex items-center justify-center mb-6`}>
                                {styles[group.id].icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{group.title[language]}</h3>
                            <p className="text-gray-400 text-sm md:text-base mb-4">{group.description[language]}</p>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-background rounded-full text-xs font-medium text-gray-300 border border-white/5"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
