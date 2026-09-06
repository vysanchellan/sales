import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { IconArrow } from "@/components/Icons";

export function Enquire() {
  return (
    <section className="mx-auto max-w-[1560px] px-6 pb-32 pt-8 md:px-12 md:pb-44">
      <SectionHead index="04" label="Enquiries" />

      <div className="mt-14 grid items-end gap-x-20 gap-y-12 lg:grid-cols-[1.3fr_1fr]">
        <h2 className="t-display t-d1 max-w-[11ch] text-ink">
          Begin a conversation
        </h2>
        <div>
          <p className="t-lead max-w-[42ch] text-ink-soft">
            Whether you are acquiring, selling, or simply curious about the
            market, the first step is a private conversation. No pressure, no
            register — only counsel.
          </p>
          <Link
            href="/contact"
            className="t-label group mt-10 inline-flex items-center gap-3 border-b border-bronze pb-2 text-bronze"
          >
            Speak with an advisor
            <IconArrow
              size={15}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
