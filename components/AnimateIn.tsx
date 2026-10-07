"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "up" | "fade" | "scale";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  variant?: Variant;
}

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-8 blur-[6px]",
  fade: "opacity-0 blur-[4px]",
  scale: "opacity-0 scale-[0.96] blur-[6px]",
};

/** Reveals its children once they scroll into view: rises, fades and comes into focus. */
export default function AnimateIn({ children, className = "", delay = 0, threshold = 0.12, variant = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`reveal transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "opacity-100 translate-y-0 scale-100 blur-0" : hidden[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
