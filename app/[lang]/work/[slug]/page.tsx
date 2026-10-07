import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectContent from "@/components/ProjectContent";
import { getProject, projects } from "@/data/projects";
import { translations } from "@/lib/translations";
import { alternatesFor, hasLocale, localePath, locales, ogLocale, site } from "@/lib/site";
import { JsonLd, projectJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(lang)) return {};

  const t = translations[lang];
  const description = t.projects[project.key].desc;
  const title = `${project.title} | ${t.seo.projectSuffix}`;

  return {
    title: { absolute: title },
    description,
    keywords: [project.title, ...project.tags, "Luca Mimmo"],
    alternates: alternatesFor(lang, `/work/${project.slug}`),
    openGraph: { type: "article", url: localePath(lang, `/work/${project.slug}`), siteName: site.name, locale: ogLocale[lang], title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(lang)) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const description = translations[lang].projects[project.key].overview;

  return (
    <>
      <JsonLd data={projectJsonLd(lang, project, description)} />
      <Navbar />
      <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
        {/* No global cap: the hero spans the screen, every other section sets its own width */}
        <div>
          <ProjectContent
            projectKey={project.key}
            num={project.num}
            title={project.title}
            year={project.year}
            tags={project.tags}
            links={project.links ?? []}
            images={project.images}
            devices={project.devices}
            nextSlug={next.slug}
            nextTitle={next.title}
          />
        </div>
      </main>
      <div className="mx-auto w-full max-w-[1760px]">
        <Footer />
      </div>
    </>
  );
}
