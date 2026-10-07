import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/context/LangContext";
import { translations } from "@/lib/translations";
import { alternatesFor, hasLocale, locales, ogLocale, site, siteUrl } from "@/lib/site";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { seo } = translations[lang];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.title, template: `%s — ${site.name}` },
    description: seo.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    keywords: [
      "Luca Mimmo",
      "web developer",
      "full-stack developer",
      "sviluppatore web",
      "sviluppatore full-stack",
      "React developer",
      "Next.js developer",
      "Java developer",
      "Spring Boot",
      "TypeScript",
      "portfolio",
      "Italy",
    ],
    alternates: alternatesFor(lang),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      title: seo.title,
      description: seo.description,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={geist.variable}>
      <body className="min-h-screen bg-[#080808] text-white antialiased">
        <LangProvider lang={lang}>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
