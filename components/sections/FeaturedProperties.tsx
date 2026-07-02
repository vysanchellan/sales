"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { getFeatured, formatPrice } from "@/lib/data/properties";
import type { Property } from "@/lib/data/types";
import { TextReveal } from "@/components/animations/TextReveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const statusColor: Record<Property["status"], string> = {
  "for-sale": "bg-gold/90 text-ink",
  "for-rent": "bg-indigo/90 text-ink",
  sold: "bg-ink/80 text-mist border border-mist/30",
};
const statusLabel: Record<Property["status"], string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
};

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

  // Bento tiling for the four featured items — sums exactly to the grid so no
  // cell is left empty: a 2×2 hero, two stacked cells, then a full-width band.
  const spanFor = (i: number) => {
    if (i === 0) return "md:col-span-2 md:row-span-2";
    if (i === 3) return "md:col-span-3";
    return "";
  };
  // The hero cell is twice as tall, so it needs a taller minimum image aspect.
  const isTall = (i: number) => i === 0;

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
        className="grid grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[clamp(240px,26vw,300px)]"
      >
        {featured.map((p, i) => (
          <div key={p.id} data-feat-card className={spanFor(i)}>
            <FeaturedCard property={p} priority={i === 0} tall={isTall(i)} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({
  property,
  priority,
  tall,
}: {
  property: Property;
  priority?: boolean;
  tall?: boolean;
}) {
  return (
    <TiltCard max={5} className="h-full">
      <Link
        href={`/listings/${property.slug}`}
        className="group relative block h-full min-h-[240px] overflow-hidden rounded-2xl border border-cloud/10 bg-ink-soft"
      >
        {/* Image fills the entire cell — no aspect-ratio gaps at any span size */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes={tall ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
            priority={priority}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5" />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${statusColor[property.status]}`}
        >
          {statusLabel[property.status]}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <div>
            <p className="flex items-center gap-1 text-xs text-cloud/70">
              <MapPin size={12} /> {property.location}, {property.city}
            </p>
            <h3 className={`font-display text-cloud ${tall ? "text-3xl md:text-4xl" : "text-xl"}`}>
              {property.title}
            </h3>
          </div>
          <div className="flex items-center justify-between border-t border-cloud/15 pt-3">
            <span className="font-display text-lg text-gold-light">
              {formatPrice(property.price, property.status)}
            </span>
            <div className="flex items-center gap-3 text-xs text-cloud/80">
              {property.type !== "land" && (
                <>
                  <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
                </>
              )}
              <span className="flex items-center gap-1">
                <Maximize size={14} /> {property.sqm.toLocaleString()} m²
              </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
