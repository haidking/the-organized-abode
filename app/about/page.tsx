import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About The Better Home Recipes — Our Story & Editorial Philosophy",
  description:
    "The Better Home Recipes is a home cooking resource built around one idea: real food, made at home, should taste at least as good as what you get at a restaurant. Learn who we are and how we work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About The Better Home Recipes",
    description:
      "A home cooking resource focused on copycat recipes, one-pan dinners, meal prep, and drinks — created for real home kitchens, not professional ones.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-6">
        About The Better Home Recipes
      </h1>

      {/* Who we are */}
      <div className="space-y-5 text-base leading-relaxed text-ink-secondary">
        <p>
          Hi — I&apos;m Haidking, and The Better Home Recipes is my kitchen notebook, made public. The idea is simple:
          the food you love from restaurants and viral social media recipes should be accessible in a home kitchen, without
          requiring professional equipment, chef-level technique, or a full weekend of prep.
        </p>

        <p>
          The site grew out of a habit I&apos;ve had for years — writing down the versions of popular recipes that
          actually worked in my kitchen, with ingredients I could find at a regular grocery store and tools that fit in
          a normal kitchen drawer. When I started sharing those notes on Pinterest and got a response from home cooks
          who found them useful, I built this site to give them a permanent home.
        </p>

        {/* What you'll find */}
        <h2 className="font-heading text-xl font-bold text-ink mt-10 mb-3">
          What You&apos;ll Find Here
        </h2>

        <p>
          The content is organized into a few categories that reflect how home cooks actually think about food:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-ink-secondary">
          <li>
            <strong className="text-ink">Copycat Recipes</strong> — Home versions of popular restaurant dishes: Olive
            Garden Chicken Alfredo, Chick-fil-A Sandwich, Raising Cane&apos;s, KFC-style chicken, Chipotle Burrito
            Bowl, and more. The goal is never to claim these are identical — it&apos;s to make something genuinely
            delicious using a normal home kitchen.
          </li>
          <li>
            <strong className="text-ink">One-Pan Dinners</strong> — Fast, complete meals that minimize cleanup. Most are
            under 30 minutes from start to table.
          </li>
          <li>
            <strong className="text-ink">Drinks &amp; Beverages</strong> — Copycat coffee drinks, refreshing detox
            waters, and smoothies you can make at home for a fraction of the cafe price.
          </li>
          <li>
            <strong className="text-ink">Meal Prep</strong> — Recipes designed for batch cooking: high-protein
            breakfasts, freezer-friendly options, and ingredient-based systems that reduce weeknight decision fatigue.
          </li>
          <li>
            <strong className="text-ink">Recipe Guides (Blog)</strong> — Longer-form articles exploring the techniques,
            science, or shortcuts behind popular recipes — the kind of background reading that makes you a better home
            cook, not just a better recipe-follower.
          </li>
        </ul>

        {/* How content is created */}
        <h2 className="font-heading text-xl font-bold text-ink mt-10 mb-3">
          How We Create Content
        </h2>

        <p>
          Every recipe on this site is written with a real home kitchen in mind. Ingredient lists are kept to things
          you can reasonably find at a standard supermarket. Techniques are described plainly — if something requires
          a specific temperature or timing, we say why, not just what.
        </p>

        <p>
          The blog guides are research-backed articles that explain the cooking science, technique context, or
          practical shortcuts behind recipes. We aim to explain <em>why</em> something works — the cream reduction
          in an Alfredo sauce, the baking powder trick for crispy air fryer wings — rather than simply listing steps.
        </p>

        <p>
          We use a combination of original recipe development and careful research to create content. Where a recipe
          is inspired by a restaurant original, we say so clearly. We do not claim recipes are identical to their
          restaurant counterparts, and we do not fabricate testing claims, credentials, or personal stories that
          are not true.
        </p>

        {/* Pinterest + social context */}
        <h2 className="font-heading text-xl font-bold text-ink mt-10 mb-3">
          Our Community
        </h2>

        <p>
          The Better Home Recipes has an active presence on{" "}
          <a
            href="https://www.pinterest.com/thebetterhomerecipes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Pinterest
          </a>
          , where we share recipe pins and kitchen tips with a growing community of home cooks. Many of the recipes on
          this site were first shared there, and the response from that community shapes what we prioritize creating next.
        </p>

        {/* Affiliate + ads transparency */}
        <h2 className="font-heading text-xl font-bold text-ink mt-10 mb-3">
          Transparency: Affiliates &amp; Advertising
        </h2>

        <p>
          This site participates in the Amazon Services LLC Associates Program. Some recipe pages include affiliate links
          to equipment used in the recipe (e.g., a cast iron skillet or blender). If you purchase through these links,
          we earn a small commission at no cost to you. This helps keep the site free. We only link to equipment that
          is genuinely relevant to the recipe. See our full{" "}
          <Link href="/disclaimer" className="text-accent hover:underline">
            Disclaimer
          </Link>{" "}
          for details.
        </p>

        <p>
          This site also displays Google AdSense advertisements. Ads appear between content sections and in sidebars.
          The editorial content on this site — recipes, guides, and articles — is not influenced by advertisers or
          affiliate relationships.
        </p>

        {/* Contact CTA */}
        <h2 className="font-heading text-xl font-bold text-ink mt-10 mb-3">
          Get in Touch
        </h2>

        <p>
          If you have a recipe request, a question about a technique, or a restaurant dish you&apos;d love to see
          recreated at home, I&apos;d genuinely like to hear from you. The best recipes on this site have often come
          from reader requests.
        </p>

        <p>
          Reach out via the{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
