"use client";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";

export default function Experience() {
  const { t } = useLang();
  const [current, ...past] = t.experience.roles;

  return (
    <section id="experience" className="px-6 md:px-10 py-32 border-t border-white/6">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-3">{t.experience.label}</p>
        <div className="w-8 h-px mb-20" style={{ background: "linear-gradient(90deg, #38bdf8, transparent)" }} />
      </AnimateIn>

      {/* Current — featured card with orange accent */}
      <AnimateIn delay={80}>
        <div className="rounded-3xl border border-[#38bdf8]/15 bg-white/[0.018] p-8 md:p-12 mb-4 hover:border-[#38bdf8]/25 transition-all duration-300 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-[0.05]" style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }} />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-medium tracking-widest uppercase text-[#38bdf8]/70 mb-4 block">
                {t.experience.founding}
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight">{current.role}</h3>
              <p className="text-white/35 mt-2">{current.company}</p>
            </div>
            <span className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/8 text-[#38bdf8]/65 self-start">
              {current.period}
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-8">{current.desc}</p>
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <span key={tag} className="text-xs text-white/35 border border-white/8 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Past roles */}
      <div className="mb-28">
        {past.map((exp, i) => (
          <AnimateIn key={exp.role + exp.company} delay={120 + i * 80}>
            <div className="group border-t border-white/6 py-10 hover:border-white/12 transition-colors duration-300">
              <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-white/75 group-hover:text-white transition-colors duration-200">{exp.role}</h4>
                      <p className="text-sm text-white/30 mt-1">{exp.company}</p>
                    </div>
                    <span className="text-xs text-white/20 shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-sm text-white/32 leading-relaxed max-w-xl">{exp.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white/25 border border-white/6 px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* Education */}
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-10">{t.experience.education}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.experience.edu.map((edu, i) => (
          <AnimateIn key={edu.degree} delay={i * 100}>
            <div className="rounded-3xl border border-white/6 bg-white/[0.015] p-8 md:p-10 hover:border-white/12 transition-all duration-300 h-full">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h4 className="text-base font-semibold text-white/75">{edu.degree}</h4>
                  <p className="text-sm text-white/30 mt-1">{edu.school}</p>
                </div>
                <span className="text-xs text-white/20 shrink-0">{edu.period}</span>
              </div>
              <p className="text-sm text-white/35 leading-relaxed mb-6">{edu.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {edu.tags.map((tag) => (
                  <span key={tag} className="text-xs text-white/25 border border-white/6 px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
