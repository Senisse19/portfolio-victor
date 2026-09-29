"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig, siteCopy } from "@/data/portfolio";

export default function Contact() {
    const { language } = useLanguage();
    const copy = siteCopy[language];
    const resume = language === "pt" ? "/curriculo-pt.pdf" : "/resume-en.pdf";

    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative max-w-3xl mx-auto px-6 text-center"
            >
                <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                    {copy.sections.contactEyebrow}
                </div>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">{copy.sections.contactTitle}</h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10">{copy.sections.contactBody}</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <a
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 md:px-8 md:py-4 bg-primary text-white rounded-full font-semibold transition-transform hover:scale-105 flex items-center gap-2 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-sm md:text-base"
                    >
                        LinkedIn <ArrowRight size={20} />
                    </a>
                    <a
                        href={`mailto:${siteConfig.email}`}
                        className="px-6 py-3 md:px-8 md:py-4 bg-surface text-gray-200 border border-white/10 rounded-full font-semibold transition-all hover:bg-surface/80 hover:border-primary/50 flex items-center gap-2 text-sm md:text-base"
                    >
                        {copy.actions.email} <Mail size={20} />
                    </a>
                    <a
                        href={resume}
                        download
                        className="px-4 py-3 text-gray-300 hover:text-primary font-semibold flex items-center gap-2 text-sm md:text-base transition-colors"
                    >
                        <Download size={18} /> {copy.actions.resume}
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
