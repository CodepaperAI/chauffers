import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section className="section-shell bg-[#0d0b08] text-[#fff8ec]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="section-reveal max-w-3xl">
          <p className="eyebrow">Client notes</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.95] text-balance md:text-7xl">
            The best compliment is that nothing became a problem.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className={`testimonial-card section-reveal ${index === 1 ? "lg:mt-14" : ""}`}
            >
              <blockquote className="font-serif text-3xl leading-tight text-[#fff8ec]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-white/12 pt-5 text-sm text-[#f3e6cc]/66">
                <span className="block font-semibold text-[#f4d58d]">{item.name}</span>
                {item.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
