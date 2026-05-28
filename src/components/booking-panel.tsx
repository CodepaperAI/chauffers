import { contactLinks } from "@/data/site";
import { phoneDisplay } from "@/lib/booking";

export function BookingPanel() {
  return (
    <section id="book" className="section-shell -mt-px bg-[#0d0b08] text-[#fff8ec]">
      <div className="mx-auto grid max-w-7xl gap-6 border-y border-[#c7a76a]/20 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:items-center">
        <div>
          <p className="eyebrow">Book ahead or call now</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-balance md:text-5xl">
            A car, a chauffeur, and a clear pickup plan.
          </h2>
        </div>
        <p className="text-sm leading-7 text-[#f3e6cc]/70">
          Send your trip details once and Docklands 1998 can confirm timing, vehicle fit, route notes and any waiting time before the ride.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={contactLinks.phone} className="btn btn-ivory">
            Call {phoneDisplay}
          </a>
          <a href={contactLinks.whatsapp} className="btn btn-gold">
            Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
