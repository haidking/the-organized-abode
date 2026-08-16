"use client";

import Image from "next/image";

/* ── Author avatar — small circular image for navbar & hero ────────────────
   Drop a real photo at: public/images/author-avatar.jpg (recommended 128x128, square)
   Until then, shows a styled initials placeholder matching the brand palette.
*/

interface Props {
  /** "nav" = 28px, "hero" = 48px, or any Tailwind size class */
  size?: "nav" | "hero" | number;
  /** Add a white ring border (looks better on colored backgrounds) */
  ring?: boolean;
}

export default function AuthorAvatar({ size = "nav", ring = true }: Props) {
  const sizeClasses = {
    nav: "h-7 w-7",
    hero: "h-12 w-12",
  };

  const cls = typeof size === "number"
    ? `h-[${size}px] w-[${size}px]`
    : sizeClasses[size];

  const ringCls = ring ? "ring-2 ring-white" : "";

  return (
    <span
      className={`inline-flex shrink-0 relative ${cls} ${ringCls} rounded-full overflow-hidden bg-accent-light border border-border`}
      aria-hidden="true"
      style={{ position: "relative" }}
    >
      {/* Try the real image first; on error fall back to the initials badge */}
      <Image
        src="/images/author-avatar.jpg"
        alt=""
        fill
        sizes={typeof size === "number" ? `${size}px` : size === "hero" ? "48px" : "28px"}
        className="object-cover object-center transition-opacity duration-200"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Fallback initials — shows if author-avatar.jpg doesn't exist yet */}
      <FallbackInitials size={typeof size === "number" ? size : size === "hero" ? 48 : 28} />
    </span>
  );
}

/* ── Fallback initials badge ────────────────────────────────────────────── */

function FallbackInitials({ size }: { size: number }) {
  // "HA" for Haider Abbas — tweak if you prefer different initials
  const fontSize = Math.round(size * 0.42);

  return (
    <span
      className="absolute inset-0 flex items-center justify-center font-heading font-bold text-accent"
      style={{ fontSize: `${fontSize}px` }}
      aria-hidden="true"
    >
      HA
    </span>
  );
}