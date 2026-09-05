"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrow } from "./Icons";

/* ===========================================================================
   One rule governs every piece of motion on this site: the only thing that
   ever moves is a line being drawn.

   The plan draws itself. The logotype draws itself. And a section announces
   itself by drawing its own rule across the page. Nothing fades up, nothing
   slides in, nothing blurs. If it cannot be expressed as a line being drawn,
   it does not move.
   =========================================================================== */

export function DrawnRule({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left bg-rule ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export function SectionHead({
  index,
  label,
  title,
  link,
  className = "",
}: {
  index: string;
  label: string;
  title?: string;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <header className={className}>
      <DrawnRule />
      <div className="flex items-baseline justify-between gap-8 pt-5">
        <p className="t-label flex items-baseline gap-3 text-ink-soft">
          <span className="tabular-nums text-bronze">{index}</span>
          {label}
        </p>
        {link && (
          <Link
            href={link.href}
            className="t-label group inline-flex shrink-0 items-center gap-2 text-ink-soft transition-colors hover:text-bronze"
          >
            {link.label}
            <IconArrow
              size={14}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
      {title && (
        <h2 className="t-display t-d2 mt-8 max-w-[18ch] text-ink">{title}</h2>
      )}
    </header>
  );
}
