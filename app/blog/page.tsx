import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogExplorer from "@/components/BlogExplorer";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "The Better Home Recipes Blog — Cooking Guides & Recipe Stories",
  description:
    "Tips, tricks, and the stories behind your favorite recipes — copycat guides, meal prep hacks, air fryer secrets, and healthy eating.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Better Home Recipes Blog",
    description:
      "Tips, tricks, and the stories behind your favorite recipes.",
    type: "website",
    url: "https://thebetterhomerecipes.com/blog",
    images: [
      {
        url: "https://thebetterhomerecipes.com/The_Better_Home_Recipes_Banner.png",
        width: 1200,
        height: 630,
        alt: "The Better Home Recipes Blog",
      },
    ],
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {/* Hero Header */}
      <header className="max-w-3xl space-y-3 text-center sm:text-left">
        <span className="inline-block rounded-full bg-highlight-soft text-forest px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
          Recipe Guides & Stories
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
          The Better Home Recipes Blog
        </h1>
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
          Tips, tricks, and the stories behind your favorite recipes.
        </p>
      </header>

      {/* Main Blog Explorer */}
      <BlogExplorer posts={posts} />

      {/* AdSense Unit */}
      <div className="pt-6">
        <AdUnit slot="8551069083" />
      </div>
    </div>
  );
}
