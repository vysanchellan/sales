"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[140px] blob-drift" />

      <div className="mx-auto max-w-3xl px-5 text-center">
        <TextReveal
          as="h2"
          text="Begin a [[conversation]]"
          className="font-display text-5xl text-cloud md:text-7xl"
        />
        <ScrollReveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-lg text-mist">
            Whether you are acquiring, selling, or simply curious about the market, the first step is
            a private conversation. No pressure, no register — only counsel.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3} className="mt-10 flex justify-center">
          <MagneticButton
            as="a"
            href="/contact"
            strength={0.5}
            className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-onaccent"
          >
            Speak with an advisor
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
