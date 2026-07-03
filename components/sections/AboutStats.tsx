"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/animations/CountUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const stats = [
  { value: 1240, suffix: "+", label: "Homes placed" },
  { value: 27, suffix: "yrs", label: "In practice" },
  { value: 31, suffix: " days", label: "Avg. days on market" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

export function AboutStats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The numbers drift at a slightly different rate than the copy — quiet depth.
  const numbersY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <header className="mb-16 border-t border-cloud/10 pt-6">
        <p className="flex items-baseline gap-3 text-xs uppercase tracking-[0.22em] text-mist">
          <span className="font-display tabular-nums text-gold">(02)</span>
          The Firm
        </p>
      </header>

      <div className="grid items-start gap-16 md:grid-cols-2">
        <div>
          <TextReveal
            as="h2"
            text="We don't sell houses. We place people in the [[right]] one."
            className="font-display text-3xl leading-[1.06] text-cloud sm:text-4xl md:text-5xl"
          />
          <ScrollReveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-mist">
              Virelle was founded on a quiet conviction: that the right home is found, not sold. For
              nearly three decades we have represented a small, deliberate portfolio — advising a
              private clientele with patience, candour, and an unfashionable respect for the long
              view.
            </p>
          </ScrollReveal>
        </div>

        <motion.div style={{ y: numbersY }} className="grid grid-cols-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-t border-cloud/10 px-1 py-5 md:py-8 ${i % 2 === 0 ? "pr-4 md:pr-8" : "pl-4 md:pl-8"}`}
            >
              <p className="font-display text-3xl text-cloud sm:text-4xl md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-mist sm:mt-2 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
