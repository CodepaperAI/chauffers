import Image from "next/image";
import Link from "next/link";
import { contactLinks } from "@/data/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  points?: string[];
};

export function PageHero({ eyebrow, title, copy, image, alt, points = [] }: PageHeroProps) {
  return (
    <section className="page-hero relative isolate flex min-h-[72dvh] overflow-hidden bg-[#0d0b08] text-[#fff8ec]">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,5,0.86)_0%,rgba(8,7,5,0.58)_42%,rgba(8,7,5,0.12)_100%)]" />
      <div className="noise-overlay" />

      <div className="mx-auto flex w-full max-w-7xl items-end px-5 pb-14 pt-32 sm:px-8 lg:pb-20">
        <div className="max-w-[22rem] sm:max-w-3xl">
          <p className="animate-rise text-xs font-bold uppercase tracking-[0.4em] text-[#c7a76a]">
            {eyebrow}
          </p>
          <h1 className="mt-5 animate-rise animation-delay-1 font-serif text-[clamp(2.25rem,10.5vw,4.6rem)] font-semibold leading-[0.98] text-balance lg:text-[clamp(3.8rem,5.7vw,5.9rem)] lg:leading-[0.94]">
            {title}
          </h1>
          <p className="hero-copy mt-6 max-w-2xl animate-rise animation-delay-2 text-base font-medium leading-7 text-[#fff4df]/86 sm:text-lg sm:leading-8">
            {copy}
          </p>

          {points.length > 0 ? (
            <div className="mt-8 flex max-w-2xl animate-rise flex-wrap gap-3 animation-delay-3">
              {points.map((point) => (
                <span
                  key={point}
                  className="border border-[#f4d58d]/48 bg-[#11100d]/76 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#fff8ec] shadow-[0_10px_34px_rgba(0,0,0,0.24)] backdrop-blur-md"
                >
                  {point}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-9 flex max-w-[23rem] animate-rise flex-col gap-4 animation-delay-4 sm:max-w-none sm:flex-row">
            <Link href="/contact#contact" className="btn btn-gold">
              Book a chauffeur
            </Link>
            <a href={contactLinks.whatsapp} className="btn btn-ivory">
              WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
