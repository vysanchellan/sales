"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroSearch } from "@/components/HeroSearch";
import { LogoMark } from "@/components/Logo";
import { EASE } from "@/lib/animations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=80";

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
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24"
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
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        {/* drifting gradient-mesh orbs for depth */}
        <div className="blob-drift absolute -left-40 top-10 h-[46vw] w-[46vw] rounded-full bg-gold/10 blur-[120px]" />
        <div
          className="blob-drift absolute -right-40 bottom-0 h-[42vw] w-[42vw] rounded-full bg-indigo/15 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Brand mark draws itself on as the page loads */}
        <LogoMark size={110} animate className="mb-4" />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: EASE.outExpo }}
          className="mb-6 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-light"
        >
          Private Brokerage · Est. 1998
        </motion.span>

        <TextReveal
          as="h1"
          text="Homes that outlast the [[people]] who build them"
          className="font-display text-4xl leading-[1.05] text-cloud sm:text-6xl md:text-7xl"
          stagger={0.07}
          delay={1.75}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9, ease: EASE.outExpo }}
          className="mt-6 max-w-xl text-base text-mist md:text-lg"
        >
          A curated portfolio of architecturally significant estates, penthouses and land across
          Europe — represented with discretion and an eye for the enduring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 1, ease: EASE.outExpo }}
          className="mt-10 flex w-full justify-center"
        >
          <HeroSearch />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
