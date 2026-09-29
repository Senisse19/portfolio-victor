"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig, siteCopy } from "@/data/portfolio";

export default function Footer() {
    const { language } = useLanguage();
    const copy = siteCopy[language];

    return (
        <footer className="bg-background border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">Victor Senisse</h3>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} {copy.footer}
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                        <Mail size={16} /> {siteConfig.email}
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href={siteConfig.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="p-2 bg-surface rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="p-2 bg-surface rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
