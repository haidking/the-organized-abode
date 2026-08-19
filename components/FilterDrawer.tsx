"use client";

import { useState, useEffect } from "react";
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
import { EMPTY_FILTERS, activeFilterCount } from "@/lib/urlParams";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onApply: (final: Filters) => void;
  onClose: () => void;
  open: boolean;
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
                "rounded-full px-4 py-2 text-sm font-medium min-h-[44px] transition-all",
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

export default function FilterDrawer({
  filters,
  onChange,
  onApply,
  onClose,
  open,
  counts,
}: Props) {
  const categoryOptions = Object.keys(categoryLabels);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={[
          "fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface border-t border-border rounded-t-2xl shadow-2xl transition-transform duration-300",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Recipe filters"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b border-border bg-surface/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="font-heading text-lg font-bold text-ink">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 rounded-full hover:bg-border/50 text-ink-secondary transition-colors"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4 space-y-6 max-h-[60vh] overflow-y-auto pb-20">
          <Group
            title="Category"
            options={categoryOptions}
            value={localFilters.category}
            labels={categoryLabels as Record<string, string>}
            multiple={false}
            onChange={(v) => setLocalFilters((f) => ({ ...f, category: v as string }))}
            counts={counts}
            groupKey="category"
          />

          <Group
            title="Meal Type"
            options={MEAL_TYPES}
            value={localFilters.mealType}
            labels={MEAL_TYPE_LABELS}
            multiple={true}
            onChange={(v) => setLocalFilters((f) => ({ ...f, mealType: v as MealType[] }))}
            counts={counts}
            groupKey="mealType"
          />

          <Group
            title="Dietary"
            options={DIETARY}
            value={localFilters.dietary}
            labels={DIETARY_LABELS}
            multiple={true}
            onChange={(v) => setLocalFilters((f) => ({ ...f, dietary: v as Dietary[] }))}
            counts={counts}
            groupKey="dietary"
          />

          <Group
            title="Protein"
            options={PROTEIN_LEVELS}
            value={localFilters.protein}
            labels={PROTEIN_LEVEL_LABELS}
            multiple={false}
            onChange={(v) => setLocalFilters((f) => ({ ...f, protein: v as "" | "low" | "medium" | "high" }))}
            counts={counts}
            groupKey="protein"
          />

          <Group
            title="Prep Time"
            options={PREP_BUCKETS.map((b) => b.key)}
            value={localFilters.prep}
            labels={Object.fromEntries(PREP_BUCKETS.map((b) => [b.key, b.label])) as Record<string, string>}
            multiple={false}
            onChange={(v) => setLocalFilters((f) => ({ ...f, prep: v as "" | "under-10" | "under-20" | "under-30" | "over-30" }))}
            counts={counts}
            groupKey="prep"
          />
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 flex items-center gap-3 px-4 py-3 border-t border-border bg-surface/95 backdrop-blur-sm rounded-b-2xl safe-area-inset-bottom">
          <button
            type="button"
            onClick={() => {
              setLocalFilters({ ...EMPTY_FILTERS, q: localFilters.q });
            }}
            className="flex-1 min-h-[48px] rounded-xl border border-border text-ink font-medium hover:bg-border/50 transition-colors"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => onApply(localFilters)}
            className="flex-1 min-h-[48px] rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition-colors shadow-sm"
          >
            Apply ({activeFilterCount(localFilters)})
          </button>
        </div>
      </div>
    </>
  );
}