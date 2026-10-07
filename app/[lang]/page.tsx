import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { JsonLd, homeJsonLd } from "@/lib/jsonld";
import { hasLocale } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <JsonLd data={homeJsonLd(lang)} />
      <Navbar />
      <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
        <Hero />
        <Marquee />
        <Work />
        <Marquee />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
