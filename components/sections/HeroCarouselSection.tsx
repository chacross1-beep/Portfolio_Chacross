import { getHeroSlides } from "@/lib/hero-slides";
import { HeroCarousel } from "./HeroCarousel";

export async function HeroCarouselSection() {
  const slides = await getHeroSlides();
  return <HeroCarousel slides={slides} />;
}
