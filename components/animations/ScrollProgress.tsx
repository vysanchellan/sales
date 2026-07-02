"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Top gradient scroll-progress bar — scaleX through a spring. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-gold-deep), var(--color-gold-light), var(--color-indigo-light))",
      }}
    />
  );
}
