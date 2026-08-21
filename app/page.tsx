import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import HomeRecipesExplorer from "@/components/HomeRecipesExplorer";
import FreeEbooks from "@/components/FreeEbooks";
import BlogSpotlight from "@/components/BlogSpotlight";

/* ── Trust bar items ─────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    icon: (
      <path d="M8.5 3.5c-2.2 0-4 1.8-4 4 0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5c0-2.2-1.8-4-4-4zM8.5 9.5c-.8 0-1.5-.7-1.5-1.5S7.7 6.5 8.5 6.5 10 7.2 10 8s-.7 1.5-1.5 1.5z" />
    ),
    label: "Real Ingredients",
    sub: "No processed junk",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </>
    ),
    label: "Under 30 Min",
    sub: "Most recipes",
  },
  {
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    label: "Better Than Takeout",
    sub: "Proven at home",
  },
  {
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    label: "Saved by Thousands",
    sub: "On Pinterest",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════════
          HERO — Full-Width Banner Background
      ═════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden bg-background"
        aria-labelledby="hero-title"
      >
        {/* Full-bleed banner image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/The_Better_Home_Recipes_Banner.png"
            alt="The Better Home Recipes"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Subtle warm dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,30,30,0.80) 0%, rgba(30,30,30,0.60) 40%, rgba(30,30,30,0.20) 65%, transparent 80%)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white tracking-wide mb-6 shadow-lg backdrop-blur-sm">
              <span aria-hidden="true">🍋</span>
              New Recipes Every Week
            </span>

            {/* Headline */}
            <h1
              id="hero-title"
              className="font-heading text-white leading-[1.05] font-extrabold tracking-tight
                text-[44px] sm:text-[56px] lg:text-[72px] xl:text-[80px]
                mb-6"
            >
              Real Recipes.
              <br />
              Better At Home.
              <br />
              Every Time.
            </h1>

            {/* Subtext */}
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Copycat favorites, one-pan weeknight wins, and easy 5-minute guides.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Link
                href="#recipes"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-forest-hover hover:shadow-2xl hover:-translate-y-0.5 min-w-[220px] justify-center"
              >
                Search Recipes
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              <Link
                href="#featured-books"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base sm:text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:-translate-y-0.5 min-w-[220px] justify-center"
              >
                Featured Books
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v14M19 12l-7 7-7-7"
                  />
                </svg>
              </Link>
            </div>

            {/* Social proof */}
            <p className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span aria-hidden="true">⭐</span>
              50,000+ home cooks saving recipes weekly
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Trust Bar
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-surface py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-center sm:gap-8 lg:gap-16">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <svg
                  className="mb-2 h-7 w-7 text-accent"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
                <span className="text-sm font-bold text-ink">{item.label}</span>
                <span className="mt-0.5 text-xs text-ink-secondary">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          FEATURED BOOKS SECTION — Prominently placed under Hero
      ═════════════════════════════════════════════════════════════════════ */}
      <section id="featured-books" className="py-2">
        <FreeEbooks />
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          BLOG SPOTLIGHT — Cooking Guides & Stories
      ═════════════════════════════════════════════════════════════════════ */}
      <BlogSpotlight />

      {/* ═════════════════════════════════════════════════════════════════════
          RECIPES SECTION — Full width search bar & grid (No filter sidebar)
      ═════════════════════════════════════════════════════════════════════ */}
      <section id="recipes" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="mb-10 text-center space-y-3">
          <span className="inline-block border-b-2 border-accent pb-1 text-xs font-bold uppercase tracking-wider text-accent">
            Our Recipes
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            Recipes Worth Saving
          </h2>
          <p className="mx-auto max-w-lg text-base text-ink-secondary">
            Type an ingredient, recipe title, or category below to find your next meal.
          </p>
        </div>

        <Suspense>
          <HomeRecipesExplorer recipes={recipes} />
        </Suspense>
      </section>
    </>
  );
}