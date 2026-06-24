// Detailed service catalog for programmatic SEO routes. This augments the
// flat serviceCards array in site.ts (which the homepage uses for visual
// teasers) with the rich content needed for service detail and
// service x city pages.

export type ChauffeurService = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  description: string;
  image: string;
  alt: string;
  includes: string[];
  faqs: { question: string; answer: string }[];
};

export const services: ChauffeurService[] = [
  {
    slug: "airport-transfers",
    title: "Airport transfers",
    shortTitle: "Airport transfer",
    eyebrow: "Flight-aware pickups",
    intro:
      "Flight-aware Melbourne Airport and Avalon transfers with luggage support and on-time pickups.",
    description:
      "Our airport transfer service tracks your flight in real time so the chauffeur is curbside as you clear baggage. We handle Melbourne Airport (Tullamarine), Avalon Airport, and private terminals across Victoria, with the right vehicle matched to your luggage and group size.",
    image: "/site-photos/airport-transfer.jpg",
    alt: "Aircraft wing over clouds for airport transfer service",
    includes: [
      "Flight tracking with delay tolerance",
      "Meet and greet at arrivals on request",
      "Luggage assistance and vehicle planning",
      "Sedan, SUV or V-Class to suit luggage and group size",
      "Fixed quote at booking, no surge pricing",
    ],
    faqs: [
      {
        question: "Do you track my flight?",
        answer:
          "Yes. We monitor arrival times and adjust the chauffeur dispatch so you are not waiting and we are not paying long-stay parking.",
      },
      {
        question: "What if my flight is delayed?",
        answer:
          "We track arrival times via the flight number. There is a generous grace window built in; significant delays are absorbed where possible without re-quoting.",
      },
    ],
  },
  {
    slug: "luggage-coordination",
    title: "Luggage coordination",
    shortTitle: "Luggage coordination",
    eyebrow: "Baggage and equipment support",
    intro:
      "Airport baggage support, hotel loading and vehicle planning for suitcases, prams, golf clubs and equipment.",
    description:
      "When the trip involves more than two suitcases, the right vehicle matters. We size the car to your luggage and equipment, coordinate hotel loading, and handle the lift-out at both ends so you are not negotiating with porters or scrambling for trolleys.",
    image: "/site-photos/luggage-assistance.jpg",
    alt: "Airport terminal passengers travelling with luggage",
    includes: [
      "Vehicle sized to luggage volume",
      "Hotel valet coordination",
      "Pram, golf bag and ski-gear handling",
      "Door-to-door support for elderly or assisted travellers",
    ],
    faqs: [
      {
        question: "How much luggage can the V-Class take?",
        answer:
          "The Mercedes V-Class comfortably handles 6-7 standard suitcases plus carry-on for a group, with room for soft bags and ski gear.",
      },
    ],
  },
  {
    slug: "weddings-events",
    title: "Weddings and events",
    shortTitle: "Wedding transfers",
    eyebrow: "Calm timing for couples and guests",
    intro:
      "Wedding car transfers for couples, families, guests and late-night returns. Calm timing, immaculate vehicles.",
    description:
      "Weddings need a chauffeur who can hold timing without rushing the moment. We handle the bride or groom car, family transfers, guest movements between venues, and late-night returns. Vehicles are detailed for the day and the chauffeur is briefed on every stop.",
    image: "/site-photos/wedding-transfer.jpg",
    alt: "Wedding couple walking outside after a formal event",
    includes: [
      "Bridal vehicle preparation",
      "Multi-pickup coordination for family",
      "Guest transfers between ceremony and venue",
      "Late-night returns for the wedding party",
      "Detailed itinerary and contingency timing",
    ],
    faqs: [
      {
        question: "Can you handle multiple pickup locations?",
        answer:
          "Yes. We map the route in advance and dispatch the right number of vehicles to keep timing tight without the wedding party feeling rushed.",
      },
    ],
  },
  {
    slug: "corporate-chauffeur",
    title: "Corporate chauffeur",
    shortTitle: "Corporate chauffeur",
    eyebrow: "Discreet executive transfers",
    intro:
      "Discreet CBD, Docklands, Southbank and client travel for executives, roadshows and board meetings.",
    description:
      "Corporate chauffeur work for executives, visiting clients, and roadshow days. We handle the discretion, the timing, and the routing — sedans for one-to-three passengers, SUVs for larger groups, V-Class for full-team movements. Account billing and corporate invoicing supported.",
    image: "/site-photos/corporate-travel.jpg",
    alt: "Premium office lobby for corporate chauffeur travel",
    includes: [
      "Account billing on request",
      "Dedicated chauffeur for multi-stop days",
      "Roadshow coordination across CBD venues",
      "Client and executive pickups",
      "Discreet conversation and privacy",
    ],
    faqs: [
      {
        question: "Do you offer corporate account billing?",
        answer:
          "Yes. We can invoice on account terms for ongoing corporate work, with monthly statements and PO references supported.",
      },
    ],
  },
  {
    slug: "concerts-events",
    title: "Concerts and events",
    shortTitle: "Concert transfer",
    eyebrow: "Late-night pickups and venue transfers",
    intro:
      "Late-night pickups and venue transfers for concerts, sporting events and night-out travel.",
    description:
      "Event nights need a chauffeur who is waiting before the encore ends. We handle Marvel Stadium, Rod Laver Arena, MCG, AAMI Park, and Crown precinct pickups, with timing built around your event so you are not standing in a taxi rank at midnight.",
    image: "/site-photos/concert-event.jpg",
    alt: "Concert crowd with stage lights for event chauffeur pickups",
    includes: [
      "Pre-booked venue pickup point",
      "Driver waiting before show ends",
      "Group transfers for concerts and events",
      "Late-night home dropoffs",
    ],
    faqs: [
      {
        question: "How early do you arrive for venue pickups?",
        answer:
          "We position the vehicle 15-20 minutes before the scheduled end time, so you do not have to wait once you are out.",
      },
    ],
  },
  {
    slug: "tours-and-wineries",
    title: "Tours and wineries",
    shortTitle: "Private tour",
    eyebrow: "Yarra Valley, Mornington and beyond",
    intro:
      "Private tours to Yarra Valley wineries, Mornington Peninsula spa, Great Ocean Road, Mount Hotham and Phillip Island.",
    description:
      "Private chauffeured tours where the route, pace and stops are yours. We handle Yarra Valley cellar doors, Mornington Peninsula spa days, Great Ocean Road and the Twelve Apostles, Mount Hotham winter transfers, Phillip Island Penguin Parade, and the Melbourne landmark loop. Half-day, full-day, and multi-stop itineraries.",
    image: "/site-photos/tours-wineries.jpg",
    alt: "Wine glasses on a vineyard table for private tours",
    includes: [
      "Customisable route and stops",
      "Half-day and full-day options",
      "Lunch reservation help on request",
      "Larger vehicles for family and group tours",
      "Calm return travel after a long day",
    ],
    faqs: [
      {
        question: "Can you build a custom tour itinerary?",
        answer:
          "Yes. We will plan the route around your wineries, lunch stop and timing, with realistic drive times factored in.",
      },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
);

export function getService(slug: string): ChauffeurService | null {
  return servicesBySlug[slug] ?? null;
}
