import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

/* ── Fonts ──────────────────────────────────────────────────────────────── */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "The Organized Abode — Real Recipes. Real Simple.",
    template: "%s | The Organized Abode",
  },
  description:
    "A clean, simple recipe site for real home cooking — copycat, one-pan, drinks, meal prep and more.",
  metadataBase: new URL("https://theorganizedabode.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Organized Abode",
    title: "The Organized Abode — Real Recipes. Real Simple.",
    description:
      "A clean, simple recipe site for real home cooking — copycat, one-pan, drinks, meal prep and more.",
  },
  twitter: { card: "summary_large_image" },
};

/* ── Layout ─────────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* ─── Nav ─── */}
        <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="font-heading text-xl font-bold text-ink hover:text-highlight transition-colors">
              The Organized Abode
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/recipes" className="text-ink-secondary hover:text-highlight transition-colors">
                Recipes
              </Link>
              <Link href="/about" className="text-ink-secondary hover:text-highlight transition-colors">
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* ─── Main ─── */}
        <main className="flex-1">{children}</main>

        {/* ─── Footer ─── */}
        <footer className="border-t border-border bg-surface mt-12">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <p className="text-xs text-ink-secondary leading-relaxed">
              © {new Date().getFullYear()} The Organized Abode. All rights
              reserved. Disclosure: This site contains affiliate links.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
