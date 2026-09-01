"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:py-3 sm:px-6">
        {/* Brand / Logo — always visible */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading italic text-base sm:text-xl font-bold text-accent hover:opacity-80 transition-opacity"
          aria-label="The Better Home Recipes - Home"
        >
          <Image
            src="/The_Better_Home_Recipes_Logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain flex-shrink-0"
            priority
            aria-hidden="true"
          />
          <span className="leading-tight">The Better Home Recipes</span>
        </Link>

        {/* Desktop nav links — hidden on mobile (BottomNav handles mobile nav) */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-1 transition-colors relative ${
                pathname === link.href
                  ? "text-accent"
                  : "text-ink-secondary hover:text-accent"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-accent"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
          <Link
            href="/recipes"
            className="bg-forest text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-forest-hover transition-all duration-300 inline-flex"
          >
            Browse Recipes
          </Link>
        </div>

        {/* Mobile: search icon shortcut */}
        <Link
          href="/recipes"
          className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full text-ink-secondary hover:text-accent hover:bg-border/50 transition-colors"
          aria-label="Search recipes"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}