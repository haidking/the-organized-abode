"use client";

import Script from "next/script";

interface Props {
  url: string;
  media: string;
  description: string;
}

/**
 * Pinterest Save button — renders a Pin.it button that opens the Pinterest
 * create pin dialog with pre-filled URL, image, and description.
 * The Pinterest SDK (pinit.js) is loaded once via next/script.
 */
export default function PinItButton({ url, media, description }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedMedia = encodeURIComponent(media);
  const encodedDescription = encodeURIComponent(description);
  const href = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedDescription}`;

  return (
    <>
      <Script
        id="pinterest-sdk"
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="lazyOnload"
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
        data-pin-do="buttonPin"
        data-pin-tall="true"
        aria-label={`Save "${description}" to Pinterest`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.52-.67-.86-1.86-.86-2.55 0-1.64 1.05-3.06 2.52-3.06 1.10 1.7.57 1.7 1.30 .84-.42.06-1.32.06-1.4 0-2.23-1.4-2.23-3.4 0-2.51.78-3.9 3.44-3.9 2.15 0 3.22 1.7 3.22 3.35 0 2.37-1.42 4.73-1.42 6.2 0 .85.42 1.721.2 2.32.37.28.6.8.67 1.4.03.36.03.65.03.95C20.88 21.55 24 17.23 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        Save
      </a>
    </>
  );
}