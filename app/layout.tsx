import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import AuthorAvatar from "@/components/AuthorAvatar";
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
    default: "The Better Home Recipes — Real Recipes. Real Simple.",
    template: "%s | The Better Home Recipes",
  },
  description:
    "A clean, simple recipe site for real home cooking — copycat, one-pan, drinks, meal prep and more.",
  metadataBase: new URL("https://thebetterhomerecipes.com"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Better Home Recipes",
    title: "The Better Home Recipes — Real Recipes. Real Simple.",
    description:
      "A clean, simple recipe site for real home cooking — copycat, one-pan, drinks, meal prep and more.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ── Layout ─────────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      {/* ADSENSE SCRIPT GOES HERE — replace with actual AdSense verification script after account approval */}
      <body className="min-h-screen flex flex-col">
        {/* ─── Nav ─── */}
        <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-lg sm:text-xl font-bold text-ink hover:text-highlight transition-colors text-center"
            >
              <AuthorAvatar size="nav" ring={false} />
              The Better Home Recipes
            </Link>
            <div className="flex items-center gap-5 sm:gap-6 text-sm font-medium">
              <Link href="/" className="text-ink-secondary hover:text-highlight transition-colors">
                Home
              </Link>
              <Link href="/recipes" className="text-ink-secondary hover:text-highlight transition-colors">
                Recipes
              </Link>
              <Link href="/about" className="text-ink-secondary hover:text-highlight transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-ink-secondary hover:text-highlight transition-colors">
                Contact
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
              © {new Date().getFullYear()} The Better Home Recipes. All rights
              reserved.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-secondary">
              <Link href="/privacy-policy" className="hover:text-highlight transition-colors">
                Privacy Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/disclaimer" className="hover:text-highlight transition-colors">
                Disclaimer
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/contact" className="hover:text-highlight transition-colors">
                Contact
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-secondary leading-relaxed">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
            <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
              This site uses Google AdSense to display ads.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
