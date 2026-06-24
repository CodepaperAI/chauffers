// Truthful service area for Docklands 1998 chauffeur service.
// Sourced from existing copy: Melbourne CBD, Docklands, Southbank mentioned
// in serviceCards. Tour destinations (Yarra Valley, Great Ocean Road,
// Mornington Peninsula, Phillip Island, Mount Hotham) are kept separate
// since they're destinations, not pickup zones.

export type ChauffeurLocation = {
  slug: string;
  name: string;
  region: string;
  regionShort: string;
  country: string;
  postalPrefix?: string;
  neighborhoods: string[];
  adjacentCities: string[];
  isHQ?: boolean;
  headline: string;
  note?: string;
  type: "suburb" | "airport" | "destination";
};

export const locations: ChauffeurLocation[] = [
  {
    slug: "docklands",
    name: "Docklands",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3008",
    neighborhoods: ["NewQuay", "Yarra's Edge", "Victoria Harbour"],
    adjacentCities: ["melbourne-cbd", "southbank", "south-yarra"],
    isHQ: true,
    headline: "Chauffeur service in Docklands, Melbourne",
    type: "suburb",
  },
  {
    slug: "melbourne-cbd",
    name: "Melbourne CBD",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3000",
    neighborhoods: ["CBD", "Collins Street", "Bourke Street"],
    adjacentCities: ["docklands", "southbank", "carlton"],
    headline: "Chauffeur service in Melbourne CBD",
    type: "suburb",
  },
  {
    slug: "southbank",
    name: "Southbank",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3006",
    neighborhoods: ["Southbank Promenade", "Crown precinct"],
    adjacentCities: ["melbourne-cbd", "south-yarra", "docklands"],
    headline: "Chauffeur service in Southbank, Melbourne",
    type: "suburb",
  },
  {
    slug: "south-yarra",
    name: "South Yarra",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3141",
    neighborhoods: ["Toorak Road", "Chapel Street"],
    adjacentCities: ["toorak", "southbank", "richmond"],
    headline: "Chauffeur service in South Yarra, Melbourne",
    type: "suburb",
  },
  {
    slug: "toorak",
    name: "Toorak",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3142",
    neighborhoods: ["Toorak Village", "Hawksburn"],
    adjacentCities: ["south-yarra", "hawthorn"],
    headline: "Chauffeur service in Toorak, Melbourne",
    type: "suburb",
  },
  {
    slug: "brighton",
    name: "Brighton",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3186",
    neighborhoods: ["Brighton Beach", "Church Street"],
    adjacentCities: ["st-kilda"],
    headline: "Chauffeur service in Brighton, Melbourne",
    type: "suburb",
  },
  {
    slug: "st-kilda",
    name: "St Kilda",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3182",
    neighborhoods: ["St Kilda Beach", "Acland Street"],
    adjacentCities: ["brighton", "south-yarra"],
    headline: "Chauffeur service in St Kilda, Melbourne",
    type: "suburb",
  },
  {
    slug: "hawthorn",
    name: "Hawthorn",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3122",
    neighborhoods: ["Glenferrie Road", "Hawthorn East"],
    adjacentCities: ["toorak", "richmond"],
    headline: "Chauffeur service in Hawthorn, Melbourne",
    type: "suburb",
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3121",
    neighborhoods: ["Bridge Road", "Swan Street", "Cremorne"],
    adjacentCities: ["south-yarra", "hawthorn", "carlton"],
    headline: "Chauffeur service in Richmond, Melbourne",
    type: "suburb",
  },
  {
    slug: "carlton",
    name: "Carlton",
    region: "Melbourne",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3053",
    neighborhoods: ["Lygon Street", "Carlton North"],
    adjacentCities: ["melbourne-cbd", "richmond"],
    headline: "Chauffeur service in Carlton, Melbourne",
    type: "suburb",
  },
  {
    slug: "melbourne-airport",
    name: "Melbourne Airport",
    region: "Tullamarine",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3045",
    neighborhoods: ["T1 Qantas", "T2 International", "T3 Virgin", "T4 budget"],
    adjacentCities: ["docklands", "melbourne-cbd"],
    headline: "Chauffeur service for Melbourne Airport (Tullamarine)",
    note: "Specialist airport pickup service with flight tracking.",
    type: "airport",
  },
  {
    slug: "avalon-airport",
    name: "Avalon Airport",
    region: "Geelong",
    regionShort: "VIC",
    country: "Australia",
    postalPrefix: "3212",
    neighborhoods: ["Avalon terminal"],
    adjacentCities: [],
    headline: "Chauffeur service for Avalon Airport",
    note: "Specialist airport pickup service with flight tracking.",
    type: "airport",
  },
];

export const locationsBySlug = Object.fromEntries(
  locations.map((loc) => [loc.slug, loc]),
);

export function getLocationBySlug(slug: string): ChauffeurLocation | null {
  return locationsBySlug[slug] ?? null;
}

export function getAdjacentLocations(slug: string, limit = 3): ChauffeurLocation[] {
  const loc = getLocationBySlug(slug);
  if (!loc) return [];
  return loc.adjacentCities
    .map((adjSlug) => getLocationBySlug(adjSlug))
    .filter((l): l is ChauffeurLocation => l !== null)
    .slice(0, limit);
}
