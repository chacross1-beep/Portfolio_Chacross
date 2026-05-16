"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { NoiseOverlay } from "@/components/animations/NoiseOverlay";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      {children}
    </>
  );
}
