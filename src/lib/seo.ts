import { siteConfig } from "./config";

export function musicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/photos/live-band.jpg`,
    description: siteConfig.about,
    genre: siteConfig.genre,
    email: siteConfig.bookingEmail,
    foundingLocation: {
      "@type": "Place",
      name: siteConfig.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Edinburgh",
        addressCountry: "GB",
      },
    },
    member: siteConfig.members.map((member) => ({
      "@type": "OrganizationRole",
      roleName: member.role,
      member: {
        "@type": "Person",
        name: member.name,
      },
    })),
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.spotifyUrl,
      siteConfig.stageRisePublicUrl,
      siteConfig.merchUrl,
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    publisher: {
      "@type": "MusicGroup",
      name: siteConfig.name,
    },
  };
}
