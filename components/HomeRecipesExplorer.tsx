"use client";

import { useState, useMemo, useCallback } from "react";
import type { Recipe } from "@/data/types";
import SearchBar from "@/components/SearchBar";
import RecipeCard from "@/components/RecipeCard";

interface Props {
  recipes: Recipe[];
}

const QUICK_CATEGORIES = [
  "All",
  "Copycat Recipes",
  "One-Pan Dinners",
  "Breakfast",
  "Healthy",
  "Drinks & Smoothies",
  "Meal Prep",
] as const;

export default function HomeRecipesExplorer({ recipes }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleQueryChange = useCallback((q: string) => {
    setQuery(q);
  }, []);

  // Filter recipes by search query and quick category selection
  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      // Free text search in title, subtitle, description, ingredients, tags
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const haystack = [
          r.title,
          r.subtitle,
          r.description,
          ...(r.ingredients || []),
          ...(r.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      // Quick category pill filter
      if (selectedCategory !== "All") {
        const catLower = selectedCategory.toLowerCase();
        const rCatLower = (r.category || "").toLowerCase();
        if (!rCatLower.includes(catLower.replace(" & smoothies", "").replace(" recipes", "").replace(" dinners", ""))) {
          // Check tags as fallback match
          const matchesTag = r.tags.some((tag) =>
            tag.toLowerCase().includes(catLower.replace(" & smoothies", ""))
          );
          if (!matchesTag) return false;
        }
      }

      return true;
    });
  }, [recipes, query, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Full-width Search Bar */}
      <div className="max-w-2xl mx-auto">
        <SearchBar value={query} onQueryChange={handleQueryChange} />
      </div>

      {/* Quick Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {QUICK_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface text-ink-secondary hover:text-ink hover:bg-border/60 border border-border/80"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Header / Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-ink-secondary pt-2">
        <p>
          Showing <span className="font-semibold text-ink">{filtered.length}</span> of{" "}
          <span className="font-semibold text-ink">{recipes.length}</span> recipes
        </p>
        {(query || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="text-accent font-semibold hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Recipes Grid (Full Width, 3 Columns) */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border">
          <p className="font-heading text-xl font-bold text-ink mb-2">No recipes found</p>
          <p className="text-sm text-ink-secondary">
            Try searching for another recipe name, ingredient, or tag.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest-hover transition-colors"
          >
            Show All Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
