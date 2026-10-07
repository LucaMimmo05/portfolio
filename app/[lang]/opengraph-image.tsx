import { translations } from "@/lib/translations";
import { hasLocale } from "@/lib/site";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Luca Mimmo — Full-Stack Web Developer";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[hasLocale(lang) ? lang : "it"];
  return renderOg({
    eyebrow: t.seo.jobTitle,
    title: "Luca Mimmo",
    subtitle: t.hero.bio,
    tags: ["React", "Next.js", "TypeScript", "Java", "Spring Boot"],
  });
}
