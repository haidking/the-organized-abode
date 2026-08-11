import Image from "next/image";
import Link from "next/link";
import { recipes, categoryLabels } from "@/data/recipes";
import RecipeGrid from "@/components/RecipeGrid";

export default function HomePage() {
  // Sort newest-first and take the 3 most recent for the featured section
  const featured = [...recipes]
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 3);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight">
            Real Recipes. Real&nbsp;Simple.
          </h1>
          <p className="mt-4 text-lg text-ink-secondary max-w-2xl mx-auto">
            Copycat favorites, one-pan dinners, refreshing drinks — everything you
            need, nothing you don&apos;t.
          </p>
          <Link
            href="/recipes"
            className="mt-8 inline-block rounded-full bg-highlight px-8 py-3 text-base font-semibold text-white hover:bg-highlight/90 transition-colors"
          >
            Browse Recipes →
          </Link>
        </div>
      </section>

      {/* ─── Featured 3 ─── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12">
        <h2 className="font-heading text-2xl font-bold text-ink mb-6">
          Latest Recipes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group block overflow-hidden rounded-lg bg-surface border border-border hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    {categoryLabels[recipe.category]}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-ink leading-snug group-hover:text-highlight transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink-secondary">
                    <span>⏱ {recipe.totalTime}</span>
                    <span>•</span>
                    <span>👤 {recipe.servings} servings</span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </section>

      {/* ─── Full grid with filter ─── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-16">
        <h2 className="font-heading text-2xl font-bold text-ink mb-6">
          All Recipes
        </h2>
        <RecipeGrid recipes={recipes} />
      </section>
    </>
  );
}
