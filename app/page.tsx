import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import RecipesExplorer from "@/components/RecipesExplorer";
import FreeEbooks from "@/components/FreeEbooks";

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
          HERO — Full-Width Banner Background (Option A)
      ═════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-background"
        aria-labelledby="hero-title"
      >
        {/* Full-bleed banner image — fills entire viewport */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/The%20Better%20Home%20Recipes%20Banner.png"
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
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white tracking-wide mb-6 shadow-lg backdrop-blur-sm">
              <span aria-hidden="true">🍋</span>
              New Recipes Every Week
            </span>

            {/* Headline — BIG, bold, punchy */}
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
              Copycat. Quick. Better than the original.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Link
                href="/recipes"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-forest-hover hover:shadow-2xl hover:-translate-y-0.5 min-w-[220px] justify-center"
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
              <Link
                href="#free-ebooks"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base sm:text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:-translate-y-0.5 min-w-[220px] justify-center"
              >
                Free eBooks
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
            <p className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <span aria-hidden="true">⭐</span>
              50,000+ home cooks saving recipes weekly
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
          Section Header + Recipe Grid
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div className="mb-8 text-center">
          <span className="inline-block border-b-2 border-accent pb-1 text-xs font-bold uppercase tracking-wider text-accent">
            Our Recipes
          </span>
          <h2 className="font-heading mt-2 text-4xl font-bold text-ink md:text-[36px]">
            Recipes Worth Saving
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-base text-ink-secondary">
            Simple ingredients. Real results. Better than the original.
          </p>
        </div>

        <Suspense>
          <RecipesExplorer recipes={recipes} />
        </Suspense>
      </section>

      {/* Extra padding before footer */}
      <div className="pb-16" />

      {/* ═════════════════════════════════════════════════════════════════════
          Free eBooks Promo (anchored for scroll link)
      ═════════════════════════════════════════════════════════════════════ */}
      <section id="free-ebooks">
        <FreeEbooks />
      </section>
    </>
  );
}