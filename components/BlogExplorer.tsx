"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

interface BlogExplorerProps {
  posts: BlogPost[];
}

const CATEGORIES = [
  "All",
  "Copycat Recipes",
  "Meal Prep",
  "Air Fryer",
  "Breakfast",
  "Healthy Recipes",
  "Quick Dinners",
  "Drinks",
] as const;

const POSTS_PER_PAGE = 12;

export default function BlogExplorer({ posts }: BlogExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter(
      (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [posts, selectedCategory]);

  // Reset page when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none border-b border-border/80">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-4 py-2.5 min-h-[44px] text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface text-ink-secondary hover:text-ink hover:bg-border/60 border border-border/60"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Posts Count Indicator */}
      <div className="flex items-center justify-between text-sm text-ink-secondary">
        <p>
          Showing <span className="font-semibold text-ink">{paginatedPosts.length}</span> of{" "}
          <span className="font-semibold text-ink">{filteredPosts.length}</span> articles
        </p>
      </div>

      {/* Grid of Blog Posts (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border">
          <h3 className="font-heading text-xl font-bold text-ink">No articles found</h3>
          <p className="mt-2 text-sm text-ink-secondary">
            There are currently no articles in this category. Check back soon!
          </p>
          <button
            onClick={() => handleCategoryChange("All")}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest-hover transition-colors"
          >
            View All Articles
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => { setCurrentPage((prev) => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={currentPage === 1}
            className="px-4 py-2.5 min-h-[44px] rounded-lg border border-border bg-surface text-sm font-medium text-ink hover:bg-border/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1.5 px-3 text-sm font-medium text-ink">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => { setCurrentPage((prev) => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={currentPage === totalPages}
            className="px-4 py-2.5 min-h-[44px] rounded-lg border border-border bg-surface text-sm font-medium text-ink hover:bg-border/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
