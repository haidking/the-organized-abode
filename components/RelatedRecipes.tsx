import Link from "next/link";
import { recipes } from "@/data/recipes";
import RecipeImage from "@/components/RecipeImage";

interface Props {
  currentSlug: string;
  limit?: number;
}

/**
 * Related recipes based on shared tags and category.
 * Scores recipes by: shared tags (1 point each) + same category (2 points).
 * Returns top N matches.
 */
export default function RelatedRecipes({ currentSlug, limit = 3 }: Props) {
  const current = recipes.find((r) => r.slug === currentSlug);
  if (!current) return null;

  const scored = recipes
    .filter((r) => r.slug !== currentSlug)
    .map((r) => ({
      recipe: r,
      score:
        r.tags.filter((t) => current.tags.includes(t)).length +
        (r.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ recipe }) => recipe);

  if (!scored.length) return null;

  return (
    <section className="mt-16" aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-heading text-2xl font-bold text-ink mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scored.map((recipe) => (
          <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background">
              <RecipeImage
                src={recipe.image}
                alt={recipe.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <h3 className="mt-3 font-heading text-lg font-semibold text-ink group-hover:text-accent transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            <p className="mt-1 text-sm text-ink-secondary">
              {recipe.totalTime} · {recipe.servings} servings
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}