import type { Metadata } from "next";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import RecipesExplorer from "@/components/RecipesExplorer";

export const metadata: Metadata = {
  title: "All Recipes — Copycat, One-Pan, Drinks & Meal Prep | The Better Home Recipes",
  description:
    "Browse 80+ home recipes — restaurant copycats, one-pan dinners, high-protein meal prep, refreshing drinks, and budget-friendly meals. Filter by category, time, or dietary preference.",
  alternates: { canonical: "/recipes" },
  openGraph: {
    title: "All Recipes | The Better Home Recipes",
    description:
      "Browse 80+ home recipes — copycat favorites, one-pan dinners, drinks, meal prep and more. Real food for real home kitchens.",
    type: "website",
  },
};

export default function RecipesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-8">
        Recipes
      </h1>
      <Suspense>
        <RecipesExplorer recipes={recipes} />
      </Suspense>
    </section>
  );
}
