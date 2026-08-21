import Image from "next/image";
import type { Recipe } from "@/data/types";

interface Props {
  recipe: Recipe;
}

export default function AffiliateCard({ recipe }: Props) {
  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://thebetterhomerecipes.com/recipes/${recipe.slug}`)}`;

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
          className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#E60023] hover:bg-[#ad001a] px-4 py-2.5 text-sm font-semibold text-white transition-colors shadow-sm"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
          Save to Pinterest
        </a>
      </div>
    </aside>
  );
}
