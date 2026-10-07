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
        {/* No global cap: the hero spans the screen, every other section sets its own width */}
        <div>
          <Hero />
          <Marquee />
          <Work />
          <Marquee />
          <About />
          <Experience />
          <Contact />
        </div>
      </main>
      <div className="mx-auto w-full max-w-[1760px]">
        <Footer />
      </div>
    </>
  );
}
