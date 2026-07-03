"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { SPRING } from "@/lib/animations";

/**
 * Theme toggle with a circular View-Transitions reveal: the incoming theme
 * wipes in from the toggle itself. Falls back to an instant swap where the API
 * or reduced-motion says no. The knob carries the active mode's icon.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
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

    // View Transitions API is not yet in the DOM lib types.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!btn || reduce || typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const end = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      ref={ref}
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`relative flex h-8 w-[62px] items-center rounded-full border border-cloud/15 bg-ink-soft/70 backdrop-blur transition-colors ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-mist/70">
        <Sun size={13} />
        <Moon size={13} />
      </span>
      <motion.span
        className="absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-onaccent shadow-[0_0_16px_-2px_var(--color-gold)]"
        animate={{ left: isLight ? 4 : 32 }}
        transition={SPRING.snappy}
      >
        {isLight ? <Sun size={13} /> : <Moon size={13} />}
      </motion.span>
    </button>
  );
}
