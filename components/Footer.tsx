import Link from "next/link";
import { categoryLabels } from "@/data/recipes";

const categoryLinks = Object.entries(categoryLabels).map(([slug, label]) => ({
  href: `/recipes?category=${slug}`,
  label,
}));

const siteLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
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
              {/* Pinterest only - no Instagram */}
              <a
                href="https://www.pinterest.com/thebetterhomerecipes/"
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
                href="https://www.pinterest.com/thebetterhomerecipes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-footer-text/80 hover:text-accent transition-colors"
              >
                <PinterestIcon className="h-4 w-4" />
                Pinterest
              </a>
              <p className="text-footer-text/80">
                <span className="font-semibold text-footer-text">100k</span> monthly views
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-footer-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-footer-muted">
            © {year} The Better Home Recipes. All rights reserved.
          </p>
          <p className="text-[13px] text-footer-muted text-center sm:text-right">
            As an Amazon Associate I earn from qualifying purchases. This site uses
            Google AdSense to display ads.
          </p>
        </div>
      </div>
    </footer>
  );
}