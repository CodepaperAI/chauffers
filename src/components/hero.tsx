import Image from "next/image";
import { contactLinks, heroSlides } from "@/data/site";
import { phoneDisplay } from "@/lib/booking";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-viewport relative isolate flex min-h-[100dvh] overflow-hidden bg-[#0a0907] text-[#fff8ec]"
      aria-label="Docklands 1998 chauffeur service"
    >
      <div className="absolute inset-0 -z-20">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="hero-slide object-cover"
            style={{ animationDelay: `${index * 5.5}s` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,7,4,0.82)_0%,rgba(9,7,4,0.48)_36%,rgba(9,7,4,0.08)_72%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(207,169,101,0.12),transparent_28%),linear-gradient(180deg,rgba(9,7,4,0.06)_0%,rgba(9,7,4,0.58)_100%)]" />

      <div className="noise-overlay" />

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-7 pt-32 sm:px-8 lg:pb-10">
        <div className="grid min-h-[calc(100dvh-12rem)] items-end gap-10 lg:grid-cols-[minmax(0,31rem)_1fr]">
          <div className="max-w-[calc(100vw-2.5rem)] pb-7 sm:max-w-[31rem]">
            <p className="animate-rise text-xs font-bold uppercase tracking-[0.44em] text-[#c7a76a]">
              Melbourne chauffeur service
            </p>
            <h1 className="mt-5 animate-rise animation-delay-1 font-serif text-[clamp(2.55rem,5.2vw,4.85rem)] font-semibold leading-[0.94] text-balance text-[#fff8ec]">
              Docklands 1998
            </h1>
            <p className="hero-copy mt-6 max-w-[22rem] animate-rise animation-delay-2 text-base font-medium leading-7 text-[#fff4df]/88 sm:max-w-md md:text-lg">
              Airport transfers, weddings, business rides and private tours across Victoria.
            </p>

            <div className="mt-8 flex max-w-[22rem] animate-rise flex-col gap-4 animation-delay-3 sm:max-w-none sm:flex-row">
              <a href="#contact" className="btn btn-gold w-full sm:w-auto">
                Book a chauffeur
              </a>
              <a href={contactLinks.whatsapp} className="btn btn-ivory w-full sm:w-auto">
                WhatsApp direct
              </a>
            </div>
            <a
              href={contactLinks.phone}
              className="mt-5 inline-flex min-h-11 animate-rise items-center animation-delay-4 text-sm font-semibold text-[#fff8ec]/78 underline-offset-4 transition hover:text-[#f4d58d] hover:underline"
            >
              Call {phoneDisplay}
            </a>
          </div>

          <div className="pointer-events-none hidden self-stretch lg:block" aria-hidden="true" />
        </div>

        <a
          href="#book"
          className="scroll-cue mt-4 hidden min-h-11 w-max items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f3e6cc]/65 focus-ring md:flex"
        >
          Scroll down
          <span aria-hidden="true" className="h-px w-20 bg-[#c7a76a]/70" />
        </a>
      </div>
    </section>
  );
}
