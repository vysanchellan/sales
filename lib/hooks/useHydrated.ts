"use client";

import { useEffect, useState } from "react";

/**
 * True once the first client render has settled. Pinned GSAP sections must
 * wait for this before creating ScrollTriggers: pointer-type detection
 * (useCoarsePointer) resolves in the same post-mount effect flush, and if a
 * ScrollTrigger pins (re-parents) DOM nodes during the brief window where the
 * desktop tree is mounted on a touch device, React's subsequent swap to the
 * touch fallback tries to remove nodes GSAP has moved and crashes with a DOM
 * NotFoundError (the mobile white-screen "client-side exception").
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
