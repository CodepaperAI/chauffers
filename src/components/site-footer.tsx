import Link from "next/link";
import { emailDisplay, emailHref, phoneDisplay, phoneHref } from "@/lib/booking";
import { navLinks } from "@/data/site";
import { locations } from "@/data/seo-locations";

export function SiteFooter() {
  const contactDetails = [
    {
      label: "Service area",
      value: "Melbourne, Docklands, Geelong, Ballarat, Bendigo, Frankston, Pakenham and regional Victoria.",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            d="M12 21s7-6.08 7-12A7 7 0 0 0 5 9c0 5.92 7 12 7 12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="9" r="2.35" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: emailDisplay,
      href: emailHref,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="m5.5 7.5 6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: phoneDisplay,
      href: phoneHref,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            d="M8.25 4.75 10.1 8.8l-1.62 1.27c.88 1.78 2.17 3.07 3.95 3.95l1.27-1.62 4.05 1.85-.62 3.5c-.13.73-.78 1.25-1.52 1.2C9.68 18.54 5.46 14.32 5.05 8.39c-.05-.74.47-1.39 1.2-1.52l2-.36Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#080705] px-5 py-12 text-[#f3e6cc]/62 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-white/10 pb-9 lg:grid-cols-[1.05fr_1.6fr] lg:items-end">
          <div>
            <p className="eyebrow">Direct booking</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[0.95] text-[#fff8ec] sm:text-5xl">
              Chauffeur details at the ready.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#f3e6cc]/62">
              Call for urgent travel, email planned itineraries, or send the form for airport, wedding, tour and
              business bookings across Victoria.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-gold">
                Get quote
              </Link>
              <a href={phoneHref} className="btn btn-glass">
                Call us
              </a>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {contactDetails.map((item) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ddbd76]/35 bg-[#ddbd76]/12 text-[#f4d58d]">
                    {item.icon}
                  </span>
                  <span className="mt-5 block text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-[#ddbd76]">
                    {item.label}
                  </span>
                  <span className="mt-3 block break-words text-base font-semibold leading-7 text-[#fff8ec]">
                    {item.value}
                  </span>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#ddbd76]/45 hover:bg-[#ddbd76]/[0.07]"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-b border-white/10 py-8">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-[#ddbd76]">
            Service areas
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/service-areas" className="footer-link font-semibold text-[#fff8ec]">
              All service areas
            </Link>
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/service-areas/${loc.slug}`} className="footer-link">
                {loc.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              <span className="font-serif text-xl text-[#fff8ec]">Docklands 1998</span> - Melbourne chauffeur service.
            </p>
            <p className="mt-2 max-w-xl text-[0.68rem] leading-5 text-[#f3e6cc]/42">
              Puffing Billy image by{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Puffing_Billy_locomotive_8A_hauling_train_towards_Belgrave_on_Gembrook_Railway_near_Belgrave_-_June_2023_-_01.jpg"
                className="footer-link"
              >
                Philip Mallis
              </a>
              , licensed under{" "}
              <a href="https://creativecommons.org/licenses/by-sa/2.0/" className="footer-link">
                CC BY-SA 2.0
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
