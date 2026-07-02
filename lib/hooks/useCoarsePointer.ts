"use client";

import { useEffect, useState } from "react";

/**
 * True on touch / coarse-pointer devices. Used to swap animated blur() filters
 * for compositor-friendly transform/opacity variants, since animated filters
 * are the main cause of mobile scroll jank.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return coarse;
}
