"use client";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export default function Footer() {
  const { t, href } = useLang();
  return (
    <footer className="border-t border-white/6 px-6 md:px-10 pt-14 pb-10">
      <div className="mb-12 flex flex-col md:flex-row md:justify-between gap-12">
      <div className="space-y-4 max-w-sm">
        <p className="text-xl font-semibold text-white/65 tracking-tight">Luca Mimmo</p>
        <p className="text-sm text-white/25 leading-relaxed">{t.footer.tagline}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-pulse" />
          <span className="text-xs text-[#38bdf8]/50">{t.footer.open}</span>
        </div>
      </div>

      <nav aria-label={t.work.label} className="flex flex-col sm:flex-row gap-10 sm:gap-16 text-sm">
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={href(`/work/${p.slug}`)} className="text-white/30 hover:text-white/70 transition-colors duration-200">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {[
            { label: "GitHub", href: site.github },
            { label: "LinkedIn", href: site.linkedin },
          ].map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="me noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors duration-200">
                {s.label} ↗
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="text-white/30 hover:text-white/70 transition-colors duration-200">Email</a>
          </li>
        </ul>
      </nav>
      </div>

      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-xs text-white/15">{t.footer.copy}</span>
        <span className="text-xs text-white/10">{t.footer.built}</span>
      </div>
    </footer>
  );
}
