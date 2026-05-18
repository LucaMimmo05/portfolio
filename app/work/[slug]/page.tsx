import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectContent from "@/components/ProjectContent";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — Luca Mimmo` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
      <Navbar />
      <ProjectContent
        slug={project.slug}
        num={project.num}
        title={project.title}
        year={project.year}
        tags={project.tags}
        links={project.links ?? []}
        nextSlug={next.slug}
        nextTitle={next.title}
      />
      <Footer />
    </main>
  );
}
