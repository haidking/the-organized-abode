import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclosure and disclaimer for The Better Home Recipes — affiliate relationships (Amazon Associates) and the informational nature of our recipes.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | The Better Home Recipes",
    description:
      "Affiliate disclosure and content disclaimer for The Better Home Recipes.",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-8">
        Disclaimer
      </h1>

      <div className="space-y-8 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Affiliate Disclosure
          </h2>
          <p className="mb-3">
            The Better Home Recipes participates in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to
            provide a means for sites to earn advertising fees by advertising and
            linking to Amazon.com.
          </p>
          <p className="mb-3">
            Some of the links on this site are affiliate links. If you click on
            one of these links and make a purchase, we may earn a small commission
            from the retailer — at no additional cost to you. The commission is
            paid by the retailer, not by you, and never affects the price you pay.
          </p>
          <p>
            We only recommend products and equipment we genuinely use and believe
            in. However, as an independent site, we cannot guarantee availability
            or pricing of any third-party product, and all opinions expressed are
            our own.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-ink mb-3">
            Content Disclaimer
          </h2>
          <p className="mb-3">
            All recipes and other content on The Better Home Recipes are provided
            for informational purposes only. While we test every recipe and do
            our best to be accurate, results may vary based on your equipment,
            ingredients, altitude and technique.
          </p>
          <p className="mb-3">
            Nutritional information, when provided, is approximate and is
            estimated from typical ingredient data. It should not be relied upon
            for medical, dietary or allergy management purposes.
          </p>
          <p>
            Nothing on this site is intended as medical, dietary or
            professional advice. If you have specific health concerns,
            food allergies, or dietary requirements, please consult a qualified
            medical professional or registered dietitian before preparing any
            recipe found here.
          </p>
        </section>
      </div>
    </section>
  );
}
