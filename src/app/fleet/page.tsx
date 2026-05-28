import type { Metadata } from "next";
import { BookingPanel } from "@/components/booking-panel";
import { ContactSection } from "@/components/contact-section";
import { FleetPreview } from "@/components/fleet-preview";
import { PageHero } from "@/components/page-hero";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "Luxury chauffeur fleet Melbourne | Docklands 1998",
  description:
    "View Docklands 1998 chauffeur vehicles including executive sedans, luxury sedans, a luxury SUV and a Mercedes V-Class for Melbourne transfers and tours.",
};

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Fleet by occasion."
        copy="Choose the cabin that suits the trip: airport luggage, wedding timing, executive meetings, regional family transfers, group travel or private touring days."
        image="/fleet/s-class-interior.png"
        alt="Luxury chauffeur cabin with black leather seating"
        points={["E-Class", "S-Class", "Luxury SUV", "V-Class"]}
      />
      <FleetPreview />
      <BookingPanel />
      <Testimonials />
      <ContactSection />
    </>
  );
}
