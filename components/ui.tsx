import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

/** Soft sky glow used behind every "stage" panel: the dark take on a cloudy gradient. */
export const stageBg = {
  background: [
    "radial-gradient(70% 55% at 50% 0%, rgba(56,189,248,0.20), transparent 70%)",
    "radial-gradient(35% 40% at 88% 25%, rgba(125,211,252,0.10), transparent 70%)",
    "radial-gradient(35% 40% at 10% 70%, rgba(56,189,248,0.07), transparent 70%)",
    "linear-gradient(180deg, #0c1824 0%, #090d12 60%, #080808 100%)",
  ].join(", "),
};

export const icons = [
  // layers
  <path key="a" d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 16l9 5 9-5" />,
  // shield
  <path key="b" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  // bolt
  <path key="c" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  // code
  <path key="d" d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
];

export const label = "text-[11px] tracking-[0.2em] uppercase text-white/40";

/** Small rounded label that opens each section. */
export function Pill({ children, as: Tag = "span" }: { children: React.ReactNode; as?: "span" | "div" }) {
  return (
    <Tag className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/[0.07] px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase text-[#7dd3fc]">
      <span className="w-1 h-1 rounded-full bg-[#38bdf8]" aria-hidden="true" />
      {children}
    </Tag>
  );
}

export function BrowserFrame({ image, alt, url, sizes, priority }: {
  image: ProjectImage;
  alt: string;
  url: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_40px_120px_-30px_rgba(56,189,248,0.35)]">
      <div className="flex items-center gap-3 px-4 h-9 border-b border-white/[0.06] bg-white/[0.03]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[11px] text-white/40 font-mono">
            {url}
          </span>
        )}
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {/* Every screenshot is shown at the same 16:10 ratio, cropped from the top */}
      <div className="relative aspect-[16/10] bg-[#0b1018]">
        {/* Served as-is: the source WebPs are already small, and skipping re-encoding keeps UI text crisp */}
        <Image src={image.src} fill alt={alt} sizes={sizes} priority={priority} unoptimized className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Host + path of a project's live link (falls back to its first link), shown in the fake address bar. */
export function hostOf(links: readonly { href: string }[]) {
  const live = links.find((l) => !l.href.includes("github.com")) ?? links[0];
  if (!live) return "";
  try {
    const url = new URL(live.href);
    return (url.host + url.pathname).replace(/\/$/, "");
  } catch {
    return live.href;
  }
}
