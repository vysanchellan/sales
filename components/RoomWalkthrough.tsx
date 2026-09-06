"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Room } from "@/lib/data/types";
import { IconClose, IconChevron } from "./Icons";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * The property experience: a pinned, scroll-scrubbed dolly through each room,
 * cross-dissolving frame to frame with captions timed to the view. Opens on the
 * cover the visitor selected. Falls back to a stacked, tappable sequence on
 * touch and reduced motion, with a lightbox on either path.
 */
export function RoomWalkthrough({ rooms, title }: { rooms: Room[]; title: string }) {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const scrub = !coarse && !reduced;

  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!hydrated || !scrub || !rootRef.current) return;
      const stage = rootRef.current.querySelector<HTMLElement>("[data-stage]")!;
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]");

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${rooms.length * 90}%`,
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(rooms.length - 1, Math.floor(self.progress * rooms.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });

      rooms.forEach((_, i) => {
        const layer = layers[i];
        tl.fromTo(layer, { scale: 1.2 }, { scale: 1, ease: "none", duration: 1 }, i);
        if (i > 0) {
          tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, i - 0.25);
        }
        const cap = caps[i];
        tl.fromTo(cap, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, i + 0.08);
        if (i < rooms.length - 1) {
          tl.to(cap, { autoAlpha: 0, y: -30, duration: 0.35, ease: "power2.in" }, i + 0.68);
        }
      });
    },
    { scope: rootRef, dependencies: [hydrated, scrub, rooms.length] }
  );

  // ---- Touch / reduced-motion: stacked, tappable ----------------------------
  if (!scrub) {
    return (
      <>
        <div className="space-y-3">
          {rooms.map((r, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative block h-[72svh] w-full overflow-hidden text-left"
            >
              <Image
                src={r.image}
                alt={`${title} — ${r.name}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plate/85 via-plate/20 to-transparent" />
              <div className="absolute bottom-7 left-6 right-6">
                <p className="t-label text-plate-accent">
                  {String(i + 1).padStart(2, "0")} · {r.name}
                </p>
                <p className="t-display mt-3 max-w-md text-[1.6rem] leading-[1.12] text-plate-ink">
                  {r.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
        <Lightbox rooms={rooms} title={title} index={lightbox} setIndex={setLightbox} />
      </>
    );
  }

  // ---- Desktop scrub --------------------------------------------------------
  return (
    <div ref={rootRef} className="relative" aria-label={`${title} walkthrough`}>
      <div data-stage className="relative h-[100svh] w-full overflow-hidden">
        {rooms.map((r, i) => (
          <div key={i} data-layer className="absolute inset-0 will-change-transform">
            <Image
              src={r.image}
              alt={`${title} — ${r.name}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plate/85 via-plate/15 to-plate/40" />

        <div className="pointer-events-none absolute inset-0">
          {rooms.map((r, i) => (
            <div key={i} data-cap className="absolute bottom-[13%] left-[6%] right-[6%] max-w-3xl">
              <p className="t-label text-plate-accent">
                {String(i + 1).padStart(2, "0")} · {r.name}
              </p>
              <p className="t-display mt-4 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.08] text-plate-ink">
                {r.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Progress rail — the rooms as a schedule down the right edge */}
        <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {rooms.map((r, i) => (
            <div key={i} className="flex items-center justify-end gap-3">
              <span
                className={`t-label transition-opacity duration-500 ${
                  i === active ? "text-plate-accent opacity-100" : "text-plate-ink opacity-0"
                }`}
              >
                {r.name}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === active ? "w-9 bg-plate-accent" : "w-4 bg-plate-ink/40"
                }`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setLightbox(active)}
          className="t-label absolute right-10 top-24 z-10 border-b border-plate-ink/40 pb-1 text-plate-ink transition-colors hover:border-plate-accent hover:text-plate-accent"
        >
          View gallery
        </button>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-plate-ink/70"
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="t-label">Scroll to walk through</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.9 }}
          >
            <IconChevron size={18} />
          </motion.span>
        </motion.div>
      </div>

      <Lightbox rooms={rooms} title={title} index={lightbox} setIndex={setLightbox} />
    </div>
  );
}

function Lightbox({
  rooms,
  title,
  index,
  setIndex,
}: {
  rooms: Room[];
  title: string;
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const go = (dir: number) =>
    setIndex(index === null ? null : (index + dir + rooms.length) % rooms.length);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-plate/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIndex(null)}
        >
          <button
            className="absolute right-6 top-6 z-10 text-plate-ink/70 transition-colors hover:text-plate-ink"
            onClick={() => setIndex(null)}
            aria-label="Close gallery"
          >
            <IconClose size={26} />
          </button>
          <button
            className="absolute left-4 z-10 rotate-90 p-3 text-plate-ink md:left-10"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous room"
          >
            <IconChevron size={26} />
          </button>
          <button
            className="absolute right-4 z-10 -rotate-90 p-3 text-plate-ink md:right-10"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next room"
          >
            <IconChevron size={26} />
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="relative m-0 aspect-[3/2] w-[92vw] max-w-5xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.34 }}
            >
              <Image
                src={rooms[index].image}
                alt={`${title} — ${rooms[index].name}`}
                fill
                sizes="92vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plate/90 to-transparent p-6">
                <p className="t-label text-plate-accent">{rooms[index].name}</p>
                <p className="t-display mt-2 text-xl text-plate-ink">
                  {rooms[index].caption}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {rooms.map((r, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={`h-1 transition-all ${i === index ? "w-8 bg-plate-accent" : "w-4 bg-plate-ink/40"}`}
                aria-label={`Go to ${r.name}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
