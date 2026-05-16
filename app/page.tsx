import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarouselSection } from "@/components/sections/HeroCarouselSection";
import { Showreel } from "@/components/sections/Showreel";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/seo/StructuredData";
import { getProjects } from "@/lib/data";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <StructuredData />
      <Header variant="overlay" />
      <main>
        <HeroCarouselSection />
        <Showreel />
        <About />
        <Portfolio projects={projects} />
        <ClientLogos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
