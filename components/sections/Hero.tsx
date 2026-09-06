"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Logotype } from "@/components/Logo";
import { HeroSearch } from "@/components/HeroSearch";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ===========================================================================
   Full-bleed, cinematic. The photograph carries the first screen, with a slow
   Ken-Burns push and a parallax drift as you leave it.

   Everything sitting on the image uses the theme-invariant plate tokens, so a
   caption over photography is solved once rather than twice — the imagery keeps
   its dark treatment in both light and dark mode and the text never washes out.
   =========================================================================== */

// The Glasshouse at dusk — the most architectural frame in the set, and one
// the title sequence deliberately does not reuse.
const HERO =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();

  // Every hook below runs unconditionally — only whether the resulting values
  // are APPLIED depends on the device. A hook behind a condition that flips
  // after mount changes the hook count and takes the whole app down.
  const cinematic = !coarse && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.95], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-12 pt-32 md:px-12 md:pb-16"
    >
      {/* overflow-hidden lives on the backdrop, not the section, so the search
          dropdowns can extend past it without being clipped. */}
      {/* A scroll-linked transform on a full-screen image costs a frame every
          frame, even once the hero is far off-screen. Phones get the still. */}
      <motion.div
        style={cinematic ? { y: bgY } : undefined}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={cinematic ? { scale: 1.14 } : false}
          animate={cinematic ? { scale: 1 } : undefined}
          transition={{ duration: 16, ease: "easeOut" }}
        >
          <Image
            src={HERO}
            alt="Glasshouse on the Hill, Zollikon — a cantilevered form at dusk"
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </motion.div>
        {/* Only as much scrim as the type actually needs. The sky stays open at
            the top and the photograph reads as a photograph, not a dark panel;
            the weight gathers at the foot and to the left, under the words. */}
        <div className="absolute inset-0 bg-gradient-to-t from-plate via-plate/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-plate/75 via-plate/15 to-transparent" />
      </motion.div>

      <motion.div
        style={cinematic ? { y: contentY, opacity: contentOpacity } : undefined}
        className="mx-auto w-full max-w-[1560px]"
      >
        <Logotype height={40} draw tone="plate" className="md:h-[58px]" />

        <div className="mt-8 border-t border-plate-ink/25 pt-4 md:mt-10">
          <p className="t-label flex flex-wrap gap-x-8 gap-y-2 text-plate-ink/70">
            <span className="text-plate-accent">Private brokerage</span>
            <span>London · Zürich · Amalfi</span>
          </p>
        </div>

        <h1 className="t-display t-d1 mt-8 max-w-[13ch] text-plate-ink md:mt-10">
          Homes that outlast the people who build them
        </h1>

        <p className="t-lead mt-8 max-w-[46ch] text-plate-ink/75">
          A deliberately small portfolio of architecturally significant estates,
          penthouses and land across Europe — represented with discretion.
        </p>

        <div className="mt-10 md:mt-12">
          <HeroSearch />
        </div>
      </motion.div>

      {/* Scroll cue, drawn as a dimension line running down the right edge. */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-10 right-12 hidden flex-col items-center gap-3 lg:flex"
      >
        <span
          className="t-label text-plate-ink/60"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-plate-ink/25">
          <motion.span
            className="absolute left-0 top-0 h-6 w-px bg-plate-accent"
            animate={{ y: [-24, 64] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
