import Link from "next/link";
import type { Recipe } from "@/data/types";
import { categoryLabels } from "@/data/recipes";
import RecipeImage from "@/components/RecipeImage";
import PinItButton from "@/components/PinItButton";

const SITE_URL = "https://thebetterhomerecipes.com";

interface Props {
  recipe: Recipe;
}

/* Seeded pseudo-random for consistent saves count per recipe */
function getSavesCount(slug: string): string {
  const specificSaves: Record<string, string> = {
    "viral-cucumber-salad": "6.1k",
    "one-pot-creamy-tuscan-chicken-pasta": "8.2k",
    "strawberry-matcha-latte": "5.4k",
    "copycat-crumbl-pink-sugar-cookie": "7.8k",
    "copycat-crumbl-chocolate-chip-cookie": "9.1k",
    "one-pan-tuscan-butter-gnocchi": "4.3k",
    "green-detox-smoothie": "3.7k",
    "6-high-protein-breakfasts-meal-prep": "5.9k",
    "copycat-dominos-garlic-parmesan-chicken": "6.6k",
    "copycat-ihop-buttermilk-pancakes": "7.2k",
  };

  if (specificSaves[slug]) {
    return specificSaves[slug];
  }

  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  const num = 800 + (Math.abs(hash) % 7700);
  if (num >= 1000) {
    return (Math.round(num / 100) / 10).toFixed(1) + "k";
  }
  return num.toString();
}

function getDescriptionSnippet(description: string): string {
  const match = description.match(/^[^.!?]+[.!?]/);
  if (match) return match[0].trim();
  return description.slice(0, 100).trim() + "...";
}

export default function RecipeCard({ recipe }: Props) {
  const savesCount = getSavesCount(recipe.slug);
  const descriptionSnippet = getDescriptionSnippet(recipe.description);

  return (
    <div className="group flex flex-col bg-surface rounded-2xl border border-border/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image - clickable link to recipe */}
      <Link
        href={`/recipes/${recipe.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-border/30 block"
        aria-label={`View recipe: ${recipe.title}`}
      >
        <RecipeImage
          src={recipe.image}
          alt={recipe.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category badge */}
        <span className="inline-block bg-accent text-white text-xs font-medium rounded-full px-3 py-1 w-fit mb-3">
          {categoryLabels[recipe.category] || recipe.category}
        </span>

        {/* Title link */}
        <h3 className="font-heading text-lg font-bold text-[#1C1A18] leading-snug line-clamp-2">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="hover:text-accent transition-colors"
          >
            {recipe.title}
          </Link>
        </h3>

        {/* Description snippet */}
        <p className="mt-2 text-sm text-[#6B5F57] line-clamp-2 leading-relaxed">
          {descriptionSnippet}
        </p>

        {/* Meta row: Cook time & Servings */}
        <div className="mt-4 flex items-center gap-4 text-sm text-[#6B5F57]">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-ink-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {recipe.totalTime}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-ink-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {recipe.servings}
          </span>
        </div>

        {/* Rating stars + saves count */}
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-amber-500 font-bold" aria-label="4 out of 5 stars">★★★★</span>
          <span className="text-[#6B5F57] text-xs">Saved {savesCount} times</span>
        </div>

        {/* Pin.it button row */}
        <div className="mt-3">
          <PinItButton
            url={`${SITE_URL}/recipes/${recipe.slug}`}
            media={`${SITE_URL}${recipe.pinImage || recipe.image}`}
            description={recipe.title}
          />
        </div>

        {/* Card Footer CTA */}
        <div className="mt-auto pt-4 border-t border-[#EAE0D6] flex items-center justify-between">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="text-accent text-sm font-semibold hover:underline"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
}