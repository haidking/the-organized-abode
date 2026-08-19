"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/recipes", label: "Recipes", icon: RecipesIcon },
  { href: "/recipes", label: "Search", icon: SearchIcon },
  { href: "/recipes", label: "Categories", icon: CategoriesIcon },
] as const;

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function RecipesIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CategoriesIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path d="M3 3h18M3 9h18M3 15h18M3 21h18" />
    </svg>
  );
}

/**
 * Fixed bottom navigation bar for mobile (hidden lg+).
 * 4 equal-width tap targets, min 44px height.
 */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-t border-border safe-area-inset-bottom" aria-label="Main navigation">
      <ul className="grid grid-cols-4">
        {navItems.map((item, i) => {
          const isActive =
            (item.href === "/" && pathname === "/") ||
            (item.href === "/recipes" && pathname.startsWith("/recipes"));

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={[
                  "flex flex-col items-center justify-center gap-1 px-2 py-3 min-h-[60px] transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-ink-secondary active:text-ink",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon active={isActive} />
                <span className="text-[11px] font-medium leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}