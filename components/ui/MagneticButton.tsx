"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/utils/cn";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  /** Angles droits au lieu du pilule rounded-full */
  square?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  square = false,
  className,
  type = "button",
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25);

  const base = cn(
    "relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-500 overflow-hidden group",
    variant === "primary" &&
      cn(
        "bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white",
        square ? "rounded-none" : "rounded-full"
      ),
    variant === "outline" &&
      cn(
        "border border-white/20 text-[#F5F5F5] hover:border-white/50",
        square ? "rounded-none" : "rounded-full"
      ),
    variant === "ghost" && "text-[#F5F5F5]/70 hover:text-white",
    className
  );

  const inner = (
    <>
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <Link href={href} className={base} data-cursor>
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <button type={type} onClick={onClick} className={base} data-cursor>
        {inner}
      </button>
    </div>
  );
}
