import { getProject } from "@/data/projects";
import { translations } from "@/lib/translations";
import { hasLocale } from "@/lib/site";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project by Luca Mimmo";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const t = translations[hasLocale(lang) ? lang : "it"];
  const project = getProject(slug);
  if (!project) return renderOg({ eyebrow: "Luca Mimmo", title: "Luca Mimmo", subtitle: t.hero.bio });
  return renderOg({
    eyebrow: `${t.seo.projectSuffix} · ${project.year}`,
    title: project.title,
    subtitle: t.projects[project.key].desc,
    tags: project.tags,
  });
}
