"use client";

import Image from "next/image";
import { Logotype } from "@/components/Logo";

/* ===========================================================================
   The title sheet.

   Every property portal opens with a full-bleed photograph and a search box.
   That is the portal move, and it is the opposite of a private viewing. This
   opens the way a set of drawings opens: the practice's name, drawn; what it
   does; and a single plate, placed on the sheet rather than spread beneath the
   type. The photograph is the contents of the drawer, not the cover.
   =========================================================================== */

const PLATE =
  "https://images.unsplash.com/photo-1776886099987-dda9bed02cb6?auto=format&fit=crop&w=1400&q=80";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1560px] px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
      <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Logotype height={54} draw className="text-ink md:h-[76px]" />

          <div className="mt-10 border-t border-rule pt-4 md:mt-14">
            <p className="t-label flex flex-wrap gap-x-8 gap-y-2 text-ink-soft">
              <span>Private brokerage</span>
              <span>London · Zürich · Amalfi</span>
            </p>
          </div>

          <h1 className="t-display t-d1 mt-12 max-w-[13ch] text-ink md:mt-16">
            Homes that outlast the people who build them
          </h1>

          <p className="t-lead mt-10 max-w-[46ch] text-ink-soft">
            A deliberately small portfolio of architecturally significant
            estates, penthouses and land across Europe — represented with
            discretion.
          </p>

          <a
            href="#portfolio"
            className="t-label mt-12 inline-flex items-center gap-4 text-bronze"
          >
            <span
              aria-hidden
              className="inline-block h-px w-14 bg-bronze align-middle"
            />
            The portfolio
          </a>
        </div>

        {/* One plate, placed. */}
        <figure className="m-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-raised">
            <Image
              src={PLATE}
              alt="Villa Serena, Ravello — terraces above the Tyrrhenian coast"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
          </div>
          <figcaption className="t-label mt-3 flex justify-between text-ink-soft">
            <span>Villa Serena</span>
            <span>Ravello</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
