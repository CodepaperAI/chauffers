import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { locations } from "@/data/seo-locations";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Service areas across Melbourne | Docklands 1998 chauffeur",
  description:
    "Docklands 1998 chauffeur service operates across Melbourne suburbs, airports and Victoria tour destinations. Find your area.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Service Areas" },
      ])) }} />

      <PageHero
        eyebrow="Where we work"
        title="Service areas across Melbourne and Victoria."
        copy="Our base is Docklands, and we operate across Melbourne suburbs, the major airports and Victoria's premier tour destinations."
        image="/fleet/docklands-hero.png"
        alt="Black Mercedes sedan beside the Docklands waterfront"
        points={["Docklands", "CBD", "Airport", "Toorak", "Yarra Valley"]}
      />

      <section className="bg-[#fff8ec] py-20 text-[#0d0b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#947334]">All service areas</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Pick your area for a closer look.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/service-areas/${loc.slug}`}
                className="block rounded-2xl border border-[#0d0b08]/10 bg-white px-6 py-5 transition hover:border-[#947334]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#947334]">{loc.regionShort}</p>
                <h3 className="mt-2 font-serif text-2xl">{loc.name}</h3>
                <p className="mt-2 text-sm text-[#3a3530]">{loc.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
