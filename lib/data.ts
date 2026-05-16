import type { Project, Testimonial } from "@/types";

/** Données de démonstration lorsque Supabase n'est pas configuré */
export const SEED_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "neon-pulse-brand",
    title: "Neon Pulse",
    category: "branding",
    excerpt: "Identité visuelle futuriste pour une marque tech lifestyle.",
    cover_image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    hero_image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    overview:
      "Création d'un univers de marque électrique mêlant néon, typographie bold et système modulaire.",
    problem: "La marque manquait de cohérence visuelle sur tous les touchpoints.",
    solution:
      "Système d'identité complet avec guidelines, assets motion et déclinaisons digitales.",
    process: "Research → Moodboards → Logo → Motion → Guidelines",
    color_palette: ["#050505", "#3B82F6", "#A855F7", "#F97316"],
    typography: "DM Sans + Inter",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&q=80",
    ],
    before_image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
    after_image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    featured: true,
    sort_order: 1,
  },
  {
    id: "2",
    slug: "cinematic-reel-2025",
    title: "Cinematic Reel",
    category: "motion-design",
    excerpt: "Showreel motion design avec transitions cinématiques.",
    cover_image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    hero_image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80",
    video_url: "https://youtu.be/n2PJYteTjKo",
    featured: true,
    sort_order: 2,
  },
  {
    id: "3",
    slug: "social-wave-campaign",
    title: "Social Wave",
    category: "social-media",
    excerpt: "Campagne social media haute énergie pour lancement produit.",
    cover_image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    featured: true,
    sort_order: 3,
  },
  {
    id: "4",
    slug: "midnight-poster-series",
    title: "Midnight Series",
    category: "posters",
    excerpt: "Série d'affiches typographiques en édition limitée.",
    cover_image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    sort_order: 4,
  },
  {
    id: "5",
    slug: "aura-packaging",
    title: "Aura Packaging",
    category: "packaging",
    excerpt: "Packaging premium avec finitions holographiques.",
    cover_image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    sort_order: 5,
  },
  {
    id: "6",
    slug: "flux-app-ui",
    title: "Flux App",
    category: "ui-ux",
    excerpt: "Interface mobile futuriste pour app fintech.",
    cover_image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    sort_order: 6,
  },
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Creative Director",
    company: "Studio Nova",
    content:
      "Chacross transforme chaque brief en une expérience visuelle mémorable. Son sens du motion et du détail est exceptionnel.",
    rating: 5,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Founder",
    company: "Pulse Tech",
    content:
      "Collaboration fluide, délais respectés, résultat au-delà de nos attentes. Un vrai talent international.",
    rating: 5,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Amélie Dubois",
    role: "Marketing Lead",
    company: "Luxe Co",
    content:
      "L'identité de marque qu'il a créée a propulsé notre présence digitale. Premium dans chaque pixel.",
    rating: 5,
    sort_order: 3,
  },
];

export async function getProjects(): Promise<Project[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return SEED_PROJECTS;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return SEED_PROJECTS;
    return data as Project[];
  } catch {
    return SEED_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return SEED_TESTIMONIALS;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return SEED_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return SEED_TESTIMONIALS;
  }
}
