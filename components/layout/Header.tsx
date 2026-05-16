"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { SITE } from "@/utils/constants";
import { copy } from "@/utils/copy";

const NAV = [
  { label: copy.nav.work, href: "#portfolio" },
  { label: copy.nav.showreel, href: "#showreel" },
  { label: copy.nav.about, href: "#about" },
  { label: copy.nav.clients, href: "#clients" },
  { label: copy.nav.contact, href: "#contact" },
];

interface HeaderProps {
  variant?: "default" | "overlay";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOverlay = variant === "overlay" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isOverlay
          ? "py-5 md:py-6 bg-transparent"
          : scrolled
            ? "py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
            : "py-6 bg-transparent"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          isOverlay ? "px-6 md:px-10 lg:px-14" : "container-premium"
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            isOverlay ? "text-white" : "text-[#F5F5F5]"
          )}
          data-cursor
        >
          {isOverlay ? (
            <LogoBars />
          ) : (
            <>
              CM<span className="text-blue-500">.</span>
            </>
          )}
        </Link>

        {isOverlay ? (
          <div className="flex items-center gap-6 md:gap-8">
            <button
              type="button"
              className="lg:hidden flex flex-col gap-2 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={copy.nav.menu}
            >
              <span className="block w-6 h-px bg-white" />
              <span className="block w-6 h-px bg-white" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <button
                type="button"
                className="flex flex-col gap-2 p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={copy.nav.menu}
                data-cursor
              >
                <span className="block w-6 h-px bg-white" />
                <span className="block w-6 h-px bg-white" />
              </button>
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
                aria-label={copy.nav.search}
                data-cursor
              >
                <SearchIcon />
              </Link>
            </nav>

            <Link
              href="#contact"
              className="hidden sm:inline-flex text-xs tracking-[0.2em] uppercase text-white border border-white px-5 py-2.5 hover:bg-white/10 transition-colors"
              data-cursor
            >
              {copy.nav.contact}
            </Link>
          </div>
        ) : (
          <>
            <nav className="hidden lg:flex items-center gap-10">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#F5F5F5]/60 hover:text-white transition-colors tracking-wide"
                  data-cursor
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              className="hidden lg:inline-flex text-sm font-medium text-[#F5F5F5] border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/5 transition-all"
              data-cursor
            >
              {copy.nav.letsTalk}
            </Link>

            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={copy.nav.menu}
            >
              <span
                className={cn(
                  "block w-6 h-px bg-white transition-all",
                  menuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-px bg-white transition-all",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-px bg-white transition-all",
                  menuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8"
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-heading font-bold text-[#F5F5F5]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <p className="absolute bottom-8 text-xs text-white/30">{SITE.name}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LogoBars() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="white" aria-hidden>
      <rect x="0" y="2" width="4" height="20" />
      <rect x="8" y="6" width="4" height="16" />
      <rect x="16" y="0" width="4" height="24" />
      <rect x="24" y="4" width="4" height="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}
