"use client";

import { motion } from "framer-motion";
import { CLIENT_LOGOS } from "@/utils/constants";
import { copy } from "@/utils/copy";
import { ClientLogoImage } from "@/components/ui/ClientLogoImage";

const logos = CLIENT_LOGOS.filter((c) => c.logo);

function LogoGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="marquee-group flex shrink-0 list-none m-0 p-0 items-center"
      aria-hidden={ariaHidden ? true : undefined}
    >
      {logos.map((client) => (
        <li key={`${client.id}${ariaHidden ? "-dup" : ""}`} className="marquee-item shrink-0">
          <ClientLogoImage
            src={client.logo!}
            alt={client.name}
            display={client.display ?? "mono"}
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section id="clients" className="section-padding bg-[#050505]">
      <div className="container-premium mb-12 md:mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-blue-400 mb-4">
            {copy.clients.label}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F5F5F5]">
            {copy.clients.title}
          </h2>
        </motion.div>
      </div>

      {logos.length === 0 ? (
        <p className="text-center text-sm text-[#F5F5F5]/40 px-6 max-w-md mx-auto">
          {copy.clients.emptyLogos}
        </p>
      ) : (
        <div
          className="marquee-outer relative w-full overflow-hidden py-6 md:py-10"
          aria-label={copy.clients.marqueeLabel}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent" />

          <div className="marquee-inner flex w-max">
            <LogoGroup />
            <LogoGroup ariaHidden />
          </div>
        </div>
      )}
    </section>
  );
}
