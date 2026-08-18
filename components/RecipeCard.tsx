import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/types";
import { categoryLabels } from "@/data/recipes";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block relative"
      aria-label={`View recipe: ${recipe.title}`}
    >
      {/* Floating image — positioned ABOVE card */}
      <div className="relative z-10 -mt-5 md:-mt-8">
        <div className="rounded-xl aspect-square overflow-hidden shadow-lg">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Card body — starts below floating image */}
      <div className="bg-surface rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 pt-20 md:pt-24 pb-5 px-4">
        {/* Category badge — top right absolute */}
        <span className="absolute top-4 right-4 bg-accent text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {categoryLabels[recipe.category]}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg md:text-[18px] font-bold text-ink line-clamp-2 mb-2 group-hover:text-accent transition-colors">
          {recipe.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-ink-secondary text-[13px] font-body mb-3">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {recipe.totalTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {recipe.servings}
          </span>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-2 text-[13px] mb-4">
          <span className="text-amber-500" aria-label="4 out of 5 stars">★★★★</span>
          <span className="text-ink-secondary">Saved 2.4k times</span>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-border pt-3">
          <span className="text-accent text-sm font-medium hover:underline">View Recipe →</span>
        </div>
      </div>
    </Link>
  );
}