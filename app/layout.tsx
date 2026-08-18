import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <Header />
        {/* ─── Main ─── */}
        <main className="flex-1">{children}</main>
        <Footer />

        {/* ─── Vercel Analytics ─── */}
        <Analytics />
      </body>
    </html>
  );
}
