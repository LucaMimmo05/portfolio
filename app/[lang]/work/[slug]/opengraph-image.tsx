import { getProject } from "@/data/projects";
import { translations } from "@/lib/translations";
import { hasLocale, localePath } from "@/lib/site";
import { ogSize, renderHomeOg, renderProjectOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Luca Mimmo — Project";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = hasLocale(rawLang) ? rawLang : "it";
  const t = translations[lang];
  const project = getProject(slug);
  if (!project) return renderHomeOg({ role: t.hero.role, open: t.hero.open });

  const proj = t.projects[project.key];
  return renderProjectOg({
    num: project.num,
    title: project.title,
    status: proj.status,
    year: project.year,
    desc: proj.desc,
    tags: project.tags,
    path: `lucamimmo.dev${localePath(lang, `/work/${project.slug}`)}`,
  });
}
