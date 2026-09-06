"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getFeatured, formatPrice } from "@/lib/data/properties";
import type { Property } from "@/lib/data/types";
import { SectionHead } from "@/components/SectionHead";
import { IconBed, IconBath, IconExtent, IconSurvey } from "@/components/Icons";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* The photographic view of the portfolio. A bento that sums exactly to its grid
   so no cell is left as dead black space: a 2x2 hero, two stacked cells, then a
   full-width band. Images fill their cell at any span, so the tiling never
   leaves an aspect-ratio gap. */

export function FeaturedProperties() {
  const featured = getFeatured();
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();

  useGSAP(
    () => {
      if (!hydrated || reduced || !gridRef.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-feat]"),
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    },
    { scope: gridRef, dependencies: [hydrated, reduced] }
  );

  const span = (i: number) =>
    i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-3" : "";

  return (
    <section className="mx-auto max-w-[1560px] px-6 py-24 md:px-12 md:py-32">
      <SectionHead
        index="01"
        label="The Collection"
        title="Featured residences"
        link={{ href: "/listings", label: "Full portfolio" }}
      />

      <div
        ref={gridRef}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[clamp(230px,25vw,300px)]"
      >
        {featured.map((p, i) => (
          <div key={p.id} data-feat className={span(i)}>
            <Card property={p} priority={i === 0} tall={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({
  property: p,
  priority,
  tall,
}: {
  property: Property;
  priority?: boolean;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/listings/${p.slug}`}
      className="group relative block h-full min-h-[260px] overflow-hidden bg-paper-raised"
    >
      <Image
        src={p.images[0]}
        alt={`${p.title}, ${p.location}`}
        fill
        priority={priority}
        sizes={tall ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        quality={70}
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plate/90 via-plate/25 to-plate/5" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="t-label flex items-center gap-2 text-plate-ink/75">
          <IconSurvey size={13} className="text-plate-accent" />
          {p.location}, {p.city}
        </p>
        <h3
          className={`t-display mt-2 text-plate-ink ${
            tall ? "text-[clamp(1.6rem,2.6vw,2.4rem)]" : "text-[1.3rem]"
          } leading-[1.08]`}
        >
          {p.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-plate-ink/20 pt-3">
          <span className="t-figure text-lg text-plate-accent">
            {formatPrice(p.price, p.status)}
          </span>
          <div className="t-label flex items-center gap-4 text-plate-ink/75">
            {p.type !== "land" && (
              <>
                <span className="flex items-center gap-1.5">
                  <IconBed size={14} /> {p.bedrooms}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconBath size={14} /> {p.bathrooms}
                </span>
              </>
            )}
            <span className="flex items-center gap-1.5">
              <IconExtent size={14} /> {p.sqm.toLocaleString()} m²
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
