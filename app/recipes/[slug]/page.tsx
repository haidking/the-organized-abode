import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, getRecipeBySlug, categoryLabels } from "@/data/recipes";
import Breadcrumb from "@/components/Breadcrumb";
import AffiliateCard from "@/components/AffiliateCard";
import IngredientsList from "@/components/IngredientsList";
import { ScaledIngredientsList } from "@/components/ServingsScaler";
import JsonLd from "@/components/JsonLd";
import JumpToRecipe from "@/components/JumpToRecipe";
import PinItButton from "@/components/PinItButton";
import RelatedRecipes from "@/components/RelatedRecipes";
import RecipeImage from "@/components/RecipeImage";

const SITE_URL = "https://thebetterhomerecipes.com";

/* ── Static params for all recipe slugs ────────────────────────────────── */

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

/* ── SEO metadata ──────────────────────────────────────────────────────── */

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};

  const imageUrl = recipe.pinImage || recipe.image;

  return {
    title: { absolute: recipe.metaTitle },
    description: recipe.metaDescription,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.metaTitle,
      description: recipe.metaDescription,
      type: "article",
      url: `${SITE_URL}/recipes/${recipe.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 900, alt: recipe.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.metaTitle,
      description: recipe.metaDescription,
      images: [imageUrl],
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
  const isListicle = !!recipe.listItems && recipe.listItems.length > 0;
  const hasSauces = !!recipe.sauceVariants && recipe.sauceVariants.length > 0;

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

            {/* Save to Pinterest + social share row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <PinItButton
                url={canonicalUrl}
                media={`${SITE_URL}${recipe.pinImage || recipe.image}`}
                description={recipe.title}
              />
            </div>

            {/* Hero image */}
            <div className="mt-6 relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
              <RecipeImage
                src={recipe.image}
                alt={recipe.title}
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>

            {/* Jump to Recipe button (mobile) */}
            {(recipe.ingredients.length > 0 || isListicle) && (
              <JumpToRecipe targetId={isListicle ? "list-items" : "ingredients"} />
            )}

            {/* Description */}
            <p className="mt-6 text-base leading-relaxed text-ink-secondary">
              {recipe.description}
            </p>

            {/* ── AdSense: Responsive horizontal ad ── */}
            <div className="my-8">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3927086411410112"
                data-ad-slot="8551069083"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>

            {/* Ingredients (skip for roundup/listicle pages if empty) */}
            {!isRoundup && recipe.ingredients.length > 0 && (
              <section className="mt-8" id="ingredients">
                <ScaledIngredientsList items={recipe.ingredients} originalServings={recipe.servings} />
              </section>
            )}

            {/* Steps / List items / Meal prep cards */}
            <section className="mt-8" id={isListicle ? "list-items" : "instructions"}>
              <h2 className="font-heading text-xl font-bold text-ink mb-4">
                {isRoundup ? "The Recipes" : isListicle ? "Ideas & Variations" : "Instructions"}
              </h2>

              {isRoundup ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recipe.mealPrep!.map((meal) => (
                    <div
                      key={meal.title}
                      className="rounded-xl border border-border bg-surface p-5 shadow-sm"
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
              ) : isListicle ? (
                <div className="space-y-6">
                  {recipe.listItems!.map((item, idx) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white font-bold text-sm">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-heading text-lg font-bold text-ink">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          {item.ingredients && item.ingredients.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                                Key Ingredients:
                              </h4>
                              <ul className="list-disc list-inside text-sm text-ink space-y-1">
                                {item.ingredients.map((ing, i) => (
                                  <li key={i}>{ing}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {item.tip && (
                            <div className="mt-3 rounded-lg bg-accent/10 border border-accent/20 px-3.5 py-2 text-xs text-accent-dark font-medium flex items-center gap-2">
                              <span>💡</span>
                              <span>{item.tip}</span>
                            </div>
                          )}
                        </div>
                      </div>
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

            {/* Sauce Options section (for multi-variant recipes like 6 Sauces Chicken Wings) */}
            {hasSauces && (
              <section className="mt-10" id="sauces">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-xl font-bold text-ink">
                    Sauce Options (6 Sauces)
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent">
                    Choose Your Flavor
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipe.sauceVariants!.map((sauce) => (
                    <div
                      key={sauce.name}
                      className="rounded-xl border border-border bg-surface p-5 shadow-sm hover:border-accent/30 transition-all"
                    >
                      <h3 className="font-heading text-base font-bold text-ink border-b border-border/60 pb-2 mb-3 flex items-center justify-between">
                        <span>{sauce.name}</span>
                        <span className="text-xs font-normal text-ink-secondary">Sauce</span>
                      </h3>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                        Ingredients:
                      </h4>
                      <ul className="space-y-1 mb-3 text-sm text-ink">
                        {sauce.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                      {sauce.note && (
                        <p className="text-xs text-ink-secondary italic bg-background/60 p-2 rounded border border-border/40">
                          Note: {sauce.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

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

            {/* Internal CTA: Browse more recipes */}
            <div className="mt-10 mb-8 rounded-2xl bg-gradient-to-r from-background to-surface border border-border p-6 text-center shadow-sm">
              <h3 className="font-heading text-xl font-bold text-ink mb-2">
                Looking for more delicious ideas?
              </h3>
              <p className="text-sm text-ink-secondary mb-4 max-w-md mx-auto">
                Explore our full collection of quick, easy, and family-approved home recipes.
              </p>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-accent-dark transition-all duration-200"
              >
                Browse more recipes →
              </Link>
            </div>

            {/* Related Recipes */}
            <RelatedRecipes currentSlug={params.slug} limit={3} />

            {/* ── AdSense: Responsive horizontal ad ── */}
            <div className="my-8">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3927086411410112"
                data-ad-slot="8551069083"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
                }}
              />
            </div>
          </article>

          {/* ── Right column (sidebar) ── */}
          <div className="w-full lg:w-[35%] lg:flex-shrink-0">
            <AffiliateCard recipe={recipe} />
          </div>
        </div>

        {/* ── Footer CTA Banner (Forest Green #2D6A4F) ── */}
        <div className="mt-16 rounded-2xl bg-[#2D6A4F] text-white p-8 sm:p-10 text-center shadow-md">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 text-white">
            Love this recipe?
          </h2>
          <p className="text-base text-emerald-100 mb-6 max-w-xl mx-auto">
            Get more easy 30-minute recipes, meal prep guides, and kitchen tips delivered straight to your inbox!
          </p>
          <a
            href="https://thebetterhomerecipes.website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-[#2D6A4F] hover:bg-emerald-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Get the full recipe → thebetterhomerecipes.website
          </a>
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
