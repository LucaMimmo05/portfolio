"use client";
import { useLang } from "@/context/LangContext";
import { site } from "@/lib/site";
import CvDownload from "@/components/CvDownload";
import StackScene from "@/components/StackScene";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

/** Each letter rises out of its own mask, one after another. */
function Letters({ word, start, className = "", style }: { word: string; start: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`block ${className}`} style={style} aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em] px-[0.05em] -mx-[0.05em]">
          <span className="letter-rise inline-block" style={{ animationDelay: `${start + i * 0.055}s` }}>{ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  // Sized by width and height, so the whole hero fits on short laptop screens too
  const nameSize = { fontSize: "clamp(4.25rem, min(11.5vw, 19dvh), 15.5rem)" };

  return (
    <section
      // The glow lives on the whole section, so it reaches the top of the page and passes under the navbar
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }}
      className="relative px-4 md:px-6 pt-24"
    >
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative min-h-[calc(100dvh-6rem)] px-2 md:px-10 pt-6 md:pt-8 pb-10 md:pb-14 flex flex-col">
        {/* A dotted field that fades towards the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(rgba(125,211,252,0.55) 1px, transparent 1.3px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 55% 60% at 72% 48%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 72% 48%, black, transparent 75%)",
          }}
        />

        {/* Status: available, and what I'm doing right now */}
        <p className="anim-fade relative z-10 self-start inline-flex items-center gap-3 rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/[0.06] pl-3 pr-4 py-1.5 text-[13px]" style={{ animationDelay: "0.1s" }}>
          <span className="flex items-center gap-2 text-[#bae6fd]">
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#38bdf8] animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-[#38bdf8]" />
            </span>
            {t.hero.open}
          </span>
          <span className="w-px h-3.5 bg-[#38bdf8]/25" aria-hidden="true" />
          <span className="text-white/60">{t.hero.now}</span>
        </p>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-6 lg:gap-4 py-8 lg:py-4">
          {/* Name, what I do, actions */}
          <div className="order-2 lg:order-1">
            {/* The name is the page's only h1 */}
            <h1 className="font-semibold leading-[0.84] tracking-[-0.055em]" style={nameSize} aria-label="Luca Mimmo">
              <Letters word="Luca" start={0.15} className="text-white" />
              <Letters word="Mimmo" start={0.4} className="name-outline" />
            </h1>

            <p className="anim-fade-up mt-8 md:mt-10 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed [text-wrap:pretty]" style={{ animationDelay: "0.75s" }}>
              {t.hero.lead}
            </p>

            <div className="anim-fade-up mt-8 md:mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.9s" }}>
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-1.5 py-1.5 text-sm font-medium text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-500"
                style={{ transitionTimingFunction: EASE }}
              >
                {t.hero.cta}
                <span className="flex w-9 h-9 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-500 group-hover:translate-y-[2px] group-hover:scale-105" style={{ transitionTimingFunction: EASE }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full px-5 py-3 text-sm text-white/80 ring-1 ring-white/12 bg-white/[0.03] hover:ring-white/30 hover:text-white active:scale-[0.98] transition-all duration-500"
                style={{ transitionTimingFunction: EASE }}
              >
                {t.hero.email}
              </a>
              <CvDownload />
            </div>
          </div>

          {/* The full stack, as an object, with its own soft light */}
          <div className="relative order-1 lg:order-2 anim-fade mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[min(660px,68dvh)] 2xl:max-w-[min(880px,70dvh)] min-[2200px]:max-w-[min(1040px,72dvh)]" style={{ animationDelay: "0.2s" }}>
            <div aria-hidden="true" className="pointer-events-none absolute -inset-[15%] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(56,189,248,0.06) 55%, transparent)" }} />
            <StackScene labels={t.hero.layers} ariaLabel={t.hero.stackLabel} replayLabel={t.hero.replay} />
          </div>
        </div>

      </div>
    </section>
  );
}
