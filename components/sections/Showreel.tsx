"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/utils/constants";
import { copy } from "@/utils/copy";
import { toEmbedVideoUrl } from "@/utils/video-embed";

const showreelEmbedSrc = toEmbedVideoUrl(SITE.showreel, { autoplay: true });

export function Showreel() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="showreel" className="section-padding relative">
      <div className="container-premium">
        <SectionHeading
          label={copy.showreel.label}
          title={copy.showreel.title}
          subtitle={copy.showreel.subtitle}
        />

        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setModalOpen(true)}
          data-cursor
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-white/10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <span className="text-sm tracking-widest uppercase text-white/80">
              {copy.showreel.play}
            </span>
            <span className="text-xs text-white/50">2025</span>
          </div>
        </motion.div>
      </div>

      {/* Video modal */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm tracking-widest uppercase"
            >
              {copy.showreel.close}
            </button>
            {showreelEmbedSrc ? (
              <iframe
                src={showreelEmbedSrc}
                title="Showreel"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <p className="flex h-full items-center justify-center text-white/60 text-sm">
                URL vidéo invalide — utilisez un lien YouTube ou Vimeo.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
