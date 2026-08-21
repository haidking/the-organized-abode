"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdUnit({
  slot = "8551069083",
  format = "auto",
  responsive = true,
  className = "my-8 min-h-[90px] w-full text-center overflow-hidden flex justify-center items-center",
}: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Suppress ad reload warnings in dev mode
    }
  }, []);

  return (
    <div className={className} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px" }}
        data-ad-client="ca-pub-3927086411410112"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
