// OG images are rendered by Satori, which only understands plain <img>; next/image does not apply here.
/* eslint-disable @next/next/no-img-element */
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

/** Mirrors the site hero: outlined SOFTWARE, gradient DEVELOPER. Kept sparse so it reads as a thumbnail. */
export async function renderHomeOg({ role, open }: { role: string; open: string }) {
  return new ImageResponse(
    (
      <div style={frame}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, color: "rgba(255,255,255,0.9)" }}>Luca Mimmo</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: accent }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: accent }} />
            {open}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontWeight: 600, fontSize: 176, lineHeight: 0.9, letterSpacing: -6 }}>
          <span style={{ color: "#080808", WebkitTextStroke: "4px rgba(56,189,248,0.85)" }}>SOFTWARE</span>
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{role}</span>
          <span style={{ fontFamily: "Geist Mono", fontSize: 34, color: "rgba(255,255,255,0.9)" }}>lucamimmo.dev</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

const dataUri = async (file: string, mime: string) =>
  `data:${mime};base64,${(await readFile(join(process.cwd(), "assets/og", file))).toString("base64")}`;

/**
 * Share image for a case study: the project's own brand cover (same idea as the home cards),
 * with a slim strip at the bottom saying whose project it is and where to read it.
 */
export async function renderCaseStudyOg({ projectKey, lang, label, path }: {
  projectKey: "devhub" | "pokemon" | "newmann";
  lang: "it" | "en";
  label: string;
  path: string;
}) {
  const light = projectKey === "newmann";
  const strip = (
    <div
      style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 74, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", fontSize: 22,
        background: light ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.35)",
        borderTop: light ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
        color: light ? "#1f2933" : "rgba(255,255,255,0.85)",
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ fontFamily: "Geist Mono", opacity: 0.8 }}>{path}</span>
    </div>
  );

  let body;
  if (projectKey === "devhub") {
    const logo = await dataUri("devhub-logo.svg", "image/svg+xml");
    const stats = [
      ["3", "Projects", "#3B82F6"],
      ["5", "Open Tasks", "#F59E0B"],
      ["2", "Notes", "#22C55E"],
      ["4", "Commands", "#A855F7"],
    ];
    body = (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 56, background: "#121924", paddingBottom: 74 }}>
        <img src={logo} width={620} height={124} alt="" />
        <div style={{ display: "flex", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "#171f2b" }}>
          {stats.map(([n, l, c], i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 26px", fontSize: 24, color: "#cbd5e1", borderLeft: i ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ width: 12, height: 12, borderRadius: 12, background: c }} />
              <span style={{ fontWeight: 600, color: "#fff" }}>{n}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (projectKey === "pokemon") {
    const [ball, ...types] = await Promise.all([
      dataUri("pokeball.png", "image/png"),
      dataUri("Fire.svg", "image/svg+xml"),
      dataUri("Water.svg", "image/svg+xml"),
      dataUri("Grass.svg", "image/svg+xml"),
      dataUri("Electric.svg", "image/svg+xml"),
    ]);
    const spots = [
      { left: 90, top: 70, size: 96 },
      { left: 1010, top: 60, size: 84 },
      { left: 140, top: 400, size: 80 },
      { left: 980, top: 390, size: 72 },
    ];
    body = (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, paddingBottom: 74, backgroundImage: "radial-gradient(circle at 50% 40%, #5a82d6, #3f63b8 60%, #2f4e98)" }}>
        {types.map((src, i) => (
          <img key={i} src={src} width={spots[i].size} height={spots[i].size} alt="" style={{ position: "absolute", left: spots[i].left, top: spots[i].top, opacity: 0.3 }} />
        ))}
        <img src={ball} width={300} height={300} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 136, fontWeight: 600, letterSpacing: -5, color: "#fff", lineHeight: 1 }}>Pokezone</span>
          <span style={{ marginTop: 14, fontSize: 30, color: "rgba(255,255,255,0.8)" }}>Angular · PokéAPI</span>
        </div>
      </div>
    );
  } else {
    const [wordmark, octopus] = await Promise.all([dataUri("newmann-wordmark.png", "image/png"), dataUri("newmann-octopus.png", "image/png")]);
    const copy = lang === "en" ? ["Reply to your emails in", "half the time"] : ["Rispondi alle email nella", "metà del tempo"];
    body = (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 138px", backgroundImage: "radial-gradient(circle at 100% 0%, rgba(34,151,153,0.22), rgba(247,247,247,0) 55%)", backgroundColor: "#f7f7f7" }}>
        <img src={octopus} width={520} height={474} alt="" style={{ position: "absolute", right: -60, bottom: -40, opacity: 0.08 }} />
        <img src={wordmark} width={420} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, color: "#2b2f33" }}>
          <span>{copy[0]}</span>
          <span style={{ color: "#229799" }}>{copy[1]}</span>
        </div>
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={{ ...frame, padding: 0, position: "relative" }}>
        {body}
        {strip}
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
