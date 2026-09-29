"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { siteConfig, siteCopy } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

function embedUrl(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).at(-1);
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`;
    }
    if (parsed.hostname === "youtube.com" || parsed.hostname === "www.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`;
    }
  } catch { return null; }
  return null;
}

export default function VideoShowcase() {
  const { language } = useLanguage();
  const copy = siteCopy[language];
  const [playing, setPlaying] = useState(false);
  const url = embedUrl(siteConfig.videoUrl);
  if (!url) return null;

  return (
    <motion.div
      id="resultados"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="studio-video scroll-mt-24 mt-12 md:mt-16 grid lg:grid-cols-[1fr_1.4fr] gap-6 md:gap-10 items-center bg-background rounded-2xl border border-white/5 p-5 md:p-8 shadow-xl"
    >
      <div>
        <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
          {copy.sections.videoEyebrow}
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-white mb-3">{copy.sections.videoTitle}</h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{copy.sections.videoDescription}</p>
      </div>
      <div
        className="relative aspect-video rounded-xl overflow-hidden bg-surface bg-cover bg-center border border-white/10"
        style={!playing && siteConfig.videoPoster ? { backgroundImage: `linear-gradient(90deg, rgba(12, 20, 35, .35), rgba(12, 20, 35, .6)), url(${siteConfig.videoPoster})` } : undefined}
      >
        {playing ? (
          <iframe src={url} title={copy.sections.videoFrameTitle} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" className="absolute inset-0 w-full h-full" />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 m-auto w-fit h-fit flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold transition-transform hover:scale-105 shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            <Play size={18} fill="currentColor" aria-hidden="true" />{copy.sections.videoAction}
          </button>
        )}
      </div>
    </motion.div>
  );
}
