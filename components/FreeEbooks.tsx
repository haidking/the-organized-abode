"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ── The three promo eBooks ──────────────────────────────────────────────── */

interface Ebook {
  title: string;
  description: string;
  image: string;
  url: string; // Gumroad purchase link
  badge: string; // e.g. "$12" or "Get it"
}

const EBOOKS: Ebook[] = [
  {
    title: "20 Viral Recipes, 5 Ingredients Each",
    description:
      "The trending recipes everyone's making — each with just five pantry ingredients.",
    image: "/images/ebooks/viral-recipes-ebook.jpg",
    url: "https://haiderwave468.gumroad.com/l/ysndwj",
    badge: "Get it",
  },
  {
    title: "10 Quick Protein Breakfasts for Busy Gains",
    description:
      "High-protein mornings in minutes, so you stay fueled no matter how packed the day gets.",
    image: "/images/ebooks/protein-breakfasts-ebook.jpg",
    url: "https://haiderwave468.gumroad.com/l/rylglt",
    badge: "Get it",
  },
  {
    title: "10 Detox Drinks to Clean Your Gut",
    description:
      "Refreshing five-minute sips to reset, refresh and feel lighter all week long.",
    image: "/images/ebooks/detox-drinks-ebook.jpg",
    url: "https://haiderwave468.gumroad.com/l/copnkx",
    badge: "Get it",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function FreeEbooks() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fade the cards in + slide them up the first time the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t-4 border-accent bg-[#FAF7F2]"
      aria-labelledby="ebooks-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {/* ── Heading ── */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-accent/20 bg-accent-light/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent">
            ✦ Recipe eBooks
          </span>
          <h2
            id="ebooks-heading"
            className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-ink"
          >
            Recipe eBooks — Grab Your Copy
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-secondary">
            Three mini cookbooks from The Better Home Recipes — viral recipes,
            protein breakfasts, and detox drinks. Pick the one that fits your week.
          </p>
        </div>

        {/* ── Book cards ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {EBOOKS.map((book, i) => (
            <EbookCard
              key={book.title}
              book={book}
              delay={i * 120}
              visible={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Single book card ────────────────────────────────────────────────────── */

function EbookCard({
  book,
  delay,
  visible,
}: {
  book: Ebook;
  delay: number;
  visible: boolean;
}) {
  // The covers are added later — fall back to a styled placeholder so the
  // section still looks intentional until the real images land in /public.
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Cover */}
      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get ${book.title}`}
        className="group block w-full max-w-[260px]"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
          {imageError ? (
            <Placeholder title={book.title} />
          ) : (
            <Image
              src={book.image}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 300px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </a>

      {/* Title */}
      <h3 className="mt-4 font-heading text-lg font-bold text-ink leading-snug">
        {book.title}
      </h3>

      {/* One-liner */}
      <p className="mt-1.5 max-w-[260px] text-sm leading-relaxed text-ink-secondary">
        {book.description}
      </p>

      {/* CTA */}
      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
      >
        {book.badge}
      </a>
    </article>
  );
}

/* ── Placeholder shown until the real cover image exists ────────────────── */

function Placeholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent-light via-background to-accent/20 p-6">
      <span className="text-3xl">📗</span>
      <p className="font-heading text-sm font-bold text-accent leading-snug">
        Cover coming soon
      </p>
      <p className="text-xs text-ink-secondary">{title}</p>
    </div>
  );
}
