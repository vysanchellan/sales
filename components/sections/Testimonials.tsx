"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { TextReveal } from "@/components/animations/TextReveal";

export function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const row = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-[1400px] px-5 md:px-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">In Their Words</p>
        <TextReveal
          as="h2"
          text="The measure of a [[brokerage]]"
          className="font-display text-4xl text-cloud md:text-6xl"
        />
      </div>

      <div className="group relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div
          className="flex w-max gap-6 px-6"
          style={{ animation: "marquee 48s linear infinite" }}
          // pause on hover via the group + inline handlers
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {row.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-cloud/10 bg-ink-soft p-6 md:w-[400px]"
            >
              <Quote size={22} className="mb-4 text-gold/60" />
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-cloud/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-cloud/10 pt-4">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-cloud">{t.name}</p>
                  <p className="text-xs text-mist">
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
