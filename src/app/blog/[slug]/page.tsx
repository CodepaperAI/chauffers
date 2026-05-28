import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contactLinks } from "@/data/site";
import { formatBlogDate, getBlogBySlug, getReadingTime } from "@/lib/upliftai";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function hasHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

function sanitiseTrustedCmsHtml(content: string) {
  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\s(href|src)=["']javascript:[^"']*["']/gi, "");
}

function PlainContent({ content }: { content: string }) {
  return (
    <>
      {content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
    </>
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog article not found | Docklands 1998",
    };
  }

  const title = blog.meta?.seoTitle || blog.meta?.ogTitle || blog.title;
  const description =
    blog.meta?.seoDescription || blog.meta?.ogDescription || blog.excerpt || undefined;

  return {
    title: `${title} | Docklands 1998`,
    description,
    keywords: blog.meta?.keywords || blog.tags,
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description,
      type: "article",
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const content = blog.content || blog.excerpt || "";
  const readingTime = getReadingTime(blog);
  const category = blog.categories?.[0] || "Docklands 1998";
  const authorName = blog.authorName || "Docklands 1998";

  return (
    <article className="bg-[#0d0b08] text-[#fff8ec]">
      <header className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
        {blog.featuredImage ? (
          // UpliftAI can return arbitrary image hosts, so this uses a native image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.featuredImage}
            alt=""
            className="absolute inset-0 -z-20 size-full object-cover opacity-44"
          />
        ) : (
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_20%,rgba(244,213,141,0.18),transparent_32rem),#0d0b08]" />
        )}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,5,0.92)_0%,rgba(8,7,5,0.78)_48%,rgba(8,7,5,0.48)_100%)]" />

        <div className="mx-auto max-w-5xl">
          <Link
            href="/blog"
            className="focus-ring text-xs font-bold uppercase tracking-[0.24em] text-[#f4d58d]"
          >
            Back to blog
          </Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.32em] text-[#c7a76a]">
            {category}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-semibold leading-[0.93] text-balance">
            {blog.title}
          </h1>
          {blog.excerpt ? (
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#fff4df]/84">
              {blog.excerpt}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f3e6cc]/62">
            <span>{formatBlogDate(blog)}</span>
            {readingTime ? <span>{readingTime}</span> : null}
            {blog.authorUrl ? (
              <a href={blog.authorUrl} className="focus-ring hover:text-[#f4d58d]">
                {authorName}
              </a>
            ) : (
              <span>{authorName}</span>
            )}
          </div>
        </div>
      </header>

      <section className="bg-[#eee2ca] px-5 py-16 text-[#18140d] sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="bg-[#fff8ec] p-6 shadow-[0_28px_90px_rgba(24,20,13,0.12)] sm:p-10 lg:p-14">
            {content ? (
              <div className="blog-prose">
                {hasHtml(content) ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitiseTrustedCmsHtml(content),
                    }}
                  />
                ) : (
                  <PlainContent content={content} />
                )}
              </div>
            ) : (
              <p className="text-lg leading-8 text-[#4d412f]">
                This article is published in UpliftAI but does not have body content yet.
              </p>
            )}
          </div>

          <aside className="h-fit border border-[#ccb98f] bg-[#18140d] p-6 text-[#fff8ec] lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f4d58d]">
              Need a chauffeur?
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-none">
              Plan the ride around your itinerary.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#f3e6cc]/70">
              Send Docklands 1998 the pickup, luggage and destination details and we will confirm the right vehicle fit.
            </p>
            <div className="mt-7 grid gap-3">
              <Link href="/contact#contact" className="btn btn-gold">
                Book a chauffeur
              </Link>
              <a href={contactLinks.whatsapp} className="btn btn-ivory">
                WhatsApp direct
              </a>
            </div>
            {blog.tags && blog.tags.length > 0 ? (
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3e6cc]/54">
                  Tags
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#f4d58d]/30 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#f3e6cc]/72"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </article>
  );
}
