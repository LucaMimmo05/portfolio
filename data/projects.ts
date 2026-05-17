export type Project = {
  slug: string;
  num: string;
  title: string;
  status: "In Progress" | "Completed" | "Active";
  year: string;
  shortDesc: string;
  overview: string;
  tags: string[];
  highlights: { label: string; description: string }[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "devhub",
    num: "01",
    title: "DevHub",
    status: "In Progress",
    year: "2024",
    shortDesc: "Full-stack personal developer dashboard.",
    overview:
      "DevHub is a full-stack developer productivity platform. The frontend is built with React 19 and Vite, the backend is a Quarkus 3 REST API on Java 21 with PostgreSQL, Redis, and JWT authentication. Everything a developer needs — projects, tasks, notes, CLI snippets — in one place.",
    tags: ["React", "Vite", "TypeScript", "Quarkus", "Java", "PostgreSQL", "Redis"],
    links: [
      { label: "GitHub FE", href: "https://github.com/LucaMimmo05/devhub-fe" },
      { label: "GitHub BE", href: "https://github.com/LucaMimmo05/devhub-be" },
    ],
    highlights: [
      {
        label: "Auth with OTP",
        description:
          "Email-based registration and login with OTP verification via Gmail SMTP. HttpOnly cookie JWT (RS256), password reset flow, and token blacklist in Redis.",
      },
      {
        label: "Project & task management",
        description:
          "Create projects with priority levels, status tracking, and team collaboration. Tasks scoped per project with filtering and real-time dashboard stats.",
      },
      {
        label: "Markdown notes & CLI snippets",
        description:
          "Markdown editor with live preview for structured notes. CLI snippet storage with quick-copy — no more hunting through shell history.",
      },
      {
        label: "Command palette",
        description:
          "Global Ctrl+K command palette for instant navigation across the entire dashboard without touching the mouse.",
      },
    ],
  },
  {
    slug: "pokemon-app",
    num: "02",
    title: "Pokémon App",
    status: "Completed",
    year: "2024",
    shortDesc: "Interactive Pokédex web application.",
    overview:
      "An interactive Pokédex built with Angular and TypeScript, powered by the PokéAPI. The app lets users browse the complete Pokémon database, search by name or ID in real time, filter by type, and dive into detailed stats for each Pokémon. A clean, fast interface designed to make exploring data enjoyable.",
    tags: ["Angular", "TypeScript", "PokéAPI"],
    links: [
      { label: "GitHub", href: "https://github.com/LucaMimmo05/pokezone" },
      { label: "Live", href: "https://pokezone-phi.vercel.app/" },
    ],
    highlights: [
      {
        label: "Full Pokédex",
        description:
          "Browse the complete database of Pokémon with names, types, images, and base stats. Paginated for performance.",
      },
      {
        label: "Real-time search",
        description:
          "Instant search by name or Pokédex ID — no submit button, no delay. Results update as you type.",
      },
      {
        label: "Type filtering",
        description:
          "Filter the entire roster by Pokémon type. Multi-type combinations handled correctly.",
      },
      {
        label: "Detail pages",
        description:
          "Click any Pokémon to see a full breakdown: base stats, abilities, height, weight, and evolution chain.",
      },
    ],
  },
  {
    slug: "newmann",
    num: "03",
    title: "Newmann",
    status: "Active",
    year: "2026",
    shortDesc: "Founding Engineer — full-stack SaaS product.",
    overview:
      "Newmann is the product I'm helping build as a Founding Software Engineer. I'm responsible for the full technical stack: Next.js frontend with REST API integration and OAuth2 authentication, backend architecture, JWT-based security, and integration with AI services and external cloud providers. Working fully remote from Italy.",
    tags: ["Next.js", "Java", "Spring Boot", "JWT", "OAuth2", "AI Services", "Cloud"],
    links: [],
    highlights: [
      {
        label: "Frontend architecture",
        description:
          "Built the Next.js frontend from scratch — routing, state management, REST API integration, and OAuth2 authentication flows.",
      },
      {
        label: "Backend & security",
        description:
          "Designed the backend architecture with a focus on security. JWT-based auth, role management, and secure API contracts.",
      },
      {
        label: "AI & cloud integrations",
        description:
          "Integrated third-party AI services and external cloud providers. Handled async workflows, error boundaries, and API abstraction layers.",
      },
      {
        label: "Founding engineer role",
        description:
          "As the founding engineer, I make architecture decisions, write production code, and shape the technical direction of the product.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
