/** @type {import('next').NextConfig} */

// Security headers applied to every route. The Content-Security-Policy
// deliberately allows Google AdSense + Amazon + Google Fonts alongside self,
// and includes 'unsafe-inline' because Next.js injects inline bootstrap
// scripts. Tighten this before production if AdSense tags change.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://fundingchoicesmessages.google.com https://partner.googleadservices.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://m.media-amazon.com",
      "connect-src 'self' https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://fundingchoicesmessages.google.com",
      "frame-src https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://tpc.googlesyndication.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // All site images are local and self-hosted; nothing is fetched remotely.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
