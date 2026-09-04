import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — The Better Home Recipes",
  description:
    "Get in touch with The Better Home Recipes — recipe requests, feedback, press inquiries, or partnership questions. We respond to every genuine message.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | The Better Home Recipes",
    description:
      "Recipe requests, feedback, and partnership inquiries — get in touch with The Better Home Recipes team.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-4">
        Contact Us
      </h1>

      <p className="text-base leading-relaxed text-ink-secondary mb-8">
        Whether you have a recipe request, a question about a technique, feedback on an existing recipe,
        or a partnership inquiry — we read every message and try to reply to genuine ones within a few days.
      </p>

      {/* Email block */}
      <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8 space-y-4 mb-10">
        <h2 className="font-heading text-lg font-bold text-ink">Email</h2>
        <p className="text-sm text-ink-secondary">
          This is the best way to reach us for recipe requests, corrections, or partnership inquiries.
        </p>
        <a
          href="mailto:syedhaider0727@gmail.com"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-forest-hover transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          syedhaider0727@gmail.com
        </a>
      </div>

      {/* What to include */}
      <div className="space-y-5 text-base leading-relaxed text-ink-secondary">
        <h2 className="font-heading text-xl font-bold text-ink">What to include in your message</h2>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-accent text-lg leading-none mt-0.5">→</span>
            <div>
              <strong className="text-ink">Recipe Requests:</strong>{" "}
              Tell us which restaurant dish or recipe you&apos;d like to see. Specific details (which location,
              which menu item, any dietary preferences) help us create something actually useful.
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-accent text-lg leading-none mt-0.5">→</span>
            <div>
              <strong className="text-ink">Recipe Corrections:</strong>{" "}
              If you tried a recipe and something didn&apos;t work — an incorrect measurement, a missing step,
              or an ingredient that needs clarification — please let us know. We genuinely appreciate it and
              will update the recipe.
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-accent text-lg leading-none mt-0.5">→</span>
            <div>
              <strong className="text-ink">Partnership &amp; Collaboration:</strong>{" "}
              For press, brand partnership, or collaboration inquiries, please include your website or
              social profile and a brief description of what you have in mind.
            </div>
          </div>
        </div>

        <p className="text-sm text-ink-secondary/80 mt-6 border-t border-border pt-4">
          We do not respond to unsolicited SEO, link-buying, or guest post pitches. Recipe and cooking
          questions are always welcome.
        </p>
      </div>
    </section>
  );
}
