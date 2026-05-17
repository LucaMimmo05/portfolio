"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const el = document.getElementById(href.slice(2));
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
    { num: "01", label: t.nav.about,      href: "/#about" },
    { num: "02", label: t.nav.work,       href: "/#work" },
    { num: "03", label: t.nav.experience, href: "/#experience" },
    { num: "04", label: t.nav.contact,    href: "/#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between">
        <Link
          href="/"
          onClick={close}
          className="text-sm font-semibold tracking-wide text-white/55 hover:text-white transition-colors duration-200"
        >
          Luca Mimmo
        </Link>

        <div className="flex items-center gap-5">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-xs font-medium tracking-widest text-white/30 hover:text-white/70 transition-colors duration-200 uppercase"
          >
            {lang === "en" ? "IT" : "EN"}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
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
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
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
            { label: "GitHub",   href: "https://github.com/LucaMimmo05" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/lucamimmo/" },
            { label: "Email",    href: "mailto:lucamimmo2005@outlook.it" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
