import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { getService } from "@/data/services";
import { getAdjacentLocations, getLocationBySlug, locations } from "@/data/seo-locations";
import { getServicesForCity } from "@/data/seo-service-areas";
import { getLocalCopy } from "@/data/seo-local-copy";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo-schema";

export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getLocationBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Chauffeur in ${city.name}, ${city.regionShort} | Docklands 1998`,
    description: `Premium chauffeur service in ${city.name}, ${city.region}. Airport transfers, weddings, corporate rides and private tours.`,
    alternates: { canonical: `/service-areas/${city.slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getLocationBySlug(citySlug);
  if (!city) notFound();

  const localCopy = getLocalCopy(citySlug);
  const adjacent = getAdjacentLocations(citySlug, 4);
  const cityServices = getServicesForCity(citySlug)
    .map((s) => getService(s))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: city.name },
      ])) }} />

      <PageHero
        eyebrow={`Serving ${city.name}, ${city.regionShort}`}
        title={`Chauffeur in ${city.name}, ${city.regionShort}.`}
        copy={localCopy ?? city.headline}
        image="/fleet/docklands-hero.png"
        alt={`Chauffeur in ${city.name}`}
        points={city.neighborhoods.slice(0, 4)}
      />

      <section className="bg-[#fff8ec] py-20 text-[#0d0b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">Services in {city.name}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            A full-service chauffeur company in {city.name}.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cityServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}`}
                className="block rounded-2xl border border-[#0d0b08]/10 bg-white px-6 py-5 transition hover:border-[#947334]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#947334]">Service</p>
                <h3 className="mt-2 font-serif text-2xl">{s.shortTitle} in {city.name}</h3>
                <p className="mt-2 text-sm text-[#3a3530]">{s.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {adjacent.length ? (
        <section className="bg-white py-20 text-[#0d0b08]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">Nearby suburbs</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Other suburbs we serve near {city.name}.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {adjacent.map((adj) => (
                <Link
                  key={adj.slug}
                  href={`/service-areas/${adj.slug}`}
                  className="block rounded-2xl border border-[#0d0b08]/10 bg-[#fff8ec] px-6 py-5 transition hover:border-[#947334]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#947334]">{adj.regionShort}</p>
                  <h3 className="mt-2 font-serif text-xl">{adj.name}</h3>
                  <p className="mt-2 text-xs text-[#3a3530]">{adj.headline}</p>
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
