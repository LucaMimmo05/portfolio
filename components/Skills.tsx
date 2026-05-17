import AnimateIn from "@/components/AnimateIn";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/25">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/6" />
    </div>
  );
}

const skillGroups = [
  {
    category: "Frontend",
    dot: "bg-blue-400",
    label: "text-blue-300/60",
    skills: ["JavaScript", "TypeScript", "React", "Angular", "Next.js", "Vite", "TailwindCSS"],
  },
  {
    category: "Backend",
    dot: "bg-orange-400",
    label: "text-orange-300/60",
    skills: ["Node.js", "Express", "Java", "Quarkus", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Tools",
    dot: "bg-emerald-400",
    label: "text-emerald-300/60",
    skills: ["Git", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 pb-28 max-w-5xl mx-auto">
      <AnimateIn>
        <SectionLabel>Skills</SectionLabel>
      </AnimateIn>

      <div className="mt-12 space-y-8">
        {skillGroups.map((group, gi) => (
          <AnimateIn key={group.category} delay={gi * 80}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
              <div className="flex items-center gap-2 w-28 shrink-0 pt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${group.dot} opacity-60`} />
                <span className={`text-xs font-medium uppercase tracking-widest ${group.label}`}>
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <AnimateIn key={skill} delay={gi * 80 + si * 40}>
                    <span className="px-3.5 py-1.5 text-sm text-white/50 border border-white/7 rounded-full bg-white/[0.015] hover:border-white/18 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200 cursor-default">
                      {skill}
                    </span>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
