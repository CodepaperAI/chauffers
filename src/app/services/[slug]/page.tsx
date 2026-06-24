import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { services, getService } from "@/data/services";
import { locations } from "@/data/seo-locations";
import { getCitiesForService } from "@/data/seo-service-areas";
import { localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo-schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Docklands 1998 Melbourne chauffeur`,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Docklands 1998`,
      description: service.intro,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const cities = getCitiesForService(slug)
    .map((s) => locations.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.title },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        copy={service.description}
        image={service.image}
        alt={service.alt}
        points={service.includes.slice(0, 5)}
      />

      <section className="bg-[#fff8ec] py-20 text-[#0d0b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">What's included</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            How {service.shortTitle.toLowerCase()} works with Docklands 1998.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <div key={item} className="rounded-2xl border border-[#0d0b08]/10 bg-white px-6 py-5 text-base shadow-[0_8px_24px_rgba(8,7,5,0.06)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {cities.length ? (
        <section className="bg-[#0d0b08] py-20 text-[#fff8ec]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#c7a76a]">Service areas</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {service.title} across Melbourne and Victoria.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/${service.slug}/${city.slug}`}
                  className="block rounded-2xl border border-[#c7a76a]/30 bg-[#11100d] px-6 py-5 text-base transition hover:border-[#c7a76a]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7a76a]">
                    {city.regionShort}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">
                    {service.shortTitle} in {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#fff4df]/72">{city.headline}</p>
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
