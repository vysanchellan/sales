import { SectionHead } from "@/components/SectionHead";

/* The firm, written as a specification rather than three cards with icons.
   Numbered clauses on hairlines — the same register grammar as the portfolio,
   because it is the same document. */

const clauses = [
  {
    n: "01",
    t: "Discretion",
    b: "Most of what we do is never listed. The best homes change hands in a conversation, not a campaign.",
  },
  {
    n: "02",
    t: "Patience",
    b: "We would rather tell you to wait than to buy. The right home is worth the right moment.",
  },
  {
    n: "03",
    t: "Craft",
    b: "We represent architecture we believe in — and present it with the care it was built with.",
  },
];

export function Firm() {
  return (
    <section className="mx-auto max-w-[1560px] px-6 py-24 md:px-12 md:py-40">
      <SectionHead index="02" label="The Firm" />

      <div className="mt-14 grid gap-x-20 gap-y-12 lg:grid-cols-[1.1fr_1fr]">
        <h2 className="t-display t-d2 max-w-[16ch] text-ink">
          We don&rsquo;t sell houses. We place people in the right one.
        </h2>
        <p className="t-lead max-w-[52ch] text-ink-soft lg:pt-3">
          Virelle was founded on a quiet conviction: that the right home is
          found, not sold. We represent a small, deliberate portfolio — advising
          a private clientele with patience, candour, and an unfashionable
          respect for the long view.
        </p>
      </div>

      <dl className="mt-16 border-t border-rule md:mt-20">
        {/* A <div> inside a <dl> may hold only <dt> and <dd> — the clause
            number lives inside the term, not beside it. */}
        {clauses.map((c) => (
          <div
            key={c.n}
            className="grid gap-x-8 gap-y-3 border-b border-rule py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:py-10"
          >
            <dt className="flex items-baseline gap-5">
              <span className="t-label tabular-nums text-bronze">{c.n}</span>
              <span className="t-display t-d4 text-ink">{c.t}</span>
            </dt>
            <dd className="t-small m-0 max-w-[56ch] text-ink-soft">{c.b}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
