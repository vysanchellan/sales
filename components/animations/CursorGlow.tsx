"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Cursor-following radial glow. rAF-throttled pointer tracking, spring-damped. */
export function CursorGlow() {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (coarse || reduced) return;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        x.set(lastX);
        y.set(lastY);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [coarse, reduced, x, y]);

  if (coarse || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[2] h-[520px] w-[520px] rounded-full"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle, rgba(201,162,75,0.10) 0%, rgba(75,83,201,0.06) 40%, transparent 70%)",
      }}
    />
  );
}
