"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const scenes = [
  {
    key: "exterior",
    kicker: "Arrival",
    caption: "It begins at the gate — stone, light, and the promise of what waits inside.",
    grad: "linear-gradient(160deg,#2b2140,#7a4a63 55%,#e98b6f)",
  },
  {
    key: "entry",
    kicker: "The Threshold",
    caption: "A hall opens. The city falls away. Every surface was chosen, not bought.",
    grad: "linear-gradient(160deg,#152827,#3d5d5c 55%,#bcd3d0)",
  },
  {
    key: "interior",
    kicker: "The Living Space",
    caption: "Rooms that hold a life. Proportion you feel before you can name it.",
    grad: "linear-gradient(160deg,#171e2e,#5f7794 55%,#9fb4c9)",
  },
  {
    key: "view",
    kicker: "The View",
    caption: "And then the reason for all of it — the horizon, kept for you alone.",
    grad: "linear-gradient(160deg,#2c2818,#9c7a2c 55%,#e8cf8f)",
  },
];

export function CinematicSequence() {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Scroll-scrubbed timeline on capable devices; falls back to a simple
  // autoplay/reveal on touch or reduced-motion.
  const useScrub = !coarse && !reduced;

  useGSAP(
    () => {
      if (!useScrub || !containerRef.current) return;
      const root = containerRef.current;
      const stage = root.querySelector<HTMLElement>("[data-stage]")!;
      const layers = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const captions = gsap.utils.toArray<HTMLElement>("[data-caption]");
      const video = videoRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=360%",
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
        },
      });

      // Cross-fade the scene layers across the scroll.
      layers.forEach((layer, i) => {
        if (i === 0) return;
        tl.fromTo(
          layer,
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1, ease: "none" },
          i - 0.5
        );
      });

      // Captions fade + blur in and out on their checkpoints.
      captions.forEach((cap, i) => {
        tl.fromTo(
          cap,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.5 },
          i
        ).to(
          cap,
          { opacity: 0, y: -30, filter: "blur(8px)", ease: "power2.in", duration: 0.4 },
          i + 0.55
        );
      });

      // If a real walkthrough clip is present, scrub its playback time too.
      if (video && hasVideo) {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "+=360%",
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration;
          },
        });
      }
    },
    { scope: containerRef, dependencies: [useScrub, hasVideo] }
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      aria-label="A cinematic walkthrough"
    >
      <div
        data-stage
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        {/* Optional real video — hidden until it reports a duration. */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: hasVideo ? 1 : 0 }}
          muted
          playsInline
          preload="metadata"
          poster="/video/poster.svg"
          onLoadedMetadata={(e) => {
            if (e.currentTarget.duration > 0) setHasVideo(true);
          }}
          autoPlay={!useScrub}
          loop={!useScrub}
        >
          {/* TODO: drop a compressed drone/walkthrough clip at these paths to go live. */}
          <source src="/video/walkthrough.webm" type="video/webm" />
          <source src="/video/walkthrough.mp4" type="video/mp4" />
        </video>

        {/* Layered scene fallback (also the base when no video is present). */}
        {!hasVideo &&
          scenes.map((s, i) => (
            <div
              key={s.key}
              data-scene
              className="absolute inset-0"
              style={{ background: s.grad, opacity: i === 0 || !useScrub ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-ink/30" />
              <SceneMotif index={i} />
            </div>
          ))}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

        {/* Captions */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          {useScrub ? (
            scenes.map((s) => (
              <div
                key={s.key}
                data-caption
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6"
                style={{ opacity: 0 }}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold-light">
                  {s.kicker}
                </p>
                <p className="font-display text-3xl leading-snug text-cloud md:text-5xl">
                  {s.caption}
                </p>
              </div>
            ))
          ) : (
            // Mobile / reduced-motion: single static overlay caption.
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold-light">
                A Cinematic Walkthrough
              </p>
              <p className="font-display text-3xl leading-snug text-cloud md:text-5xl">
                {scenes[0].caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Lightweight per-scene motif so each cross-fade layer reads distinctly. */
function SceneMotif({ index }: { index: number }) {
  const motifs = [
    <g key="0" stroke="#fff" strokeOpacity="0.25" fill="none" strokeWidth="2">
      <rect x="520" y="240" width="400" height="360" />
      <line x1="720" y1="240" x2="720" y2="600" />
      <rect x="600" y="420" width="70" height="180" />
    </g>,
    <g key="1" stroke="#fff" strokeOpacity="0.22" fill="none" strokeWidth="2">
      <path d="M400 200 L1040 200 L1040 620 L400 620 Z" />
      <path d="M400 200 L720 90 L1040 200" />
    </g>,
    <g key="2" stroke="#fff" strokeOpacity="0.22" fill="none" strokeWidth="2">
      <line x1="220" y1="560" x2="1220" y2="560" />
      <rect x="420" y="360" width="240" height="200" />
      <rect x="800" y="330" width="220" height="230" />
    </g>,
    <g key="3" stroke="#fff" strokeOpacity="0.28" fill="none" strokeWidth="2">
      <line x1="0" y1="480" x2="1440" y2="440" />
      <circle cx="1040" cy="230" r="90" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      {motifs[index % motifs.length]}
    </svg>
  );
}
