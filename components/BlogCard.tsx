"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imgSrc, setImgSrc] = useState(post.coverImage || "/The_Better_Home_Recipes_Banner.png");

  // Format date cleanly e.g. "Aug 21, 2026"
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Cover Image Container (16:9 crop) */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-border/40">
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc("/The_Better_Home_Recipes_Banner.png")}
        />
        {/* Category Badge overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-forest text-white px-3 py-1 text-xs font-semibold tracking-wide shadow-sm">
          {post.category}
        </span>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-ink-secondary mb-2">
          {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>

        <h2 className="font-heading text-xl font-bold text-ink group-hover:text-accent transition-colors line-clamp-2 leading-snug">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-2.5 text-sm text-ink-secondary line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Read More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
