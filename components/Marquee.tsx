const skills = [
  "JavaScript", "TypeScript", "React", "Angular", "Next.js",
  "Vite", "TailwindCSS", "Java", "Spring Boot", "Node.js",
  "Express", "PostgreSQL", "MySQL", "MongoDB", "Git", "Figma",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-white/6 py-5 overflow-hidden">
      <div className="marquee-track">
        {[...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-sm font-medium text-white/40 px-6 tracking-wide whitespace-nowrap">
              {skill}
            </span>
            <span className="text-[#38bdf8] opacity-40 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
