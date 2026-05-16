"use client";

import { useState, useMemo } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoBlock } from "@/components/sections/BentoBlock";
import { CATEGORY_LABELS } from "@/utils/constants";
import { chunk } from "@/utils/chunk";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/utils/cn";
import { copy } from "@/utils/copy";

const CATEGORIES: (ProjectCategory | "all")[] = [
  "all",
  "branding",
  "motion-design",
  "social-media",
  "posters",
  "packaging",
  "ui-ux",
];

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects]
  );

  const blocks = useMemo(() => chunk(filtered, 3), [filtered]);

  return (
    <section id="portfolio" className="section-padding !pt-16 !pb-0">
      <div className="container-premium mb-12 md:mb-16">
        <SectionHeading
          label={copy.portfolio.label}
          title={copy.portfolio.title}
          subtitle={copy.portfolio.subtitle}
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2 text-xs tracking-widest uppercase rounded-full border transition-all duration-300",
                filter === cat
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
              )}
              data-cursor
            >
              {cat === "all" ? copy.portfolio.all : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {blocks.length === 0 ? (
          <p className="text-center text-white/40 py-24 container-premium">
            {copy.portfolio.empty}
          </p>
        ) : (
          blocks.map((group, i) => (
            <BentoBlock key={`bento-${i}-${group.map((p) => p.id).join("-")}`} projects={group} />
          ))
        )}
      </div>
    </section>
  );
}
