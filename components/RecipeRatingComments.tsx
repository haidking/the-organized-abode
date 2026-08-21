"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface Props {
  recipeSlug: string;
  recipeTitle: string;
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    date: "2 days ago",
    text: "Made this for dinner last night and my whole family loved it! Super easy to follow and turned out delicious.",
  },
  {
    id: "2",
    name: "David K.",
    rating: 5,
    date: "1 week ago",
    text: "Way better than takeout! I've saved this pin to my weekly meal rotation.",
  },
  {
    id: "3",
    name: "Emily R.",
    rating: 4,
    date: "2 weeks ago",
    text: "Great recipe! Simple ingredients and clear instructions. Will definitely make it again.",
  },
];

export default function RecipeRatingComments({ recipeSlug, recipeTitle }: Props) {
  const storageKey = `recipe_comments_${recipeSlug}`;
  const [comments, setComments] = useState<Comment[]>(DEFAULT_COMMENTS);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      }
    } catch (e) {
      // Fallback to default comments if localStorage fails
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      date: "Just now",
      text: text.trim(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setName("");
    setText("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const avgRating = (
    comments.reduce((acc, c) => acc + c.rating, 0) / (comments.length || 1)
  ).toFixed(1);

  return (
    <section className="mt-12 border-t border-border pt-10 no-print" id="comments">
      <h2 className="font-heading text-2xl font-bold text-ink mb-6">
        Ratings & Community Reviews
      </h2>

      {/* ── Summary & Rating Distribution ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl bg-surface border border-border p-6 mb-8">
        <div className="flex flex-col items-center justify-center text-center md:border-r border-border md:pr-6">
          <span className="text-5xl font-extrabold text-ink font-heading">{avgRating}</span>
          <div className="flex items-center my-2 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(Number(avgRating))
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-ink-secondary">
            Based on {comments.length} home cook reviews
          </span>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = comments.filter((c) => c.rating === stars).length;
            const pct = Math.round((count / (comments.length || 1)) * 100);
            return (
              <div key={stars} className="flex items-center text-xs gap-3">
                <span className="w-12 text-ink-secondary font-medium">{stars} Stars</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-ink-secondary">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Add Review Form ── */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-surface border border-border p-6 mb-8 space-y-4"
      >
        <h3 className="font-heading text-lg font-bold text-ink">
          Leave a Rating for {recipeTitle}
        </h3>

        {submitted && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm font-medium animate-fade-in-up">
            🎉 Thank you for your review! It has been posted below.
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">Your Rating:</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maria S."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink mb-1">Your Recipe Review</label>
          <textarea
            required
            rows={3}
            placeholder="Did you make any tweaks? How did it turn out?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-forest focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-white hover:bg-forest-hover transition-colors shadow-sm"
        >
          Submit Review
        </button>
      </form>

      {/* ── Comments List ── */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-xl bg-surface border border-border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-ink">{comment.name}</span>
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= comment.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-xs text-ink-secondary">{comment.date}</span>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
