"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const chapters = [
  {
    year: "1998",
    title: "A quiet beginning",
    body: "Founded above a bookshop in Marylebone with a single mandate and a conviction that the right home is found, not sold.",
  },
  {
    year: "2007",
    title: "Across the water",
    body: "The first Continental office opens in Zürich. The portfolio grows deliberately — never more than we can represent with full attention.",
  },
  {
    year: "2015",
    title: "The coastal chapter",
    body: "An Amalfi desk is established. Waterfront and architectural work becomes a defining thread of the firm's identity.",
  },
  {
    year: "Today",
    title: "The same conviction",
    body: "Four cities, one bench of specialists, and an unfashionable respect for the long view. We still measure success in the right fit, not the fastest close.",
  },
];

/** Scroll-pinned narrative: the panel pins while chapters advance horizontally. */
export function BrandStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !rootRef.current) return;
      const track = rootRef.current.querySelector<HTMLElement>("[data-track]")!;
      const panels = gsap.utils.toArray<HTMLElement>("[data-chapter]");

      const horizontal = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each chapter eases in as it enters the viewport, using the horizontal
      // tween as the container animation (the canonical GSAP pattern).
      panels.forEach((panel) => {
        gsap.from(panel.querySelector("[data-chapter-inner]"), {
          opacity: 0.15,
          y: 40,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: "left center",
            end: "center center",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  // Reduced-motion / no-JS friendly fallback: a plain vertical timeline.
  if (reduced) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24">
        <div className="space-y-12">
          {chapters.map((c) => (
            <div key={c.year} className="border-l border-gold/25 pl-6">
              <p className="font-display text-2xl text-gold-light">{c.year}</p>
              <h3 className="mt-1 font-display text-xl text-cloud">{c.title}</h3>
              <p className="mt-2 text-mist">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div data-track className="flex h-[100svh] w-max items-center">
        {chapters.map((c, i) => (
          <div
            key={c.year}
            data-chapter
            className="flex h-full w-screen shrink-0 items-center px-8 md:px-24"
          >
            <div data-chapter-inner className="max-w-xl">
              <span className="font-display text-7xl text-gold/25 md:text-9xl">0{i + 1}</span>
              <p className="mt-4 font-display text-3xl text-gold-light">{c.year}</p>
              <h3 className="mt-2 font-display text-4xl text-cloud md:text-5xl">{c.title}</h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
