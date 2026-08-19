"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * next/image wrapper that falls back to a branded gradient placeholder when the
 * source file is missing or fails to load. Keeps the layout identical so cards
 * never jump when a real photo hasn't been dropped in yet.
 */
export default function RecipeImage({ src, alt, className = "", sizes, priority }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-olive-light via-background to-accent/15 flex items-center justify-center`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-center font-heading text-sm font-semibold text-accent/70">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
