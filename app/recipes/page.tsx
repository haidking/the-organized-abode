import type { Metadata } from "next";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import RecipesExplorer from "@/components/RecipesExplorer";

export function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Metadata {
  const hasFilter = searchParams && Object.keys(searchParams).length > 0;
  return {
    title: "All Recipes — Copycat, One-Pan, Drinks & Meal Prep | The Better Home Recipes",
    description:
      "Browse 80+ home recipes — restaurant copycats, one-pan dinners, high-protein meal prep, refreshing drinks, and budget-friendly meals. Filter by category, time, or dietary preference.",
    alternates: { canonical: "/recipes" },
    robots: hasFilter
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: "All Recipes | The Better Home Recipes",
      description:
        "Browse 80+ home recipes — copycat favorites, one-pan dinners, drinks, meal prep and more. Real food for real home kitchens.",
      type: "website",
    },
  };
}

export default function RecipesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-4">
        Recipes
      </h1>
      <div className="max-w-3xl mb-8 space-y-3 text-base leading-relaxed text-ink-secondary">
        <p>
          Every recipe on this site starts with one question: <em>what would make this better than the original?</em> Whether that is a restaurant copycat that tastes more accurate than the takeout version, a one-pan dinner that is faster without sacrificing flavor, or a high-protein meal prep that does not taste like diet food — the goal is always the same: genuinely better home cooking.
        </p>
        <p>
          Browse {recipes.length}+ recipes across eight categories — copycat restaurant favorites, one-pan weeknight dinners, refreshing drinks, high-protein meal prep, quick breakfasts, salads, desserts, and budget-friendly pantry meals. Use the filters below to find recipes by category, cook time, dietary preference, or search by ingredient.
        </p>
      </div>
      <Suspense>
        <RecipesExplorer recipes={recipes} />
      </Suspense>
    </section>
  );
}
