import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  const statusColor = "text-white/40 border-white/10 bg-white/[0.03]";

  return (
    <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-28 pb-12">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/65 transition-colors duration-200 mb-16 group"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>

        <div className="flex flex-col gap-5">
          <span className="text-xs font-mono text-white/20">{project.num}</span>
          <h1
            className="font-semibold tracking-tight text-white leading-[0.92]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColor}`}>
              {project.status}
            </span>
            <span className="text-xs text-white/25">{project.year}</span>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {project.links.map((link) => {
                const isGitHub = link.label.startsWith("GitHub");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                      isGitHub
                        ? "border-white/12 text-white/55 hover:border-white/28 hover:text-white/85"
                        : "border-[#38bdf8]/25 text-[#38bdf8]/70 hover:border-[#38bdf8]/50 hover:text-[#38bdf8]"
                    }`}
                  >
                    {isGitHub ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Tech marquee */}
      <div className="border-y border-white/6 py-5 overflow-hidden">
        <div className="marquee-track">
          {[...project.tags, ...project.tags, ...project.tags, ...project.tags].map((tag, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-sm font-medium text-white/40 px-8 tracking-wide whitespace-nowrap">
                {tag}
              </span>
              <span className="text-[#38bdf8] opacity-40 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <section className="px-6 md:px-10 py-20 border-b border-white/6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-6">Overview</p>
            <p
              className="text-white/55 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
            >
              {project.overview}
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-white/6 pl-5">
              <p className="text-[10px] uppercase tracking-widest text-white/22 mb-2">Year</p>
              <p className="text-sm font-medium text-white/65">{project.year}</p>
            </div>
            <div className="border-l-2 border-white/6 pl-5">
              <p className="text-[10px] uppercase tracking-widest text-white/22 mb-2">Status</p>
              <p className="text-sm font-medium text-white/65">{project.status}</p>
            </div>
            <div className="border-l-2 border-white/6 pl-5">
              <p className="text-[10px] uppercase tracking-widest text-white/22 mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-white/45 border border-white/8 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 md:px-10 py-4">
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 mt-12 mb-4">Highlights</p>
        {project.highlights.map((h, i) => (
          <div
            key={h.label}
            className="group border-t border-white/6 py-10 flex flex-col md:flex-row gap-6 md:gap-20 hover:border-white/14 transition-colors duration-300"
          >
            <span className="text-xs font-mono text-white/20 md:w-12 shrink-0 mt-0.5">
              0{i + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white/80 mb-3 group-hover:text-white transition-colors duration-200">
                {h.label}
              </h3>
              <p className="text-sm text-white/38 leading-relaxed max-w-xl">
                {h.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Next project */}
      <section className="px-6 md:px-10 py-16 border-t border-white/6">
        <p className="text-xs tracking-[0.2em] uppercase text-white/22 mb-8">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-end justify-between gap-4"
        >
          <h2
            className="font-semibold tracking-tight text-white/50 group-hover:text-white transition-colors duration-300 leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            {next.title}
          </h2>
          <div className="text-white/20 group-hover:text-[#38bdf8] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-300 shrink-0 mb-2">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
