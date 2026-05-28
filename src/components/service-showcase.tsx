import Image from "next/image";
import { serviceCards } from "@/data/site";

export function ServiceShowcase() {
  return (
    <section id="services" className="section-shell bg-[#fff8ec] text-[#18140d]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="section-reveal flex flex-col gap-4 border-b border-[#d6c6a6] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[#9b7440]">Services</p>
            <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.35rem,4.2vw,4.9rem)] font-semibold leading-[0.96] text-balance">
              Choose the ride.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold uppercase tracking-[0.16em] text-[#6d5d46]">
            Airports, luggage, weddings, meetings, events and private days.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[23rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => (
            <article
              key={service.title}
              className={`visual-card service-card section-reveal ${
                index === 0 ? "md:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="image-window absolute inset-0 bg-[#18140d]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#090705]/90 via-[#090705]/20 to-transparent" />
              <span className="absolute left-5 top-5 z-10 font-serif text-5xl text-[#fff8ec]/80">
                {service.number}
              </span>
              <div className="relative z-10 mt-auto p-6 text-[#fff8ec]">
                <h3 className="font-serif text-3xl font-semibold leading-none md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#f3e6cc]/76">
                  {service.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
