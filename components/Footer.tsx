"use client";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/6 px-6 md:px-10 pt-14 pb-10">
      <div className="mb-12 space-y-4 max-w-sm">
        <p className="text-xl font-semibold text-white/65 tracking-tight">Luca Mimmo</p>
        <p className="text-sm text-white/25 leading-relaxed">{t.footer.tagline}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60 animate-pulse" />
          <span className="text-xs text-[#38bdf8]/50">{t.footer.open}</span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-xs text-white/15">{t.footer.copy}</span>
        <span className="text-xs text-white/10">{t.footer.built}</span>
      </div>
    </footer>
  );
}
