"use client";

import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <header className="mb-16 border-t border-cloud/10 pt-6">
        <p className="flex items-baseline gap-3 text-xs uppercase tracking-[0.22em] text-mist">
          <span className="font-display tabular-nums text-gold">(04)</span>
          Enquiries
        </p>
      </header>

      <div className="grid items-end gap-12 md:grid-cols-[1.6fr_1fr]">
        <TextReveal
          as="h2"
          text="Begin a [[conversation]]"
          className="font-display text-4xl leading-[0.98] text-cloud sm:text-5xl md:text-8xl"
        />
        <div>
          <ScrollReveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-mist">
              Whether you are acquiring, selling, or simply curious about the market, the first step
              is a private conversation. No pressure, no register — only counsel.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="mt-8">
            <MagneticButton
              as="a"
              href="/contact"
              strength={0.5}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-onaccent"
            >
              Speak with an advisor
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
