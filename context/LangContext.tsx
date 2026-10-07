"use client";

import { createContext, useContext } from "react";
import { translations, Lang } from "@/lib/translations";
import { localePath } from "@/lib/site";

type T = (typeof translations)[Lang];
type LangCtx = { lang: Lang; t: T; href: (path: string) => string };

const Ctx = createContext<LangCtx>({
  lang: "it",
  t: translations.it,
  href: (path) => path,
});

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <Ctx.Provider value={{ lang, t: translations[lang], href: (path) => localePath(lang, path) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
