"use client";
import { useId, useState } from "react";
import { useLang } from "@/context/LangContext";

const files = {
  it: { href: "/cv/Luca_Mimmo_CV_IT.pdf", label: "Italiano" },
  en: { href: "/cv/Luca_Mimmo_CV_EN.pdf", label: "English" },
} as const;

/** Language select + download button for the CV, defaulting to the page language. */
export default function CvDownload({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  const [choice, setChoice] = useState<keyof typeof files>(lang);
  const id = useId();

  return (
    <div className={`inline-flex items-stretch rounded-full border border-white/12 bg-white/[0.03] overflow-hidden ${className}`}>
      <label className="sr-only" htmlFor={id}>{t.cv.language}</label>
      <div className="relative flex items-center border-r border-white/10">
        <select
          id={id}
          value={choice}
          onChange={(e) => setChoice(e.target.value as keyof typeof files)}
          className="appearance-none bg-transparent pl-4 pr-8 py-2.5 text-sm text-white/80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/50"
        >
          {Object.entries(files).map(([key, f]) => (
            <option key={key} value={key} className="bg-[#0d1117] text-white">
              {f.label}
            </option>
          ))}
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-3 text-white/50" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <a
        href={files[choice].href}
        download
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200"
      >
        {t.cv.download}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 4v12M6 11l6 6 6-6M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
