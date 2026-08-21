import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipes";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://thebetterhomerecipes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/recipes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
  ];

  const recipePages = recipes.map((recipe) => ({
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPosts = getAllPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages, ...blogPages];
}
