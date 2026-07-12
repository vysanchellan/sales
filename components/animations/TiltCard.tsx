"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SPRING } from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";

interface Props {
  children: React.ReactNode;
  className?: string;
  max?: number; // max rotation in degrees
  glare?: boolean;
}

/** 3D tilt-toward-cursor with rotateX/Y springs. Inert on touch devices. */
export function TiltCard({ children, className = "", max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = useCoarsePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING.tilt);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING.tilt);
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  // Must be created unconditionally — a hook below the coarse early-return
  // changes the hook count when `coarse` flips after mount and crashes React
  // (error #300) on every touch device.
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.28), transparent 55%)`
  );

  const onMove = (e: React.MouseEvent) => {
    if (coarse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (coarse) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
