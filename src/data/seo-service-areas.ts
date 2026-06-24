// THE TRUTHFULNESS GATE.
//
// Explicit allowlist of which {service, city} combinations get a programmatic
// landing page.
//
// Rules:
// - Airport-only cities (melbourne-airport, avalon-airport) only get
//   airport-transfers + luggage-coordination + corporate-chauffeur pages.
// - All other services apply to the urban Melbourne suburbs.

import { services } from "./services";
import { locations } from "./seo-locations";

const AIRPORT_ONLY_SERVICES = new Set([
  "airport-transfers",
  "luggage-coordination",
  "corporate-chauffeur",
]);

function isAllowedPair(serviceSlug: string, citySlug: string): boolean {
  const city = locations.find((l) => l.slug === citySlug);
  if (!city) return false;
  if (city.type === "airport") {
    return AIRPORT_ONLY_SERVICES.has(serviceSlug);
  }
  return true;
}

export const serviceAreaPairs = services.flatMap((service) =>
  locations
    .filter((loc) => isAllowedPair(service.slug, loc.slug))
    .map((loc) => ({
      serviceSlug: service.slug,
      citySlug: loc.slug,
    })),
);

export const pairsByCity = locations.reduce<Record<string, string[]>>(
  (acc, loc) => {
    acc[loc.slug] = services
      .filter((service) => isAllowedPair(service.slug, loc.slug))
      .map((service) => service.slug);
    return acc;
  },
  {},
);

export const pairsByService = services.reduce<Record<string, string[]>>(
  (acc, service) => {
    acc[service.slug] = locations
      .filter((loc) => isAllowedPair(service.slug, loc.slug))
      .map((loc) => loc.slug);
    return acc;
  },
  {},
);

export function isServiceAvailableInCity(
  serviceSlug: string,
  citySlug: string,
): boolean {
  return isAllowedPair(serviceSlug, citySlug);
}

export function getServicesForCity(citySlug: string): string[] {
  return pairsByCity[citySlug] ?? [];
}

export function getCitiesForService(serviceSlug: string): string[] {
  return pairsByService[serviceSlug] ?? [];
}
