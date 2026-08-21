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
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
        Save
      </a>
    </>
  );
}