import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { locations } from "@/data/seo-locations";
import { serviceAreaPairs } from "@/data/seo-service-areas";

const SITE_URL = "https://docklands1998.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/fleet",
    "/tours",
    "/blog",
    "/contact",
    "/service-areas",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
    })),
    ...locations.map((l) => ({
      url: `${SITE_URL}/service-areas/${l.slug}`,
      lastModified: now,
    })),
    ...serviceAreaPairs.map(({ serviceSlug, citySlug }) => ({
      url: `${SITE_URL}/services/${serviceSlug}/${citySlug}`,
      lastModified: now,
    })),
  ];
}
