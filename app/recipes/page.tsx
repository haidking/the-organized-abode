import type { Metadata } from "next";
import { recipes } from "@/data/recipes";
import RecipeGrid from "@/components/RecipeGrid";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Browse all recipes — copycat favorites, one-pan dinners, drinks, meal prep and more.",
  alternates: { canonical: "/recipes" },
  openGraph: {
    title: "Recipes | The Organized Abode",
    description:
      "Browse all recipes — copycat favorites, one-pan dinners, drinks, meal prep and more.",
    type: "website",
  },
};

export default function RecipesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-8">
        Recipes
      </h1>
      <RecipeGrid recipes={recipes} />
    </section>
  );
}
