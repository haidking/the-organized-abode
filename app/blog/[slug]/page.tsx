import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import AdUnit from "@/components/AdUnit";
import { recipes } from "@/data/recipes";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all 18 blog posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://thebetterhomerecipes.com${post.coverImage}`;

  return {
    title: `${post.title} | The Better Home Recipes Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["The Better Home Recipes Team"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

// MDX Components custom styling
const mdxComponents = {
  h2: (props: any) => (
    <h2
      className="font-heading text-2xl sm:text-3xl font-bold text-ink mt-10 mb-4 pb-2 border-b border-border/80"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-heading text-xl font-bold text-ink mt-7 mb-3"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="text-base text-ink leading-relaxed mb-5" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-5 text-ink leading-relaxed pl-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-5 text-ink leading-relaxed pl-2" {...props} />
  ),
  li: (props: any) => (
    <li className="text-base text-ink leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-6 border-l-4 border-forest bg-highlight-soft/50 p-4 sm:p-5 rounded-r-xl italic text-ink-secondary" {...props} />
  ),
  a: (props: any) => (
    <a className="text-accent font-semibold hover:underline" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
};

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  // Normalize recipe link
  const recipeHref = post.relatedRecipe.startsWith("/")
    ? post.relatedRecipe
    : `/recipes/${post.relatedRecipe}`;

  // Find linked recipe in database if available
  const recipeSlug = recipeHref.replace("/recipes/", "");
  const matchedRecipe = recipes.find((r) => r.slug === recipeSlug);

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <>
      <ArticleJsonLd post={post} />

      <article className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Back Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-accent transition-colors"
          >
            <span aria-hidden="true">←</span> Back to Blog
          </Link>
        </div>

        {/* Hero Header */}
        <header className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-forest text-white px-3.5 py-1 text-xs font-semibold tracking-wide">
              {post.category}
            </span>
            <span className="text-xs text-ink-secondary">•</span>
            {formattedDate && (
              <time dateTime={post.date} className="text-xs text-ink-secondary font-medium">
                {formattedDate}
              </time>
            )}
            <span className="text-xs text-ink-secondary">•</span>
            <span className="text-xs text-ink-secondary font-medium">
              {post.readTime} min read
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-sm text-ink-secondary">
            <div className="h-9 w-9 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs">
              BHR
            </div>
            <div>
              <p className="font-semibold text-ink leading-none">The Better Home Recipes Team</p>
              <p className="text-xs text-ink-secondary mt-0.5">Author & Kitchen Editors</p>
            </div>
          </div>
        </header>

        {/* Hero Image (16:9 full width) */}
        <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-border/40 shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          {/* Main Article Body (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-stone max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* AdSense Unit in content */}
            <div className="my-8">
              <AdUnit slot="8551069083" />
            </div>
          </div>

          {/* Sidebar Column (1 column) */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            {/* Try the Recipe CTA Card */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
              <span className="inline-block rounded-full bg-highlight-soft text-forest px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Featured Recipe
              </span>

              <div>
                <h3 className="font-heading text-xl font-bold text-ink">
                  {matchedRecipe ? matchedRecipe.title : "Try the Recipe"}
                </h3>
                <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                  {matchedRecipe
                    ? matchedRecipe.description
                    : "Get the complete ingredient list, step-by-step cooking instructions, and pro tips!"}
                </p>
              </div>

              <Link
                href={recipeHref}
                className="block w-full text-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-hover transition-all duration-300 shadow-sm"
              >
                View Recipe & Ingredients →
              </Link>
            </div>

            {/* Pin This Button */}
            <a
              href={post.pinterestPin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-[#E60023] px-5 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <PinterestIcon className="h-5 w-5" />
              Pin This on Pinterest
            </a>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
                <h3 className="font-heading text-lg font-bold text-ink border-b border-border pb-2">
                  Related Stories
                </h3>

                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <article key={rel.slug} className="group flex gap-3 items-center">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-border/40"
                      >
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-forest uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h4 className="text-xs font-semibold text-ink group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                        </h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Ad Unit */}
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <AdUnit slot="8551069083" />
            </div>
          </aside>
        </div>

        {/* Bottom CTA Banner */}
        <section className="my-12 rounded-3xl bg-forest p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Get more recipes like this
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
              Explore our full collection of fast, simple, restaurant-quality copycat and weeknight recipes on thebetterhomerecipes.com.
            </p>
          </div>

          <Link
            href="/recipes"
            className="flex-shrink-0 rounded-full bg-white text-forest px-7 py-3.5 text-sm font-bold hover:bg-highlight-soft transition-colors shadow-md"
          >
            Browse All Recipes →
          </Link>
        </section>
      </article>
    </>
  );
}
