import Image from "next/image";
import Link from "next/link";
import { agents } from "@/lib/data/agents";
import { getByAgent } from "@/lib/data/properties";
import { DrawnRule } from "./SectionHead";
import { IconArrow } from "./Icons";

/* No modal, no tilt. A bench of four people does not need a dialog layer —
   everything worth knowing fits on the sheet. */

export function AgentsView() {
  return (
    <div className="mx-auto max-w-[1560px] px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <DrawnRule />
      <p className="t-label pt-5 text-ink-soft">
        <span className="tabular-nums text-bronze">01</span>
        <span className="ml-3">The people</span>
      </p>

      <h1 className="t-display t-d1 mt-8 max-w-[12ch] text-ink">Advisors</h1>
      <p className="t-lead mt-8 max-w-[48ch] text-ink-soft">
        A small bench of specialists, each with a deep command of their market.
        Discretion is not a policy here — it is the practice.
      </p>

      <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((a) => {
          const count = getByAgent(a.id).length;
          return (
            <article key={a.id}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-raised">
                <Image
                  src={a.photo}
                  alt={a.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  /* Four portraits shot in four different places will never sit
                     together in colour. Greyscale is the masthead convention and
                     it lets the bench read as one bench. */
                  className="object-cover grayscale"
                />
              </div>

              <p className="t-label mt-5 text-bronze">{a.area}</p>
              <h2 className="t-display t-d4 mt-2 text-ink">{a.name}</h2>
              <p className="t-small text-ink-soft">{a.title}</p>
              <p className="t-small mt-4 text-ink-soft">{a.specialty}</p>

              <dl className="mt-6 border-t border-rule">
                <div className="flex justify-between border-b border-rule py-2.5">
                  <dt className="t-label text-ink-soft">Languages</dt>
                  <dd className="t-small m-0 text-ink">
                    {a.languages.join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-rule py-2.5">
                  <dt className="t-label text-ink-soft">On register</dt>
                  <dd className="t-small m-0 tabular-nums text-ink">
                    {String(count).padStart(2, "0")}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link
                  href={`/listings?agent=${a.id}`}
                  className="t-label group inline-flex items-center gap-2 text-bronze"
                >
                  Their sheets
                  <IconArrow
                    size={13}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <a
                  href={`mailto:${a.email}`}
                  className="t-label text-ink-soft transition-colors hover:text-ink"
                >
                  Email
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
