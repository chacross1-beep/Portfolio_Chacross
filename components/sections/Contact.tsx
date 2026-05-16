"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialIcon } from "@/components/contact/SocialIcon";
import type { SocialBrand } from "@/components/contact/SocialIcon";
import { SITE } from "@/utils/constants";
import { copy } from "@/utils/copy";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const fieldClass =
  "w-full px-5 py-4 rounded-none bg-[#111111] border border-white/10 text-[#F5F5F5] placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors";

const socialLinks: { brand: SocialBrand; href: string; label: string }[] = [
  { brand: "facebook", href: SITE.social.facebook, label: "Facebook" },
  { brand: "instagram", href: SITE.social.instagram, label: "Instagram" },
  { brand: "behance", href: SITE.social.behance, label: "Behance" },
  { brand: "tiktok", href: SITE.social.tiktok, label: "TikTok" },
  { brand: "linkedin", href: SITE.social.linkedin, label: "LinkedIn" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.from("contact_messages").insert(form);
        if (error) throw error;
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const waLink = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="section-padding relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15), transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.1), transparent 50%)",
        }}
      />
      <div className="container-premium relative z-10">
        <SectionHeading
          label={copy.contact.label}
          title={copy.contact.title}
          subtitle={copy.contact.subtitle}
          align="center"
        />

        <div className="w-full max-w-xl mx-auto space-y-0">
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-full">
            <input
              type="text"
              placeholder={copy.contact.placeholders.name}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={fieldClass}
            />
            <input
              type="email"
              placeholder={copy.contact.placeholders.email}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={fieldClass}
            />
            <textarea
              placeholder={copy.contact.placeholders.message}
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${fieldClass} resize-none`}
            />
            <MagneticButton type="submit" variant="primary" square className="w-full">
              {status === "loading" ? copy.contact.sending : copy.contact.send}
            </MagneticButton>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-none border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-all group shrink-0"
              data-cursor
            >
              <div className="size-12 rounded-none bg-green-500/20 flex items-center justify-center text-green-400 text-xl font-semibold shrink-0">
                WA
              </div>
              <div className="min-w-0 text-left">
                <p className="font-medium text-[#F5F5F5]">WhatsApp</p>
                <p className="text-sm text-[#F5F5F5]/50">{copy.contact.whatsappDirect}</p>
              </div>
            </a>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center">{copy.contact.success}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">{copy.contact.error}</p>
            )}
          </form>
        </div>

        <nav
          className="flex flex-wrap justify-center gap-3 mt-12 max-w-xl mx-auto w-full"
          aria-label="Réseaux sociaux"
        >
          {socialLinks.map(({ brand, href, label }) => (
            <a
              key={brand}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-14 shrink-0 items-center justify-center rounded-none text-white/60 hover:text-white transition-all"
              aria-label={label}
              data-cursor
            >
              <SocialIcon brand={brand} />
            </a>
          ))}
        </nav>

        <p className="text-center text-[#F5F5F5]/40 text-sm mt-10 max-w-xl mx-auto w-full">
          {copy.contact.email} :{" "}
          <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
