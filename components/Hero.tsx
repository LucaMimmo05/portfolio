"use client";
import { useLang } from "@/context/LangContext";
import { Pill, stageBg } from "@/components/ui";
import { site } from "@/lib/site";
import CvDownload from "@/components/CvDownload";

export default function Hero() {
  const { t } = useLang();
  const display = { fontSize: "clamp(3rem, 12.5vw, 22rem)" };

  return (
    <section className="px-4 md:px-6 pt-24">
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
        }}
        className="relative min-h-[calc(100dvh-7rem)] rounded-[28px] md:rounded-[40px] border border-white/[0.06] overflow-hidden flex flex-col justify-between px-6 md:px-14 pt-10 md:pt-14 pb-10 md:pb-14"
        style={stageBg}
      >
        {/* Glow that follows the pointer */}
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
        {/* Faint grid that fades out towards the edges, for a bit of depth behind the type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(to right, #7dd3fc 1px, transparent 1px), linear-gradient(to bottom, #7dd3fc 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />

        <div className="anim-fade relative z-10 flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: "0.1s" }}>
          <Pill>Luca Mimmo · {t.hero.role}</Pill>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#38bdf8] animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-[#38bdf8]" />
            </span>
            {t.hero.open}
          </span>
        </div>

        <h1 className="float-slow relative z-10 my-16 font-semibold leading-[0.88] tracking-[-0.04em] select-none text-center">
          <span className="sr-only">Luca Mimmo, </span>
          <span className="anim-fade-up block text-outline" style={{ ...display, animationDelay: "0.18s" }}>
            {t.hero.line1}
          </span>
          <span
            className="anim-fade-up block"
            style={{
              ...display,
              animationDelay: "0.3s",
              background: "linear-gradient(95deg, #38bdf8 0%, #7dd3fc 50%, #bae6fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.hero.line2}
          </span>
        </h1>

        <div className="anim-fade-up relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ animationDelay: "0.48s" }}>
          <p className="max-w-sm 2xl:max-w-md text-base 2xl:text-lg text-white/60 leading-relaxed [text-wrap:pretty]">{t.hero.bio}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/85 active:scale-[0.98] transition-all duration-200"
            >
              {t.hero.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="px-5 py-2.5 text-sm text-white/70 border border-white/12 bg-white/[0.03] rounded-full hover:border-white/30 hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              {t.hero.email}
            </a>
            <CvDownload />
          </div>
        </div>
      </div>
    </section>
  );
}
