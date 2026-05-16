# Logos clients

Fichiers utilisés par le bandeau « Ils nous ont fait confiance ».

## Logos configurés

| Fichier | Marque | Rendu |
|---------|--------|-------|
| `logo-amazon.svg` | Amazon | color |
| `apple-svgrepo-com.svg` | Apple | mono |
| `emirates-1.svg` | Emirates | mono |
| `leroy-merlin.svg` | Leroy Merlin | color |
| `nestle-kit-kat-logo-1.svg` | Nestlé Kit Kat | color |
| `google-play-store-svgrepo-com.svg` | Google Play | color |
| `twitter-logo-thin-svgrepo-com.svg` | X (Twitter) | mono |
| `adobe-indesign.svg` | Adobe InDesign | mono |
| `adidas2.svg` | Adidas | mono |
| `adidas-7.svg` | Adidas | mono |
| `adidas-equipment-34127.svg` | Adidas Equipment | mono |
| `nike-270.svg` | Nike | mono |
| `nike-acg.svg` | Nike ACG | mono |
| `nike-react-2.svg` | Nike React | mono |

## Ajouter un logo

1. Déposer le fichier SVG/PNG ici (fond transparent, ~40–48 px de hauteur)
2. Ajouter une entrée dans [`utils/constants.ts`](../../utils/constants.ts) → `CLIENT_LOGOS`

```ts
{ id: "ma-marque", name: "Ma Marque", logo: "/clients/ma-marque.svg" },
// ou avec couleurs d'origine :
{ id: "ma-marque", name: "Ma Marque", logo: "/clients/ma-marque.svg", display: "color" },
```

## Fichiers non utilisés

Placeholders texte (supprimables) : `studio-nova.svg`, `pulse-tech.svg`, `luxe-co.svg`, `kinetic-lab.svg`, `nova-brand.svg`, `atlas-media.svg`.

Doublon : `google-play-svgrepo-com.svg` (préférer `google-play-store-svgrepo-com.svg`).
