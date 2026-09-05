"use client";

import { motion } from "framer-motion";

/* ===========================================================================
   The logotype is drawn, not set.

   Every letter is constructed on one modular grid — cap height 72, stroke 5.5,
   a single 36-unit half-module governing every bowl, arm and crossbar. Six of
   the seven letters in VIRELLE are straight-line-only; only the R carries a
   curve, and that curve is a true semicircle of exactly one module. Drawing it
   in strokes rather than filled outlines is deliberate: it is the same line
   weight and the same miter joins as the property plans, so the mark and the
   drawings read as one hand.
   =========================================================================== */

const H = 72; // cap height
const M = 36; // the half-module every curve and crossbar derives from

// Letterforms, in grid order. x is the left edge of each advance.
const LETTERS: string[] = [
  // V — two diagonals to a mitred point that runs past the baseline. That
  // overshoot is the signature: the mark ends in a surveyor's point.
  `M0,0 L26,${H} L52,0`,
  // I — a single stem
  `M74,0 L74,${H}`,
  // R — stem, one-module bowl, leg struck from the bowl's foot
  `M96,${H} L96,0`,
  `M96,0 H124 A${M / 2},${M / 2} 0 0 1 124,${M} H96`,
  `M118,${M} L144,${H}`,
  // E — stem and three arms, the middle one held one module short
  `M162,0 L162,${H}`,
  `M162,0 H206`,
  `M162,${M} H198`,
  `M162,${H} H206`,
  // L
  `M224,0 L224,${H}`,
  `M224,${H} H266`,
  // L
  `M284,0 L284,${H}`,
  `M284,${H} H326`,
  // E
  `M344,0 L344,${H}`,
  `M344,0 H388`,
  `M344,${M} H380`,
  `M344,${H} H388`,
];

const STROKE = 7;
const VIEWBOX = "-5 -5 398 103";
const RATIO = 398 / 103;

/**
 * The full wordmark. `draw` traces it on once — used only in the hero, where
 * it doubles as the site's statement that everything here is drawn.
 */
export function Logotype({
  className = "",
  height = 22,
  draw = false,
  tone = "current",
}: {
  className?: string;
  height?: number;
  draw?: boolean;
  tone?: "current" | "plate";
}) {
  const stroke = tone === "plate" ? "var(--color-plate-ink)" : "currentColor";

  return (
    <svg
      viewBox={VIEWBOX}
      height={height}
      width={height * RATIO}
      fill="none"
      role="img"
      aria-label="Virelle"
      className={className}
      style={{ overflow: "visible" }}
    >
      <g
        stroke={stroke}
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        {LETTERS.map((d, i) =>
          draw ? (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.18 + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ) : (
            <path key={i} d={d} />
          )
        )}
      </g>
    </svg>
  );
}

/**
 * The mark alone — the wordmark's V at the same weight and the same miter.
 * No second element; the letter is the mark.
 */
export function Mark({
  size = 20,
  className = "",
  tone = "current",
}: {
  size?: number;
  className?: string;
  tone?: "current" | "plate";
}) {
  return (
    <svg
      viewBox="-5 -5 62 103"
      height={size}
      width={(size * 62) / 103}
      fill="none"
      aria-hidden
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        d={`M0,0 L26,${H} L52,0`}
        stroke={tone === "plate" ? "var(--color-plate-ink)" : "currentColor"}
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      />
    </svg>
  );
}
