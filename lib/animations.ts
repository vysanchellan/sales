// Shared timing / easing / spring tokens so every animation wrapper pulls from
// a single source of truth. Keeps the choreography coherent across the site.

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutCubic: [0.65, 0, 0.35, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
};

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  glacial: 1.6,
};

export const SPRING = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.6 } as const,
  snappy: { type: "spring", stiffness: 260, damping: 26, mass: 0.5 } as const,
  magnetic: { type: "spring", stiffness: 180, damping: 15, mass: 0.4 } as const,
  tilt: { type: "spring", stiffness: 150, damping: 18, mass: 0.5 } as const,
};

// Framer Motion variant factories -------------------------------------------

export const fadeUp = (delay = 0, distance = 28) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.outExpo, delay },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.outQuart, delay },
  },
});

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const wordReveal = {
  hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

// Reduced-motion aware variant swap.
export const reducedFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};
