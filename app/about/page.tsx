import Link from "next/link";
import { DrawnRule } from "@/components/SectionHead";
import { IconArrow } from "@/components/Icons";

export const metadata = {
  title: "The Firm — Virelle",
  description: "A private brokerage representing architecturally significant homes.",
};

/* TODO — UNVERIFIED CONTENT.
   The years and events below are placeholder narrative carried over from the
   original build. They are not sourced. Replace with the firm's real history
   before this goes near a client, or cut the dates and keep the prose. The
   fabricated performance statistics that used to sit on this page (homes
   placed, average days on market, client-satisfaction percentage) have been
   removed outright rather than restyled. */
const chapters = [
  {
    n: "01",
    year: "1998",
    t: "A quiet beginning",
    b: "Founded above a bookshop in Marylebone with a single mandate and a conviction that the right home is found, not sold.",
  },
  {
    n: "02",
    year: "2007",
    t: "Across the water",
    b: "The first Continental office opens in Zürich. The portfolio grows deliberately — never more than we can represent with full attention.",
  },
  {
    n: "03",
    year: "2015",
    t: "The coastal chapter",
    b: "An Amalfi desk is established. Waterfront and architectural work becomes a defining thread of the firm's identity.",
  },
  {
    n: "04",
    year: "Today",
    t: "The same conviction",
    b: "Three cities, one bench of specialists, and an unfashionable respect for the long view. We still measure success in the right fit, not the fastest close.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <DrawnRule />
      <p className="t-label pt-5 text-ink-soft">
        <span className="tabular-nums text-bronze">01</span>
        <span className="ml-3">The Firm</span>
      </p>

      <h1 className="t-display t-d1 mt-8 max-w-[16ch] text-ink">
        The right home is found, not sold
      </h1>

      <p className="t-lead mt-10 max-w-[54ch] text-ink-soft">
        Virelle is a private brokerage, not a portal. We keep the portfolio
        small on purpose, so that every home receives the full attention of a
        specialist who knows its market intimately — and so that every drawing
        we publish is one we made ourselves.
      </p>

      <ol className="mt-24 list-none border-t border-rule p-0 md:mt-32">
        {chapters.map((c) => (
          <li
            key={c.n}
            className="grid gap-x-10 gap-y-4 border-b border-rule py-10 md:grid-cols-[3rem_7rem_minmax(0,16rem)_minmax(0,1fr)] md:py-14"
          >
            <span className="t-label tabular-nums text-bronze">{c.n}</span>
            <span className="t-figure text-xl text-ink">{c.year}</span>
            <h2 className="t-display t-d4 m-0 text-ink">{c.t}</h2>
            <p className="t-small m-0 max-w-[56ch] text-ink-soft">{c.b}</p>
          </li>
        ))}
      </ol>

      <div className="mt-24">
        <h2 className="t-display t-d2 max-w-[16ch] text-ink">
          Meet the people behind the portfolio
        </h2>
        <Link
          href="/agents"
          className="t-label group mt-8 inline-flex items-center gap-3 border-b border-bronze pb-2 text-bronze"
        >
          Our advisors
          <IconArrow
            size={15}
            className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
