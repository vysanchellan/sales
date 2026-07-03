"use client";

import Image from "next/image";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeader } from "@/components/SectionHeader";

export function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const row = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="03"
          label="In Their Words"
          title="The measure of a [[brokerage]]"
        />
      </div>

      <div className="relative border-y border-cloud/10">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div
          className="flex w-max"
          style={{ animation: "marquee 56s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {row.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="flex w-[300px] shrink-0 flex-col border-r border-cloud/10 px-6 py-8 sm:w-[360px] sm:px-8 sm:py-10 md:w-[440px]"
            >
              <blockquote className="mb-8 flex-1 font-display text-lg italic leading-snug text-cloud/90 md:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="text-sm text-cloud">{t.name}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-mist">
                    {t.transaction === "bought" ? "Bought" : "Sold"} · {t.propertyTitle}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
