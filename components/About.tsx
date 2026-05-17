"use client";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="px-6 md:px-10 py-32 border-t border-white/6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <AnimateIn>
          <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-3">{t.about.label}</p>
          <div className="w-8 h-px mb-10" style={{ background: "linear-gradient(90deg, #38bdf8, transparent)" }} />
          <h2 className="font-semibold text-white leading-[1.04] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            {t.about.h1}<br />
            <span className="text-white/30">{t.about.h2}</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="space-y-8 md:pt-20">
            <p className="text-white/40 text-base leading-loose">{t.about.p1}</p>
            <p className="text-white/40 text-base leading-loose">{t.about.p2}</p>
            <div className="grid grid-cols-2 gap-5 pt-6">
              {t.about.facts.map((item, i) => (
                <AnimateIn key={item.label} delay={160 + i * 60}>
                  <div className="border-l border-white/8 pl-5 py-3 hover:border-[#38bdf8]/40 transition-colors duration-300">
                    <p className="text-[10px] uppercase tracking-widest text-white/22 mb-2">{item.label}</p>
                    <p className="text-sm font-medium text-white/60">{item.value}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
