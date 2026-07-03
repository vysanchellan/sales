"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE, DURATION } from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

/**
 * Fade + rise reveal gated by an IntersectionObserver (via useInView) so
 * offscreen elements never animate. On coarse pointers the blur is dropped in
 * favour of pure transform/opacity to stay on the compositor.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const coarse = useCoarsePointer();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        coarse
          ? { opacity: 0, y }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : coarse
            ? { opacity: 0, y }
            : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{ duration: DURATION.base, ease: EASE.outExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
