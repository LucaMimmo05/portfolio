import { getProject } from "@/data/projects";
import { translations } from "@/lib/translations";
import { hasLocale, localePath } from "@/lib/site";
import { ogSize, renderCaseStudyOg, renderHomeOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Luca Mimmo";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = hasLocale(rawLang) ? rawLang : "it";
  const t = translations[lang];
  const project = getProject(slug);
  if (!project) return renderHomeOg({ role: t.hero.role, open: t.hero.open });

  return renderCaseStudyOg({
    projectKey: project.key,
    lang,
    label: `${project.title} · ${t.seo.projectSuffix}`,
    path: `lucamimmo.dev${localePath(lang, `/work/${project.slug}`)}`,
  });
}
