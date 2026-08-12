import type { Recipe } from "@/data/types";

interface Props {
  recipe: Recipe;
  canonicalUrl: string;
}

/**
 * JSON-LD structured data for a recipe page, following schema.org/Recipe.
 * The script tag is rendered server-side and is never hydrated by React.
 * author is a schema.org Person matching the site's author byline.
 */
export default function JsonLd({ recipe, canonicalUrl }: Props) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [canonicalUrl + recipe.image],
    author: {
      "@type": "Person",
      name: "[YOUR NAME/PEN NAME]",
    },
    datePublished: recipe.datePublished,
    recipeYield: `${recipe.servings} servings`,
    prepTime: toISO8601Duration(recipe.prepTime),
    totalTime: toISO8601Duration(recipe.totalTime),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
  };

  if (recipe.cookTime) {
    ld.cookTime = toISO8601Duration(recipe.cookTime);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}

/**
 * Convert a human-friendly duration string like "1 hr", "25 min", "50 min"
 * to ISO 8601 Duration format: PT1H, PT25M, PT50M
 */
function toISO8601Duration(time: string): string {
  let totalMinutes = 0;
  const hourMatch = time.match(/(\d+)\s*h(?:r|rs?|ou?r)?/i);
  const minMatch = time.match(/(\d+)\s*m(?:in)?/i);
  if (hourMatch) totalMinutes += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) totalMinutes += parseInt(minMatch[1], 10);
  if (totalMinutes === 0) totalMinutes = 1; // safety floor
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let iso = "PT";
  if (hours > 0) iso += `${hours}H`;
  if (minutes > 0) iso += `${minutes}M`;
  return iso;
}
