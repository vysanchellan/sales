"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { SPRING } from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

/** Springs toward the cursor when near, snaps back on leave. Disabled on touch. */
export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  as = "button",
  href,
  onClick,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const coarse = useCoarsePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnetic);
  const sy = useSpring(y, SPRING.magnetic);

  const handleMove = (e: React.MouseEvent) => {
    if (coarse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // Polymorphic tag (button / a / div) — props vary by element, so assemble
  // them dynamically and let the motion component type them at runtime.
  const MotionTag = motion[as] as React.ElementType;
  const tagProps: Record<string, unknown> = {
    ref,
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    className,
  };
  if (as === "a") tagProps.href = href;
  if (as === "button") tagProps.type = type;

  return <MotionTag {...tagProps}>{children}</MotionTag>;
}
