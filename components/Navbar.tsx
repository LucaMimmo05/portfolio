"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { localePath, site } from "@/lib/site";

export default function Navbar() {
  const { t, lang, href } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLang = lang === "en" ? "it" : "en";
  const basePath = pathname.replace(/^\/(it|en)(?=\/|$)/, "") || "/";
  const switchHref = localePath(otherLang, basePath);
  const rememberLang = () => {
    document.cookie = `lang=${otherLang}; path=/; max-age=31536000; samesite=lax`;
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const [, hash] = target.split("#");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        close();
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 10);
      }
    } else {
      close();
    }
  };

  const links = [
    { num: "01", label: t.nav.about,      href: href("/#about") },
    { num: "02", label: t.nav.work,       href: href("/#work") },
    { num: "03", label: t.nav.experience, href: href("/#experience") },
    { num: "04", label: t.nav.contact,    href: href("/#contact") },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between">
        <Link
          href={href("/")}
          onClick={close}
          className="text-sm font-semibold tracking-wide text-white/55 hover:text-white transition-colors duration-200"
        >
          Luca Mimmo
        </Link>

        <div className="flex items-center gap-5">
          {/* Language toggle */}
          <Link
            href={switchHref}
            hrefLang={otherLang}
            prefetch={false}
            onClick={rememberLang}
            aria-label={t.nav.switchLang}
            title={t.nav.switchLang}
            className="text-xs font-medium tracking-widest text-white/30 hover:text-white/70 transition-colors duration-200 uppercase"
          >
            {otherLang}
          </Link>

          {/* Menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors duration-200"
          >
            <span>{open ? t.nav.close : t.nav.menu}</span>
            <div className="flex flex-col gap-[5px] w-5">
              <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center px-8 md:px-16 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 mb-16">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`group flex items-baseline gap-5 transition-all duration-500 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
            >
              <span className="text-xs font-mono text-[#38bdf8]/40 w-6 shrink-0">{link.num}</span>
              <span
                className="font-semibold tracking-tight text-white/50 group-hover:text-white transition-colors duration-200 leading-none"
                style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div
          className={`flex flex-wrap gap-8 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: open ? "330ms" : "0ms" }}
        >
          {[
            { label: "GitHub",   href: site.github },
            { label: "LinkedIn", href: site.linkedin },
            { label: "Email",    href: `mailto:${site.email}` },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "me noopener noreferrer" : undefined}
              onClick={close}
              className="text-sm text-white/28 hover:text-white/65 transition-colors duration-200"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
