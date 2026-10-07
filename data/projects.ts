import type { translations } from "@/lib/translations";

export type ProjectKey = keyof (typeof translations)["en"]["projects"];

/** Screenshot in /public; its alt text lives in translations (`gallery`, same order). */
export type ProjectImage = { src: string; width: number; height: number };

export type Project = {
  slug: string;
  key: ProjectKey;
  num: string;
  title: string;
  year: string;
  tags: string[];
  links?: { label: string; href: string }[];
  images: ProjectImage[];
  /** Same screen on desktop, tablet (768px) and mobile (390px), for the responsive showcase. */
  devices?: { desktop: ProjectImage; tablet: ProjectImage; mobile: ProjectImage };
};

export const projects: Project[] = [
  {
    slug: "newmann",
    key: "newmann",
    num: "01",
    title: "Newmann",
    year: "2026",
    tags: ["Spring Boot", "Java", "Next.js", "REST API", "OAuth2", "Gmail API", "Microsoft Graph", "Stripe"],
    links: [
      { label: "Website", href: "https://newmann.ai" },
    ],
    images: [
      { src: "/work/newmann/app-dashboard-v2.webp", width: 4320, height: 2700 },
      { src: "/work/newmann/app-labels-v2.webp", width: 4320, height: 2700 },
      { src: "/work/newmann/app-assistant-v3.webp", width: 3300, height: 2064 },
      { src: "/work/newmann/app-rule-v3.webp", width: 3360, height: 2100 },
      { src: "/work/newmann/app-drafts-v3.webp", width: 3552, height: 2220 },
    ],
    devices: {
      desktop: { src: "/work/newmann/home.webp", width: 4320, height: 2700 },
      tablet: { src: "/work/newmann/tablet.webp", width: 2304, height: 3072 },
      mobile: { src: "/work/newmann/mobile.webp", width: 1170, height: 2532 },
    },
  },
  {
    slug: "devhub",
    key: "devhub",
    num: "02",
    title: "DevHub",
    year: "2025",
    tags: ["React", "Vite", "TypeScript", "Quarkus", "Java", "PostgreSQL", "Redis"],
    links: [
      { label: "GitHub FE", href: "https://github.com/LucaMimmo05/devhub-fe" },
      { label: "GitHub BE", href: "https://github.com/LucaMimmo05/devhub-be" },
      { label: "Live", href: "https://devhub-fe.vercel.app/" },
    ],
    images: [
      { src: "/work/devhub/dashboard-16x10.webp", width: 4320, height: 2700 },
      { src: "/work/devhub/note-16x10.webp", width: 2520, height: 1575 },
      { src: "/work/devhub/palette-16x10.webp", width: 2040, height: 1275 },
      { src: "/work/devhub/projects-16x10.webp", width: 3360, height: 2100 },
    ],
    devices: {
      desktop: { src: "/work/devhub/dashboard-16x10.webp", width: 4320, height: 2700 },
      tablet: { src: "/work/devhub/tablet-responsive.webp", width: 2304, height: 3072 },
      mobile: { src: "/work/devhub/mobile-responsive.webp", width: 1170, height: 2532 },
    },
  },
  {
    slug: "pokemon-app",
    key: "pokemon",
    num: "03",
    title: "Pokezone",
    year: "2025",
    tags: ["Angular", "TypeScript", "PokéAPI", "ApexCharts"],
    links: [
      { label: "GitHub", href: "https://github.com/LucaMimmo05/pokezone" },
      { label: "Live", href: "https://pokezone-phi.vercel.app/" },
    ],
    images: [
      { src: "/work/pokemon-app/home.webp", width: 4320, height: 2700 },
      { src: "/work/pokemon-app/dashboard.webp", width: 4320, height: 2700 },
      { src: "/work/pokemon-app/detail.webp", width: 4320, height: 2700 },
    ],
    devices: {
      desktop: { src: "/work/pokemon-app/home.webp", width: 4320, height: 2700 },
      tablet: { src: "/work/pokemon-app/tablet.webp", width: 2304, height: 3072 },
      mobile: { src: "/work/pokemon-app/mobile.webp", width: 1170, height: 2532 },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
