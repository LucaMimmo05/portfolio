"use client";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import AnimateIn from "@/components/AnimateIn";

type Status = "idle" | "loading" | "sent" | "error";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "sent" : "error");
  };

  const reset = () => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/10 py-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#38bdf8]/40 transition-colors duration-200";

  return (
    <section id="contact" className="px-6 md:px-10 py-32 border-t border-white/6">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-3">{t.contact.label}</p>
        <div className="w-8 h-px mb-20" style={{ background: "linear-gradient(90deg, #38bdf8, transparent)" }} />
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        {/* Left: heading + links */}
        <AnimateIn delay={60}>
          <h2
            className="font-semibold text-white leading-[1.04] tracking-tight mb-10"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {t.contact.label === "Get in touch"
              ? <>Let&apos;s build<br /><span className="text-white/30">something together.</span></>
              : <>Costruiamo<br /><span className="text-white/30">qualcosa insieme.</span></>}
          </h2>

          <div className="flex flex-col items-start gap-1 pt-2">
            {[
              { label: "Email",    href: "mailto:lucamimmo2005@outlook.it", val: "lucamimmo2005@outlook.it" },
              { label: "GitHub",   href: "https://github.com/LucaMimmo05",         val: "github.com/LucaMimmo05" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/lucamimmo/", val: "linkedin.com/in/lucamimmo" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-4 py-4"
              >
                <span className="text-xs uppercase tracking-widest text-white/22 w-16 shrink-0">{s.label}</span>
                <span className="text-sm text-white/40 group-hover:text-white/75 transition-colors duration-200">{s.val} ↗</span>
              </a>
            ))}
          </div>
        </AnimateIn>

        {/* Right: form */}
        <AnimateIn delay={140}>
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-4 py-8">
              <div className="w-10 h-10 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/8 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-medium text-white/80">{t.contact.sent}</p>
              <button
                onClick={reset}
                className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200 mt-2"
              >
                ← {t.contact.label === "Get in touch" ? "Send another" : "Invia un altro"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                required
                type="text"
                placeholder={t.contact.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                disabled={status === "loading"}
              />
              <input
                required
                type="email"
                placeholder={t.contact.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                disabled={status === "loading"}
              />
              <textarea
                required
                rows={5}
                placeholder={t.contact.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                disabled={status === "loading"}
              />

              {status === "error" && (
                <p className="text-xs text-red-400/70">
                  {t.contact.label === "Get in touch"
                    ? "Something went wrong. Try again or email me directly."
                    : "Qualcosa è andato storto. Riprova o scrivimi direttamente."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 self-start px-6 py-3 text-sm font-medium rounded-full bg-[#38bdf8] text-black hover:bg-[#7dd3fc] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
