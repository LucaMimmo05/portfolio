"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";
import { Pill, stageBg } from "@/components/ui";
import { RevealWords } from "@/components/motion";
import CvDownload from "@/components/CvDownload";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "sent" | "error" | "limited";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  // Anti-spam: when the form appeared (bots post instantly) and a honeypot humans never see
  const startedAt = useRef(0);
  const [website, setWebsite] = useState("");
  useEffect(() => { startedAt.current = Date.now(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, startedAt: startedAt.current }),
      });
      setStatus(res.ok ? "sent" : res.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
    startedAt.current = Date.now();
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[15px] text-white placeholder:text-white/35 focus:outline-none focus:border-[#38bdf8]/50 focus:bg-white/[0.05] transition-colors duration-200 disabled:opacity-60";

  return (
    <section id="contact" className="px-4 md:px-6 pt-8 pb-28 md:pb-36">
      <div className="max-w-[1560px] mx-auto rounded-[28px] md:rounded-[40px] border border-white/[0.06] px-6 md:px-14 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start" style={stageBg}>
        {/* Left: heading + links */}
        <AnimateIn delay={60}>
          <Pill>{t.contact.label}</Pill>
          <h2
            className="mt-6 font-medium text-white leading-[1.04] tracking-[-0.03em] mb-10"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)" }}
          >
            <RevealWords text={t.contact.h1} /><br /><RevealWords text={t.contact.h2} className="text-white/40" delay={160} />
          </h2>

          <div className="flex flex-col gap-2 max-w-md">
            {[
              { label: "Email",    href: `mailto:${site.email}`, val: site.email },
              { label: "GitHub",   href: site.github,            val: "github.com/LucaMimmo05" },
              { label: "LinkedIn", href: site.linkedin,          val: "linkedin.com/in/lucamimmo" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 hover:border-[#38bdf8]/30 hover:bg-white/[0.04] transition-colors duration-200"
              >
                <span className="flex items-center gap-4 min-w-0">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/40 w-16 shrink-0">{s.label}</span>
                  <span className="text-sm text-white/75 group-hover:text-white truncate transition-colors duration-200">{s.val}</span>
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-white/35 group-hover:text-[#7dd3fc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
          <CvDownload className="mt-6" />
        </AnimateIn>

        {/* Right: form */}
        <AnimateIn delay={140}>
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-4 py-8 lg:pt-16">
              <div className="w-10 h-10 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/8 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-medium text-white/80">{t.contact.sent}</p>
              <button
                onClick={reset}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 mt-2"
              >
                ← {t.contact.another}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 lg:pt-16">
              {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>
              <input
                required
                type="text"
                placeholder={t.contact.name}
                aria-label={t.contact.name}
                name="name"
                autoComplete="name"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                disabled={status === "loading"}
              />
              <input
                required
                type="email"
                placeholder={t.contact.email}
                aria-label={t.contact.email}
                name="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                disabled={status === "loading"}
              />
              <textarea
                required
                rows={5}
                placeholder={t.contact.message}
                aria-label={t.contact.message}
                name="message"
                minLength={10}
                maxLength={5000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                disabled={status === "loading"}
              />

              {status === "limited" && (
                <p role="alert" className="text-sm text-amber-200/90">{t.contact.limited}</p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-red-300/90">
                  {t.contact.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-3 self-start inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-white/85 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t.contact.sending : t.contact.send}
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
