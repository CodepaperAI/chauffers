import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHero } from "@/components/page-hero";
import { formatBlogDate, getBlogs, getReadingTime } from "@/lib/upliftai";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chauffeur blog Melbourne | Docklands 1998",
  description:
    "Read Docklands 1998 chauffeur travel notes, airport transfer advice, wedding transport ideas, private tour guides and Melbourne destination updates.",
};

export default async function BlogPage() {
  const { blogs, error } = await getBlogs({ limit: 12, status: "PUBLISH" });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Chauffeur notes."
        copy="Travel guidance, destination ideas and booking advice for Melbourne airport transfers, weddings, events and private touring days."
        image="/fleet/s-class-interior.png"
        alt="Luxury chauffeur cabin for Docklands 1998 blog"
        points={["Airport transfers", "Weddings", "Tours", "Business travel"]}
      />

      <section className="section-shell bg-[#eee2ca] text-[#18140d]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="section-reveal flex flex-col gap-4 border-b border-[#ccb98f] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[#8e6835]">Latest articles</p>
              <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.05rem,8vw,4.9rem)] font-semibold leading-[0.98] text-balance md:leading-[0.96]">
                <span className="block sm:inline">Guidance before</span>{" "}
                <span className="block sm:inline">the ride.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm font-semibold uppercase tracking-[0.16em] text-[#6d5d46]">
              Published updates from Docklands 1998 and UpliftAI.
            </p>
          </div>

          {error ? (
            <div className="mt-10 border border-[#ccb98f] bg-[#fff8ec]/70 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8e6835]">
                Blog feed unavailable
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#4d412f]">
                The blog API could not be loaded yet. Check the UpliftAI token in the hosting environment and try again.
              </p>
            </div>
          ) : null}

          {!error && blogs.length === 0 ? (
            <div className="mt-10 border border-[#ccb98f] bg-[#fff8ec]/70 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8e6835]">
                No published articles yet
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#4d412f]">
                Published UpliftAI articles will appear here automatically when available.
              </p>
            </div>
          ) : null}

          {blogs.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog, index) => {
                const readingTime = getReadingTime(blog);
                const category = blog.categories?.[0] || "Docklands 1998";

                return (
                  <article
                    key={blog.id || blog.slug}
                    className="section-reveal overflow-hidden border border-[#ccb98f] bg-[#fff8ec] shadow-[0_22px_70px_rgba(24,20,13,0.08)]"
                    style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                  >
                    {blog.featuredImage ? (
                      // UpliftAI can return arbitrary image hosts, so this uses a native image.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <div className="grid aspect-[4/3] place-items-center bg-[#18140d] text-[#f4d58d]">
                        <span className="font-serif text-5xl">D</span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#8e6835]">
                        <span>{category}</span>
                        {readingTime ? <span>{readingTime}</span> : null}
                      </div>
                      <h3 className="mt-5 font-serif text-[1.7rem] font-semibold leading-[1.04] text-[#18140d] sm:text-3xl sm:leading-none">
                        <Link href={`/blog/${blog.slug}`} className="focus-ring hover:text-[#8e6835]">
                          {blog.title}
                        </Link>
                      </h3>
                      {blog.excerpt ? (
                        <p className="mt-4 text-sm leading-7 text-[#4d412f]">
                          {blog.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#ccb98f] pt-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d5d46]">
                          {formatBlogDate(blog)}
                        </p>
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="text-xs font-bold uppercase tracking-[0.2em] text-[#8e6835] focus-ring"
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
