"use client";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { Pill } from "@/components/ui";
import ProjectCover from "@/components/ProjectCover";
import { RevealWords, trackPointer } from "@/components/motion";
import { projects } from "@/data/projects";

export default function Work() {
  const { t, href, lang } = useLang();

  return (
    <section id="work" className="px-4 md:px-6 py-28 md:py-36">
      <AnimateIn className="flex flex-col items-center text-center mb-16 md:mb-24">
        <Pill>{t.work.pill}</Pill>
        <h2 className="mt-5 font-medium tracking-tight text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          <RevealWords text={t.work.label} />
        </h2>
        <p className="mt-5 max-w-xl text-white/55 leading-relaxed [text-wrap:balance]">{t.work.intro}</p>
      </AnimateIn>

      <div className="max-w-[1560px] mx-auto space-y-6 md:space-y-8">
        {projects.map((p, i) => {
          const proj = t.projects[p.key];
          const flip = i % 2 === 1;
          return (
            <AnimateIn key={p.slug} delay={60}>
              <Link
                href={href(`/work/${p.slug}`)}
                onPointerMove={trackPointer}
                className="spotlight group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center rounded-[28px] md:rounded-[36px] border border-white/[0.06] bg-white/[0.015] p-3 md:p-4 hover:border-[#38bdf8]/25 transition-colors duration-500"
              >
                <div className={`lg:col-span-6 overflow-hidden rounded-[22px] md:rounded-[28px] ${flip ? "lg:order-2" : ""}`}>
                  <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                    <ProjectCover projectKey={p.key} title={p.title} lang={lang} />
                  </div>
                </div>

                <div className={`lg:col-span-6 px-3 pb-5 lg:p-6 ${flip ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-[#38bdf8]/70">{p.num}</span>
                    <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60">{proj.status}</span>
                    <span className="text-white/40">{p.year}</span>
                  </div>
                  <h3 className="mt-5 font-medium tracking-[-0.03em] text-white leading-none" style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-5 text-[15px] text-white/55 leading-relaxed max-w-md">{proj.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="text-xs text-white/60 border border-white/10 bg-white/[0.03] px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#7dd3fc]">
                    {t.work.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
