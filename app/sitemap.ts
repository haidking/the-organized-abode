import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipes";

const SITE_URL = "https://thebetterhomerecipes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/recipes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
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

  return [...staticPages, ...recipePages];
}
