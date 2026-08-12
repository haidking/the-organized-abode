import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "The Better Home Recipes privacy policy — what information we collect, how we use it, cookies, and the third-party services (Google AdSense and Amazon Associates) this site works with.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | The Better Home Recipes",
    description:
      "How The Better Home Recipes collects, uses and protects your information, including cookies, Google AdSense and Amazon Associates.",
    type: "website",
  },
};

const LAST_UPDATED = "August 12, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-ink-secondary mb-8">
        Last Updated: {LAST_UPDATED}
      </p>

      <div className="space-y-8 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Information We Collect
          </h2>
          <p className="mb-3">
            We do not require you to create an account to use The Better Home
            Recipes, and we do not collect personal information from you directly
            through forms or subscriptions. The site collects only the
            information that is automatically generated when you visit any
            website, such as your IP address, browser type, device information,
            the pages you view and how long you spend on them.
          </p>
          <p>
            If you contact us by email, we will receive whatever information you
            choose to share in that message so we can respond to your inquiry.
            We only use that information for the purpose of answering you.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            How We Use Information
          </h2>
          <p className="mb-3">
            The information collected automatically is used to understand how
            visitors use the site — which recipes are popular, which pages load
            slowly, and how the site is found in search — so we can improve the
            content and experience for everyone.
          </p>
          <p>
            We never sell your personal information, and we do not share it with
            third parties except as described in this policy (for example, with
            the analytics and advertising services listed below).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Cookies
          </h2>
          <p className="mb-3">
            Like most websites, The Better Home Recipes uses cookies — small text
            files stored on your device. Some cookies are strictly necessary for
            the site to function, while others help us measure traffic and serve
            relevant advertising.
          </p>
          <p>
            You can control or disable cookies through your browser settings at
            any time. Please note that disabling certain cookies may affect how
            the site works for you, though you can still read every recipe.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Third-Party Services
          </h2>
          <p className="mb-3">
            We work with third-party services that may set cookies or use device
            identifiers to provide their services on this site:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-ink">Google AdSense</strong> — displays
              advertisements on this site. Google and its partners may use
              cookies to serve ads based on your prior visits to this and other
              websites. You can opt out of personalized advertising by visiting
              Google&apos;s{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:text-highlight/80 transition-colors"
              >
                Ads Settings
              </a>
              , or the opt-out page at{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:text-highlight/80 transition-colors"
              >
                www.aboutads.info
              </a>
              .
            </li>
            <li>
              <strong className="text-ink">Amazon Associates</strong> — this site
              participates in the Amazon Services LLC Associates Program, an
              affiliate advertising program designed to provide a means for sites
              to earn advertising fees by advertising and linking to
              Amazon.com. Amazon may set cookies to track whether a purchase was
              completed through an affiliate link. See the{" "}
              <a
                href="/disclaimer"
                className="text-highlight hover:text-highlight/80 transition-colors"
              >
                Disclaimer
              </a>{" "}
              for full details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Contact Information
          </h2>
          <p>
            If you have any questions about this Privacy Policy, you can reach us
            at{" "}
            <a
              href="mailto:syedhaider0727@gmail.com"
              className="text-highlight hover:text-highlight/80 transition-colors"
            >
              syedhaider0727@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, or legal requirements. When we
            make changes, we will update the &ldquo;Last Updated&rdquo; date at
            the top of this page. We encourage you to review this page
            periodically to stay informed about how we protect your information.
          </p>
        </section>
      </div>
    </section>
  );
}
