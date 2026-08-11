import Image from "next/image";
import type { Recipe } from "@/data/types";

interface Props {
  recipe: Recipe;
}

export default function AffiliateCard({ recipe }: Props) {
  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://theorganizedabode.com/recipes/${recipe.slug}`)}`;

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Kitchen tools card */}
      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="font-heading text-lg font-bold text-ink mb-4">
          Kitchen Tools You&apos;ll Need
        </h2>
        <ul className="space-y-2">
          {recipe.affiliateLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full rounded-md border border-highlight px-4 py-2 text-center text-sm font-medium text-highlight hover:bg-highlight hover:text-white transition-colors"
              >
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-secondary leading-relaxed">
          As an Amazon Associate I earn from qualifying purchases.
        </p>
      </div>

      {/* Pin card */}
      <div className="rounded-lg border border-border bg-surface p-5 text-center">
        <div className="relative mx-auto mb-4 aspect-[2/3] max-w-[220px] overflow-hidden rounded-md">
          <Image
            src={recipe.pinImage}
            alt={`Pin image for ${recipe.title}`}
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
        <a
          href={pinUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block w-full rounded-full bg-highlight px-4 py-2 text-sm font-semibold text-white hover:bg-highlight/90 transition-colors"
        >
          Save to Pinterest
        </a>
      </div>
    </aside>
  );
}
