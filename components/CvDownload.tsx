"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";

const files = {
  it: { href: "/cv/Luca_Mimmo_CV_IT.pdf", label: "Italiano", short: "IT" },
  en: { href: "/cv/Luca_Mimmo_CV_EN.pdf", label: "English", short: "EN" },
} as const;
type Choice = keyof typeof files;
const order: Choice[] = ["it", "en"];
const EASE = "cubic-bezier(0.32,0.72,0,1)";

/** CV download with a small custom language picker (listbox), defaulting to the page language. */
export default function CvDownload({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  const [choice, setChoice] = useState<Choice>(lang);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(order.indexOf(lang));
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => { if (open) list.current?.focus(); }, [open]);

  const pick = (c: Choice) => { setChoice(c); setOpen(false); button.current?.focus(); };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + order.length) % order.length); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(order[active]); }
    else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); if (e.key === "Escape") button.current?.focus(); }
  };

  return (
    <div ref={root} className={`relative inline-flex items-stretch rounded-full ring-1 ring-white/12 bg-white/[0.03] ${className}`}>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${t.cv.language}: ${files[choice].label}`}
        onClick={() => { setActive(order.indexOf(choice)); setOpen((o) => !o); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setActive(order.indexOf(choice)); setOpen(true); } }}
        className="flex items-center gap-2 rounded-l-full pl-4 pr-3 py-3 text-sm text-white/80 hover:text-white hover:bg-white/[0.04] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/50"
      >
        <span className="rounded-md bg-[#38bdf8]/12 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#7dd3fc]">{files[choice].short}</span>
        {files[choice].label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="w-px my-2 bg-white/10" aria-hidden="true" />

      <a
        href={files[choice].href}
        download
        className="group inline-flex items-center gap-2 rounded-r-full pl-3 pr-4 py-3 text-sm font-medium text-white hover:bg-white/[0.06] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/50"
      >
        {t.cv.download}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
          <path d="M12 4v12M6 11l6 6 6-6M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Options */}
      <div
        className={`absolute left-0 bottom-full mb-2 z-20 min-w-[11rem] rounded-2xl p-1 bg-[#141c26] ring-1 ring-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] origin-bottom-left transition-all duration-300 ${
          open ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 translate-y-1"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-label={t.cv.language}
          aria-activedescendant={open ? `${id}-${order[active]}` : undefined}
          onKeyDown={onListKey}
          className="rounded-xl bg-[#0b1118] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] focus:outline-none"
        >
          {order.map((key, i) => {
            const selected = key === choice;
            return (
              <li
                key={key}
                id={`${id}-${key}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(key)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors duration-200 ${
                  active === i ? "bg-white/[0.07] text-white" : "text-white/70"
                }`}
              >
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${selected ? "bg-[#38bdf8]/15 text-[#7dd3fc]" : "bg-white/[0.06] text-white/50"}`}>{files[key].short}</span>
                <span className="flex-1">{files[key].label}</span>
                {selected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
