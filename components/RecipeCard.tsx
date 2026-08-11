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
      className="group block overflow-hidden rounded-lg bg-surface border border-border hover:shadow-md transition-shadow"
    >
      {/* Hero image — 4:3 aspect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {categoryLabels[recipe.category]}
        </span>
      </div>

      {/* Text content */}
      <div className="p-4">
        <h2 className="font-heading text-lg font-bold text-ink leading-snug group-hover:text-highlight transition-colors">
          {recipe.title}
        </h2>

        {/* Metadata row */}
        <div className="mt-2 flex items-center gap-3 text-xs text-ink-secondary">
          <span>⏱ {recipe.totalTime}</span>
          <span>•</span>
          <span>👤 {recipe.servings} servings</span>
        </div>

        <p className="mt-2 text-sm text-ink-secondary line-clamp-2">
          {recipe.description}
        </p>
      </div>
    </Link>
  );
}
