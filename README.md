# lucamimmo.dev

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework** - Next.js 16 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS v4
- **Font** - Geist Sans
- **Deployment** - Vercel

## Features

- Dark design with a sky blue accent, glowing "stage" panels and per-section widths that hold up on large screens
- IT / EN localized routes (`/` Italian, `/en` English) with hreflang, choice remembered via cookie
- Case study pages (`/work/[slug]`): context, role, decisions, highlights, a desktop/tablet/mobile showcase and a click-to-zoom gallery
- Brand covers for each project built in code (logo, colours and type of each product)
- Motion: scroll reveals, word-by-word headings, cursor spotlight on cards, scroll progress bar and a navbar that hides on scroll; all off under `prefers-reduced-motion`
- Downloadable CV in Italian or English (`public/cv/`)
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter cards with generated images, JSON-LD (Person, WebSite, projects), `sitemap.xml`, `robots.txt`, web manifest
- Contact form via [Resend](https://resend.com) (`/api/contact`) with honeypot, minimum fill time, length/email validation, same-origin check and a per-IP rate limit
- Vercel Web Analytics

## Project Structure

```
proxy.ts                  # Locale routing (/ -> it, /en -> en)
app/
  [lang]/layout.tsx       # Root layout, site metadata, scroll progress
  [lang]/page.tsx         # Homepage
  [lang]/work/[slug]/     # Case study pages + OG images
  api/contact/route.ts    # Contact form endpoint
  sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx
  globals.css             # Keyframes, spotlight, reduced-motion rules
components/
  Navbar, Hero, Marquee, Work, About, Experience, Contact, Footer
  ProjectContent.tsx      # Case study layout (gallery, lightbox, devices)
  ProjectCover.tsx        # Brand covers used on the home cards
  CvDownload.tsx          # Language select + CV download
  ui.tsx                  # Shared pieces: stage background, Pill, BrowserFrame
  motion.tsx              # RevealWords, Spotlight, ScrollProgress
  AnimateIn.tsx           # Scroll reveal wrapper
context/LangContext.tsx   # i18n context
lib/
  translations.ts         # EN + IT copy (incl. SEO and case studies)
  site.ts                 # Site URL, socials, locale helpers
  jsonld.tsx              # Structured data
  og.tsx                  # Open Graph image templates
data/projects.ts          # Projects: order, links, screenshots, device shots
public/
  work/<slug>/            # Screenshots (WebP, 3x), logos and cover assets
  cv/                     # CV PDFs
assets/fonts/             # Geist fonts for OG images (OFL)
```

## Adding a project

1. Add an entry to `data/projects.ts` (slug, key, links, `images`, optional `devices`).
2. Add the matching copy under `projects.<key>` in both languages in `lib/translations.ts`; `gallery` captions follow the order of `images`.
3. Add a cover branch in `components/ProjectCover.tsx`.

Screenshots are served as-is (`unoptimized`), so export them as WebP at 16:10.

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
