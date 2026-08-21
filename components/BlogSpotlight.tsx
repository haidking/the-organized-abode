import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";

export default function BlogSpotlight() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="bg-surface border-y border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block rounded-full bg-highlight-soft text-forest px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-2">
              From Our Kitchen Blog
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
              Recipe Stories & Guides
            </h2>
            <p className="mt-2 text-base text-ink-secondary max-w-xl">
              Deep dives into copycat secrets, meal prep guides, and step-by-step cooking techniques.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors"
          >
            Explore All Blog Posts <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-border/40">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-forest text-white px-3 py-1 text-xs font-semibold shadow-sm">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs text-ink-secondary mb-2">
                  {post.readTime} min read
                </div>

                <h3 className="font-heading text-lg font-bold text-ink group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-ink-secondary line-clamp-2 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-accent group-hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
