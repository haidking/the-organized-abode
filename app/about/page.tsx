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
        About
      </h1>
      <p className="text-base leading-relaxed text-ink-secondary">
        The Better Home Recipes is a recipe site for people who love good food but
        don&apos;t love fussing over it. Every recipe here is tested, photographed
        and written with a simple promise: make something delicious, quickly,
        without a sink full of dishes. From copycat cookies and one-pan dinners to
        refreshing drinks and make-ahead meal prep, this is real cooking for real
        kitchens.
      </p>
    </section>
  );
}
