"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/portfolio";

interface LanguageContextValue {
  language: Locale;
  setLanguage: (language: Locale) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "victor-portfolio-language";
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      document.documentElement.lang = stored === "pt" ? "pt-BR" : "en";
      const frame = window.requestAnimationFrame(() => setLanguageState(stored));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Locale) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage === "pt" ? "pt-BR" : "en";
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "pt" ? "en" : "pt");
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
