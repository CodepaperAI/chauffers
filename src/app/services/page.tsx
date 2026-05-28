import type { Metadata } from "next";
import { BookingPanel } from "@/components/booking-panel";
import { ContactSection } from "@/components/contact-section";
import { PageHero } from "@/components/page-hero";
import { ServiceShowcase } from "@/components/service-showcase";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "Chauffeur services Melbourne | Docklands 1998",
  description:
    "Melbourne chauffeur services for airport transfers, luggage coordination, weddings, business meetings, concerts, emergency rides, family travel and private tours.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Chauffeur services"
        title="Chauffeur services."
        copy="Docklands 1998 handles airport transfers, luggage coordination, weddings, business rides, concerts, family travel and short-notice chauffeur requests across Melbourne and Victoria."
        image="/fleet/chauffeur-door-service.png"
        alt="White-gloved chauffeur service for Melbourne private transfers"
        points={["Airport", "Luggage", "Wedding", "Corporate", "Tours"]}
      />
      <ServiceShowcase />
      <BookingPanel />
      <Testimonials />
      <ContactSection />
    </>
  );
}
