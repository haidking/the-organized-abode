"use client";

import { useState, useEffect } from "react";

/**
 * Back-to-top button — appears after 600px of scroll.
 * Positioned above BottomNav on mobile (bottom-[80px]) and at bottom-6 on desktop.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[80px] left-4 lg:bottom-6 lg:left-auto lg:right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-border shadow-md text-ink-secondary hover:text-accent hover:border-accent hover:shadow-lg transition-all duration-200"
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
