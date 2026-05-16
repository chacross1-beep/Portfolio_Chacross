export type ProjectCategory =
  | "branding"
  | "motion-design"
  | "social-media"
  | "posters"
  | "packaging"
  | "ui-ux";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  excerpt: string;
  cover_image: string;
  hero_image?: string;
  video_url?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  process?: string;
  color_palette?: string[];
  typography?: string;
  gallery?: string[];
  before_image?: string;
  after_image?: string;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url?: string;
  rating?: number;
  sort_order?: number;
}

export interface SiteStats {
  projects: number;
  clients: number;
  years: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
