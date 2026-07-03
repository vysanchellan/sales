"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroSearch } from "@/components/HeroSearch";
import { LogoMark } from "@/components/Logo";
import { EASE } from "@/lib/animations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=80";

/**
 * Editorial hero: asymmetric, left-anchored composition. The brand mark draws
 * on, then the meta rule, headline, standfirst and search settle in sequence.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-12 pt-28 md:px-10"
    >
      {/* Cinematic photographic backdrop with a slow Ken-Burns push + parallax.
          overflow-hidden lives here (not on the section) so hero dropdowns can
          extend beyond the section without being clipped. */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
        >
          <Image
            src={HERO_IMAGE}
            alt="A modern estate at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[1400px]"
      >
        {/* Brand mark draws itself on as the page loads */}
        <LogoMark size={84} animate />

        {/* Meta rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9, ease: EASE.outExpo }}
          className="mt-8 flex items-center gap-4 border-t border-cloud/15 pt-4 text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="text-gold">Virelle</span>
          <span className="hidden sm:inline">Private brokerage</span>
          <span className="ml-auto">Est. 1998 — London · Zürich · Amalfi</span>
        </motion.div>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <TextReveal
            as="h1"
            text="Homes that outlast the [[people]] who build them"
            className="font-display text-5xl leading-[0.98] text-cloud sm:text-6xl md:text-7xl xl:text-8xl"
            stagger={0.07}
            delay={1.7}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: EASE.outExpo }}
            className="max-w-sm justify-self-start text-[15px] leading-relaxed text-mist lg:justify-self-end lg:text-right"
          >
            A deliberately small portfolio of architecturally significant estates, penthouses and
            land across Europe — represented with discretion.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 1, ease: EASE.outExpo }}
          className="mt-12"
        >
          <HeroSearch />
        </motion.div>
      </motion.div>

      {/* Scroll cue — a quiet running line, right edge */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-10 right-5 hidden flex-col items-center gap-3 md:right-10 lg:flex"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-mist"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-cloud/15">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-gold"
            animate={{ y: [-20, 56] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
