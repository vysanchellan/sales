"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ===========================================================================
   The toggle is a material swatch.

   On a drawing, a cut solid is shown poché — filled. A void is left open. This
   control is that swatch: a hairline square with exactly half of it filled,
   split on the diagonal. Switching theme sweeps the diagonal through 180°, so
   the fill crosses the square rather than blinking between two icons.

   The page itself changes with a circular wipe originating at this square, via
   the View Transitions API — so the new surface is drawn out from the tool
   that asked for it, not cross-faded underneath you.
   =========================================================================== */

export function ThemeToggle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isLight, setIsLight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !isLight;
    const apply = () => {
      document.documentElement.classList.toggle("light", next);
      try {
        localStorage.setItem("theme", next ? "light" : "dark");
      } catch {}
      setIsLight(next);
    };

    const btn = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!btn || reduce || typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }

    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      ref={ref}
      onClick={toggle}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`inline-flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-bronze ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden>
        <defs>
          <clipPath id="vt-swatch">
            <rect x="1" y="1" width="24" height="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#vt-swatch)">
          <motion.rect
            x="-13"
            y="13"
            width="52"
            height="26"
            fill="currentColor"
            style={{ transformOrigin: "13px 13px" }}
            initial={false}
            animate={{ rotate: ready && isLight ? 225 : 45 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
        <rect
          x="1"
          y="1"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    </button>
  );
}
