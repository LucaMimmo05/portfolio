"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { BrowserFrame, Pill, hostOf, icons, label, stageBg } from "@/components/ui";
import { RevealWords, trackPointer } from "@/components/motion";
import type { ProjectImage, ProjectKey } from "@/data/projects";

type ProjectLink = { label: string; href: string };

type Props = {
  projectKey: ProjectKey;
  num: string;
  title: string;
  year: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  images: readonly ProjectImage[];
  devices?: { desktop: ProjectImage; tablet: ProjectImage; mobile: ProjectImage };
  nextSlug: string;
  nextTitle: string;
};


function DeviceFrame({ image, alt, kind }: { image: ProjectImage; alt: string; kind: "tablet" | "mobile" }) {
  const radius = kind === "tablet" ? "rounded-[18px] md:rounded-[26px]" : "rounded-[16px] md:rounded-[30px]";
  return (
    <div className={`overflow-hidden ${radius} border-[3px] md:border-[6px] border-[#1c232c] bg-black shadow-[0_30px_80px_-30px_rgba(56,189,248,0.4)]`}>
      <Image src={image.src} width={image.width} height={image.height} alt={alt} unoptimized sizes={kind === "tablet" ? "(min-width: 768px) 320px, 60vw" : "(min-width: 768px) 180px, 40vw"} className="w-full h-auto" />
    </div>
  );
}

/** Full-screen view of a screenshot; closes on Escape, backdrop click or the close button. */
function Lightbox({ image, alt, onClose }: { image: ProjectImage; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} onClick={onClose} className="anim-fade fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-[#05070a]/90 backdrop-blur-md p-4 md:p-10 cursor-zoom-out">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full border border-white/15 bg-white/[0.06] text-white/80 hover:text-white flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
      </button>
      <Image src={image.src} width={image.width} height={image.height} alt={alt} unoptimized className="max-h-[82vh] w-auto h-auto max-w-full rounded-xl border border-white/10 object-contain" />
      <p className="max-w-3xl text-center text-sm text-white/70">{alt}</p>
    </div>
  );
}

