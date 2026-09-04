import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import BackToTop from "@/components/BackToTop";
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
    default: "The Better Home Recipes — Copycat & Home Cooking Recipes",
    template: "%s | The Better Home Recipes",
  },
  description:
    "Copycat restaurant recipes, one-pan dinners, high-protein meal prep, and refreshing drinks — real recipes for real home kitchens. Better than takeout.",
  metadataBase: new URL("https://thebetterhomerecipes.com"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Better Home Recipes",
    title: "The Better Home Recipes — Copycat & Home Cooking Recipes",
    description:
      "Copycat restaurant recipes, one-pan dinners, high-protein meal prep, and drinks — better than takeout, made at home.",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "google-adsense-account": "ca-pub-3927086411410112",
    "google-site-verification": "XCoohoOOwa8l1xTB9Tc3bwNLo9kWuD7F3G7TYuSF_Ig",
    "p:domain_verify": "79031729314fd48a5155006cdb2cd7d6",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ── Layout ─────────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://thebetterhomerecipes.com/#website",
        url: "https://thebetterhomerecipes.com",
        name: "The Better Home Recipes",
        description:
          "Real home cooking recipes — copycat, one-pan, drinks, and meal prep for everyday home kitchens.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://thebetterhomerecipes.com/recipes?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://thebetterhomerecipes.com/#organization",
        name: "The Better Home Recipes",
        url: "https://thebetterhomerecipes.com",
        logo: {
          "@type": "ImageObject",
          url: "https://thebetterhomerecipes.com/The_Better_Home_Recipes_Logo.png",
        },
        sameAs: ["https://www.pinterest.com/thebetterhomerecipes/"],
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* WebSite + Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3927086411410112"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        {/* ─── Main ─── */}
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />

        {/* ─── Bottom mobile nav ─── */}
        <BottomNav />

        {/* ─── Back to top ─── */}
        <BackToTop />

        {/* ─── Vercel Analytics ─── */}
        <Analytics />
      </body>
    </html>
  );
}

