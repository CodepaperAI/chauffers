import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { services, getService } from "@/data/services";
import {
  getAdjacentLocations,
  getLocationBySlug,
} from "@/data/seo-locations";
import {
  serviceAreaPairs,
  isServiceAvailableInCity,
  getServicesForCity,
} from "@/data/seo-service-areas";
import { getLocalCopy } from "@/data/seo-local-copy";
import {
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo-schema";

export function generateStaticParams() {
  return serviceAreaPairs.map(({ serviceSlug, citySlug }) => ({
    slug: serviceSlug,
    city: citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getLocationBySlug(citySlug);
  if (!service || !city || !isServiceAvailableInCity(slug, citySlug)) return {};

  const title = `${service.title} in ${city.name}, ${city.regionShort}`;
  const description = `${service.intro} Servicing ${city.name} and the wider ${city.region} area from our Docklands base.`;

  return {
    title: `${title} | Docklands 1998`,
    description,
    alternates: { canonical: `/services/${service.slug}/${city.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

function localFaqs(serviceTitle: string, cityName: string, cityNote?: string) {
  return [
    {
      question: `Do you offer ${serviceTitle.toLowerCase()} in ${cityName}?`,
      answer: `Yes. ${cityNote ?? `${cityName} is part of our regular Melbourne service area. We operate from Docklands and most ${cityName} jobs can be booked same-day or short-notice depending on availability.`}`,
    },
    {
      question: `How much does a ${serviceTitle.toLowerCase()} chauffeur cost in ${cityName}?`,
      answer: `Pricing depends on route, vehicle and timing. Call or WhatsApp directly with the date, time and pickup address for an exact ${cityName} quote.`,
    },
    {
      question: `Can I book a ${cityName} chauffeur for tonight?`,
      answer: `Where the fleet has availability we can take same-day ${cityName} bookings. Send a WhatsApp message with the timing and we will confirm within minutes.`,
    },
  ];
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getLocationBySlug(citySlug);
  if (!service || !city || !isServiceAvailableInCity(slug, citySlug)) notFound();

  const localCopy = getLocalCopy(citySlug);
  const adjacent = getAdjacentLocations(citySlug, 3).filter((l) =>
    isServiceAvailableInCity(slug, l.slug),
  );
  const otherServices = getServicesForCity(citySlug)
    .filter((s) => s !== slug)
    .slice(0, 4)
    .map((s) => getService(s))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));
  const faqs = localFaqs(service.title, city.name, city.note);
  const title = `${service.title} in ${city.name}, ${city.regionShort}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.title, url: `/services/${service.slug}` },
        { name: city.name },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow={`${city.name}, ${city.regionShort}`}
        title={title}
        copy={`${service.intro} Servicing ${city.name} and the wider ${city.region} area from our Docklands base.`}
        image={service.image}
        alt={`${service.title} in ${city.name}`}
        points={service.includes.slice(0, 5)}
      />

      {localCopy ? (
        <section className="bg-[#fff8ec] py-20 text-[#0d0b08]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">About {city.name}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {service.title} for {city.name} clients.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#3a3530]">{localCopy}</p>
            {city.neighborhoods.length ? (
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#3a3530]">
                Pickup points we know well: {city.neighborhoods.slice(0, 5).join(", ")}.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-white py-20 text-[#0d0b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">How we work</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Working with a trusted {service.shortTitle.toLowerCase()} chauffeur in {city.name}.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <div key={item} className="rounded-2xl border border-[#0d0b08]/10 bg-[#fff8ec] px-6 py-5 text-base shadow-[0_8px_24px_rgba(8,7,5,0.06)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ec] py-20 text-[#0d0b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">{city.name} questions</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Answers for {city.name} clients.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[#0d0b08]/10 bg-white px-6 py-5">
                <h3 className="font-serif text-xl font-semibold">{faq.question}</h3>
                <p className="mt-3 text-base leading-7 text-[#3a3530]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {otherServices.length ? (
        <section className="bg-[#0d0b08] py-20 text-[#fff8ec]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#c7a76a]">Other services in {city.name}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Often paired with {service.shortTitle.toLowerCase()}.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/${city.slug}`}
                  className="block rounded-2xl border border-[#c7a76a]/30 bg-[#11100d] px-6 py-5 transition hover:border-[#c7a76a]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7a76a]">Service</p>
                  <h3 className="mt-2 font-serif text-2xl">{s.shortTitle} in {city.name}</h3>
                  <p className="mt-2 text-sm text-[#fff4df]/72">{s.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {adjacent.length ? (
        <section className="bg-white py-20 text-[#0d0b08]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">Nearby suburbs</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {service.shortTitle} in suburbs near {city.name}.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {adjacent.map((adj) => (
                <Link
                  key={adj.slug}
                  href={`/services/${service.slug}/${adj.slug}`}
                  className="block rounded-2xl border border-[#0d0b08]/10 bg-[#fff8ec] px-6 py-5 transition hover:border-[#947334]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#947334]">Service area</p>
                  <h3 className="mt-2 font-serif text-2xl">{service.shortTitle} in {adj.name}</h3>
                  <p className="mt-2 text-sm text-[#3a3530]">{adj.headline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactSection />
    </>
  );
}
