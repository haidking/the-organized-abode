import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import RecipeGrid from "@/components/RecipeGrid";
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

/* ── Hero background split (diagonal via clip-path) ─────────────────────── */
const heroSplitStyle: React.CSSProperties = {
  // Left 60% warm peach, right 40% slightly darker peach
  clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
};

export default function HomePage() {
  // Best-looking hero image (visually appealing food photo)
  const heroImage = "/images/one-pot-creamy-tuscan-chicken-pasta.jpg";

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════════
          Hero — diagonal split with bleeding image
      ═════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background">
        {/* Right 40% — darker peach via clip-path pseudo-element */}
        <div
          className="absolute inset-0 bg-accent-light"
          style={heroSplitStyle}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col-reverse items-center gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:gap-12">
            {/* Left 60% — text */}
            <div className="w-full text-center lg:w-3/5 lg:text-left">
              <h1 className="font-heading text-[36px] leading-[1.15] font-bold text-ink sm:text-5xl md:text-[52px]">
                Real Recipes.
                <br />
                Better At Home.
                <br />
                Every Time.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-secondary lg:mx-0">
                Simple, real recipes for home kitchens — better than the original.
              </p>
              <Link
                href="/recipes"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent-hover hover:shadow-xl"
              >
                Browse Recipes
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right 40% — hero image bleeding below section */}
            <div className="relative z-20 w-full lg:w-2/5">
              <div className="relative -mb-10 overflow-hidden rounded-2xl shadow-2xl sm:-mb-16">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={heroImage}
                    alt="Featured recipe: One-Pot Creamy Tuscan Chicken Pasta"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
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
          <RecipeGrid recipes={recipes} />
        </Suspense>
      </section>

      {/* Extra padding before footer */}
      <div className="pb-16" />

      {/* ═════════════════════════════════════════════════════════════════════
          Free eBooks Promo (unchanged)
      ═════════════════════════════════════════════════════════════════════ */}
      <FreeEbooks />
    </>
  );
}