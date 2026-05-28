import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section className="section-shell bg-[#fff8ec] text-[#18140d]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:py-32">
        <div className="section-reveal">
          <p className="eyebrow text-[#9b7440]">FAQ</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.95] text-balance md:text-7xl">
            Before you book.
          </h2>
        </div>
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="section-reveal border-b border-[#d6c6a6] py-6">
              <h3 className="font-serif text-3xl font-semibold">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-8 text-[#5e5447]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
