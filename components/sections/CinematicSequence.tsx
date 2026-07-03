"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cinematicReel } from "@/lib/data/properties";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const kickers = ["Arrival", "The Interior", "The Living Space", "The View"];
const captions = [
  "It begins at the gate — stone, light, and the promise of what waits inside.",
  "A hall opens. The city falls away. Every surface was chosen, not bought.",
  "Rooms that hold a life. Proportion you feel before you can name it.",
  "And then the reason for all of it — the horizon, kept for you alone.",
];

/**
 * Signature homepage sequence: a pinned, scroll-scrubbed dolly through real
 * architectural photography, cross-dissolving frame to frame like a title
 * sequence. Falls back to an autoplay-style stack on touch / reduced-motion.
 */
export function CinematicSequence() {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const scrub = !coarse && !reduced;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrub || !containerRef.current) return;
      const stage = containerRef.current.querySelector<HTMLElement>("[data-stage]")!;
      const layers = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const caps = gsap.utils.toArray<HTMLElement>("[data-caption]");
      const n = layers.length;

      gsap.set(layers, { autoAlpha: 0, scale: 1.2 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${n * 100}%`,
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
        },
      });

      layers.forEach((layer, i) => {
        tl.fromTo(layer, { scale: 1.22 }, { scale: 1, ease: "none", duration: 1 }, i);
        if (i > 0) {
          tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, i - 0.25);
        }
        const cap = caps[i];
        tl.fromTo(
          cap,
          { autoAlpha: 0, y: 40, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
          i + 0.05
        );
        if (i < n - 1) {
          tl.to(cap, { autoAlpha: 0, y: -30, filter: "blur(12px)", duration: 0.35, ease: "power2.in" }, i + 0.65);
        }
      });
    },
    { scope: containerRef, dependencies: [scrub] }
  );

  // ---- Touch / reduced-motion fallback --------------------------------------
  if (!scrub) {
    return (
      <section className="space-y-3 px-3">
        {cinematicReel.map((r, i) => (
          <div key={i} className="relative h-[70svh] w-full overflow-hidden rounded-lg">
            <Image src={r.image} alt={kickers[i]} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-[0.35em] text-ember">{kickers[i]}</p>
              <p className="mt-2 max-w-md font-display text-2xl text-snow">{captions[i]}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ---- Desktop scrub --------------------------------------------------------
  return (
    <section ref={containerRef} className="relative" aria-label="A cinematic walkthrough">
      <div data-stage className="relative h-[100svh] w-full overflow-hidden">
        {cinematicReel.map((r, i) => (
          <div key={i} data-scene className="absolute inset-0 will-change-transform">
            <Image src={r.image} alt={kickers[i]} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-night/25 to-night/45" />

        <div className="relative z-10 h-full">
          {captions.map((c, i) => (
            <div
              key={i}
              data-caption
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center"
              style={{ opacity: 0 }}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-ember">{kickers[i]}</p>
              <p className="mx-auto max-w-3xl font-display text-xl leading-snug text-snow sm:text-3xl md:text-6xl">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
