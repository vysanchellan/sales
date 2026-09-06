"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Code-split the sequence and only mount it as it approaches the viewport, so
// four full-bleed photographs and a GSAP timeline never block first paint.
const CinematicSequence = dynamic(
  () => import("./CinematicSequence").then((m) => m.CinematicSequence),
  { ssr: false, loading: () => <div className="h-[100svh]" /> }
);

export function LazyCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>{show ? <CinematicSequence /> : <div className="h-[100svh]" />}</div>
  );
}
