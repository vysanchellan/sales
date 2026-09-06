import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { LazyCinematic } from "@/components/sections/LazyCinematic";
import { DrawnRule } from "@/components/SectionHead";
import { Firm } from "@/components/sections/Firm";
import { Enquire } from "@/components/sections/Enquire";
import { IconArrow } from "@/components/Icons";

/* The home page is the cinematic half of the site: photography, full bleed,
   scroll-scrubbed. The register — the measured half — lives at /listings and is
   linked from here rather than duplicated into it. An earlier pass had both the
   featured grid and the register on this page showing the same four properties,
   which was redundant to read and expensive to scroll. */

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <LazyCinematic />

      {/* The bridge between the two halves. */}
      <section className="mx-auto max-w-[1560px] px-6 py-24 md:px-12 md:py-36">
        <DrawnRule />
        <div className="grid gap-x-20 gap-y-12 pt-5 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="t-label text-ink-soft">
              <span className="tabular-nums text-bronze">02</span>
              <span className="ml-3">The Register</span>
            </p>
            <h2 className="t-display t-d2 mt-8 max-w-[15ch] text-ink">
              Two ways to see a house
            </h2>
          </div>
          <div className="lg:pt-3">
            <p className="t-lead max-w-[50ch] text-ink-soft">
              You have just walked one. The other way is to read it — every
              property in the portfolio is also a measured drawing, with its
              plan, its dimensions and its schedule of accommodation. Pull a
              sheet from the register and it opens in place.
            </p>
            <Link
              href="/listings"
              className="t-label group mt-10 inline-flex items-center gap-3 border-b border-bronze pb-2 text-bronze"
            >
              Open the register
              <IconArrow
                size={15}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <Firm />
      <Enquire />
    </>
  );
}
