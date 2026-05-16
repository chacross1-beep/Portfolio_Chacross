"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <motion.span
          data-reveal
          className="inline-block text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        data-reveal
        className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F5F5F5]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          data-reveal
          className={cn(
            "mt-6 text-lg text-[#F5F5F5]/60 max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
