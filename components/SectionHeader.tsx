"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "./animations/TextReveal";

interface Props {
  index: string; // "01"
  label: string; // "The Collection"
  title: string; // TextReveal syntax, [[word]] for gradient
  link?: { href: string; label: string };
}

/**
 * Editorial section header: hairline rule, numbered index + small-caps label,
 * then the display headline. One consistent voice across every section.
 */
export function SectionHeader({ index, label, title, link }: Props) {
  return (
    <header className="mb-14 border-t border-cloud/10 pt-6">
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <p className="flex items-baseline gap-3 text-xs uppercase tracking-[0.22em] text-mist">
          <span className="font-display tabular-nums text-gold">({index})</span>
          {label}
        </p>
        {link && (
          <Link
            href={link.href}
            className="group flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-gold"
          >
            {link.label}
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
      <TextReveal
        as="h2"
        text={title}
        className="max-w-3xl font-display text-3xl leading-[1.04] text-cloud sm:text-4xl md:text-6xl"
      />
    </header>
  );
}
