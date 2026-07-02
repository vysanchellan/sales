"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Code-split the cinematic sequence and only mount it once it approaches the
// viewport, so its GSAP timeline + video never block first paint.
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
      { rootMargin: "600px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <CinematicSequence /> : <div className="h-[100svh]" />}</div>;
}
