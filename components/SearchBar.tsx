"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onQueryChange: (q: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/** Large, mobile-friendly search input with debounce + clear button. */
export default function SearchBar({
  value,
  onQueryChange,
  placeholder = "Search recipes, ingredients, or tags…",
  autoFocus = false,
}: Props) {
  const [local, setLocal] = useState(value);
  const debounce = useRef<ReturnType<typeof setTimeout>>();

  // Keep local input in sync when the parent resets (e.g. chip cleared).
  useEffect(() => {
    setLocal(value);
  }, [value]);

  function handleChange(next: string) {
    setLocal(next);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => onQueryChange(next), 150);
  }

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-secondary">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>

      <input
        type="search"
        inputMode="search"
        value={local}
        autoFocus={autoFocus}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search recipes"
        className="w-full min-h-[44px] rounded-full border border-border bg-surface py-3 pl-12 pr-12 text-base text-ink placeholder:text-ink-secondary/70 shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />

      {local && (
        <button
          type="button"
          onClick={() => handleChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-secondary hover:bg-border/60 hover:text-ink"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
