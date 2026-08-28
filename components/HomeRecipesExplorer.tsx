"use client";

import { useState, useMemo, useCallback } from "react";
import type { Recipe } from "@/data/types";
import SearchBar from "@/components/SearchBar";
import RecipeCard from "@/components/RecipeCard";

interface Props {
  recipes: Recipe[];
}

const CATEGORY_TABS = [
  { label: "All", value: "all" },
  { label: "Copycat", value: "copycat" },
  { label: "One-Pan", value: "one-pan" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Drinks", value: "drinks" },
  { label: "Meal Prep", value: "meal-prep" },
  { label: "Salads", value: "salads" },
] as const;

export default function HomeRecipesExplorer({ recipes }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(20);

  const handleQueryChange = useCallback((q: string) => {
    setQuery(q);
    setVisibleCount(20);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(20);
  }, []);

  const handleClearFilters = useCallback(() => {
    setQuery("");
    setSelectedCategory("all");
    setVisibleCount(20);
  }, []);

  // Filter recipes by search query and category selection
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

      // Category tab filter
      if (selectedCategory !== "all") {
        const catMatch = r.category === selectedCategory;
        const tagMatch = r.tags?.includes(selectedCategory);
        if (!catMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [recipes, query, selectedCategory]);

  const visibleRecipes = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <div className="space-y-8">
      {/* Full-width Search Bar */}
      <div className="max-w-2xl mx-auto">
        <SearchBar value={query} onQueryChange={handleQueryChange} />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handleCategoryChange(tab.value)}
              className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface text-ink-secondary hover:text-ink hover:bg-border/60 border border-border/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Results Header / Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-ink-secondary">
        <p>
          Showing <span className="font-semibold text-ink">{visibleRecipes.length}</span> of{" "}
          <span className="font-semibold text-ink">{filtered.length}</span> recipes
        </p>
        {(query || selectedCategory !== "all") && (
          <button
            onClick={handleClearFilters}
            className="text-accent font-semibold hover:underline cursor-pointer"
          >
            Clear search & filters
          </button>
        )}
      </div>

      {/* Recipes Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border">
          <p className="font-heading text-xl font-bold text-ink mb-2">No recipes found</p>
          <p className="text-sm text-ink-secondary">
            Try searching for another recipe name or ingredient.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 inline-flex items-center px-5 py-2.5 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest-hover transition-colors cursor-pointer"
          >
            Show All Recipes
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filtered.length && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 20)}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-forest-hover hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Load More Recipes ({filtered.length - visibleCount} remaining)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
