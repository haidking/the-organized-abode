"use client";

import { useState } from "react";

interface Props {
  items: string[];
}

export default function IngredientsList({ items }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <ul className="space-y-0 divide-y divide-border/50">
      {items.map((item, i) => {
        const isChecked = checked.has(i);
        return (
          <li key={i}>
            <label
              className={`flex cursor-pointer items-start gap-3 py-3 px-1 transition-colors hover:bg-highlight-soft/50 rounded ${
                isChecked ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(i)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border text-accent focus:ring-accent cursor-pointer accent-[#2D6A4F]"
              />
              <span
                className={`text-sm leading-relaxed ${
                  isChecked
                    ? "line-through text-ink-secondary"
                    : "text-ink"
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
