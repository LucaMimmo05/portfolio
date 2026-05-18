"use client";
import { useLang } from "@/context/LangContext";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-36 pb-16 overflow-hidden">

      <div className="anim-fade relative z-10 flex items-center justify-between" style={{ animationDelay: "0.1s" }}>
        <span className="text-xs tracking-[0.22em] uppercase text-white/25">{t.hero.role}</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/70 animate-pulse" />
          <span className="text-xs text-[#38bdf8]/60">{t.hero.open}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col my-auto py-16">
        <h1 className="anim-fade-up font-semibold leading-[0.88] tracking-[-0.03em] text-outline select-none" style={{ fontSize: "clamp(1rem, 13vw, 13rem)", animationDelay: "0.18s" }}>
          {t.hero.line1}
        </h1>
        <h1 className="anim-fade-up font-semibold leading-[0.88] tracking-[-0.03em] select-none" style={{ fontSize: "clamp(1rem, 13vw, 13rem)", animationDelay: "0.3s", background: "linear-gradient(95deg, #38bdf8 0%, #7dd3fc 50%, #bae6fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {t.hero.line2}
        </h1>
      </div>

      <div className="anim-fade-up relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-10" style={{ animationDelay: "0.48s" }}>
        <p className="max-w-xs text-sm text-white/30 leading-relaxed">{t.hero.bio}</p>
        <div className="flex items-center gap-3 shrink-0">
          <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/88 transition-all duration-200">
            {t.hero.cta}
          </a>
          <a href="mailto:lucamimmo2005@outlook.it" className="px-5 py-2.5 text-sm text-white/45 border border-white/10 rounded-full hover:border-white/25 hover:text-white/75 transition-all duration-200">
            {t.hero.email}
          </a>
        </div>
      </div>
    </section>
  );
}
