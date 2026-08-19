"use client";

import type { Filters } from "@/lib/urlParams";
import {
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  DIETARY,
  DIETARY_LABELS,
  PROTEIN_LEVELS,
  PROTEIN_LEVEL_LABELS,
  PREP_BUCKETS,
} from "@/data/filters";
import type { MealType, Dietary } from "@/data/types";
import { categoryLabels } from "@/data/recipes";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  counts?: Partial<Record<string, number>>;
}

function Group<T extends string>({
  title,
  options,
  value,
  labels,
  multiple,
  onChange,
  counts,
  groupKey,
}: {
  title: string;
  options: T[];
  value: T | T[] | string;
  labels: Record<T, string>;
  multiple: boolean;
  onChange: (next: T | T[]) => void;
  counts?: Partial<Record<string, number>>;
  groupKey: string;
}) {
  const selected = multiple
    ? (value as T[])
    : (value as string) === ""
      ? ([])
      : ([value] as T[]);

  function toggle(opt: T) {
    if (multiple) {
      const next = selected.includes(opt)
        ? selected.filter((v) => v !== opt)
        : [...selected, opt];
      onChange(next);
    } else {
      onChange(selected[0] === opt ? ("" as unknown as T) : opt);
    }
  }

  const countFor = (opt: T) => counts?.[`${groupKey}:${opt}`] ?? 0;

  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
        {title}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          const count = countFor(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              aria-pressed={active}
              className={[
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                active
                  ? "bg-accent text-white shadow-sm"
                  : "bg-surface text-ink border border-border hover:bg-highlight-soft hover:border-highlight",
              ].join(" ")}
            >
              {labels[opt]}
              {count > 0 && (
                <span className={active ? "ml-1.5 text-white/80" : "ml-1.5 text-ink-secondary/70"}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FilterPanel({ filters, onChange, counts }: Props) {
  const categoryOptions = Object.keys(categoryLabels);

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 space-y-6">
      <Group
        title="Category"
        options={categoryOptions}
        value={filters.category}
        labels={categoryLabels as Record<string, string>}
        multiple={false}
        onChange={(v) => onChange({ category: v as string })}
        counts={counts}
        groupKey="category"
      />

      <Group
        title="Meal Type"
        options={MEAL_TYPES}
        value={filters.mealType}
        labels={MEAL_TYPE_LABELS}
        multiple={true}
        onChange={(v) => onChange({ mealType: v as MealType[] })}
        counts={counts}
        groupKey="mealType"
      />

      <Group
        title="Dietary"
        options={DIETARY}
        value={filters.dietary}
        labels={DIETARY_LABELS}
        multiple={true}
        onChange={(v) => onChange({ dietary: v as Dietary[] })}
        counts={counts}
        groupKey="dietary"
      />

      <Group
        title="Protein"
        options={PROTEIN_LEVELS}
        value={filters.protein}
        labels={PROTEIN_LEVEL_LABELS}
        multiple={false}
        onChange={(v) => onChange({ protein: v as "" | "low" | "medium" | "high" })}
        counts={counts}
        groupKey="protein"
      />

      <Group
        title="Prep Time"
        options={PREP_BUCKETS.map((b) => b.key)}
        value={filters.prep}
        labels={Object.fromEntries(PREP_BUCKETS.map((b) => [b.key, b.label])) as Record<string, string>}
        multiple={false}
        onChange={(v) => onChange({ prep: v as "" | "under-10" | "under-20" | "under-30" | "over-30" })}
        counts={counts}
        groupKey="prep"
      />
    </aside>
  );
}