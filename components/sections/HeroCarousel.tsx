"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import type { HeroSlide } from "@/utils/constants";
import { copy } from "@/utils/copy";

const AUTOPLAY_MS = 6000;

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const count = slides.length;
  const current = slides[index];

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { scale: 1 },
      { scale: 1.08, duration: AUTOPLAY_MS / 1000, ease: "none" }
    );
  }, [index]);

  if (!current || count === 0) return null;

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
      aria-roledescription="carousel"
      aria-label={copy.hero.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) next();
          else prev();
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
            aria-label={copy.hero.slidePrev}
            data-cursor
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
            aria-label={copy.hero.slideNext}
            data-cursor
          >
            <ChevronRight />
          </button>
        </>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 z-20 pb-28 md:pb-32 pt-24 text-center px-6"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-text"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              {current.title}
            </h1>
            {current.subtitle && (
              <p className="mt-3 md:mt-4 text-sm md:text-base text-white/70 tracking-wide font-sans">
                {current.subtitle}
              </p>
            )}
            {current.href && (
              <Link
                href={current.href}
                className="inline-block mt-6 text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
                data-cursor
              >
                {copy.hero.viewWork}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-500 ${
                i === index
                  ? "w-10 bg-white"
                  : "w-6 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={copy.hero.goToSlide(i + 1)}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
