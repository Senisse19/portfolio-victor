"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    gradient?: string;
    coverImage?: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        title: "Elara Software",
        description: "Agente de IA que automatiza atendimento, qualifica leads 24/7 e impulsiona vendas através de agentes conversacionais inteligentes.",
        technologies: [
            "ElevenLabs",
            "N8N",
            "Retell AI",
            "Integração Asaas",
            "Google Workspace",
            "Chatwoot",
            "Supabase",
            "PostgreSQL",
            "Javascript",
            "API WhatsApp",
            "API REST",
            "OpenAI",
            "Engenharia de Prompt"
        ],
        link: "https://elarasoftware.com.br",
        coverImage: "/elara-cover.png",
        featured: true,
    },
    {
        title: "Chatwoot Data Extractor",
        description: "Aplicação desktop que extrai e analisa conversas do Chatwoot com filtros por usuário e data. Integrada com IA via n8n para gerar métricas automatizadas de SLA, tempo de resposta, volume de atendimentos, produtividade da equipe e insights estratégicos.",
        technologies: [
            "Python",
            "PyQt6",
            "Chatwoot API",
            "N8N",
            "Google Drive API",
            "Análise de IA"
        ],
        link: "https://github.com/Senisse19/scraper-historico-chatwoot",
        coverImage: "/chatwoot-extractor.png",
        featured: false,
    },
    {
        title: "GS Agenda RT - Dashboard BI",
        description: "Dashboard Business Intelligence alimentado por Google Sheets com filtros dinâmicos e visualização de dados estratégicos. Integrado com agente de IA via n8n que analisa dados e envia métricas e insights semanais automaticamente por email aos colaboradores.",
        technologies: [
            "TypeScript",
            "HTML",
            "Tailwind CSS",
            "Vite",
            "N8N",
            "Google Workspace",
            "Google Sheets API"
        ],
        link: "https://gs-agenda-rt.vercel.app/",
        coverImage: "/gs-agenda-cover.png",
        featured: false,
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24 bg-surface/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        Portfólio
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">Projetos em Destaque</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-background rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all shadow-xl"
                        >
                            {/* Project Cover */}
                            <div className="h-48 relative overflow-hidden">
                                {project.coverImage ? (
                                    <>
                                        <Image
                                            src={project.coverImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            priority={project.featured}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-[1]" />
                                    </>
                                ) : (
                                    <>
                                        <div className={`h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                                            <Sparkles size={48} className="text-white/90 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40" />
                                    </>
                                )}
                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold z-[2]">
                                        ⭐ Projeto Principal
                                    </div>
                                )}
                            </div>

                            <div className="p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-surface/50 text-blue-400 text-xs rounded-md border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-lg transition-all"
                                    >
                                        <ExternalLink size={16} /> Visitar Site
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
