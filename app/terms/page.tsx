import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — The Better Home Recipes",
  description:
    "Terms of use for The Better Home Recipes website, including content ownership, permitted use, limitations of liability, and how to report issues.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | The Better Home Recipes",
    description: "Terms of use for The Better Home Recipes website.",
    type: "website",
  },
};

const LAST_UPDATED = "September 4, 2026";

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-2">
        Terms of Use
      </h1>
      <p className="text-sm text-ink-secondary mb-8">
        Last Updated: {LAST_UPDATED}
      </p>

      <div className="space-y-8 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using The Better Home Recipes (thebetterhomerecipes.com), you agree to
            be bound by these Terms of Use. If you do not agree with any part of these terms, please do
            not use this website. We reserve the right to update these terms at any time; continued use
            of the website after changes constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Content Ownership
          </h2>
          <p className="mb-3">
            All content on this website — including recipes, written guides, photographs, and design
            elements — is the property of The Better Home Recipes unless explicitly stated otherwise.
            This content is protected by copyright.
          </p>
          <p>
            You are welcome to share a link to any recipe or article on this site. You may also print
            a recipe for personal, non-commercial kitchen use. However, you may not reproduce, republish,
            copy, or redistribute our written content or images on any other website, publication, or
            platform without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Permitted Personal Use
          </h2>
          <p>
            The recipes and guides on this site are provided for personal, non-commercial home cooking
            use. You may adapt recipes for your household. If you share a recipe adaptation publicly
            (on a blog, social media, etc.), we ask that you credit The Better Home Recipes with a link
            to the original recipe page.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Accuracy of Information
          </h2>
          <p className="mb-3">
            We make reasonable efforts to ensure the accuracy of recipes and information published on
            this site. However, cooking results vary based on equipment, ingredient brands, altitude,
            technique, and individual preference. We cannot guarantee identical results for every cook.
          </p>
          <p>
            Nutritional information, where provided, is estimated from standard ingredient databases
            and should be considered approximate. This site is not a substitute for professional
            nutritional, medical, or dietary advice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Third-Party Links
          </h2>
          <p>
            This website contains links to third-party websites, including Amazon product pages (through
            our affiliate program) and Gumroad (for digital recipe books). These external sites have
            their own terms and privacy policies, which we encourage you to review. We are not
            responsible for the content, policies, or practices of any third-party websites.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, The Better Home Recipes shall not be liable for any
            indirect, incidental, or consequential damages arising from the use of this website or the
            recipes and information provided herein. This includes, but is not limited to, cooking
            accidents, foodborne illness resulting from improper technique, or allergic reactions caused
            by failure to check ingredient labels.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Governing Law
          </h2>
          <p>
            These terms are governed by applicable law. Any disputes arising from use of this website
            will be resolved in the appropriate jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Contact
          </h2>
          <p>
            If you have questions about these Terms of Use, please contact us at{" "}
            <a
              href="mailto:syedhaider0727@gmail.com"
              className="text-accent hover:underline"
            >
              syedhaider0727@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
