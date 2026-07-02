"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  speed?: number; // positive = moves slower (up), negative = faster
  className?: string;
}

/** Scroll-linked vertical parallax via useScroll/useTransform. */
export function Parallax({ children, speed = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `${-speed * 80}px`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
