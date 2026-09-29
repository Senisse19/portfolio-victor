"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { ecosystemCatalog, ecosystemItemCount } from "@/data/ecosystem";
import { projects, siteCopy } from "@/data/portfolio";

const groupClass = "explorer-group bg-background rounded-2xl border border-white/5 open:border-primary/30 transition-colors";
const groupSummaryClass = "flex items-center gap-4 p-5 md:p-6";
const itemClass = "explorer-item bg-surface/40 rounded-xl border border-white/5 open:border-primary/20";
const itemSummaryClass = "flex items-start gap-3 p-4";

function GroupSummary({ number, title, description, count }: { number: string; title: string; description: string; count: number }) {
  return (
    <summary className={groupSummaryClass}>
      <span className="text-sm font-mono text-primary">{number}</span>
      <span className="flex-1 min-w-0">
        <strong className="block text-white text-base md:text-lg">{title}</strong>
        <small className="block text-gray-400 text-sm mt-1">{description}</small>
      </span>
      <span className="px-2.5 py-1 bg-surface rounded-full text-xs font-semibold text-blue-300">{count}</span>
      <ChevronDown size={19} className="details-chevron text-gray-400 transition-transform shrink-0" aria-hidden="true" />
    </summary>
  );
}

function ItemSummary({ name, description }: { name: string; description: string }) {
  return (
    <summary className={itemSummaryClass}>
      <span className="flex-1 min-w-0">
        <strong className="block text-white text-sm">{name}</strong>
        <span className="block text-gray-400 text-sm mt-1">{description}</span>
      </span>
      <ChevronDown size={16} className="details-chevron text-gray-500 transition-transform shrink-0 mt-0.5" aria-hidden="true" />
    </summary>
  );
}

export default function ProjectExplorer() {
  const { language } = useLanguage();
  const copy = siteCopy[language];
  const [expanded, setExpanded] = useState(false);
  const additional = projects.filter((project) => ["elara", "chatwoot-data-extractor"].includes(project.slug));
  const technologies = language === "pt" ? "Tecnologias" : "Technologies";

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#explorador") {
        setExpanded(true);
        requestAnimationFrame(() => document.getElementById("explorador")?.scrollIntoView({ block: "start" }));
      }
    };
    const frame = requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", syncHash); };
  }, []);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) window.history.replaceState(null, "", "#explorador");
    else if (window.location.hash === "#explorador") window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <section id="explorador" className="py-16 md:py-24 relative" aria-labelledby="explorer-title">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="explorer__intro text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
            {copy.sections.explorerEyebrow}
          </div>
          <h2 id="explorer-title" className="text-2xl md:text-5xl font-bold text-white mb-4">
            {language === "pt" ? "Mais automações. Menos ruído." : "More automation. Less noise."}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-8">
            {language === "pt" ? "RPAs, APIs, plataformas e ferramentas desenvolvidos com o time de Automação & IA do Grupo Studio. Explore apenas a frente que interessa." : "RPAs, APIs, platforms and tools developed with the Grupo Studio Automation & AI team. Explore the areas that matter to you."}
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-gray-200 border border-white/10 rounded-full font-semibold transition-all hover:border-primary/50 hover:text-white"
            aria-expanded={expanded}
            aria-controls="explorer-content"
            onClick={toggle}
          >
            {expanded ? (language === "pt" ? "Recolher projetos" : "Collapse projects") : (language === "pt" ? `Explorar ${ecosystemItemCount} soluções` : `Explore ${ecosystemItemCount} solutions`)}
            <ChevronDown size={18} className={clsx("transition-transform", expanded && "rotate-180")} aria-hidden="true" />
          </button>
        </motion.div>

        <div id="explorer-content" className="space-y-4" hidden={!expanded}>
          {ecosystemCatalog.map((group, index) => (
            <details className={groupClass} key={group.id}>
              <GroupSummary
                number={String(index + 1).padStart(2, "0")}
                title={group.title[language]}
                description={group.description[language]}
                count={group.items.length}
              />
              <div className="grid md:grid-cols-2 gap-3 px-5 pb-5 md:px-6 md:pb-6">
                {group.items.map((item) => (
                  <details className={itemClass} key={item.id}>
                    <ItemSummary name={item.name} description={item.description[language]} />
                    <div className="explorer-item__detail px-4 pb-4">
                      <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-1">{technologies}</span>
                      <p className="text-blue-200 text-sm">{item.stack.join(" · ")}</p>
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}

          <details className={groupClass}>
            <GroupSummary
              number={String(ecosystemCatalog.length + 1).padStart(2, "0")}
              title={language === "pt" ? "Outros trabalhos" : "Other work"}
              description={language === "pt" ? "Agentes, dados e produtividade em projetos adicionais." : "Agents, data and productivity in additional projects."}
              count={additional.length}
            />
            <div className="grid md:grid-cols-2 gap-3 px-5 pb-5 md:px-6 md:pb-6">
              {additional.map((project) => (
                <details className={itemClass} key={project.slug}>
                  <ItemSummary name={project.title} description={project.summary[language]} />
                  <div className="explorer-item__detail px-4 pb-4">
                    <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-1">{technologies}</span>
                    <p className="text-blue-200 text-sm">{project.stack.join(" · ")}</p>
                    {project.links?.[0] && (
                      <a href={project.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:text-blue-300 font-semibold">
                        {project.links[0].label[language]}<ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
