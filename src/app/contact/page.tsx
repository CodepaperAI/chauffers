import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Book a Melbourne chauffeur | Docklands 1998",
  description:
    "Contact Docklands 1998 by phone, WhatsApp or enquiry form for Melbourne airport transfers, wedding cars, corporate chauffeur rides, tours and short-notice travel.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book and enquire"
        title="Book the ride."
        copy="Call for immediate travel, start a WhatsApp chat, or send the enquiry form to the booking team with pickup suburb, destination, timing, passengers and notes."
        image="/fleet/e-class.png"
        alt="Black Mercedes E-Class ready for chauffeur enquiries"
        points={["Direct call", "WhatsApp", "Enquiry form"]}
      />
      <ContactSection />
      <Faq />
    </>
  );
}
