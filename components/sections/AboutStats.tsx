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
  // Parallax: background moves at a different rate than the numbers.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const numbersY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-gold/10 py-28 md:py-36">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[38vw] w-[38vw] rounded-full bg-indigo/10 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-[34vw] w-[34vw] rounded-full bg-gold/10 blur-[120px]" />
      </motion.div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 md:grid-cols-2 md:px-10">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">The Firm</p>
          <TextReveal
            as="h2"
            text="We don't sell houses. We place people in the [[right]] one."
            className="font-display text-4xl leading-[1.1] text-cloud md:text-5xl"
          />
          <ScrollReveal delay={0.15}>
            <p className="mt-6 max-w-lg leading-relaxed text-mist">
              Kassora was founded on a quiet conviction: that the right home is found, not sold. For
              nearly three decades we have represented a small, deliberate portfolio — advising a
              private clientele with patience, candour, and an unfashionable respect for the long
              view.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          style={{ y: numbersY }}
          className="grid grid-cols-2 gap-x-8 gap-y-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-l border-gold/25 pl-5">
              <div className="font-display text-4xl text-gold-light md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-mist">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
