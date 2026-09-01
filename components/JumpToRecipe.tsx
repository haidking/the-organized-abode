"use client";

import { useState, useEffect } from "react";

/* ── Jump to Recipe button — sticky on mobile, scrolls to target ───────── */

interface Props {
  targetId: string;          // e.g. "ingredients"
  label?: string;            // default: "Jump to Recipe"
  showAfterPx?: number;      // scroll distance before showing (default 400)
}

export default function JumpToRecipe({
  targetId,
  label = "Jump to Recipe",
  showAfterPx = 400,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setVisible(window.scrollY > showAfterPx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterPx]);

  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus({ preventScroll: true });
    }
  };

  // Don't render on server; only after mount to avoid hydration mismatch
  if (!mounted || !visible) return null;

  return (
    <button
      onClick={scrollToTarget}
      className="fixed bottom-[80px] right-4 lg:bottom-6 lg:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-200 animate-slide-up"
      aria-label={label}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-6-6m6 6H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {label}
    </button>
  );
}