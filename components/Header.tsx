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
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading italic text-lg sm:text-xl font-bold text-accent hover:opacity-80 transition-opacity text-center"
          aria-label="The Better Home Recipes - Home"
        >
          <Image
            src="/The_Better_Home_Recipes_Logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 sm:h-[48px] sm:w-[48px] object-contain"
            priority
            aria-hidden="true"
          />
          <span className="hidden sm:inline">The Better Home Recipes</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors relative ${
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
          {/* Mobile search icon - links to recipes page which has the search bar */}
          <Link
            href="/recipes"
            className="p-2 rounded-full text-ink-secondary hover:text-accent hover:bg-border/50 transition-colors lg:hidden"
            aria-label="Search recipes"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
          <Link
            href="/recipes"
            className="bg-forest text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-forest-hover transition-all duration-300 hidden sm:inline-flex"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
}