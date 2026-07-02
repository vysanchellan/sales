"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { getFeatured } from "@/lib/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { TextReveal } from "@/components/animations/TextReveal";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function FeaturedProperties() {
  const featured = getFeatured();
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !gridRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-feat-card]");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        }
      );
    },
    { scope: gridRef, dependencies: [reduced] }
  );

  // Bento layout: first two cards span larger cells.
  const spanFor = (i: number) => {
    if (i === 0) return "md:col-span-2 md:row-span-2";
    if (i === 3) return "md:col-span-2";
    return "";
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">The Collection</p>
          <TextReveal
            as="h2"
            text="Featured [[residences]]"
            className="font-display text-4xl text-cloud md:text-6xl"
          />
        </div>
        <Link
          href="/listings"
          className="group flex items-center gap-2 text-sm text-mist transition-colors hover:text-gold"
        >
          View all listings
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div
        ref={gridRef}
        className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-3"
      >
        {featured.map((p, i) => (
          <div key={p.id} data-feat-card className={spanFor(i)}>
            <PropertyCard property={p} priority={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
