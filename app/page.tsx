import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import HomeRecipesExplorer from "@/components/HomeRecipesExplorer";

import BlogSpotlight from "@/components/BlogSpotlight";

/* ── Trust bar items ─────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 6-4.5 11-10 11Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    label: "Real Ingredients",
    sub: "No processed junk",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Under 30 Min",
    sub: "Most recipes",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 10.58 0A4 4 0 0 1 18 13.87V21H6Z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),
    label: "Better Than Takeout",
    sub: "Proven at home",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
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
        className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden bg-background"
        aria-labelledby="hero-title"
      >
        {/* Full-bleed banner image — fills entire viewport */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/The_Better_Home_Recipes_Banner.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Subtle warm dark gradient on left 50% only — for text readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,30,30,0.75) 0%, rgba(30,30,30,0.55) 35%, rgba(30,30,30,0.15) 55%, transparent 65%)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-28 lg:py-32 w-full">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white tracking-wide mb-6 shadow-lg backdrop-blur-sm">
              <span aria-hidden="true">🍋</span>
              New Recipes Every Week
            </span>

            {/* Headline — BIG, bold, punchy */}
            <h1
              id="hero-title"
              className="font-heading text-white leading-[1.1] font-extrabold tracking-tight
                text-[36px] sm:text-[52px] lg:text-[72px] xl:text-[80px]
                mb-5"
            >
              Real Recipes.
              <br />
              Better At Home.
              <br />
              Every Time.
            </h1>

            {/* Subtext */}
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Copycat. Quick. Better than the original.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                href="#recipes"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-forest-hover hover:shadow-2xl hover:-translate-y-0.5 w-full sm:w-auto sm:min-w-[220px]"
              >
                Browse Recipes
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

            </div>

            {/* Social proof */}
            <p className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <span aria-hidden="true">⭐</span>
              92k monthly visitors and growing
            </p>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-gentle" aria-hidden="true">
          <svg className="h-6 w-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          Trust Bar
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/80 bg-gradient-to-r from-surface via-background to-surface py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-6 lg:gap-8">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3 p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-forest/30 hover:bg-surface"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-forest/10 border border-forest/15 text-forest group-hover:scale-105 group-hover:bg-forest group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-ink leading-tight group-hover:text-forest transition-colors duration-200">
                    {item.label}
                  </span>
                  <span className="mt-0.5 text-[11px] sm:text-xs font-medium text-ink-secondary">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═════════════════════════════════════════════════════════════════════
          2. Featured Blogs / Recipe Guides Spotlight (above recipes)
      ═════════════════════════════════════════════════════════════════════ */}
      <BlogSpotlight />

      {/* ═════════════════════════════════════════════════════════════════════
          3. Section Header + Recipe Grid (Search bar + recipe cards)
      ═════════════════════════════════════════════════════════════════════ */}
      <section id="recipes" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="mb-8 text-center">
          <span className="inline-block border-b-2 border-accent pb-1 text-xs font-bold uppercase tracking-wider text-accent">
            Our Recipes
          </span>
          <h2 className="font-heading mt-2 text-2xl sm:text-3xl md:text-[36px] font-bold text-ink">
            Recipes Worth Saving
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-base text-ink-secondary">
            Simple ingredients. Real results. Better than the original.
          </p>
        </div>

        <Suspense>
          <HomeRecipesExplorer recipes={recipes} />
        </Suspense>
      </section>
    </>
  );
}