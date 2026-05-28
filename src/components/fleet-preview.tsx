import Image from "next/image";
import type { CSSProperties } from "react";
import { fleet } from "@/data/site";

export function FleetPreview() {
  return (
    <section id="fleet" className="section-shell bg-[#11100d] text-[#fff8ec]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="section-reveal flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Fleet</p>
            <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.35rem,4.2vw,4.9rem)] font-semibold leading-[0.96] text-balance">
              Choose the cabin.
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold uppercase tracking-[0.16em] text-[#f3e6cc]/62">
            Executive sedans, luxury SUV and V-Class comfort confirmed before dispatch.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {fleet.map((vehicle, index) => (
            <article
              key={vehicle.name}
              className="fleet-card section-reveal"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <div className="fleet-image-stage image-window">
                <Image
                  src={vehicle.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="fleet-stage-bg object-cover"
                  aria-hidden="true"
                />
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="fleet-stage-main object-contain"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,248,236,0.14),transparent_34%),linear-gradient(180deg,rgba(10,9,7,0)_42%,rgba(10,9,7,0.78)_100%)]" />
                <p className="absolute left-5 top-5 z-10 border border-[#f4d58d]/35 bg-[#0a0907]/66 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#f4d58d] backdrop-blur-md">
                  {vehicle.capacity}
                </p>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-end lg:p-7">
                <div>
                  <h3 className="font-serif text-3xl font-semibold leading-none text-[#fff8ec] md:text-4xl">
                    {vehicle.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#f3e6cc]/72">
                    {vehicle.detail}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c7a76a]">
                  Chauffeur ready
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
