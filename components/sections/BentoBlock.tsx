import type { Project } from "@/types";
import { BentoProjectTile } from "@/components/ui/BentoProjectTile";
import { cn } from "@/utils/cn";

interface BentoBlockProps {
  projects: Project[];
  className?: string;
}

export function BentoBlock({ projects, className }: BentoBlockProps) {
  if (projects.length === 0) return null;

  const [main, topRight, bottomRight] = projects;

  return (
    <div
      className={cn(
        "grid gap-1 bg-[#050505]",
        "grid-cols-1 md:grid-cols-[1.2fr_1fr] md:grid-rows-2 md:min-h-[70vh]",
        className
      )}
    >
      <div className="md:hidden flex flex-col gap-1">
        {projects.map((p, i) => (
          <BentoProjectTile
            key={p.id}
            project={p}
            className="relative aspect-[4/5] w-full"
            priority={i === 0}
          />
        ))}
      </div>

      <div className="hidden md:contents">
        <BentoProjectTile
          project={main}
          className="relative md:row-span-2 min-h-[70vh]"
          priority
        />
        {topRight && (
          <BentoProjectTile
            project={topRight}
            className="relative min-h-[35vh]"
          />
        )}
        {bottomRight && (
          <BentoProjectTile
            project={bottomRight}
            className="relative min-h-[35vh]"
          />
        )}
      </div>
    </div>
  );
}
