"use client";

import { useState } from "react";
import Image from "next/image";

interface ClientLogoImageProps {
  src: string;
  alt: string;
  display?: "mono" | "color";
}

export function ClientLogoImage({
  src,
  alt,
  display = "mono",
}: ClientLogoImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className="font-heading text-xs md:text-sm text-[#F5F5F5]/50 uppercase tracking-widest whitespace-nowrap">
        {alt}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={48}
      onError={() => setError(true)}
      className={`h-9 md:h-11 w-auto min-w-[80px] max-w-[180px] md:max-w-[200px] object-contain transition-opacity duration-300 ${
        display === "color"
          ? "opacity-70 hover:opacity-100"
          : "opacity-60 hover:opacity-100 brightness-0 invert"
      }`}
    />
  );
}
