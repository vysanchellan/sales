import { ArrowRight } from "lucide-react";
import { BrandStory } from "@/components/sections/BrandStory";
import { AboutStats } from "@/components/sections/AboutStats";
import { Testimonials } from "@/components/sections/Testimonials";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

export const metadata = {
  title: "The Firm — Kassora",
  description: "Nearly three decades placing people in the right home.",
};

const values = [
  {
    title: "Discretion",
    body: "Most of what we do is never listed. The best homes change hands in a conversation, not a campaign.",
  },
  {
    title: "Patience",
    body: "We would rather tell you to wait than to buy. The right home is worth the right moment.",
  },
  {
    title: "Craft",
    body: "We represent architecture we believe in — and present it with the care it was built with.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-4xl px-5 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">The Firm</p>
        <TextReveal
          as="h1"
          text="Nearly three decades placing people in the [[right]] home"
          className="font-display text-4xl leading-[1.08] text-cloud md:text-6xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-mist">
            Kassora is a private brokerage, not a portal. We keep the portfolio small on purpose, so
            that every home receives the full attention of a specialist who knows its market
            intimately.
          </p>
        </ScrollReveal>
      </section>

      <div className="mt-24">
        <BrandStory />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-cloud/10 bg-ink-soft p-8">
                <span className="font-display text-5xl text-gold/30">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-cloud">{v.title}</h3>
                <p className="mt-3 text-mist">{v.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <AboutStats />
      <Testimonials />

      <section className="mx-auto max-w-3xl px-5 py-28 text-center">
        <TextReveal
          as="h2"
          text="Meet the people behind the [[portfolio]]"
          className="font-display text-4xl text-cloud md:text-5xl"
        />
        <ScrollReveal delay={0.2} className="mt-8 flex justify-center">
          <MagneticButton
            as="a"
            href="/agents"
            className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink"
          >
            Our advisors
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
