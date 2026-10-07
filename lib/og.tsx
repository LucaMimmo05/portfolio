import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOg({ eyebrow, title, subtitle, tags = [] }: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: readonly string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#080808",
          backgroundImage: "radial-gradient(circle at 90% 0%, rgba(56,189,248,0.18), transparent 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.45)", letterSpacing: 4, textTransform: "uppercase" }}>
          <span>{eyebrow}</span>
          <span style={{ color: "#38bdf8" }}>lucamimmo.dev</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1, color: "#7dd3fc" }}>{title}</div>
          <div style={{ fontSize: 36, color: "rgba(255,255,255,0.6)", lineHeight: 1.35, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {tags.slice(0, 6).map((tag) => (
            <span key={tag} style={{ fontSize: 24, padding: "8px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
