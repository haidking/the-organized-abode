"use client";

import type { Filters } from "@/lib/urlParams";
import {
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  DIETARY,
  DIETARY_LABELS,
  PROTEIN_LEVEL_LABELS,
  PREP_BUCKETS,
} from "@/data/filters";
import { categoryLabels } from "@/data/recipes";

interface Props {
  filters: Filters;
  onRemove: (patch: Partial<Filters>) => void;
}

export default function ActiveFilterChips({ filters, onRemove }: Props) {
  if (
    !filters.q &&
    !filters.category &&
    !filters.mealType.length &&
    !filters.dietary.length &&
    !filters.protein &&
    !filters.prep
  ) {
    return null;
  }

  const chips: { label: string; remove: () => void }[] = [];

  // Search query chip
  if (filters.q) {
    chips.push({
      label: `Search: "${filters.q}"`,
      remove: () => onRemove({ q: "" }),
    });
  }

  // Category chip
  if (filters.category) {
    chips.push({
      label: `Category: ${categoryLabels[filters.category as keyof typeof categoryLabels]}`,
      remove: () => onRemove({ category: "" }),
    });
  }

  // Meal Type chips
  filters.mealType.forEach((mt) => {
    chips.push({
      label: `Meal: ${MEAL_TYPE_LABELS[mt]}`,
      remove: () => onRemove({ mealType: filters.mealType.filter((m) => m !== mt) }),
    });
  });

  // Dietary chips
  filters.dietary.forEach((d) => {
    chips.push({
      label: `Dietary: ${DIETARY_LABELS[d]}`,
      remove: () => onRemove({ dietary: filters.dietary.filter((m) => m !== d) }),
    });
  });

  // Protein chip
  if (filters.protein) {
    chips.push({
      label: `Protein: ${PROTEIN_LEVEL_LABELS[filters.protein]}`,
      remove: () => onRemove({ protein: "" }),
    });
  }

  // Prep Time chip
  if (filters.prep) {
    const bucket = PREP_BUCKETS.find((b) => b.key === filters.prep);
    chips.push({
      label: `Prep: ${bucket?.label ?? filters.prep}`,
      remove: () => onRemove({ prep: "" }),
    });
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Active filters">
      {chips.map((chip, i) => (
        <div key={i} className="inline-flex items-center gap-1.5 rounded-full bg-highlight-soft px-3 py-1.5 text-sm font-medium text-accent" role="listitem">
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={chip.remove}
            aria-label={`Remove filter: ${chip.label}`}
            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-highlight text-accent/80 hover:text-accent transition-colors"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}