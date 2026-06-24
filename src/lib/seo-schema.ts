// JSON-LD schema components for chauffeur pSEO pages.

import type { ChauffeurService } from "@/data/services";
import type { ChauffeurLocation } from "@/data/seo-locations";

const SITE_URL = "https://docklands1998.com.au";
const BUSINESS_NAME = "Docklands 1998 Chauffeur Service";
const HQ_ADDRESS = {
  streetAddress: "Docklands",
  addressLocality: "Docklands",
  addressRegion: "VIC",
  postalCode: "3008",
  addressCountry: "AU",
};
const HQ_PHONE = "+61-3-0000-0000";

export function localBusinessSchema(city?: ChauffeurLocation) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: HQ_PHONE,
    address: { "@type": "PostalAddress", ...HQ_ADDRESS },
    priceRange: "$$$",
    areaServed: city
      ? {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: city.region,
          },
        }
      : {
          "@type": "AdministrativeArea",
          name: "Victoria",
        },
  };
}

export function serviceSchema(service: ChauffeurService, city?: ChauffeurLocation) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: city ? `${service.title} in ${city.name}, ${city.regionShort}` : service.title,
    description: service.intro,
    provider: {
      "@id": `${SITE_URL}#business`,
      "@type": "TaxiService",
      name: BUSINESS_NAME,
    },
    areaServed: city
      ? { "@type": "City", name: city.name }
      : { "@type": "AdministrativeArea", name: "Victoria" },
    url: city
      ? `${SITE_URL}/services/${service.slug}/${city.slug}`
      : `${SITE_URL}/services/${service.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
