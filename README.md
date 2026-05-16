# Chacross Mafuala — Portfolio Premium

Portfolio cinématique pour **Chacross Mafuala**, graphic & motion designer.  
Stack : **Next.js 16**, **Framer Motion**, **GSAP**, **Lenis**, **Supabase**, **Vercel**.

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter le SQL dans `supabase/migrations/001_initial_schema.sql`
3. Créer un utilisateur admin (Auth → Users)
4. Copier `.env.example` vers `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Sans Supabase, le site utilise les **données de démonstration** intégrées.

## Admin CMS

- URL : `/admin/login`
- Gestion : projets (CRUD), témoignages (suppression)
- Auth : Supabase Auth (email/password)

## Déploiement Vercel

1. Importer le repo sur [vercel.com](https://vercel.com)
2. Ajouter les variables d'environnement
3. Déployer

## Structure

```
app/                 # Pages Next.js (App Router)
components/
  animations/      # Curseur, noise, transitions
  sections/          # Hero, Portfolio, Contact...
  admin/             # Dashboard CMS
  layout/            # Header, Footer
lib/                 # Supabase, données
hooks/               # Smooth scroll, GSAP, magnetic
types/               # TypeScript
utils/               # Constantes, helpers
supabase/migrations/ # Schéma SQL
public/              # Assets statiques
```

## Fonctionnalités

- Hero fullscreen avec gradients cinématiques
- Showreel + modal vidéo
- Portfolio masonry avec filtres par catégorie
- Pages projet détaillées (problem/solution, palette, gallery, before/after)
- Skills animés, témoignages slider, contact (WhatsApp + formulaire)
- Curseur custom, smooth scroll Lenis, animations GSAP/Framer
- SEO : metadata, Open Graph, sitemap, robots, JSON-LD
- Dark mode natif, responsive mobile + ultra-wide

## Personnalisation

- `utils/constants.ts` — nom, liens sociaux, showreel
- `lib/data.ts` — projets de démo
- `app/globals.css` — design tokens

## OG Image

Ajouter `public/og-image.jpg` (1200×630) pour les partages sociaux.
