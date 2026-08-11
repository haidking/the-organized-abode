"use client";

import type { Category } from "@/data/types";
import { categoryLabels } from "@/data/recipes";

const ALL_KEY = "all" as const;
type FilterKey = Category | typeof ALL_KEY;

const CATEGORIES: { key: FilterKey; label: string }[] = [
  { key: ALL_KEY, label: "All" },
  ...Object.entries(categoryLabels).map(([key, label]) => ({
    key: key as Category,
    label,
  })),
];

interface Props {
  activeCategory: FilterKey;
  onCategoryChange: (category: FilterKey) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ key, label }) => {
        const active = activeCategory === key;
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            aria-pressed={active}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-accent text-white"
                : "bg-surface text-ink border border-border hover:bg-highlight-soft hover:border-highlight",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
