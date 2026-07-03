"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/lib/data/types";
import { PropertyCard } from "./PropertyCard";

export function SimilarCarousel({ items }: { items: Property[] }) {
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewRef.current || !trackRef.current) return;
      setConstraint(Math.max(0, trackRef.current.scrollWidth - viewRef.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-3xl text-cloud md:text-4xl">Similar properties</h2>
        <p className="hidden items-center gap-1 text-xs text-mist md:flex">
          <ChevronLeft size={13} /> Drag to explore <ChevronRight size={13} />
        </p>
      </div>

      <div ref={viewRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -constraint, right: 0 }}
          dragElastic={0.08}
          whileTap={{ cursor: "grabbing" }}
        >
          {items.map((p) => (
            <div key={p.id} className="w-[260px] shrink-0 sm:w-[300px] md:w-[360px]">
              <PropertyCard property={p} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
