import type { Metadata } from "next";
import { BookingPanel } from "@/components/booking-panel";
import { ContactSection } from "@/components/contact-section";
import { PageHero } from "@/components/page-hero";
import { TourHighlights } from "@/components/tour-highlights";

export const metadata: Metadata = {
  title: "Private tours and winery chauffeur Melbourne | Docklands 1998",
  description:
    "Private chauffeur tours from Melbourne to Yarra Valley wineries, Puffing Billy Railway, Rayner's Orchard, Great Ocean Road Australia, Mount Hotham, Mornington Peninsula spa days, Phillip Island and local landmarks.",
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tours and places to visit"
        title="Places worth the drive."
        copy="Build a private itinerary around Yarra Valley cellar doors, Puffing Billy Railway, Rayner's Orchard, Great Ocean Road Australia, Mount Hotham, Mornington Peninsula spa days, Phillip Island and Melbourne icons."
        image="/fleet/audi-q7.png"
        alt="Luxury SUV for private regional chauffeur tours"
        points={[
          "Great Ocean Road",
          "Puffing Billy",
          "Mount Hotham",
          "Mornington Peninsula",
        ]}
      />
      <TourHighlights />
      <BookingPanel />
      <ContactSection />
    </>
  );
}
