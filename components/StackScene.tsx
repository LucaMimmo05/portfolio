"use client";
import { useEffect, useRef, useState } from "react";

type Labels = { ui: string; api: string; data: string };

const EASE = "cubic-bezier(0.32,0.72,0,1)";
const LOOP_MS = 6500;

// One request, as it would show up in a trace. Delays are synced with the beam and the layer pings.
const TRACE = [
  { at: 1.2, tag: "UI", text: "GET /api/labels", tone: "text-white/85" },
  { at: 1.75, tag: "API", text: "JWT ok · LabelService", tone: "text-white/70" },
  { at: 2.2, tag: "DB", text: "SELECT … 13 rows", tone: "text-white/70" },
  { at: 3.5, tag: "200", text: "OK · 42 ms", tone: "text-emerald-300" },
];

/**
 * Isometric full-stack: interface, API and data as three glass planes.
 * The planes separate on load, then a request runs down to the database and back on a loop,
 * lighting each layer and writing its steps into a small trace. Click the trace to send one now.
 */
export default function StackScene({ labels, ariaLabel, replayLabel }: { labels: Labels; ariaLabel: string; replayLabel: string }) {
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(640);
  const scene = useRef<HTMLDivElement>(null);

  // Layer spacing scales with the scene, so the stack keeps its proportions on phones
  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Open on load, then replay the request on a loop while the scene is on screen
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = setTimeout(() => { setOpen(true); setRun(1); }, 350);
    if (reduced) return () => clearTimeout(start);
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (scene.current) io.observe(scene.current);
    const loop = setInterval(() => { if (visible && !document.hidden) setRun((n) => n + 1); }, LOOP_MS);
    return () => { clearTimeout(start); clearInterval(loop); io.disconnect(); };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = scene.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * -8 });
  };

  const G = Math.round(width * 0.26);
  const gap = open ? 1 : 0;
  const planes = [
    { key: "ui", z: G * gap, label: labels.ui, tech: "React · Next.js", delay: "1.3s" },
    { key: "api", z: 0, label: labels.api, tech: "Spring Boot · Quarkus", delay: "1.75s" },
    { key: "data", z: -G * gap, label: labels.data, tech: "PostgreSQL · Redis", delay: "2.2s" },
  ];

  return (
    <div className="relative">
      <div
        ref={scene}
        role="img"
        aria-label={ariaLabel}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative w-full aspect-square select-none"
        style={{ perspective: "1800px" }}
      >
        <div
          className="absolute inset-[21%]"
          style={{ transformStyle: "preserve-3d", transform: `rotateX(${58 + tilt.y}deg) rotateZ(${-42 + tilt.x}deg)`, transition: `transform 0.9s ${EASE}` }}
        >
          {/* The request: a beam running through the centre of all three planes */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 w-[3px] -ml-[1.5px] overflow-hidden rounded-full bg-[#38bdf8]/15"
            style={{ height: `${2 * G * gap}px`, transformOrigin: "top", transform: `translateZ(${G * gap}px) rotateX(-90deg)`, transition: `height 1.2s ${EASE}, transform 1.2s ${EASE}` }}
          >
            {run > 0 && <div key={run} className="stack-packet absolute left-0 right-0 h-10 rounded-full" />}
          </div>

          {planes.map((p) => (
            <div
              key={p.key}
              className="absolute inset-0 rounded-[22px] overflow-hidden"
              style={{
                transform: `translateZ(${p.z}px)`,
                transition: `transform 1.4s ${EASE}`,
                background: "linear-gradient(145deg, rgba(26,48,70,0.78), rgba(10,18,28,0.74))",
                boxShadow: "inset 0 0 0 1px rgba(125,211,252,0.24), inset 0 1px 0 rgba(255,255,255,0.14), 0 40px 80px -40px rgba(0,0,0,0.9)",
              }}
            >
              {/* Glass sheen */}
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%)" }} />
              {run > 0 && <div key={run} aria-hidden="true" className="stack-ping absolute inset-0 rounded-[22px]" style={{ animationDelay: p.delay }} />}
              <div className="absolute left-5 top-4 flex items-baseline gap-3">
                <span className="text-[15px] font-semibold text-white">{p.label}</span>
                <span className="text-[11px] text-[#7dd3fc]/80">{p.tech}</span>
              </div>
              {p.key === "ui" && (
                <div className="absolute inset-x-5 bottom-5 top-12 flex gap-3" aria-hidden="true">
                  <div className="w-1/4 rounded-lg bg-white/[0.05] p-2 space-y-1.5">
                    {[0, 1, 2, 3].map((i) => <div key={i} className={`h-2 rounded ${i === 0 ? "bg-[#38bdf8]/60" : "bg-white/10"}`} />)}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => <div key={i} className="rounded-lg bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />)}
                  </div>
                </div>
              )}
              {p.key === "api" && (
                <div className="absolute inset-x-5 bottom-5 top-12 flex flex-col justify-center gap-2 font-mono text-[11px]" aria-hidden="true">
                  {[["GET", "/api/labels", "200"], ["POST", "/api/rules", "201"], ["PUT", "/api/drafts/42", "200"]].map(([m, path, code]) => (
                    <div key={path} className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2 py-1.5">
                      <span className="text-[#7dd3fc]">{m}</span>
                      <span className="text-white/75">{path}</span>
                      <span className="ml-auto text-emerald-300/90">{code}</span>
                    </div>
                  ))}
                </div>
              )}
              {p.key === "data" && (
                <div className="absolute inset-x-5 bottom-5 top-12 flex flex-col justify-center gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="grid grid-cols-[1fr_2fr_1fr] gap-1.5">
                      {[0, 1, 2].map((j) => <div key={j} className={`h-2.5 rounded ${i === 0 ? "bg-[#38bdf8]/35" : "bg-white/10"}`} />)}
                    </div>
                  ))}
                  <div className="mt-1 font-mono text-[11px] text-white/60">otp:verify:{"{email}"} · TTL 300</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live trace of the request, in sync with the beam; click to send one now */}
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        aria-label={replayLabel}
        title={replayLabel}
        className="hidden sm:block absolute left-0 bottom-[2%] lg:-left-[4%] w-[250px] rounded-[18px] p-1 bg-white/[0.04] ring-1 ring-white/10 text-left transition-transform duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ transitionTimingFunction: EASE }}
      >
        <div className="rounded-[14px] bg-[#0b1118]/95 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              trace
            </span>
            <span className="text-[10px] text-white/35 font-mono">#{String(1000 + run).slice(-4)}</span>
          </div>
          <ol key={run} className="space-y-1 font-mono text-[11px]">
            {TRACE.map((row) => (
              <li key={row.tag} className="trace-row flex items-center gap-2" style={{ animationDelay: `${row.at}s` }}>
                <span className={`w-9 shrink-0 ${row.tag === "200" ? "text-emerald-300" : "text-[#7dd3fc]"}`}>{row.tag}</span>
                <span className={`truncate ${row.tone}`}>{row.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </button>
    </div>
  );
}
