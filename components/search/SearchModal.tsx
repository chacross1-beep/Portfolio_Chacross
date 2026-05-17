"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_LABELS } from "@/utils/constants";
import { copy } from "@/utils/copy";
import type { Project } from "@/types";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open || hasLoaded) return;

    let cancelled = false;
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Project[]) => {
        if (cancelled) return;
        setProjects(Array.isArray(data) ? data : []);
        setHasLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setProjects([]);
        setHasLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, hasLoaded]);

  const loading = open && !hasLoaded;

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return projects.slice(0, 12);

    return projects.filter((p) => {
      const categoryLabel = CATEGORY_LABELS[p.category] ?? p.category;
      const haystack = normalize(
        [p.title, p.excerpt, p.category, categoryLabel].filter(Boolean).join(" ")
      );
      return haystack.includes(q);
    });
  }, [projects, query]);

  const handleResultClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-start justify-center bg-black/90 backdrop-blur-xl p-4 pt-24 md:pt-32"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div className="flex items-center justify-between mb-6">
              <h2
                id="search-modal-title"
                className="font-heading text-lg md:text-xl text-[#F5F5F5]"
              >
                {copy.search.title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs tracking-widest uppercase text-white/50 hover:text-white"
              >
                {copy.search.close}
              </button>
            </motion.div>

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.search.placeholder}
              className="w-full px-5 py-4 bg-[#111111] border border-white/10 text-[#F5F5F5] placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
              autoComplete="off"
            />

            <ul className="mt-4 max-h-[50vh] overflow-y-auto border border-white/5 divide-y divide-white/5">
              {loading ? (
                <li className="px-5 py-8 text-center text-sm text-white/40">…</li>
              ) : results.length === 0 ? (
                <li className="px-5 py-8 text-center text-sm text-white/40">
                  {copy.search.empty}
                </li>
              ) : (
                results.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={handleResultClick}
                      className="block px-5 py-4 hover:bg-white/5 transition-colors"
                    >
                      <p className="font-medium text-[#F5F5F5]">{project.title}</p>
                      <p className="mt-1 text-xs tracking-widest uppercase text-white/40">
                        {CATEGORY_LABELS[project.category]}
                      </p>
                      {project.excerpt && (
                        <p className="mt-2 text-sm text-white/50 line-clamp-2">
                          {project.excerpt}
                        </p>
                      )}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
