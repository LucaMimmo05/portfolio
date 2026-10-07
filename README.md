# lucamimmo.dev

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework** - Next.js 16 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS v4
- **Font** - Geist Sans
- **Deployment** - Vercel

## Features

- Dark minimal design with sky blue accent
- IT / EN localized routes (`/` Italian, `/en` English) with hreflang, choice remembered via cookie
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter cards with generated images, JSON-LD (Person, WebSite, projects), `sitemap.xml`, `robots.txt`, web manifest
- Smooth scroll navigation with fixed navbar
- Scroll-triggered fade-in animations (IntersectionObserver)
- Individual project pages with highlights and tech stack
- Contact form via [Resend](https://resend.com) (`/api/contact`)
- Fully responsive

## Project Structure

```
proxy.ts                # Locale routing (/ → it, /en → en)
app/
  [lang]/layout.tsx     # Root layout + site metadata
  [lang]/page.tsx       # Homepage (all sections)
  [lang]/work/[slug]/   # Project pages + OG images
  api/contact/route.ts  # Contact form endpoint
  sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx
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
  translations.ts        # EN + IT strings (incl. SEO titles/descriptions)
  site.ts                # Site URL, socials, locale helpers
  jsonld.tsx             # Structured data
  og.tsx                 # Open Graph image template
data/
  projects.ts            # Project data and links
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends contact form emails |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (defaults to `https://lucamimmo.dev`) |
| `GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification token |

## Contact

[lucamimmo2005@outlook.it](mailto:lucamimmo2005@outlook.it) - [linkedin.com/in/lucamimmo](https://www.linkedin.com/in/lucamimmo/) - [github.com/LucaMimmo05](https://github.com/LucaMimmo05)
