import Image from "next/image";
import { Onest, Quicksand } from "next/font/google";
import type { ProjectKey } from "@/data/projects";

// Newmann's public site is set in Quicksand
const quicksand = Quicksand({ subsets: ["latin"], weight: ["500", "600", "700"] });
// DevHub's UI is set in Onest
const onest = Onest({ subsets: ["latin"], weight: ["600"] });

/**
 * Brand covers built from each project's own logo, colours and type, all at 16:10.
 * Used on the home cards so every project reads as a consistent, compact tile.
 */
export default function ProjectCover({ projectKey, title, lang = "it", variant = "full" }: { projectKey: ProjectKey; title: string; lang?: "it" | "en"; variant?: "full" | "mark" }) {
  const base = "relative aspect-[16/10] w-full overflow-hidden rounded-[22px] md:rounded-[28px]";

  // Small thumbnail: just the brand mark on the brand colour, readable at any size
  if (variant === "mark") {
    const marks = {
      devhub: { bg: "#121924", img: "/work/devhub/logo.svg", w: 175, h: 35, size: "w-[72%]" },
      pokemon: { bg: "radial-gradient(70% 80% at 50% 40%, #5a82d6, #3f63b8 60%, #2f4e98)", img: "/work/pokemon-app/cover/pokeball.webp", w: 900, h: 900, size: "w-[44%]" },
      newmann: { bg: "#f7f7f7", img: "/work/newmann/logo-octopus.webp", w: 787, h: 717, size: "w-[44%]" },
    }[projectKey];
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center" style={{ background: marks.bg }}>
        <Image src={marks.img} alt={`${title} logo`} width={marks.w} height={marks.h} className={`${marks.size} h-auto`} />
      </div>
    );
  }

  if (projectKey === "devhub") {
    // DevHub's "ambient" hero surface (#0d1526, blue glow, fine 40px grid fading out) with its home
    // dashboard in a window frame. Sizes use container units so the tile scales as one image.
    const copy = lang === "en" ? ["Your dev work,", "in one place."] : ["Il tuo lavoro da dev,", "in un unico posto."];
    return (
      <div className={`${base} ${onest.className} @container`} style={{ background: "#0d1526" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 90% at 0% 0%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(ellipse 45% 70% at 100% 100%, rgba(57,211,83,0.08), transparent 60%)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

        <div className="absolute inset-y-0 left-[7%] w-[40%] flex flex-col justify-center">
          <Image src="/work/devhub/logo.svg" alt={`${title} logo`} width={175} height={35} className="w-[62%] h-auto" />
          <p className="mt-[5cqw] font-semibold leading-[1.12] tracking-[-0.02em] text-white" style={{ fontSize: "4.4cqw" }}>
            {copy[0]}
            <br />
            <span className="text-[#3B82F6]">{copy[1]}</span>
          </p>
        </div>

        <div className="absolute left-[50%] top-[15%] w-[80%] overflow-hidden rounded-[1.2cqw] border border-white/[0.12] bg-[#121924] shadow-[0_30px_80px_rgba(0,0,0,0.55)]" aria-hidden="true">
          <div className="flex h-[2.6cqw] items-center gap-[0.6cqw] pl-[1.2cqw] border-b border-white/[0.07] bg-[#151d2a]">
            {[0, 1, 2].map((i) => <span key={i} className="size-[0.9cqw] rounded-full bg-white/[0.14]" />)}
          </div>
          <Image src="/work/devhub/dashboard-16x10.webp" alt="" width={4320} height={2700} sizes="(min-width: 1024px) 40vw, 80vw" className="w-full h-auto" />
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
