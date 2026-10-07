import type { Lang } from "@/lib/translations";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucamimmo.dev").replace(/\/$/, "");

export const site = {
  name: "Luca Mimmo",
  email: "lucamimmo2005@outlook.it",
  github: "https://github.com/LucaMimmo05",
  linkedin: "https://www.linkedin.com/in/lucamimmo/",
};

export const locales = ["it", "en"] as const;
export const defaultLocale: Lang = "it";

export const hasLocale = (value: string): value is Lang =>
  (locales as readonly string[]).includes(value);

/** Public path for a locale: Italian lives at the root, English under /en. */
export function localePath(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** canonical + hreflang alternates for a locale-independent path. */
export function alternatesFor(lang: Lang, path = "/") {
  return {
    canonical: localePath(lang, path),
    languages: {
      it: localePath("it", path),
      en: localePath("en", path),
      // International visitors whose language we don't serve get English.
      "x-default": localePath("en", path),
    },
  };
}

export const ogLocale: Record<Lang, string> = { en: "en_US", it: "it_IT" };
