"use client";

import { useEffect, useRef, useState } from "react";

/** Splits a heading into words that slide up one after another when it enters the viewport. */
export function RevealWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <span
            className="word-reveal inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: visible ? "translateY(0)" : "translateY(110%)", transitionDelay: `${delay + i * 70}ms` }}
          >
            {word}
            {i < text.split(" ").length - 1 && " "}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Pointer handler that exposes the cursor position as --mx/--my, for the .spotlight glow. */
export function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Wrapper version of trackPointer for plain blocks. */
export function Spotlight({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  return (
    <Tag onPointerMove={trackPointer} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}

/** Thin sky-blue bar at the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd]" />
    </div>
  );
}
