import { HERO_SLIDES, type HeroSlide } from "@/utils/constants";
import { getProjects } from "@/lib/data";
import type { Project } from "@/types";

function projectToSlide(project: Project): HeroSlide {
  return {
    id: `project-${project.slug}`,
    image: project.hero_image || project.cover_image,
    title: project.title,
    subtitle: project.excerpt,
    href: `/projects/${project.slug}`,
  };
}

/** Slides custom en priorité ; sinon projets featured */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (HERO_SLIDES.length > 0) {
    return HERO_SLIDES;
  }

  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);

  const seen = new Set<string>();
  const slides: HeroSlide[] = [];

  for (const project of featured) {
    const key = project.slug;
    if (seen.has(key)) continue;
    seen.add(key);
    slides.push(projectToSlide(project));
  }

  return slides;
}
