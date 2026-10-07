import { translations } from "@/lib/translations";
import { hasLocale } from "@/lib/site";
import { ogSize, renderHomeOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Luca Mimmo, Software Developer";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[hasLocale(lang) ? lang : "it"];
  return renderHomeOg({ role: t.hero.role, open: t.hero.open });
}
