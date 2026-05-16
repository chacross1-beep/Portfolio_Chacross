import { SITE } from "@/utils/constants";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: "Designer graphique & motion designer",
    url: SITE.url,
    sameAs: [
      SITE.social.instagram,
      SITE.social.behance,
      SITE.social.linkedin,
    ],
    knowsAbout: [
      "Design graphique",
      "Motion design",
      "Branding",
      "Design UI/UX",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