function LinkButtons({ links }: { links: readonly ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const isGitHub = link.label.startsWith("GitHub");
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
              isGitHub
                ? "border border-white/12 bg-white/[0.03] text-white/65 hover:border-white/28 hover:text-white"
                : "bg-white text-black hover:bg-white/85"
            }`}
          >
            {isGitHub ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export default function ProjectContent({ projectKey, num, title, year, tags, links, images, devices, nextSlug, nextTitle }: Props) {
  const { t, href } = useLang();
  const proj = t.projects[projectKey];
  const pp = t.projectPage;
  const url = hostOf(links);
  const [lead, roleShot, ...more] = images;
  const gallery = more.map((image, i) => ({ image, alt: proj.gallery[i + 2] }));
  const storyCols = proj.story.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3";
  const [zoom, setZoom] = useState<{ image: ProjectImage; alt: string } | null>(null);
  const closeZoom = useCallback(() => setZoom(null), []);

  return (
    <div className="px-4 md:px-6 pt-24 pb-6">
      {/* Hero: centered, like the reference */}
      <section className="relative rounded-[28px] md:rounded-[40px] border border-white/[0.06] overflow-hidden" style={stageBg}>
        <div className="px-6 md:px-14 pt-8 md:pt-10">
          <Link href={href("/#work")} className="group inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {pp.back}
          </Link>

          <div className="mt-10 md:mt-14 flex flex-col items-center text-center">
            <div className="anim-fade flex items-center gap-3 text-xs">
              <span className="font-mono text-[#38bdf8]/70">{num}</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60">{proj.status}</span>
              <span className="text-white/40">{year}</span>
            </div>
            <h1 className="anim-fade-up mt-6 font-medium tracking-[-0.04em] text-white leading-[0.95]" style={{ fontSize: "clamp(3rem, 8vw, 12rem)" }}>
              {title}
            </h1>
            <p className="anim-fade-up mt-6 max-w-2xl 2xl:max-w-3xl text-base md:text-lg 2xl:text-xl text-white/55 leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {proj.desc}
            </p>
            {links.length > 0 && (
              <div className="anim-fade-up mt-8 flex justify-center" style={{ animationDelay: "0.18s" }}>
                <LinkButtons links={links} />
              </div>
            )}
          </div>
        </div>

        {lead && (
          // The frame bleeds off the bottom edge of the panel
          <div className="mt-14 md:mt-16 px-4 md:px-14 -mb-10 md:-mb-24">
            <div className="anim-fade-up hidden md:block mx-auto max-w-5xl 2xl:max-w-[1400px]" style={{ animationDelay: "0.26s" }}>
              <BrowserFrame image={lead} alt={proj.gallery[0]} url={url} sizes="(min-width: 1280px) 1024px, calc(100vw - 64px)" priority />
            </div>
            {/* A wide desktop shot is unreadable on a phone: show the mobile view instead */}
            {devices ? (
              <div className="anim-fade-up md:hidden mx-auto w-[68%]" style={{ animationDelay: "0.26s" }}>
                <DeviceFrame image={devices.mobile} alt={`${title} · mobile`} kind="mobile" />
              </div>
            ) : (
              <div className="anim-fade-up md:hidden" style={{ animationDelay: "0.26s" }}>
                <BrowserFrame image={lead} alt={proj.gallery[0]} url={url} sizes="calc(100vw - 32px)" />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Decisions & challenges: the "process" row */}
      <section className="py-24 md:py-32">
        <AnimateIn className="flex flex-col items-center text-center">
          <Pill>{pp.context}</Pill>
          <h2 className="mt-5 font-medium tracking-tight text-white leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}>
            <RevealWords text={pp.story} />
          </h2>
          <p className="mt-5 max-w-2xl text-white/50 leading-relaxed">{proj.context}</p>
        </AnimateIn>

        <div className={`max-w-[1560px] mx-auto mt-14 md:mt-20 grid grid-cols-1 ${storyCols} gap-4 md:gap-5`}>
          {proj.story.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 80} className="h-full">
              <div onPointerMove={trackPointer} className="spotlight h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 hover:border-[#38bdf8]/25 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl border border-[#38bdf8]/25 bg-gradient-to-br from-[#38bdf8]/25 to-[#38bdf8]/5 flex items-center justify-center text-[#7dd3fc]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {icons[i % icons.length]}
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-white/25">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-3">{item.title}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{item.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Overview band */}
      <AnimateIn>
        <section className="max-w-[1760px] mx-auto rounded-[28px] md:rounded-[40px] border border-white/[0.06] px-6 md:px-14 py-16 md:py-24 flex flex-col items-center text-center" style={stageBg}>
          <Pill>{pp.overview}</Pill>
          <p className="mt-6 max-w-4xl font-light text-white/85 leading-[1.3] tracking-[-0.01em]" style={{ fontSize: "clamp(1.3rem, 2.4vw, 2.1rem)" }}>
            {proj.overview}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-3xl">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-white/70 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Role: screenshot left, text + accented list right */}
      <section className={`max-w-[1560px] mx-auto py-24 md:py-32 grid grid-cols-1 gap-10 md:gap-16 items-center ${roleShot ? "md:grid-cols-2" : ""}`}>
        {roleShot && (
          <AnimateIn>
            <figure className="space-y-3">
              <button type="button" onClick={() => setZoom({ image: roleShot, alt: proj.gallery[1] })} className="block w-full text-left rounded-[28px] border border-white/[0.06] p-4 md:p-8 cursor-zoom-in" style={stageBg}>
                <BrowserFrame image={roleShot} alt={proj.gallery[1]} url={url} sizes="(min-width: 768px) 45vw, calc(100vw - 32px)" />
              </button>
              <figcaption className="text-xs text-white/35 px-1">{proj.gallery[1]}</figcaption>
            </figure>
          </AnimateIn>
        )}
        <AnimateIn delay={100}>
          <Pill>{pp.role}</Pill>
          <p className="mt-5 text-white/70 leading-relaxed" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>{proj.role}</p>
          <h3 className={`${label} mt-10 mb-5`}>{pp.highlights}</h3>
          <ul className="space-y-6">
            {proj.highlights.map((h, i) => (
              <li key={h.label} className={`border-l-2 pl-5 ${i === 0 ? "border-[#38bdf8]" : "border-white/10"}`}>
                <p className={`text-[15px] font-medium mb-1.5 ${i === 0 ? "text-white" : "text-white/80"}`}>{h.label}</p>
                <p className="text-[14px] text-white/45 leading-relaxed">{h.description}</p>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </section>

      {/* Responsive showcase: desktop, tablet, mobile */}
      {devices && (
      <section className="max-w-[1760px] mx-auto rounded-[28px] md:rounded-[40px] border border-white/[0.06] overflow-hidden px-4 md:px-14 pt-16 md:pt-20 pb-10 md:pb-16" style={stageBg}>
        <AnimateIn className="flex flex-col items-center text-center">
          <Pill>{pp.responsive}</Pill>
          <h2 className="mt-5 font-medium tracking-tight text-white" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}><RevealWords text={pp.devices} /></h2>
        </AnimateIn>
        <AnimateIn delay={100}>
          {/* Desktop: browser in the middle, tablet and phone overlapping its lower corners */}
          <div className="hidden md:block relative mt-16 max-w-6xl mx-auto pb-[9%]">
            <div className="mx-[12%]">
              <BrowserFrame image={devices.desktop} alt={`${title} · desktop`} url={url} sizes="(min-width: 1280px) 880px, 76vw" />
            </div>
            <div className="absolute left-0 bottom-0 w-[27%]">
              <DeviceFrame image={devices.tablet} alt={`${title} · tablet`} kind="tablet" />
            </div>
            <div className="absolute right-[2%] bottom-0 w-[15%]">
              <DeviceFrame image={devices.mobile} alt={`${title} · mobile`} kind="mobile" />
            </div>
          </div>
          {/* Small screens: phone and tablet side by side, large enough to read */}
          <div className="md:hidden mt-10 grid grid-cols-[1fr_1.55fr] items-end gap-3">
            <DeviceFrame image={devices.mobile} alt={`${title} · mobile`} kind="mobile" />
            <DeviceFrame image={devices.tablet} alt={`${title} · tablet`} kind="tablet" />
          </div>
        </AnimateIn>
      </section>
      )}

      {/* Remaining screenshots as cards */}
      {gallery.length > 0 && (
        <section className="py-24 md:py-32">
          <AnimateIn className="flex flex-col items-center text-center mb-12 md:mb-16">
            <Pill>{pp.gallery}</Pill>
          </AnimateIn>
          <div className={`max-w-[1560px] mx-auto grid grid-cols-1 gap-5 md:gap-6 ${gallery.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
            {gallery.map(({ image, alt }, i) => (
              <AnimateIn key={image.src} delay={i * 80} className={`h-full ${gallery.length > 1 && gallery.length % 2 === 1 && i === gallery.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto md:w-full" : ""}`}>
                <figure onPointerMove={trackPointer} className="spotlight group h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] p-3 md:p-4 flex flex-col gap-4 hover:border-[#38bdf8]/25 transition-colors duration-300">
                  <button type="button" onClick={() => setZoom({ image, alt })} aria-label={alt} className="relative block w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b1018] cursor-zoom-in">
                    <Image src={image.src} fill alt={alt} unoptimized sizes="(min-width: 768px) 48vw, calc(100vw - 48px)" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </button>
                  <figcaption className="px-2 pb-2 text-sm text-white/55 leading-relaxed">{alt}</figcaption>
                </figure>
              </AnimateIn>
            ))}
          </div>
        </section>
      )}

      {/* Next project */}
      <section className={`max-w-[1760px] mx-auto ${gallery.length > 0 ? "" : "pt-24 md:pt-32"}`}>
        <Link
          href={href(`/work/${nextSlug}`)}
          className="group relative block rounded-[28px] md:rounded-[40px] border border-white/[0.06] overflow-hidden px-6 py-20 md:py-28 text-center"
          style={stageBg}
        >
          <Pill>{pp.nextProject}</Pill>
          <p className="mt-6 font-medium tracking-[-0.04em] text-white/80 group-hover:text-white transition-colors duration-300 leading-none" style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}>
            <RevealWords text={nextTitle} />
          </p>
          <span className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-white text-black group-hover:bg-white/85 transition-colors duration-200">
            {pp.nextProject}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </section>
      {zoom && <Lightbox image={zoom.image} alt={zoom.alt} onClose={closeZoom} />}
    </div>
  );
}
