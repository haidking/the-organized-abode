"use client";

import { useState } from "react";
import type { Recipe, Category } from "@/data/types";
import CategoryFilter from "./CategoryFilter";
import RecipeCard from "./RecipeCard";

type FilterKey = Category | "all";

interface Props {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: Props) {
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");

  const filtered =
    activeCategory === "all"
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
