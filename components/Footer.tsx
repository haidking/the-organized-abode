import Link from "next/link";
import { categoryLabels } from "@/data/recipes";

const categoryLinks = Object.entries(categoryLabels).map(([slug, label]) => ({
  href: `/recipes?category=${slug}`,
  label,
}));

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.93 3.36.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.1-.95-.2-2.4.04-3.44.22-.93 1.4-5.96 1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.02-.28 1.2.6 2.18 1.79 2.18 2.15 0 3.8-2.27 3.8-5.54 0-2.9-2.08-4.92-5.05-4.92-3.44 0-5.46 2.58-5.46 5.25 0 1.04.4 2.16.9 2.76.1.12.11.22.08.34-.09.36-.28 1.2-.32 1.37-.05.22-.18.27-.41.16-1.54-.72-2.5-2.96-2.5-4.77 0-3.88 2.82-7.45 8.12-7.45 4.26 0 7.58 3.04 7.58 7.1 0 4.24-2.67 7.65-6.38 7.65-1.25 0-2.42-.65-2.82-1.41l-.77 2.92c-.28 1.07-1.03 2.4-1.53 3.21.15.05.3.07.46.07 1.04 0 1.99-.55 2.42-1.39.16-.28.74-1.36.74-1.36.38.74 1.5 1.39 2.54 1.39 2.88 0 5.34-1.87 5.34-4.96 0-2.13-1.3-3.94-3.13-3.94-1.62 0-2.6 1.08-2.6 2.22 0 .23.04.46.13.67l-1.18 4.85c-.17.71-.27 1.22-.27 1.22l-.01.01C9.4 23.7 8.53 24 7.66 24c-1.6 0-3.07-.92-3.78-2.36C3.26 20.37 3 18.92 3 17.45 3 9.34 9.23 3 16.7 3c5.43 0 9.3 3.85 9.3 9.03 0 5.38-3.02 8.7-7.18 8.7-1.43 0-2.77-.74-3.22-1.62-.45.88-1.05 1.62-2.22 1.62z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-footer-text mt-12">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + description + social */}
          <div>
            <h2 className="font-heading italic text-2xl font-bold text-accent">
              The Better Home Recipes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-footer-text/80">
              Simple, real recipes for home kitchens — better than the original.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/thebetterhomerecipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://pinterest.com/thebetterhomerecipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
                aria-label="Pinterest"
              >
                <PinterestIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Recipes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-footer-text">
              Recipes
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-footer-text/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Site */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-footer-text">
              Site
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-footer-text/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Follow Along */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-footer-text">
              Follow Along
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="https://pinterest.com/thebetterhomerecipes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-footer-text/80 hover:text-accent transition-colors"
              >
                <PinterestIcon className="h-4 w-4" />
                Pinterest
              </a>
              <p className="text-footer-text/80">
                <span className="font-semibold text-footer-text">26k</span> monthly views
              </p>
              <a
                href="https://instagram.com/thebetterhomerecipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-text/80 hover:text-accent transition-colors"
              >
                @thebetterhomerecipes
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-footer-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-footer-muted">
            © {year} The Better Home Recipes. All rights reserved.
          </p>
          <p className="text-[13px] text-footer-muted text-center sm:text-right">
            As an Amazon Associate we earn from qualifying purchases. This site uses
            Google AdSense to display ads.
          </p>
        </div>
      </div>
    </footer>
  );
}