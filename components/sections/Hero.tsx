"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroSearch } from "@/components/HeroSearch";
import { EASE } from "@/lib/animations";

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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      {/* Cinematic parallax backdrop (architectural scene + gradient mesh) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <SkylineScene />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        {/* drifting gradient-mesh orbs */}
        <div className="blob-drift absolute -left-40 top-10 h-[46vw] w-[46vw] rounded-full bg-gold/15 blur-[120px]" />
        <div
          className="blob-drift absolute -right-40 bottom-0 h-[42vw] w-[42vw] rounded-full bg-indigo/20 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE.outExpo }}
          className="mb-6 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-light"
        >
          Private Brokerage · Est. 1998
        </motion.span>

        <TextReveal
          as="h1"
          text="Homes that outlast the [[people]] who build them"
          className="font-display text-4xl leading-[1.05] text-cloud sm:text-6xl md:text-7xl"
          stagger={0.07}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: EASE.outExpo }}
          className="mt-6 max-w-xl text-base text-mist md:text-lg"
        >
          A curated portfolio of architecturally significant estates, penthouses and land across
          Europe — represented with discretion and an eye for the enduring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 1, ease: EASE.outExpo }}
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

/** Layered architectural skyline, drawn as SVG so it stays crisp and light. */
function SkylineScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1730" />
          <stop offset="0.5" stopColor="#241d3a" />
          <stop offset="1" stopColor="#0a0a0f" />
        </linearGradient>
        <radialGradient id="hsun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8cf8f" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e8cf8f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#hsky)" />
      <circle cx="720" cy="330" r="230" fill="url(#hsun)" />
      {/* far ridge */}
      <path d="M0 640 L200 600 L420 660 L680 580 L940 650 L1200 590 L1440 640 V900 H0 Z" fill="#211a35" opacity="0.7" />
      {/* mid buildings */}
      <g fill="#171326" opacity="0.9">
        <rect x="120" y="520" width="120" height="380" />
        <rect x="300" y="470" width="90" height="430" />
        <rect x="430" y="560" width="140" height="340" />
        <rect x="900" y="500" width="110" height="400" />
        <rect x="1050" y="450" width="95" height="450" />
        <rect x="1180" y="540" width="130" height="360" />
      </g>
      {/* foreground tower */}
      <g fill="#0d0b18">
        <rect x="600" y="380" width="240" height="520" />
        <rect x="640" y="330" width="160" height="60" />
      </g>
    </svg>
  );
}
