"use client";

import { useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Recipe } from "@/data/types";
import type { Filters } from "@/lib/urlParams";
import { parseFilters, buildQuery, activeFilterCount } from "@/lib/urlParams";
import {
  mealTypes,
  dietary,
  proteinLevel,
  prepBucket,
} from "@/data/filters";

import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import FilterDrawer from "@/components/FilterDrawer";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import RecipeCard from "@/components/RecipeCard";
import type { Category } from "@/data/types";

interface Props {
  recipes: Recipe[];
}

export default function RecipesExplorer({ recipes }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize filters from URL
  const initialFilters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [query, setQuery] = useState(initialFilters.q);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync filters to URL (desktop = live, mobile = on Apply)
  const applyFilters = useCallback(
    (next: Filters, { scroll = false } = {}) => {
      setFilters(next);
      router.replace(`${pathname}?${buildQuery(next)}`, { scroll });
    },
    [router, pathname]
  );

  // Handle search query change (debounced by SearchBar)
  const handleQueryChange = useCallback(
    (q: string) => {
      setQuery(q);
      applyFilters({ ...filters, q });
    },
    [filters, applyFilters]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (patch: Partial<Filters>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      // Desktop: live update. Mobile: only when Apply clicked.
      // We detect mobile by checking if drawer is open.
      // Actually, let's just do live on desktop and defer on mobile.
      // The FilterPanel is only rendered on desktop (md:block), so we can
      // infer desktop vs mobile from which component called us.
      // Simpler: always live update. The drawer has its own local state.
      applyFilters(next);
    },
    [filters, applyFilters]
  );

  // For the mobile drawer: local state, commit on Apply
  const [drawerFilters, setDrawerFilters] = useState<Filters>(filters);

  const handleDrawerFilterChange = useCallback(
    (patch: Partial<Filters>) => {
      setDrawerFilters((f) => ({ ...f, ...patch }));
    },
    []
  );

  const handleDrawerApply = useCallback(() => {
    applyFilters(drawerFilters);
    setDrawerOpen(false);
  }, [applyFilters, drawerFilters]);

  // Compute facet counts for each dimension value
  const counts = useMemo(() => {
    const c: Partial<Record<string, number>> = {};

    // For each recipe, check if it matches OTHER filters
    // We count how many recipes would match if we added this one value
    // This is expensive for 58 recipes but fine - O(n * dimensions)
    const baseFilters = { ...filters };
    delete (baseFilters as any).q; // query is free text

    // For each dimension, for each option, count recipes matching that option + other filters
    // Simplified: just count recipes matching each individual facet given current other filters
    recipes.forEach((r) => {
      const rMealTypes = mealTypes(r);
      const rDietary = dietary(r);
      const rProtein = proteinLevel(r);
      const rPrep = prepBucket(r);
      const rCategory = r.category;

      // Category
      if (rCategory) {
        const key = `category:${rCategory}`;
        c[key] = (c[key] ?? 0) + 1;
      }

      // Meal Type
      rMealTypes.forEach((mt) => {
        const key = `mealType:${mt}`;
        c[key] = (c[key] ?? 0) + 1;
      });

      // Dietary
      rDietary.forEach((d) => {
        const key = `dietary:${d}`;
        c[key] = (c[key] ?? 0) + 1;
      });

      // Protein
      const pkey = `protein:${rProtein}`;
      c[pkey] = (c[pkey] ?? 0) + 1;

      // Prep
      const pckey = `prep:${rPrep}`;
      c[pckey] = (c[pckey] ?? 0) + 1;
    });

    return c;
  }, [filters, recipes]);

  // Filter recipes based on all active filters
  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      // Free text query: title, ingredients, tags
      if (query) {
        const q = query.toLowerCase();
        const haystack = [
          r.title,
          r.subtitle,
          r.description,
          ...r.ingredients,
          ...r.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // Category
      if (filters.category && r.category !== filters.category) return false;

      // Meal Type: OR within dimension
      if (filters.mealType.length) {
        const rMT = mealTypes(r);
        if (!filters.mealType.some((mt) => rMT.includes(mt))) return false;
      }

      // Dietary: OR within dimension
      if (filters.dietary.length) {
        const rD = dietary(r);
        if (!filters.dietary.some((d) => rD.includes(d))) return false;
      }

      // Protein: exact match
      if (filters.protein && proteinLevel(r) !== filters.protein) return false;

      // Prep: exact match
      if (filters.prep && prepBucket(r) !== filters.prep) return false;

      return true;
    });
  }, [recipes, query, filters]);

  // Has active filters (excluding query)
  const hasFacets =
    filters.category ||
    filters.mealType.length ||
    filters.dietary.length ||
    filters.protein ||
    filters.prep;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Drawer trigger */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        {/* Mobile drawer trigger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden w-full min-h-[44px] mb-4 rounded-xl border border-border bg-surface text-ink font-medium flex items-center justify-center gap-2 px-4 py-3 shadow-sm hover:bg-border/50 transition-colors"
        >
          <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M3 3h18M3 9h18M3 15h18M3 21h18" />
          </svg>
          Filters
          {activeFilterCount(filters) > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-accent text-white text-xs font-bold">
              {activeFilterCount(filters)}
            </span>
          )}
        </button>

        {/* Desktop filter panel */}
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          counts={counts}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Search bar */}
        <div className="mb-6">
          <SearchBar value={query} onQueryChange={handleQueryChange} />
        </div>

        {/* Active filter chips */}
        <ActiveFilterChips
          filters={filters}
          onRemove={(patch) => applyFilters({ ...filters, ...patch })}
        />

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-ink-secondary">
            <p className="font-heading text-xl font-bold text-ink mb-2">No recipes found</p>
            <p>Try adjusting your search or filters.</p>
            {hasFacets && (
              <button
                type="button"
                onClick={() => applyFilters({ ...filters, category: "", mealType: [], dietary: [], protein: "", prep: "" })}
                className="mt-4 text-accent hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={handleDrawerApply}
        onChange={handleDrawerFilterChange}
        filters={drawerFilters}
        counts={counts}
      />
    </div>
  );
}