import Image from "next/image";
import { tourCards } from "@/data/site";
import { whatsappHref } from "@/lib/booking";

export function TourHighlights() {
  return (
    <section id="tours" className="section-shell bg-[#eee2ca] text-[#18140d]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="section-reveal flex flex-col gap-4 border-b border-[#ccb98f] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[#8e6835]">Tours and landmarks</p>
            <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.35rem,4.2vw,4.9rem)] font-semibold leading-[0.96] text-balance">
              Plan the stops.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold uppercase tracking-[0.16em] text-[#6d5d46]">
            City icons, orchards, wine country, coast, alpine and spa itineraries.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[25rem] gap-4 lg:grid-cols-3">
          {tourCards.map((tour, index) => (
            <article
              key={tour.title}
              className={`visual-card tour-card section-reveal ${index === 0 ? "lg:row-span-2" : ""}`}
            >
              <div className="image-window absolute inset-0 bg-[#18140d]">
                <Image
                  src={tour.image}
                  alt={tour.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/88 via-[#0d0b08]/16 to-transparent" />
              <div className="relative z-10 mt-auto p-6 text-[#fff8ec]">
                <h3 className="font-serif text-3xl font-semibold leading-none md:text-4xl">
                  {tour.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#f3e6cc]/72">
                  {tour.route}
                </p>
                <a
                  href={whatsappHref(`Hello Docklands 1998, I would like to reserve the ${tour.title} tour.`)}
                  className="mt-7 inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-[0.22em] text-[#f4d58d] focus-ring"
                >
                  Reserve tour
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
