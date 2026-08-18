"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Recipe, Category } from "@/data/types";
import CategoryFilter from "./CategoryFilter";
import RecipeCard from "./RecipeCard";

type FilterKey = Category | "all";

interface Props {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: Props) {
  const searchParams = useSearchParams();
  const initialParam = searchParams.get("category") as FilterKey | null;
  const [activeCategory, setActiveCategory] = useState<FilterKey>(
    initialParam && ["copycat", "one-pan", "drinks", "meal-prep", "salads", "breakfast"].includes(initialParam)
      ? initialParam
      : "all"
  );

  const filtered =
    activeCategory === "all"
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  return (
    <div>
      {/* Category filter strip - z-20 to stay above cards */}
      <div className="relative z-20 mb-6 pb-4">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Recipe grid - z-10, gap-6 */}
      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}