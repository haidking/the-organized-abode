import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { recipes, categoryLabels } from "@/data/recipes";
import RecipeGrid from "@/components/RecipeGrid";
import FreeEbooks from "@/components/FreeEbooks";
import type { Category } from "@/data/types";

/* ── Category cards for the browse section ──────────────────────────────── */
const CATEGORY_CARDS: { key: Category; icon: string; tagline: string }[] = [
  { key: "copycat", icon: "🍪", tagline: "Restaurant favorites at home" },
  { key: "one-pan", icon: "🍳", tagline: "Minimal cleanup, maximum flavor" },
  { key: "drinks", icon: "🥤", tagline: "Sips worth savoring" },
  { key: "meal-prep", icon: "📦", tagline: "Cook once, eat all week" },
  { key: "salads", icon: "🥗", tagline: "Fresh, fast & satisfying" },
  { key: "breakfast", icon: "🥞", tagline: "Start the day right" },
];

export default function HomePage() {
  const featured = [...recipes]
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 3);

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════════
          Hero
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-accent-light/30">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent-light/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-highlight-soft/50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 sm:py-36">
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent-light/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent">
            ✦ Simple recipes for real kitchens
          </span>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-ink leading-[1.1] tracking-tight">
            Real Recipes.
            <br />
            <span className="text-highlight">Real&nbsp;Simple.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
            Copycat favorites, one-pan dinners, refreshing drinks — everything you
            need for a week of effortless cooking, all in one place.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-full bg-highlight px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-highlight/25 hover:bg-highlight/90 hover:shadow-xl hover:shadow-highlight/30 transition-all"
            >
              Browse All Recipes
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-base font-medium text-ink hover:border-accent hover:text-accent transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Browse by Category
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_CARDS.map(({ key, icon, tagline }) => {
            const count = recipes.filter((r) => r.category === key).length;
            return (
              <Link
                key={key}
                href={`/recipes?category=${key}`}
                className="group flex flex-col items-center rounded-xl border border-border bg-surface p-5 text-center shadow-sm hover:shadow-md hover:border-accent/40 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-3xl mb-2">{icon}</span>
                <span className="font-heading text-sm font-bold text-ink group-hover:text-accent transition-colors">
                  {categoryLabels[key]}
                </span>
                <span className="mt-1 text-xs text-ink-secondary">
                  {count} recipe{count !== 1 ? "s" : ""}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Featured Recipes
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink">
              Latest Recipes
            </h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Fresh from the kitchen — just published.
            </p>
          </div>
          <Link
            href="/recipes"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-highlight hover:text-highlight/80 transition-colors"
          >
            View all
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group block overflow-hidden rounded-xl bg-surface border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {categoryLabels[recipe.category]}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-ink leading-snug group-hover:text-highlight transition-colors">
                  {recipe.title}
                </h3>
                <p className="mt-1 text-sm text-ink-secondary line-clamp-2">
                  {recipe.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-ink-secondary">
                  <span className="inline-flex items-center gap-1">⏱ {recipe.totalTime}</span>
                  <span className="text-border">|</span>
                  <span className="inline-flex items-center gap-1">👤 {recipe.servings} servings</span>
                  <span className="text-border">|</span>
                  <span className="inline-flex items-center gap-1">📊 {recipe.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Why This Site
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
        <div className="rounded-2xl bg-surface border border-border p-8 sm:p-12">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink text-center mb-10">
            Why <span className="text-accent">The Better Home Recipes</span>?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "Simple Recipes",
                desc: "Every recipe is tested, photographed and written for real kitchens — no complicated techniques, no impossible-to-find ingredients.",
              },
              {
                icon: "⏱",
                title: "Quick & Easy",
                desc: "Most recipes take 30 minutes or less. One-pan meals, 5-minute drinks and meal prep that saves your whole week.",
              },
              {
                icon: "🛒",
                title: "Recommended Tools",
                desc: "Every piece of equipment linked directly to Amazon — the exact tools we use, so you can cook with confidence.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-2xl">
                  {icon}
                </span>
                <h3 className="font-heading text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary max-w-xs">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Free eBooks Promo
      ═════════════════════════════════════════════════════════════════════ */}
      <FreeEbooks />

      {/* ═════════════════════════════════════════════════════════════════════
          Full Grid with Filter
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-8">
          All Recipes
        </h2>
        <Suspense>
          <RecipeGrid recipes={recipes} />
        </Suspense>
      </section>
    </>
  );
}