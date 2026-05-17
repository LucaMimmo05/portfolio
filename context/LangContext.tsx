"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Lang } from "@/lib/translations";

type T = (typeof translations)[Lang];
type LangCtx = { lang: Lang; t: T; toggle: () => void };

const Ctx = createContext<LangCtx>({ lang: "en", t: translations.en, toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && stored in translations) setLang(stored);
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "en" ? "it" : "en";
      localStorage.setItem("lang", next);
      return next;
    });

  return (
    <Ctx.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
