"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Globe, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig, siteCopy } from "@/data/portfolio";

export default function Navbar() {
    const { language, toggleLanguage } = useLanguage();
    const copy = siteCopy[language];
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const navLinks = useMemo<{ name: string; href: string }[]>(() => [
        { name: copy.nav.about, href: "#about" },
        { name: copy.nav.skills, href: "#skills" },
        { name: copy.nav.experience, href: "#experience" },
        { name: copy.nav.capabilities, href: "#projects" },
        { name: copy.nav.contact, href: "#contact" },
    ], [copy]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        const handleScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 20);

                // Section Highlight Logic
                const sections = navLinks.map(link => link.href.substring(1));
                let current = "";
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            current = section;
                        }
                    }
                }
                setActiveSection(current);
                timeoutId = undefined;
            }, 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [navLinks]);

    const resume = language === "pt" ? "/curriculo-pt.pdf" : "/resume-en.pdf";
    const resumeName = language === "pt" ? "Curriculo-Victor_Senisse.pdf" : "Resume-Victor_Senisse.pdf";

    return (
        <nav
            aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
                isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white font-display">
                    Victor<span className="text-primary">.</span>Senisse
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium transition-colors relative",
                                activeSection === link.href.substring(1) ? "text-primary" : "text-gray-300 hover:text-white"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    <div className="h-6 w-[1px] bg-gray-700 mx-2" />

                    <button
                        type="button"
                        onClick={toggleLanguage}
                        aria-label={language === "pt" ? "Mudar para inglês" : "Switch to Portuguese"}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        <Globe size={18} />
                        <span>{language === "pt" ? "EN" : "PT"}</span>
                    </button>

                    <a
                        href={resume}
                        download={resumeName}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
                    >
                        <Download size={16} />
                        <span>{copy.actions.resume}</span>
                    </a>

                    <div className="hidden xl:flex items-center space-x-2">
                        <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="bg-gray-800 p-2 text-white hover:text-primary rounded-full transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={siteConfig.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="bg-gray-800 p-2 text-white hover:text-primary rounded-full transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    className="lg:hidden text-white"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="sr-only">Menu</span>
                    {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-surface absolute top-full left-0 right-0 shadow-xl overflow-hidden border-t border-gray-800"
                    >
                        <div className="flex flex-col p-6 space-y-4 bg-background/95 backdrop-blur-lg">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium text-gray-300 hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-gray-800 my-2" />

                            <button
                                type="button"
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-base font-medium text-gray-300 hover:text-primary"
                            >
                                <Globe size={18} />
                                <span>{language === "pt" ? "English" : "Português"}</span>
                            </button>

                            <a
                                href={resume}
                                download={resumeName}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                            >
                                <Download size={18} />
                                <span>{copy.actions.resume}</span>
                            </a>

                            <div className="flex justify-center gap-4 pt-4">
                                <a
                                    href={siteConfig.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="bg-gray-800 p-2 text-white hover:text-primary rounded-full transition-colors"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href={siteConfig.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="bg-gray-800 p-2 text-white hover:text-primary rounded-full transition-colors"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
