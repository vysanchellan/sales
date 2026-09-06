"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cinematicReel, formatPrice } from "@/lib/data/properties";
import { IconArrow } from "@/components/Icons";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ===========================================================================
   Two ways to see a house: walk it, or read it.

   This is walking — a pinned, scroll-scrubbed dolly through four real
   properties, cross-dissolving frame to frame like a title sequence. The
   register is reading. The site does both deliberately, and they reference
   each other: the index rail down the right edge of this sequence is the same
   hairline schedule the walkthrough and the drawings use.

   Every frame is a property, not a mood image. It carries its name, its
   address and its price, and it goes to its own sheet — so the most cinematic
   part of the site is also the most useful.
   =========================================================================== */

export function CinematicSequence() {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const scrub = !coarse && !reduced;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Never pin before hydration settles — pinning re-parents DOM nodes, and
      // racing React's swap to the touch fallback is what crashed mobile.
      if (!hydrated || !scrub || !rootRef.current) return;

      const stage = rootRef.current.querySelector<HTMLElement>("[data-stage]")!;
      const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]");
      const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]");
      const bar = rootRef.current.querySelector<HTMLElement>("[data-bar]")!;
      const n = scenes.length;

      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(caps, { autoAlpha: 0 });
      gsap.set(caps[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${n * 110}%`,
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
        },
      });

      // A drawn line across the foot of the frame, running the whole sequence.
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: n }, 0);

      scenes.forEach((scene, i) => {
        const img = scene.querySelector<HTMLElement>("[data-img]")!;

        // Alternate the move so it reads as a dolly rather than a repeated
        // zoom: odd frames push in, even frames track sideways as they settle.
        const from = i % 2 === 0
          ? { scale: 1.24, xPercent: 0 }
          : { scale: 1.16, xPercent: i % 4 === 1 ? 3 : -3 };
        tl.fromTo(img, from, { scale: 1, xPercent: 0, ease: "none", duration: 1 }, i);

        if (i > 0) {
          tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power1.inOut" }, i - 0.22);
          tl.fromTo(caps[i], { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, i - 0.05);
        }
        if (i < n - 1) {
          tl.to(caps[i], { autoAlpha: 0, y: -26, duration: 0.32, ease: "power2.in" }, i + 0.62);
        }

        // The index rail marks the live frame.
        tl.to(ticks[i], { width: 36, opacity: 1, duration: 0.25 }, i - 0.05);
        if (i < n - 1) tl.to(ticks[i], { width: 14, opacity: 0.45, duration: 0.25 }, i + 0.7);
      });
    },
    { scope: rootRef, dependencies: [hydrated, scrub] }
  );

  // ---- Touch / reduced motion: the same reel, stacked and tappable ----------
  if (!scrub) {
    return (
      <section aria-label="A walk through four properties" className="space-y-3 px-3">
        {cinematicReel.map((f, i) => (
          <Link
            key={f.slug + i}
            href={`/listings/${f.slug}`}
            className="relative block h-[76svh] w-full overflow-hidden"
          >
            <Image src={f.image} alt={`${f.title}, ${f.location}`} fill sizes="100vw" quality={62} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-plate/90 via-plate/25 to-transparent" />
            <div className="absolute inset-x-6 bottom-7">
              <p className="t-label text-plate-accent">
                {String(i + 1).padStart(2, "0")} · {f.kicker}
              </p>
              <p className="t-display mt-3 max-w-md text-[1.6rem] leading-[1.12] text-plate-ink">
                {f.caption}
              </p>
              <p className="t-label mt-5 border-t border-plate-ink/25 pt-3 text-plate-ink/75">
                {f.title} · {f.location} · {formatPrice(f.price, f.status)}
              </p>
            </div>
          </Link>
        ))}
      </section>
    );
  }

  // ---- Desktop scrub --------------------------------------------------------
  return (
    <section ref={rootRef} className="relative" aria-label="A walk through four properties">
      <div data-stage className="relative h-[100svh] w-full overflow-hidden">
        {cinematicReel.map((f, i) => (
          <div key={f.slug + i} data-scene className="absolute inset-0">
            <div data-img className="absolute inset-0 will-change-transform">
              <Image
                src={f.image}
                alt={`${f.title}, ${f.location}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plate/88 via-plate/8 to-plate/28" />

        {/* Captions — anchored, editorial, and carrying the property itself */}
        <div className="absolute inset-0">
          {cinematicReel.map((f, i) => (
            <div
              key={f.slug + i}
              data-cap
              className="absolute bottom-[14%] left-[6%] right-[6%] max-w-3xl"
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            >
              <p className="t-label text-plate-accent">
                {String(i + 1).padStart(2, "0")} · {f.kicker}
              </p>
              <p className="t-display mt-5 text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.07] text-plate-ink">
                {f.caption}
              </p>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-plate-ink/25 pt-4">
                <span className="t-label text-plate-ink">{f.title}</span>
                <span className="t-label text-plate-ink/65">
                  {f.location}, {f.city}
                </span>
                <span className="t-figure text-plate-accent">
                  {formatPrice(f.price, f.status)}
                </span>
                <Link
                  href={`/listings/${f.slug}`}
                  className="t-label group ml-auto inline-flex items-center gap-2 text-plate-ink transition-colors hover:text-plate-accent"
                >
                  View sheet
                  <IconArrow
                    size={14}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Index rail — the same hairline schedule the drawings use */}
        <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
          {cinematicReel.map((f, i) => (
            <div key={f.slug + i} className="flex items-center gap-3">
              <span className="t-label tabular-nums text-plate-ink/55">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                data-tick
                className="h-px bg-plate-accent"
                style={{ width: i === 0 ? 36 : 14, opacity: i === 0 ? 1 : 0.45 }}
              />
            </div>
          ))}
        </div>

        {/* Sequence progress, drawn across the foot of the frame */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-plate-ink/15">
          <div data-bar className="h-px origin-left bg-plate-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
