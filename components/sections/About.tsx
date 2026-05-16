"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEFAULT_STATS } from "@/utils/constants";
import { copy } from "@/utils/copy";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  const stats = [
    { label: copy.about.stats.projects, value: DEFAULT_STATS.projects, suffix: "+" },
    { label: copy.about.stats.clients, value: DEFAULT_STATS.clients, suffix: "+" },
    { label: copy.about.stats.years, value: DEFAULT_STATS.years, suffix: "" },
  ];

  return (
    <section id="about" className="section-padding bg-[#111111]/50">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <SectionHeading
            label={copy.about.label}
            title={copy.about.title}
            subtitle="Designer graphique et motion designer passionné par les expériences visuelles cinématiques."
          />

          <div className="space-y-6 text-[#F5F5F5]/70 leading-relaxed text-lg">
            <p data-reveal>
              Je suis <strong className="text-white">Chacross Mafuala</strong>, créatif
              basé en République Démocratique du Congo. Mon travail fusionne
              design graphique, motion design et storytelling visuel pour des marques
              ambitieuses.
            </p>
            <p data-reveal>
              De l&apos;identité de marque aux campagnes social media, en passant par
              l&apos;UI/UX et le packaging — chaque projet est une opportunité de créer
              quelque chose d&apos;unique, mémorable et premium.
            </p>
            <p data-reveal>
              Ma vision : transformer des idées en expériences immersives qui captivent,
              inspirent et laissent une empreinte durable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm tracking-widest uppercase text-[#F5F5F5]/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
