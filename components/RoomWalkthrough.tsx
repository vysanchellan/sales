"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight, Expand, ChevronDown } from "lucide-react";
import type { Room } from "@/lib/data/types";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * The signature property experience: a pinned, scroll-scrubbed dolly through
 * each room, cross-dissolving frame to frame with captions timed to the view.
 * Starts on the cover image the visitor selected. Falls back to a stacked,
 * fade-revealed sequence on touch / reduced-motion.
 */
export function RoomWalkthrough({ rooms, title }: { rooms: Room[]; title: string }) {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const scrub = !coarse && !reduced;

  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!scrub || !rootRef.current) return;
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
        // Slow dolly-in on the active frame.
        tl.fromTo(layer, { scale: 1.22 }, { scale: 1, ease: "none", duration: 1 }, i);
        if (i > 0) {
          tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, i - 0.25);
        }
        const cap = caps[i];
        tl.fromTo(
          cap,
          { autoAlpha: 0, y: 44, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
          i + 0.08
        );
        if (i < rooms.length - 1) {
          tl.to(cap, { autoAlpha: 0, y: -32, filter: "blur(12px)", duration: 0.35, ease: "power2.in" }, i + 0.68);
        }
      });
    },
    { scope: rootRef, dependencies: [scrub, rooms.length] }
  );

  // ---- Touch / reduced-motion fallback: stacked cinematic sections ----------
  if (!scrub) {
    return (
      <>
        <div className="space-y-3">
          {rooms.map((r, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative block h-[70svh] w-full overflow-hidden rounded-2xl"
            >
              <Image src={r.image} alt={`${title} — ${r.name}`} fill priority={i === 0} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
                  {String(i + 1).padStart(2, "0")} · {r.name}
                </p>
                <p className="mt-2 max-w-md font-display text-2xl text-cloud">{r.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
        <Lightbox rooms={rooms} title={title} index={lightbox} setIndex={setLightbox} />
      </>
    );
  }

  // ---- Desktop scrub --------------------------------------------------------
  return (
    <div ref={rootRef} className="relative" aria-label={`${title} walkthrough`}>
      <div data-stage className="relative h-[100svh] w-full overflow-hidden rounded-none">
        {rooms.map((r, i) => (
          <div key={i} data-layer className="absolute inset-0 will-change-transform">
            <Image src={r.image} alt={`${title} — ${r.name}`} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/40" />

        {/* Captions (stacked; GSAP toggles visibility) */}
        <div className="pointer-events-none absolute inset-0">
          {rooms.map((r, i) => (
            <div key={i} data-cap className="absolute bottom-[12%] left-[6%] right-[6%] max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold-light">
                {String(i + 1).padStart(2, "0")} · {r.name}
              </p>
              <p className="font-display text-4xl leading-[1.1] text-cloud md:text-6xl">{r.caption}</p>
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {rooms.map((r, i) => (
            <div key={i} className="flex items-center justify-end gap-3">
              <span
                className={`text-[11px] uppercase tracking-wider transition-all duration-500 ${
                  i === active ? "text-gold-light opacity-100" : "text-mist opacity-0"
                }`}
              >
                {r.name}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === active ? "w-8 bg-gold" : "w-4 bg-mist/40"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Fullscreen affordance */}
        <button
          onClick={() => setLightbox(active)}
          className="absolute right-6 top-24 z-10 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-xs text-cloud backdrop-blur transition-colors hover:bg-ink/80"
        >
          <Expand size={13} /> View gallery
        </button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-mist"
          initial={{ opacity: 1 }}
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to walk through</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>

      <Lightbox rooms={rooms} title={title} index={lightbox} setIndex={setLightbox} />
    </div>
  );
}

// ---------------------------------------------------------------------------
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIndex(null)}
        >
          <button className="absolute right-5 top-5 text-cloud/70 hover:text-cloud" onClick={() => setIndex(null)} aria-label="Close">
            <X size={28} />
          </button>
          <button
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 text-cloud md:left-8"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 text-cloud md:right-8"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative aspect-[3/2] w-[92vw] max-w-5xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <Image src={rooms[index].image} alt={`${title} — ${rooms[index].name}`} fill sizes="90vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gold-light">{rooms[index].name}</p>
                <p className="mt-1 font-display text-xl text-cloud">{rooms[index].caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-cloud/40"}`}
                aria-label={`Room ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
