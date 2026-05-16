import type { ProjectCategory } from "@/types";

export const SITE = {
  name: "Chacross Mafuala",
  title: "Chacross Mafuala — Designer graphique & motion",
  description:
    "Portfolio premium de Chacross Mafuala — designer graphique et motion designer. Branding, motion design, UI/UX et expériences visuelles cinématiques.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chacrossmafuala.vercel.app",
  email: "hello@chacrossmafuala.com",
  whatsapp: "+243000000000",
  social: {
    facebook: "https://facebook.com/chacrossmafuala",
    instagram: "https://instagram.com/chacrossmafuala",
    behance: "https://behance.net/chacrossmafuala",
    tiktok: "https://tiktok.com/@chacrossmafuala",
    linkedin: "https://linkedin.com/in/chacrossmafuala",
  },
  showreel: "https://youtu.be/n2PJYteTjKo?si=rPgUF-ZXiEFQu9YR",
} as const;

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  branding: "Branding",
  "motion-design": "Motion Design",
  "social-media": "Réseaux sociaux",
  posters: "Affiches",
  packaging: "Packaging",
  "ui-ux": "UI/UX",
};

export interface ClientLogo {
  id: string;
  name: string;
  logo?: string;
  /** mono = blanc via invert ; color = couleurs d'origine */
  display?: "mono" | "color";
}

/** Logos clients — fichiers dans public/clients/ */
export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "/clients/logo-amazon.svg",
    display: "color",
  },
  { id: "apple", name: "Apple", logo: "/clients/apple-svgrepo-com.svg" },
  { id: "emirates", name: "Emirates", logo: "/clients/emirates-1.svg" },
  {
    id: "leroy-merlin",
    name: "Leroy Merlin",
    logo: "/clients/leroy-merlin.svg",
    display: "color",
  },
  {
    id: "nestle",
    name: "Nestlé Kit Kat",
    logo: "/clients/nestle-kit-kat-logo-1.svg",
    display: "color",
  },
  {
    id: "google-play",
    name: "Google Play",
    logo: "/clients/google-play-store-svgrepo-com.svg",
    display: "color",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    logo: "/clients/twitter-logo-thin-svgrepo-com.svg",
  },
  {
    id: "adobe-indesign",
    name: "Adobe InDesign",
    logo: "/clients/adobe-indesign.svg",
  },
  { id: "adidas", name: "Adidas", logo: "/clients/adidas2.svg" },
  { id: "adidas-7", name: "Adidas", logo: "/clients/adidas-7.svg" },
  {
    id: "adidas-equipment",
    name: "Adidas Equipment",
    logo: "/clients/adidas-equipment-34127.svg",
  },
  { id: "nike-270", name: "Nike", logo: "/clients/nike-270.svg" },
  { id: "nike-acg", name: "Nike ACG", logo: "/clients/nike-acg.svg" },
  { id: "nike-react", name: "Nike React", logo: "/clients/nike-react-2.svg" },
];

export const DEFAULT_STATS = {
  projects: 120,
  clients: 45,
  years: 12,
};

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  href?: string;
}

/** Slides custom du Hero — prioritaires sur les projets featured */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=85",
    title: "Chacross Mafuala",
    subtitle: "Designer graphique & motion designer",
    href: "#portfolio",
  },
  {
    id: "slide-2",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85",
    title: "Motion & cinéma",
    subtitle: "Expériences visuelles immersives",
    href: "#showreel",
  },
  {
    id: "slide-3",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=85",
    title: "Identité de marque",
    subtitle: "Identités premium pour marques ambitieuses",
    href: "#portfolio",
  },
];
