import Link from "next/link";
import { SITE } from "@/utils/constants";
import { copy } from "@/utils/copy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-16 md:py-24">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-semibold text-[#F5F5F5] mb-4">
              {SITE.name}
            </p>
            <p className="text-[#F5F5F5]/50 text-sm max-w-xs">
              {copy.footer.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-[#F5F5F5]/50">
            <Link
              href={SITE.social.instagram}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
            <Link
              href={SITE.social.behance}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </Link>
            <Link
              href={SITE.social.linkedin}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-[#F5F5F5]/30">
          <span>
            {copy.footer.rights(year, SITE.name)}
          </span>
          <span>{copy.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
