import { phoneHref, whatsappHref } from "@/lib/booking";

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Tours", href: "/tours" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const contactLinks = {
  phone: phoneHref,
  whatsapp: whatsappHref("Hello Docklands 1998, I would like to book a chauffeur."),
};

export const heroSlides = [
  {
    image: "/fleet/docklands-hero.png",
    alt: "Black Mercedes sedan beside the Docklands waterfront",
  },
  {
    image: "/fleet/s-class.png",
    alt: "Black Mercedes S-Class sedan on a Melbourne street",
  },
  {
    image: "/fleet/audi-q7.png",
    alt: "Black Audi Q7 luxury SUV in Melbourne",
  },
];

export const serviceHighlights = [
  "Melbourne Airport and Avalon transfers",
  "Luggage coordination and baggage support",
  "Wedding cars and guest transfers",
  "Corporate roadshows and board meetings",
  "Concerts, events and late-night pickups",
  "Family tours and winery itineraries",
  "Emergency and short-notice rides",
];

export const stats = [
  { value: "1998", label: "Docklands roots" },
  { value: "24/7", label: "Phone and WhatsApp" },
  { value: "VIC+", label: "Victoria first, Australia arranged" },
];

export const serviceCards = [
  {
    number: "01",
    title: "Airport transfers",
    summary:
      "Flight-aware pickups for Melbourne Airport, Avalon and private terminals.",
    image: "/site-photos/airport-transfer.jpg",
    alt: "Aircraft wing over clouds for airport transfer service",
  },
  {
    number: "02",
    title: "Luggage coordination",
    summary:
      "Airport baggage support, hotel loading and vehicle planning for suitcases, prams and equipment.",
    image: "/site-photos/luggage-assistance.jpg",
    alt: "Airport terminal passengers travelling with luggage",
  },
  {
    number: "03",
    title: "Weddings and events",
    summary:
      "Calm timing for couples, guests, venues and late-night returns.",
    image: "/site-photos/wedding-transfer.jpg",
    alt: "Wedding couple walking outside after a formal event",
  },
  {
    number: "04",
    title: "Corporate chauffeur",
    summary:
      "Discreet CBD, Docklands, Southbank and client travel.",
    image: "/site-photos/corporate-travel.jpg",
    alt: "Premium office lobby for corporate chauffeur travel",
  },
  {
    number: "05",
    title: "Concerts and events",
    summary:
      "Late-night pickups, venue transfers and calm returns after the show.",
    image: "/site-photos/concert-event.jpg",
    alt: "Concert crowd with stage lights for event chauffeur pickups",
  },
  {
    number: "06",
    title: "Tours and wineries",
    summary:
      "Yarra Valley, Rayner's Orchard, Great Ocean Road, Mount Hotham and Mornington Peninsula.",
    image: "/site-photos/tours-wineries.jpg",
    alt: "Wine glasses on a vineyard table for private tours",
  },
];

export const fleet = [
  {
    name: "Executive sedan",
    detail: "Airport runs, meetings and quiet dinner transfers.",
    capacity: "1-3 passengers",
    image: "/fleet/e-class.png",
    alt: "Black Mercedes E-Class for executive chauffeur transfers",
  },
  {
    name: "Luxury sedan",
    detail: "Premium comfort for formal travel and private appointments.",
    capacity: "1-3 passengers",
    image: "/fleet/s-class.png",
    alt: "Black Mercedes S-Class for premium chauffeur bookings",
  },
  {
    name: "Luxury SUV",
    detail: "Extra luggage room for families and regional transfers.",
    capacity: "1-4 passengers",
    image: "/fleet/audi-q7.png",
    alt: "Black Audi Q7 luxury SUV for family and regional chauffeur transfers",
  },
  {
    name: "Mercedes V-Class",
    detail: "More cabin space for wedding guests, families and small groups.",
    capacity: "1-7 passengers",
    image: "/fleet/v-class.png",
    alt: "Black Mercedes V-Class for wedding guests and small group transfers",
  },
];

export const tourCards = [
  {
    title: "Yarra Valley wineries",
    route: "Cellar doors, lunch stops and safe Melbourne returns.",
    image: "/site-photos/yarra-valley-winery.jpg",
    alt: "Wine cellar shelves for Yarra Valley winery tours",
  },
  {
    title: "Rayner's Orchard",
    route: "Family-friendly orchard stop with relaxed Yarra Valley touring.",
    image: "/site-photos/rayners-orchard.jpg",
    alt: "Fresh orchard produce for Rayner's Orchard family tours",
  },
  {
    title: "Great Ocean Road Australia",
    route:
      "Full-day coastal touring for Twelve Apostles views, lunch stops and an unhurried Melbourne return.",
    image: "/site-photos/great-ocean-road.jpg",
    alt: "Great Ocean Road coastline and Twelve Apostles in Victoria Australia",
  },
  {
    title: "Melbourne landmark loop",
    route: "Docklands, Federation Square, MCG, gardens and Crown.",
    image: "/site-photos/melbourne-landmarks.jpg",
    alt: "Melbourne city buildings by the river for landmark tours",
  },
  {
    title: "Phillip Island escape",
    route: "Coastal lookout, Penguin Parade timing and safe Melbourne return.",
    image: "/site-photos/phillip-island.jpg",
    alt: "Australian coastline for Phillip Island day trips",
  },
  {
    title: "Winter special Mount Hotham",
    route:
      "Snow-season transfers planned around alpine roads, luggage, ski gear and lodge timing.",
    image: "/site-photos/mount-hotham-winter.jpg",
    alt: "Snow-covered Victorian alpine mountains for Mount Hotham winter transfers",
  },
  {
    title: "Mornington Peninsula spa",
    route:
      "Private spa and hot springs days with lunch, coastal stops and relaxed return travel.",
    image: "/site-photos/mornington-peninsula-spa.jpg",
    alt: "Outdoor spa pool for Mornington Peninsula wellbeing chauffeur trips",
  },
];

export const testimonials = [
  {
    quote:
      "The airport pickup was waiting before we cleared bags. Quiet car, careful driving and no confusion at the terminal.",
    name: "Corporate client",
    location: "Docklands",
  },
  {
    quote:
      "They handled the wedding transfers with patience. Family, luggage, timing changes - all managed without fuss.",
    name: "Wedding family",
    location: "Yarra Valley",
  },
  {
    quote:
      "Our winery day felt private and unhurried. The route was sensible, the car was immaculate and the driver knew where to stop.",
    name: "Private tour guest",
    location: "Southbank",
  },
];

export const faqs = [
  {
    question: "Do you only operate in Melbourne?",
    answer:
      "Docklands 1998 is Melbourne-led and strongest across Victoria, with Australia-wide chauffeur travel arranged when the itinerary calls for it.",
  },
  {
    question: "Can I book by WhatsApp?",
    answer:
      "Yes. The site keeps direct WhatsApp links available for urgent bookings, while the enquiry form can also email the booking team when Resend is configured.",
  },
  {
    question: "Do you handle weddings and group transfers?",
    answer:
      "Yes. Wedding transfers, guest movements, family tours and event pickups are part of the core service mix.",
  },
  {
    question: "Can you help with short-notice rides?",
    answer:
      "Call or message directly. Availability depends on the fleet schedule, but urgent airport, meeting and event travel is supported where possible.",
  },
];
