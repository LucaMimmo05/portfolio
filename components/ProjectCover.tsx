import Image from "next/image";
import { Quicksand } from "next/font/google";
import type { ProjectKey } from "@/data/projects";

// Newmann's public site is set in Quicksand
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "600", "700"] });

/**
 * Brand covers built from each project's own logo, colours and type, all at 16:10.
 * Used on the home cards so every project reads as a consistent, compact tile.
 */
export default function ProjectCover({ projectKey, title, lang = "it" }: { projectKey: ProjectKey; title: string; lang?: "it" | "en" }) {
  const base = "relative aspect-[16/10] w-full overflow-hidden rounded-[22px] md:rounded-[28px]";

  if (projectKey === "devhub") {
    // DevHub's own palette: app background #121924, cards #171f2b, blue accent #3B82F6
    const stats = [
      { n: 3, label: "Projects", color: "#3B82F6", d: "M3 7h6l2 2h10v10H3z" },
      { n: 5, label: "Open Tasks", color: "#F59E0B", d: "M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10" },
      { n: 2, label: "Notes", color: "#22C55E", d: "M6 3h9l4 4v14H6zM9 12h6M9 16h6" },
      { n: 4, label: "Commands", color: "#A855F7", d: "M4 17l6-5-6-5M12 19h8" },
    ];
    return (
      <div className={base} style={{ background: "#121924" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[9%] px-[7%]">
          <Image src="/work/devhub/logo.svg" alt={`${title} logo`} width={175} height={35} className="w-[50%] h-auto" />
          <div className="flex items-stretch rounded-xl border border-white/[0.07] bg-[#171f2b] divide-x divide-white/[0.07]" aria-hidden="true">
            {stats.map((st) => (
              <span key={st.label} className="flex items-center gap-1.5 px-2.5 md:px-3.5 py-2 text-[10px] md:text-xs text-[#cbd5e1] whitespace-nowrap">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={st.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={st.d} /></svg>
                <b className="font-semibold text-white">{st.n}</b>
                <span className="hidden sm:inline">{st.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (projectKey === "pokemon") {
    const types = [
      { name: "Fire", style: "left-[8%] top-[14%] w-[9%] rotate-[-12deg]" },
      { name: "Water", style: "right-[9%] top-[12%] w-[8%] rotate-[10deg]" },
      { name: "Grass", style: "left-[12%] bottom-[16%] w-[8%] rotate-[8deg]" },
      { name: "Electric", style: "right-[14%] bottom-[18%] w-[7%] rotate-[-8deg]" },
      { name: "Psychic", style: "left-[30%] top-[8%] w-[6%] rotate-[14deg]" },
      { name: "Dragon", style: "right-[30%] bottom-[8%] w-[7%] rotate-[-10deg]" },
    ];
    return (
      <div className={base} style={{ background: "radial-gradient(70% 80% at 50% 40%, #5a82d6, #3f63b8 60%, #2f4e98)" }}>
        {types.map((type) => (
          <Image
            key={type.name}
            src={`/work/pokemon-app/cover/${type.name}.svg`}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className={`absolute h-auto opacity-30 ${type.style}`}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center gap-[4%] px-[8%]">
          <Image src="/work/pokemon-app/cover/pokeball.webp" alt="" width={900} height={900} aria-hidden="true" className="w-[30%] h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]" />
          <div className="flex flex-col">
            <span className="font-semibold tracking-[-0.03em] text-white leading-none" style={{ fontSize: "clamp(1.6rem, 4.4vw, 3.6rem)" }}>
              Pokezone
            </span>
            <span className="mt-2 text-[11px] md:text-sm font-medium text-white/75">Angular · PokéAPI</span>
          </div>
        </div>
      </div>
    );
  }

  // Newmann's design system: light #f7f7f7 surfaces, teal #229799, Quicksand
  const copy = lang === "en"
    ? { a: "Reply to your emails in", b: "half the time", chips: ["Read only", "To reply"] }
    : { a: "Rispondi alle email nella", b: "metà del tempo", chips: ["Solo lettura", "Da rispondere"] };
  return (
    <div className={`${base} ${quicksand.className}`} style={{ background: "radial-gradient(70% 90% at 100% 0%, rgba(34,151,153,0.16), transparent 60%), #f7f7f7" }}>
      {/* Big faint octopus, like the shapes behind newmann.ai's hero */}
      <Image src="/work/newmann/logo-octopus.webp" alt="" aria-hidden="true" width={787} height={717} className="absolute -right-[8%] -bottom-[14%] w-[52%] h-auto opacity-[0.08]" />
      <div className="absolute inset-0 flex flex-col justify-between p-[7%]">
        <Image src="/work/newmann/logo-wordmark.webp" alt={`${title} logo`} width={1330} height={316} className="w-[34%] h-auto" />
        <p className="font-medium text-[#2b2f33] leading-[1.08] tracking-[-0.02em]" style={{ fontSize: "clamp(1.25rem, 3.4vw, 2.6rem)" }}>
          {copy.a}
          <br />
          <span className="text-[#229799]">{copy.b}</span>
        </p>
        <div className="flex flex-wrap gap-2" aria-hidden="true">
          {copy.chips.map((chip, i) => (
            <span
              key={chip}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] md:text-xs font-semibold ${
                i < 2 ? "border-[#229799]/30 bg-[#229799]/10 text-[#1b7878]" : "border-[#3b82f6]/25 bg-[#3b82f6]/10 text-[#2563eb]"
              }`}
            >
              {i < 2 && <Image src="/work/newmann/logo-octopus.webp" alt="" width={787} height={717} className="w-3 h-auto" />}
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
