import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { recipes, getRecipeBySlug, categoryLabels } from "@/data/recipes";
import Breadcrumb from "@/components/Breadcrumb";
import AffiliateCard from "@/components/AffiliateCard";
import IngredientsList from "@/components/IngredientsList";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://thebetterhomerecipes.com";

/* ── Static params for all recipe slugs ────────────────────────────────── */

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

/* ── SEO metadata ──────────────────────────────────────────────────────── */

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};

  return {
    title: { absolute: recipe.metaTitle },
    description: recipe.metaDescription,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.metaTitle,
      description: recipe.metaDescription,
      type: "article",
      url: `${SITE_URL}/recipes/${recipe.slug}`,
      images: [{ url: recipe.image, width: 1200, height: 900, alt: recipe.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.metaTitle,
      description: recipe.metaDescription,
      images: [recipe.image],
    },
  };
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const canonicalUrl = `${SITE_URL}/recipes/${recipe.slug}`;

  // The meal prep roundup page renders mini-recipe cards instead of steps
  const isRoundup = !!recipe.mealPrep && recipe.mealPrep.length > 0;

  return (
    <>
      <JsonLd recipe={recipe} canonicalUrl={canonicalUrl} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Recipes", href: "/recipes" },
            { label: recipe.title },
          ]}
        />

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ── Left column (main) ── */}
          <article className="flex-1 min-w-0">
            {/* Title + byline + subtitle */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink leading-tight">
              {recipe.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-ink-secondary">
              <span>By Haidking</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(recipe.datePublished)}</span>
            </p>
            <p className="mt-2 text-lg italic text-ink-secondary">{recipe.subtitle}</p>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
              <MetaChip>⏱ Prep · {recipe.prepTime}</MetaChip>
              {recipe.cookTime && <MetaChip>🍳 Cook · {recipe.cookTime}</MetaChip>}
              <MetaChip>📋 Total · {recipe.totalTime}</MetaChip>
              <MetaChip>👤 Serves · {recipe.servings}</MetaChip>
              <MetaChip>📊 {recipe.difficulty}</MetaChip>
            </div>

            {/* Hero image */}
            <div className="mt-6 relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>

            {/* Description */}
            <p className="mt-6 text-base leading-relaxed text-ink-secondary">
              {recipe.description}
            </p>

            {/* ── AdSense placeholder (728×90 leaderboard) ── */}
            <div className="my-8 ad-placeholder h-[90px] w-full max-w-[728px]">
              {/* TODO: Replace with Google AdSense ad slot — 728×90 leaderboard */}
              Ad placeholder — 728 × 90
            </div>

            {/* Ingredients (skip for roundup pages) */}
            {!isRoundup && recipe.ingredients.length > 0 && (
              <section className="mt-8">
                <h2 className="font-heading text-xl font-bold text-ink mb-4">
                  Ingredients
                </h2>
                <IngredientsList items={recipe.ingredients} />
              </section>
            )}

            {/* Steps or Mini-recipe cards for roundup pages */}
            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-ink mb-4">
                {isRoundup ? "The Recipes" : "Instructions"}
              </h2>

              {isRoundup ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recipe.mealPrep!.map((meal) => (
                    <div
                      key={meal.title}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-base font-bold text-ink">
                          {meal.title}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-highlight-soft border border-highlight/20 px-3 py-1 text-xs font-bold text-highlight">
                          {meal.protein}
                        </span>
                      </div>
                      <IngredientsList items={meal.ingredients} />
                    </div>
                  ))}
                </div>
              ) : (
                <ol className="space-y-0 divide-y divide-border/50">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="recipe-step">
                      <span className="recipe-step-number">{i + 1}</span>
                      <p className="text-sm leading-relaxed text-ink">{step}</p>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <section className="mt-8 tips-box">
                <h2 className="font-heading text-lg font-bold text-accent mb-3">
                  Pro Tips
                </h2>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-ink leading-relaxed flex gap-2">
                      <span className="text-accent flex-shrink-0">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ── AdSense placeholder (300×250 rectangle) ── */}
            <div className="my-8 ad-placeholder h-[250px] w-full max-w-[300px]">
              {/* TODO: Replace with Google AdSense ad slot — 300×250 rectangle */}
              Ad placeholder — 300 × 250
            </div>
          </article>

          {/* ── Right column (sidebar) ── */}
          <div className="w-full lg:w-[35%] lg:flex-shrink-0">
            <AffiliateCard recipe={recipe} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Small presentational component ────────────────────────────────────── */

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-ink-secondary">
      {children}
    </span>
  );
}

/** Format an ISO date (e.g. "2026-08-08") as "Month DD, YYYY" for the byline. */
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
