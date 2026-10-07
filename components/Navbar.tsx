"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { localePath, site } from "@/lib/site";
import { projects } from "@/data/projects";
import ProjectCover from "@/components/ProjectCover";
import CvDownload from "@/components/CvDownload";

const EASE = "cubic-bezier(0.32,0.72,0,1)";
const SECTIONS = ["work", "about", "experience", "contact"] as const;
type Section = (typeof SECTIONS)[number];

export default function Navbar() {
  const { t, lang, href } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0%" });
  const [active, setActive] = useState<Section | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navList = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<Section | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const otherLang = lang === "en" ? "it" : "en";
  const basePath = pathname.replace(/^\/(it|en)(?=\/|$)/, "") || "/";
  const onHome = basePath === "/";
  const switchHref = localePath(otherLang, basePath);
  const rememberLang = () => {
    document.cookie = `lang=${otherLang}; path=/; max-age=31536000; samesite=lax`;
  };

  // Floating island: always visible, gets a glass backdrop once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is on screen, for the sliding indicator
  useEffect(() => {
    if (!onHome) return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as Section);
        else if (window.scrollY < window.innerHeight * 0.5) setActive(null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  // Lock scroll, close on Escape, move focus into the menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    const focus = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350);
    return () => { document.removeEventListener("keydown", onKey); clearTimeout(focus); document.body.style.overflow = ""; };
  }, [open]);

  // Measure where the gliding pill should sit: the hovered item, otherwise the current section
  const target = hovered ?? (onHome ? active : null);
  useEffect(() => {
    const ul = navList.current;
    const measure = () => {
      const el = target && ul?.querySelector<HTMLElement>(`a[data-id="${target}"]`);
      // the link sits in a positioned <li>, so measure the <li> against the list
      const li = el ? (el.parentElement as HTMLElement) : null;
      setPill(li ? { x: li.offsetLeft, w: li.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [target, lang]);

  const toggle = () => {
    // The overlay grows out of the menu button
    const r = menuButton.current?.getBoundingClientRect();
    if (r) setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    setOpen((o) => !o);
  };
  const close = () => setOpen(false);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const [, hash] = target.split("#");
    const el = hash ? document.getElementById(hash) : null;
    if (el) {
      e.preventDefault();
      close();
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), open ? 420 : 0);
    } else close();
  };

  const labels: Record<Section, string> = { work: t.nav.work, about: t.nav.about, experience: t.nav.experience, contact: t.nav.contact };
  const links = SECTIONS.map((id) => ({ id, label: labels[id], href: href(`/#${id}`) }));
  const socials = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "Email", href: `mailto:${site.email}` },
  ];

  return (
    <>
      {/* Floating island */}
      <header
        className="fixed top-3 md:top-4 inset-x-3 md:inset-x-6 z-50"
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full pl-5 pr-2 py-2 transition-all duration-700 ${
            scrolled && !open ? "bg-[#0b1118]/75 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] max-w-[1100px]" : "ring-1 ring-transparent max-w-[2400px]"
          }`}
          style={{ transitionTimingFunction: EASE }}
        >
          <Link href={href("/")} onClick={close} className="relative z-[61] flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white/85 hover:text-white transition-colors duration-300">
            <span className="flex w-7 h-7 items-center justify-center rounded-full bg-[#38bdf8]/12 ring-1 ring-[#38bdf8]/25 text-[11px] font-bold leading-none text-[#7dd3fc]">
              LM
            </span>
            Luca Mimmo
          </Link>

          {/* Inline sections: one pill glides under the hovered item and settles on the current section (desktop) */}
          <nav aria-label={t.nav.primary} className={`hidden lg:block transition-opacity duration-300 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <ul
              ref={navList}
              onPointerLeave={() => setHovered(null)}
              className="relative flex items-center gap-1 rounded-full p-1 bg-white/[0.03] ring-1 ring-white/[0.07]"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-0 rounded-full bg-white/[0.09] ring-1 ring-white/10"
                style={{
                  width: pill?.w ?? 0,
                  transform: `translateX(${pill?.x ?? 0}px)`,
                  opacity: pill ? 1 : 0,
                  transition: `transform 0.5s ${EASE}, width 0.5s ${EASE}, opacity 0.3s ${EASE}`,
                }}
              />
              {links.map((l) => {
                const isActive = onHome && active === l.id;
                const lit = (hovered ?? (onHome ? active : null)) === l.id;
                return (
                  <li key={l.id} className="relative">
                    <a
                      href={l.href}
                      data-id={l.id}
                      onPointerEnter={() => setHovered(l.id)}
                      onFocus={() => setHovered(l.id)}
                      onBlur={() => setHovered(null)}
                      onClick={(e) => go(e, l.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-4 py-1.5 text-[13px] transition-colors duration-300 focus:outline-none ${lit ? "text-white" : "text-white/55"}`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-[61] flex items-center gap-1.5">
            <Link
              href={switchHref}
              hrefLang={otherLang}
              prefetch={false}
              onClick={rememberLang}
              aria-label={t.nav.switchLang}
              title={t.nav.switchLang}
              className="rounded-full px-3 py-2 text-xs font-medium uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors duration-300"
            >
              {otherLang}
            </Link>
            <button
              ref={menuButton}
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`group flex items-center gap-3 rounded-full pl-4 pr-1.5 py-1.5 text-sm transition-colors duration-500 ${open ? "bg-white text-black" : "bg-white/[0.06] text-white/85 hover:bg-white/[0.1] ring-1 ring-white/10"}`}
              style={{ transitionTimingFunction: EASE }}
            >
              <span className="relative h-5 overflow-hidden">
                <span className={`block transition-transform duration-500 ${open ? "-translate-y-5" : ""}`} style={{ transitionTimingFunction: EASE }}>
                  <span className="block h-5 leading-5">{t.nav.menu}</span>
                  <span className="block h-5 leading-5">{t.nav.close}</span>
                </span>
              </span>
              <span className={`relative flex w-8 h-8 items-center justify-center rounded-full ${open ? "bg-black/[0.07]" : "bg-white/[0.08]"}`}>
                <span className={`absolute h-[1.5px] w-3.5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} style={{ transitionTimingFunction: EASE }} />
                <span className={`absolute h-[1.5px] w-3.5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} style={{ transitionTimingFunction: EASE }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu: grows out of the button as a circle */}
      <div
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-[#060a0f]/95 backdrop-blur-2xl"
        style={{
          clipPath: open ? `circle(150% at ${origin.x} ${origin.y})` : `circle(0px at ${origin.x} ${origin.y})`,
          transition: `clip-path ${open ? 0.9 : 0.6}s ${EASE}`,
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 50% at 15% 20%, rgba(56,189,248,0.14), transparent 70%), radial-gradient(40% 40% at 90% 90%, rgba(56,189,248,0.08), transparent 70%)" }} />

        <div className="relative min-h-full max-w-[1500px] mx-auto px-6 md:px-14 pt-28 md:pt-32 pb-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          {/* Sections */}
          <nav aria-label={t.nav.primary} className="flex flex-col justify-center">
            <ul className="space-y-1 md:space-y-2">
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="group flex items-center gap-5 py-1 focus:outline-none"
                    style={{
                      transform: open ? "translateY(0)" : "translateY(110%)",
                      transition: `transform 0.9s ${EASE}`,
                      transitionDelay: open ? `${180 + i * 70}ms` : "0ms",
                    }}
                  >
                    <span
                      className="font-semibold tracking-[-0.045em] leading-[1.02] text-white/45 group-hover:text-white group-focus-visible:text-white transition-colors duration-300"
                      style={{ fontSize: "clamp(2.75rem, 7.5vw, 7.5rem)" }}
                    >
                      {l.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex w-12 h-12 md:w-16 md:h-16 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-[#04131d] opacity-0 -translate-x-4 scale-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100 transition-all duration-500"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Case studies, contacts, CV */}
          <div
            className="flex flex-col justify-center gap-10"
            style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(24px)", transition: `opacity 0.7s ${EASE}, transform 0.9s ${EASE}`, transitionDelay: open ? "420ms" : "0ms" }}
          >
            <div>
              <p className="mb-4 text-sm text-white/45">{t.nav.caseStudies}</p>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={href(`/work/${p.slug}`)}
                      onClick={close}
                      className="group flex items-center gap-4 rounded-[22px] p-1.5 pr-5 bg-white/[0.03] ring-1 ring-white/[0.07] hover:ring-[#38bdf8]/30 hover:bg-white/[0.05] transition-all duration-500"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      <span className="block w-24 md:w-28 shrink-0 overflow-hidden rounded-[16px]">
                        <span className="block transition-transform duration-700 group-hover:scale-[1.06]" style={{ transitionTimingFunction: EASE }}>
                          <ProjectCover projectKey={p.key} title={p.title} variant="mark" />
                        </span>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-base font-medium text-white">{p.title}</span>
                        <span className="block truncate text-[13px] text-white/50">{p.tags.slice(0, 3).join(" · ")}</span>
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-white/40 group-hover:text-[#7dd3fc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                      onClick={close}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <CvDownload />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
