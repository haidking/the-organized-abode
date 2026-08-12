import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Better Home Recipes — a clean, simple recipe site for real home cooking.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | The Better Home Recipes",
    description:
      "The Better Home Recipes — a clean, simple recipe site for real home cooking.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-6">
        About The Better Home Recipes
      </h1>

      <p className="text-base leading-relaxed text-ink-secondary mb-5">
        Hi, I&apos;m [YOUR NAME/PEN NAME] — a home cook who believes great food
        shouldn&apos;t require a culinary degree, a wall of specialty pans, or an
        afternoon of shopping for obscure ingredients. The Better Home Recipes
        started as my own kitchen notebook: a place to write down the quick,
        crowd-pleasing meals I kept going back to, shared in the simplest way
        possible.
      </p>

      <p className="text-base leading-relaxed text-ink-secondary mb-5">
        You&apos;ll find plenty of copycat recipes here — those viral, overpriced
        restaurant favorites you can recreate at home for a fraction of the
        cost — alongside one-pan dinners, five-minute drinks and make-ahead meal
        prep. Every recipe is tested, photographed and written for real kitchens:
        no complicated techniques, no impossible-to-find ingredients, no
        pretending a weekday dinner should take two hours.
      </p>

      <p className="text-base leading-relaxed text-ink-secondary mb-5">
        Thank you for stopping by. If a recipe brightens your week, or if
        there&apos;s a restaurant favorite you&apos;d love to see recreated at
        home, I&apos;d love to hear about it. Happy cooking!
      </p>
    </section>
  );
}
