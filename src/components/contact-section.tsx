import { contactLinks } from "@/data/site";
import { phoneDisplay } from "@/lib/booking";
import { LeadForm } from "./lead-form";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell bg-[#11100d] text-[#fff8ec]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-32">
        <div className="section-reveal">
          <p className="eyebrow">Enquiry</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.95] text-balance md:text-7xl">
            Tell us the ride. We will shape the plan.
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#f3e6cc]/70">
            For immediate travel, call or WhatsApp direct. For planned airport transfers, weddings, tours or business rides, send the trip details and the booking team will receive them by email.
          </p>

          <div className="mt-9 grid gap-3">
            <a href={contactLinks.phone} className="btn btn-ivory">
              Call {phoneDisplay}
            </a>
            <a href={contactLinks.whatsapp} className="btn btn-glass">
              WhatsApp direct
            </a>
          </div>
        </div>

        <div className="section-reveal border border-white/12 bg-[#17130d] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
