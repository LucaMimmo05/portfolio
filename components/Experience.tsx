"use client";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { Pill, stageBg } from "@/components/ui";
import { RevealWords, trackPointer } from "@/components/motion";

const isOngoing = (period: string) => /present/i.test(period);

export default function Experience() {
  const { t } = useLang();
  const exp = t.experience;

  return (
    <>
      {/* Work: Newmann featured, the other roles on a dotted timeline */}
      <section id="experience" className="px-4 md:px-6 py-28 md:py-36">
        <AnimateIn className="flex flex-col items-center text-center mb-14 md:mb-20">
          <Pill>{exp.label}</Pill>
          <h2 className="mt-5 font-medium tracking-tight text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            <RevealWords text={exp.title} />
          </h2>
        </AnimateIn>

        {(() => {
          const [featured, ...others] = exp.roles;
          return (
            <div className="max-w-[1400px] mx-auto">
              {/* Newmann: the one role that stands out */}
              <AnimateIn>
                <article
                  onPointerMove={trackPointer}
                  className="spotlight rounded-[28px] md:rounded-[40px] border border-[#38bdf8]/20 p-7 md:p-14 overflow-hidden"
                  style={stageBg}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div>
                      <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-[#7dd3fc]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                        {exp.founding}
                      </span>
                      <h3 className="mt-5 font-medium tracking-[-0.03em] text-white leading-[1.02]" style={{ fontSize: "clamp(2.2rem, 5vw, 4.25rem)" }}>
                        {featured.role}
                      </h3>
                      <p className="mt-3 text-xl md:text-2xl text-[#7dd3fc]">{featured.company}</p>
                    </div>
                    <span className="self-start shrink-0 text-sm px-3.5 py-1.5 rounded-full border border-[#38bdf8]/25 bg-[#38bdf8]/10 text-[#7dd3fc] tabular-nums">
                      {featured.period}
                    </span>
                  </div>
                  <p className="mt-8 max-w-3xl text-lg text-white/70 leading-relaxed [text-wrap:pretty]">{featured.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-sm text-white/75 border border-white/10 bg-white/[0.04] px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </article>
              </AnimateIn>

              {/* Everything else: a dotted timeline */}
              <ol className="relative mt-14 md:mt-20 max-w-5xl mx-auto space-y-12 before:absolute before:left-[6px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[#38bdf8]/40 before:via-white/10 before:to-transparent">
                {others.map((role, i) => (
                  <AnimateIn key={role.role + role.company + role.period} delay={i * 80}>
                    <li className="relative pl-10">
                      <span className="absolute left-0 top-1.5 w-[13px] h-[13px] rounded-full border-2 border-[#38bdf8]/70 bg-[#080808]" aria-hidden="true" />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="text-lg font-medium text-white/90">{role.role}</h3>
                        <span className="text-sm text-white/45 tabular-nums">{role.period}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-[#7dd3fc]/85">{role.company}</p>
                      <p className="mt-3 text-[15px] text-white/55 leading-relaxed max-w-2xl [text-wrap:pretty]">{role.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {role.tags.map((tag) => (
                          <span key={tag} className="text-xs text-white/55 border border-white/[0.08] px-2.5 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </li>
                  </AnimateIn>
                ))}
              </ol>
            </div>
          );
        })()}
      </section>

      {/* Education: its own section, three cards side by side */}
      <section id="education" className="px-4 md:px-6 pb-28 md:pb-36">
        <AnimateIn className="flex flex-col items-center text-center mb-14 md:mb-16">
          <Pill>{exp.education}</Pill>
          <h2 className="mt-5 font-medium tracking-tight text-white leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            <RevealWords text={exp.eduTitle} />
          </h2>
        </AnimateIn>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {exp.edu.map((edu, i) => (
            <AnimateIn key={edu.degree} delay={i * 90} className="h-full">
              <article
                onPointerMove={trackPointer}
                className="spotlight h-full flex flex-col rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 hover:border-[#38bdf8]/25 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium tracking-[0.08em] text-white/70">EQF {edu.eqf}</span>
                    <span className="text-xs text-white/50 tabular-nums">{edu.period}</span>
                  </span>
                  {isOngoing(edu.period) ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/25 bg-[#38bdf8]/10 px-2.5 py-0.5 text-[11px] text-[#7dd3fc]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                      {exp.current}
                    </span>
                  ) : edu.grade ? (
                    <span className="inline-flex items-baseline gap-1.5 rounded-lg border border-[#38bdf8]/20 bg-[#38bdf8]/[0.07] px-2.5 py-1">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#7dd3fc]/80">{exp.grade}</span>
                      <span className="text-sm font-medium text-white tabular-nums">{edu.grade}</span>
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-6 text-lg font-medium text-white leading-snug tracking-[-0.01em]">{edu.degree}</h3>
                <p className="mt-1.5 text-sm text-[#7dd3fc]">{edu.school}</p>
                <p className="mt-4 text-sm text-white/55 leading-relaxed flex-1">{edu.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {edu.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-white/55 border border-white/[0.08] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}
