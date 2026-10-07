"use client";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { Pill, icons } from "@/components/ui";
import { RevealWords, trackPointer } from "@/components/motion";

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="px-4 md:px-6 py-28 md:py-36">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start px-2 md:px-8">
        <AnimateIn className="lg:col-span-5">
          <Pill>{t.about.label}</Pill>
          <h2 className="mt-6 font-medium text-white leading-[1.04] tracking-[-0.03em]" style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)" }}>
            <RevealWords text={t.about.h1} />
            <br />
            <RevealWords text={t.about.h2} className="text-white/40" delay={200} />
          </h2>
        </AnimateIn>

        <AnimateIn delay={120} className="lg:col-span-7 lg:pt-14">
          <div className="space-y-6 max-w-2xl">
            <p className="text-white/70 text-lg leading-relaxed [text-wrap:pretty]">{t.about.p1}</p>
            <p className="text-white/55 text-lg leading-relaxed [text-wrap:pretty]">{t.about.p2}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.about.facts.map((item, i) => (
              <div
                key={item.label}
                onPointerMove={trackPointer}
                className="spotlight group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex items-start gap-4 hover:border-[#38bdf8]/25 hover:bg-white/[0.035] transition-colors duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl border border-[#38bdf8]/20 bg-gradient-to-br from-[#38bdf8]/20 to-[#38bdf8]/5 flex items-center justify-center text-[#7dd3fc]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[i % icons.length]}
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 mb-1.5">{item.label}</p>
                  <p className="text-[15px] font-medium text-white/85">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
