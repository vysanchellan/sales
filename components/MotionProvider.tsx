"use client";

import { MotionConfig } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Global Framer MotionConfig — honours reduced-motion at the framework level. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>
  );
}
