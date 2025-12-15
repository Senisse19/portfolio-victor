"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Database, Globe, Layers, Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
    const { t } = useLanguage();

    const skillsData = [
        {
            category: t.skills.categories.aiArch,
            icon: <Brain size={24} />,
            items: ["AI Agents", "RAG Pipelines", "Prompt Engineering", "n8n", "LangChain", "Multi-Agentes"],
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            category: t.skills.categories.llms,
            icon: <Cpu size={24} />,
            items: ["OpenAI API", "Google Gemini", "Anthropic", "Cursor", "Lovable", "Google Antigravity"],
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            category: t.skills.categories.fullstack,
            icon: <Terminal size={24} />,
            items: ["React", "Next.js", "TypeScript", "Node.js", "Python", "JavaScript", "Progress 4GL"],
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            category: t.skills.categories.data,
            icon: <Database size={24} />,
            items: ["PostgreSQL", "Supabase", "Redis", "Power BI", "Looker Studio", "Docker"],
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
        },
        {
            category: t.skills.categories.cloud,
            icon: <Globe size={24} />,
            items: ["Azure", "Google Cloud", "Cloudflare", "Git", "GitHub", "Active Directory"],
            color: "text-orange-400",
            bg: "bg-orange-500/10",
        },
        {
            category: t.skills.categories.tools,
            icon: <Layers size={24} />,
            items: ["Scrum", "Kanban", "Jira", "Trello", "Bitrix24", "Airtable"],
            color: "text-pink-400",
            bg: "bg-pink-500/10",
        },
    ];

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
                        {t.skills.badge}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">{t.skills.title}</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-surface border border-white/5 rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className={`w-12 h-12 ${skill.bg} ${skill.color} rounded-lg flex items-center justify-center mb-6`}>
                                {skill.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4">{skill.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, i) => (
                                    <span
                                        key={i}
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
