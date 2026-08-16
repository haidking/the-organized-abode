"use client";

import { useState, useMemo } from "react";
import { scaleIngredients } from "@/lib/scaleIngredients";

/* ── Servings Scaler — +/- buttons to scale ingredient quantities ────────── */

interface Props {
  /** Original ingredient lines */
  items: string[];
  /** Original servings count from the recipe */
  originalServings: number;
  /** Where to render the scaled list — pass a ref to the <ul> or similar */
  targetId?: string;
}

export default function ServingsScaler({ items, originalServings, targetId }: Props) {
  const [servings, setServings] = useState(originalServings);
  const multiplier = servings / originalServings;

  const scaledItems = useMemo(() => scaleIngredients(items, multiplier), [items, multiplier]);

  const increment = () => setServings(s => s + 1);
  const decrement = () => setServings(s => Math.max(1, s - 1));

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
      <span className="text-xs font-medium text-ink-secondary">Serves</span>
      <button
        onClick={decrement}
        disabled={servings <= 1}
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-accent-light hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease servings"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="w-10 text-center font-bold text-ink">{servings}</span>
      <button
        onClick={increment}
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-accent-light hover:text-accent transition-colors"
        aria-label="Increase servings"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

/* ── ScaledIngredientsList — drop-in replacement for IngredientsList ────────
   Renders the scaled ingredient list with checkboxes.
   Usage: <ScaledIngredientsList items={recipe.ingredients} originalServings={recipe.servings} />
*/
export function ScaledIngredientsList({ items, originalServings }: { items: string[]; originalServings: number }) {
  const [servings, setServings] = useState(originalServings);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const multiplier = servings / originalServings;

  const scaledItems = useMemo(() => scaleIngredients(items, multiplier), [items, multiplier]);

  const toggle = (index: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const increment = () => setServings(s => s + 1);
  const decrement = () => setServings(s => Math.max(1, s - 1));

  return (
    <div className="space-y-2">
      {/* Servings scaler inline with the list */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-base font-bold text-ink">Ingredients</h3>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <span className="text-xs font-medium text-ink-secondary">Serves</span>
          <button onClick={decrement} disabled={servings <= 1} className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-accent-light hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Decrease servings">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <span className="w-10 text-center font-bold text-ink">{servings}</span>
          <button onClick={increment} className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-accent-light hover:text-accent transition-colors" aria-label="Increase servings">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      <ul className="space-y-0 divide-y divide-border/50">
        {scaledItems.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={i}>
              <label className={`flex cursor-pointer items-start gap-3 py-3 px-1 transition-colors hover:bg-highlight-soft/50 rounded ${isChecked ? "opacity-50" : ""}`}>
                <input type="checkbox" checked={isChecked} onChange={() => toggle(i)} className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border text-accent focus:ring-accent cursor-pointer accent-[#2D6A4F]" />
                <span className={`text-sm leading-relaxed ${isChecked ? "line-through text-ink-secondary" : "text-ink"}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}