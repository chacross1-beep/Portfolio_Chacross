"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";

interface BentoProjectTileProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

export function BentoProjectTile({
  project,
  className,
  priority = false,
}: BentoProjectTileProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden bg-[#111111]",
        className
      )}
      data-cursor
    >
      <Image
        src={project.cover_image}
        alt={project.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-heading text-lg md:text-xl lg:text-2xl text-white transition-transform duration-500 group-hover:-translate-y-1">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
