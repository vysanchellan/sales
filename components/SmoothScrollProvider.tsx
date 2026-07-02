"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Drives Lenis inertia scrolling off GSAP's single ticker so Lenis and
 * ScrollTrigger share one RAF loop (the canonical sync). Falls back to native
 * scroll when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.1,
        smoothWheel: !reduced,
        duration: 1.1,
        wheelMultiplier: 1,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

function LenisGsapBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Single shared ticker: GSAP drives Lenis' RAF, and ScrollTrigger updates on
  // every Lenis scroll event.
  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // Recalculate triggers and jump to top on client-side navigation.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}
