import { Phone, Mail, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata = {
  title: "Contact — Kassora",
  description: "Begin a private conversation with a Kassora advisor.",
};

const offices = [
  { city: "London", detail: "12 Chiltern Street, W1U", phone: "+44 20 7100 4455" },
  { city: "Zürich", detail: "Bahnhofstrasse 21, 8001", phone: "+41 44 500 2210" },
  { city: "Amalfi", detail: "Via dei Mulini 8, 84017", phone: "+39 06 4200 1180" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">Contact</p>
          <TextReveal
            as="h1"
            text="Begin a [[conversation]]"
            className="font-display text-5xl text-cloud md:text-7xl"
          />
          <ScrollReveal delay={0.15}>
            <p className="mt-6 max-w-md text-mist">
              Tell us what you're looking for — or what you're ready to let go of. An advisor will
              respond, discreetly, within one business day.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10 space-y-6">
              <a
                href="mailto:hello@kassora.com"
                className="flex items-center gap-3 text-cloud transition-colors hover:text-gold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Mail size={16} />
                </span>
                hello@kassora.com
              </a>
              <a
                href="tel:+442071004455"
                className="flex items-center gap-3 text-cloud transition-colors hover:text-gold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Phone size={16} />
                </span>
                +44 20 7100 4455
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {offices.map((o) => (
                <div key={o.city}>
                  <p className="flex items-center gap-1 text-sm text-gold-light">
                    <MapPin size={13} /> {o.city}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{o.detail}</p>
                  <p className="text-xs text-mist">{o.phone}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl border border-cloud/10 bg-ink-soft p-6 md:p-8">
            <InquiryForm />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
