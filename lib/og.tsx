import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const accent = "#38bdf8";

async function fonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(dir, "Geist-Regular.ttf")),
    readFile(join(dir, "Geist-SemiBold.ttf")),
    readFile(join(dir, "GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

const frame = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  padding: "64px 72px",
  background: "#080808",
  color: "#fff",
  fontFamily: "Geist",
};

/** Mirrors the site hero: outlined SOFTWARE, gradient DEVELOPER. */
export async function renderHomeOg({ role, bio, open }: { role: string; bio: string; open: string }) {
  return new ImageResponse(
    (
      <div style={frame}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Luca Mimmo</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(56,189,248,0.75)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: accent }} />
            {open}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontWeight: 600, fontSize: 168, lineHeight: 0.88, letterSpacing: -6 }}>
          <span style={{ color: "#080808", WebkitTextStroke: "2px rgba(56,189,248,0.5)" }}>SOFTWARE</span>
          <span
            style={{
              backgroundImage: "linear-gradient(95deg, #38bdf8 0%, #7dd3fc 50%, #bae6fd 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            DEVELOPER.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 60 }}>
          <span style={{ fontSize: 24, lineHeight: 1.5, color: "rgba(255,255,255,0.4)", maxWidth: 620 }}>{bio}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span style={{ fontSize: 16, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{role}</span>
            <span style={{ fontFamily: "Geist Mono", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>lucamimmo.dev</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

/** Mirrors the project page header: index, big title, status/year, stack line. */
export async function renderProjectOg({
  num, title, status, year, desc, tags, path,
}: {
  num: string;
  title: string;
  status: string;
  year: string;
  desc: string;
  tags: readonly string[];
  path: string;
}) {
  return new ImageResponse(
    (
      <div style={frame}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Luca Mimmo</span>
          <span style={{ fontFamily: "Geist Mono", color: "rgba(56,189,248,0.6)" }}>{num}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={{ fontSize: 144, fontWeight: 600, letterSpacing: -5, lineHeight: 0.92 }}>{title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 20 }}>
            <span style={{ padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)" }}>
              {status}
            </span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>{year}</span>
          </div>
          <span style={{ fontSize: 26, lineHeight: 1.45, color: "rgba(255,255,255,0.45)", maxWidth: 940 }}>{desc}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 20,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{tags.slice(0, 5).join("  ·  ")}</span>
          <span style={{ fontFamily: "Geist Mono", color: "rgba(255,255,255,0.6)" }}>{path}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
