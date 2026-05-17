"use client";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { projects } from "@/data/projects";

const projectList = [
  { slug: "devhub",       num: "01", title: "DevHub",       tags: ["React", "Vite", "Quarkus", "PostgreSQL"],  key: "devhub"   as const },
  { slug: "pokemon-app",  num: "02", title: "Pokémon App",  tags: ["Angular", "TypeScript", "PokéAPI"],   key: "pokemon"  as const },
  { slug: "newmann",      num: "03", title: "Newmann",      tags: ["Next.js", "Java", "JWT", "OAuth2"],   key: "newmann"  as const },
];

export default function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="px-6 md:px-10 py-32">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-3">{t.work.label}</p>
        <div className="w-8 h-px mb-20" style={{ background: "linear-gradient(90deg, #38bdf8, transparent)" }} />
      </AnimateIn>

      <div className="flex flex-col">
        {projectList.map((p, i) => {
          const proj = t.projects[p.key];
          const data = projects.find((d) => d.slug === p.slug);
          const links = data?.links ?? [];
          return (
            <AnimateIn key={p.slug} delay={i * 100}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative border-t border-white/6 last:border-b py-12 md:py-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-0 hover:border-white/14 transition-colors duration-300 overflow-hidden">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 font-bold text-white/[0.022] select-none pointer-events-none leading-none group-hover:text-white/[0.042] transition-all duration-500" style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}>
                    {p.num}
                  </span>
                  <span className="text-xs font-mono text-[#38bdf8]/35 w-16 shrink-0">{p.num}</span>
                  <h3 className="font-semibold text-white/70 leading-none tracking-tight flex-1 group-hover:text-white transition-colors duration-300" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                    {p.title}
                  </h3>
                  <div className="md:w-72 shrink-0 flex flex-col gap-4 relative z-10">
                    <span className="self-start text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/40">
                      {proj.status}
                    </span>
                    <p className="text-sm text-white/30 leading-relaxed">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-xs text-white/35 border border-white/8 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block ml-10 shrink-0 relative z-10 text-white/15 group-hover:text-[#38bdf8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
