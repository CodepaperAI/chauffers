import { BookingPanel } from "@/components/booking-panel";
import { ContactSection } from "@/components/contact-section";
import { Faq } from "@/components/faq";
import { FleetPreview } from "@/components/fleet-preview";
import { Hero } from "@/components/hero";
import { ServiceShowcase } from "@/components/service-showcase";
import { Testimonials } from "@/components/testimonials";
import { TourHighlights } from "@/components/tour-highlights";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingPanel />
      <ServiceShowcase />
      <FleetPreview />
      <TourHighlights />
      <Testimonials />
      <Faq />
      <ContactSection />
    </>
  );
}
