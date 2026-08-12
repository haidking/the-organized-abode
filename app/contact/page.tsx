import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Better Home Recipes — questions, recipe requests and feedback welcome.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | The Better Home Recipes",
    description:
      "Get in touch with The Better Home Recipes — questions, recipe requests and feedback welcome.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-6">
          Contact
        </h1>
        <a
          href="mailto:syedhaider0727@gmail.com"
          className="inline-flex items-center gap-2 rounded-full bg-highlight px-6 py-3 text-sm font-semibold text-white shadow-md shadow-highlight/25 hover:bg-highlight/90 transition-colors"
        >
          syedhaider0727@gmail.com
        </a>
      </div>
    </section>
  );
}
