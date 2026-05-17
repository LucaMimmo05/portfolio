import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Work />
      <Marquee />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
