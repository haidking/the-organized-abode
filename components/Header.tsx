"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthorAvatar from "@/components/AuthorAvatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
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
          <AuthorAvatar size="nav" ring={false} />
          The Better Home Recipes
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
          <Link
            href="/recipes"
            className="bg-accent text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-accent-hover transition-all duration-300 hidden sm:inline-flex"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
}