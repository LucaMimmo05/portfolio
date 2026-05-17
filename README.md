# lucamimmo.dev

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Font** — Geist Sans
- **Deployment** — Vercel

## Features

- Dark minimal design with sky blue accent
- EN / IT language toggle (persisted in localStorage)
- Smooth scroll navigation with fixed navbar
- Scroll-triggered fade-in animations (IntersectionObserver)
- Individual project pages with highlights and tech stack
- Contact form via `mailto:`
- Fully responsive

## Project Structure

```
app/
  page.tsx              # Homepage (all sections)
  work/[slug]/page.tsx  # Individual project pages
  layout.tsx
  globals.css
components/
  Navbar.tsx
  Hero.tsx
  Marquee.tsx
  Work.tsx
  About.tsx
  Experience.tsx
  Contact.tsx
  Footer.tsx
  AnimateIn.tsx
context/
  LangContext.tsx        # i18n context
lib/
  translations.ts        # EN + IT strings
data/
  projects.ts            # Project data and links
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact

[lucamimmo2005@outlook.it](mailto:lucamimmo2005@outlook.it) — [linkedin.com/in/lucamimmo](https://www.linkedin.com/in/lucamimmo/) — [github.com/LucaMimmo05](https://github.com/LucaMimmo05)
