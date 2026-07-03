"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { EASE } from "@/lib/animations";

// Virelle monogram: an angular "V" that reads as a valley / vista, drawn from a
// single stroke and crowned with a small apex gem.
const V_PATH = "M14 24 L50 82 L86 24";
const APEX = { cx: 50, cy: 16, r: 5.2 };

/**
 * The animated brand mark. When `animate` is set it draws itself on: the "V"
 * traces via pathLength, the gem scales in, then a soft gradient fill blooms —
 * the signature load animation.
 */
export function LogoMark({
  size = 40,
  animate = false,
  className = "",
}: {
  size?: number;
  animate?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const grad = `vg-${id}`;
  const glow = `vgl-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-gold)" />
          <stop offset="0.55" stopColor="var(--color-gold-light)" />
          <stop offset="1" stopColor="var(--color-indigo-light)" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="var(--color-gold)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {animate && (
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill={`url(#${glow})`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE.outExpo }}
          style={{ transformOrigin: "center" }}
        />
      )}

      <motion.path
        d={V_PATH}
        stroke={`url(#${grad})`}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.5, ease: EASE.outExpo }}
      />

      <motion.circle
        cx={APEX.cx}
        cy={APEX.cy}
        r={APEX.r}
        fill={`url(#${grad})`}
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 1.15, duration: 0.6, ease: EASE.outExpo }}
        style={{ transformOrigin: "50px 16px" }}
      />
    </svg>
  );
}

/** Nav / footer lockup: static mark + wordmark. `light` forces ivory over a
 * dark hero regardless of theme. */
export function Logo({
  className = "",
  markSize = 26,
  light = false,
}: {
  className?: string;
  markSize?: number;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={markSize} />
      <span
        className={`font-display text-2xl tracking-[0.02em] ${light ? "text-snow" : "text-cloud"}`}
      >
        VIREL<span className="living-gradient">L</span>E
      </span>
    </span>
  );
}
