import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, locales, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: "/", priority: 1 },
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.8 })),
  ];

  return paths.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))]));
    return locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
