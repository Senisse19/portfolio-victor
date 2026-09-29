"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Lock, PlayCircle, Sparkles, UserCheck } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { featuredProjects, projects, siteCopy, type ProjectCase } from "@/data/portfolio";
import VideoShowcase from "./VideoShowcase";

// Cases shown in the Grupo Studio presentation video
const videoCases = ["automatax", "plataforma-lei-do-bem", "taxswap"];

const accents: Record<ProjectCase["accent"], string> = {
    cyan: "from-cyan-500/40 via-blue-600/30 to-background",
    blue: "from-blue-500/40 via-indigo-600/30 to-background",
    violet: "from-violet-500/40 via-purple-600/30 to-background",
    amber: "from-amber-500/40 via-orange-600/30 to-background",
};

function ProjectCard({ project, index, open, onToggle }: { project: ProjectCase; index: number; open: boolean; onToggle: () => void }) {
    const { language } = useLanguage();
    const copy = siteCopy[language];
    const panelId = `details-${project.slug}`;

    return (
        <motion.article
            id={`case-${project.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={open ? undefined : { y: -10 }}
            className={clsx(
                "case-row group bg-background rounded-2xl overflow-hidden border transition-all shadow-xl scroll-mt-24",
                open ? "md:col-span-2 border-primary/50" : "border-white/5 hover:border-primary/50"
            )}
        >
            {/* Project Cover */}
            <div className={`h-32 relative overflow-hidden bg-gradient-to-br ${accents[project.accent]}`}>
                <Sparkles size={40} className="absolute right-6 top-6 text-white/30 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute bottom-4 left-5 md:left-6 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                        {project.category[language]}
                    </span>
                    {project.private && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-gray-200 text-xs font-medium">
                            <Lock size={12} /> {copy.labels.privateProject}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{project.period[language]}</span>
                </div>
                {project.role && (
                    <p className="inline-flex items-start gap-2 px-3 py-1.5 mb-4 bg-primary/10 border border-primary/20 rounded-lg text-xs md:text-sm text-blue-200">
                        <UserCheck size={16} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                        <span><strong className="font-semibold text-white">{copy.labels.role}:</strong> {project.role[language]}</span>
                    </p>
                )}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.summary[language]}</p>
                {project.highlight && <p className="text-sm font-semibold text-blue-300 mb-4">{project.highlight[language]}</p>}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-surface/50 text-blue-400 text-xs rounded-md border border-blue-500/20">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        className="case-row__toggle flex items-center gap-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-lg transition-all"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={onToggle}
                    >
                        <span>{open ? (language === "pt" ? "Fechar case" : "Close case") : copy.actions.details}</span>
                        <ChevronDown size={16} className={clsx("transition-transform", open && "rotate-180")} aria-hidden="true" />
                    </button>
                    {videoCases.includes(project.slug) && (
                        <a href="#resultados" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-primary font-medium transition-colors">
                            <PlayCircle size={16} aria-hidden="true" /> {copy.actions.seeResults}
                        </a>
                    )}
                </div>

                <div id={panelId} className="case-row__details mt-6 pt-6 border-t border-white/10 space-y-6" hidden={!open}>
                    {project.context && (
                        <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="text-xs font-mono uppercase tracking-wider text-primary mr-2">{copy.labels.context}</span>
                            {project.context[language]}
                        </p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-surface/40 rounded-xl p-5 border border-white/5">
                            <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-2">01 / {copy.labels.problem}</span>
                            <p className="text-gray-300 text-sm leading-relaxed">{project.problem[language]}</p>
                        </div>
                        <div className="bg-surface/40 rounded-xl p-5 border border-white/5">
                            <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-2">02 / {copy.labels.solution}</span>
                            <p className="text-gray-300 text-sm leading-relaxed">{project.solution[language]}</p>
                        </div>
                    </div>

                    {project.flow && project.flow.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2" aria-label={language === "pt" ? "Fluxo simplificado da solução" : "Simplified solution flow"}>
                            {project.flow.map((step, stepIndex) => (
                                <span key={step.en} className="flex items-center gap-2">
                                    <span className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs text-blue-200 font-medium">
                                        {String(stepIndex + 1).padStart(2, "0")} {step[language]}
                                    </span>
                                    {stepIndex < project.flow!.length - 1 && <ArrowRight size={14} className="text-primary/60" aria-hidden="true" />}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-surface/40 rounded-xl p-5 border border-white/5">
                            <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-2">03 / {copy.labels.impact}</span>
                            <ul className="space-y-1.5 text-gray-300 text-sm list-disc pl-5 marker:text-primary">
                                {project.impact.slice(0, 3).map((item) => <li key={item.pt}>{item[language]}</li>)}
                            </ul>
                        </div>
                        <div className="bg-surface/40 rounded-xl p-5 border border-white/5">
                            <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-2">04 / {copy.labels.decisions}</span>
                            <ul className="space-y-1.5 text-gray-300 text-sm list-disc pl-5 marker:text-primary">
                                {project.decisions.slice(0, 2).map((item) => <li key={item.pt}>{item[language]}</li>)}
                            </ul>
                        </div>
                    </div>

                    {project.private && (
                        <p className="flex items-start gap-2 text-xs text-gray-500">
                            <Lock size={14} className="mt-0.5 shrink-0" />
                            {project.confidentiality?.[language] ?? copy.labels.confidentialityBody}
                        </p>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const { language } = useLanguage();
    const copy = siteCopy[language];
    const [openSlug, setOpenSlug] = useState<string | null>(null);

    useEffect(() => {
        const syncHash = () => {
            const slug = window.location.hash.replace(/^#case-/, "");
            const matched = projects.find((project) => project.slug === slug && project.visibility === "featured");
            if (matched) {
                setOpenSlug(matched.slug);
                requestAnimationFrame(() => document.getElementById(`case-${matched.slug}`)?.scrollIntoView({ block: "start" }));
            }
        };
        const frame = requestAnimationFrame(syncHash);
        window.addEventListener("hashchange", syncHash);
        return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", syncHash); };
    }, []);

    const toggle = (slug: string) => {
        const next = openSlug === slug ? null : slug;
        setOpenSlug(next);
        if (next) window.history.replaceState(null, "", `#case-${next}`);
        else if (window.location.hash.startsWith("#case-")) window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    return (
        <section id="projects" className="py-16 md:py-24 bg-surface/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        {copy.sections.workEyebrow}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">{copy.sections.workTitle}</h2>
                    <p className="text-gray-400 text-base md:text-lg">{copy.sections.workDescription}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={index}
                            open={openSlug === project.slug}
                            onToggle={() => toggle(project.slug)}
                        />
                    ))}
                </div>

                <VideoShowcase />

                <div className="mt-12 text-center">
                    <a
                        href="#explorador"
                        className="inline-flex items-center gap-2 text-primary hover:text-blue-300 font-semibold transition-colors"
                    >
                        {language === "pt" ? "Explorar todo o ecossistema de automação" : "Explore the full automation ecosystem"}
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}
