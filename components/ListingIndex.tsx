"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Property } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/properties";
import { getAgent } from "@/lib/data/agents";
import { getPlan } from "@/lib/data/plans";
import { Plan } from "./Plan";
import { IconCross, IconArrow } from "./Icons";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ===========================================================================
   THE PLAN CHEST

   A brokerage that deals in architecture should not present its portfolio as a
   wall of photographs — every portal already does that, and a photograph is
   the one thing a competitor can licence from the same stock library.

   So the portfolio is a drawing register. Each property is a line in a
   schedule. Pulling one open does not navigate anywhere: the line expands in
   place into the sheet itself — the measured plan drawing itself on, the
   dimensions, the schedule of accommodation, and exactly one photographic
   plate. Push it closed and the register resumes.

   One drawer opens at a time. That is not a technical limitation; it is the
   whole idea. You take one drawing out of a plan chest and lay it flat.
   =========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPE_LABEL: Record<Property["type"], string> = {
  estate: "Estate",
  house: "House",
  apartment: "Apartment",
  land: "Land",
};

const STATUS_LABEL: Record<Property["status"], string> = {
  "for-sale": "",
  "for-rent": "To let",
  sold: "Sold",
};

/** Stable sheet reference, derived from the property id — not its row position.
 *  A drawing keeps its number when the register is filtered. */
const refOf = (p: Property) => String(p.id.replace(/\D/g, "")).padStart(2, "0");

export function ListingIndex({
  properties,
  /** Rendered above the register — the sheet the register belongs to. */
  className = "",
}: {
  properties: Property[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <div className={`border-t border-rule ${className}`}>
      {properties.map((p) => (
        <Sheet
          key={p.id}
          property={p}
          open={openId === p.id}
          onToggle={() => toggle(p.id)}
        />
      ))}
    </div>
  );
}

function Sheet({
  property: p,
  open,
  onToggle,
}: {
  property: Property;
  open: boolean;
  onToggle: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const agent = getAgent(p.agentId);
  const plan = getPlan(p.slug);
  const status = STATUS_LABEL[p.status];
  const panelId = `sheet-${p.id}`;
  const headId = `sheet-head-${p.id}`;

  const handle = () => {
    const wasOpen = open;
    onToggle();
    // Keep the register line you just pulled in view — never yank the page.
    if (!wasOpen) {
      window.setTimeout(() => {
        const el = rowRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < 84 || top > window.innerHeight - 160) {
          window.scrollTo({
            top: window.scrollY + top - 96,
            behavior: reduced ? "auto" : "smooth",
          });
        }
      }, 90);
    }
  };

  return (
    <div ref={rowRef} className="border-b border-rule">
      {/* ---- The register line -------------------------------------------- */}
      <h3 id={headId} className="m-0">
        <button
          type="button"
          onClick={handle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full grid-cols-[2.25rem_1fr_2rem] items-baseline gap-x-4 gap-y-1 py-6 text-left transition-colors md:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_9.5rem_5.5rem_10rem_2rem] md:items-center md:gap-x-6 md:py-7"
        >
          {/* sheet ref */}
          <span
            className={`t-label tabular-nums transition-colors ${
              open ? "text-bronze" : "text-ink-soft group-hover:text-bronze"
            }`}
          >
            {refOf(p)}
          </span>

          {/* name */}
          <span className="min-w-0">
            <span className="t-display t-d4 block truncate text-ink">
              {p.title}
            </span>
            {/* location rides under the name on small screens */}
            <span className="t-small mt-1 block text-ink-soft md:hidden">
              {p.location}, {p.city}
            </span>
          </span>

          {/* control — always last in the visual row on mobile */}
          <span
            className={`justify-self-end transition-colors md:order-last ${
              open ? "text-bronze" : "text-ink-soft group-hover:text-ink"
            }`}
          >
            <IconCross size={18} open={open} />
          </span>

          {/* location (desktop column) */}
          <span className="t-small hidden truncate text-ink-soft md:block">
            {p.location}, {p.city}
          </span>

          {/* type · year */}
          <span className="t-label hidden whitespace-nowrap text-ink-soft md:block">
            {TYPE_LABEL[p.type]}
            {p.yearBuilt > 0 && <> · {p.yearBuilt}</>}
          </span>

          {/* area */}
          <span className="t-small hidden tabular-nums text-ink-soft md:block md:text-right">
            {p.sqm.toLocaleString()} m²
          </span>

          {/* price */}
          <span className="col-start-2 flex items-baseline gap-3 md:col-start-auto md:justify-end">
            {status && (
              <span className="t-label whitespace-nowrap text-bronze-deep">
                {status}
              </span>
            )}
            <span className="t-figure whitespace-nowrap text-[1.0625rem] text-ink md:text-lg">
              {formatPrice(p.price, p.status)}
            </span>
          </span>

          {/* mobile-only meta line */}
          <span className="t-label col-start-2 text-ink-soft md:hidden">
            {TYPE_LABEL[p.type]}
            {p.yearBuilt > 0 && <> · {p.yearBuilt}</>} · {p.sqm.toLocaleString()} m²
          </span>
        </button>
      </h3>

      {/* ---- The sheet ------------------------------------------------------ */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sheet"
            id={panelId}
            role="region"
            aria-labelledby={headId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduced ? 0 : 0.7, ease: EASE },
              opacity: { duration: reduced ? 0 : 0.32, ease: EASE },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-16 pt-2 md:pb-24">
              <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                {/* --- the drawing --- */}
                <div>
                  {plan ? (
                    <>
                      <Plan spec={plan} title={p.title} draw={open} />
                      <p className="t-label mt-4 flex justify-between text-ink-soft">
                        <span>{plan.sheet}</span>
                        <span className="text-bronze">
                          Sheet {refOf(p)}
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>

                {/* --- the schedule --- */}
                <div className="lg:pt-2">
                  <p className="t-lead max-w-prose text-ink-soft">
                    {p.description}
                  </p>

                  <dl className="mt-10 border-t border-rule">
                    {p.type !== "land" && (
                      <>
                        <ScheduleRow label="Bedrooms" value={p.bedrooms} />
                        <ScheduleRow label="Bathrooms" value={p.bathrooms} />
                      </>
                    )}
                    <ScheduleRow
                      label={p.type === "land" ? "Site area" : "Interior"}
                      value={`${p.sqm.toLocaleString()} m²`}
                    />
                    {/* The drawing's linear dimensions repeated as real text —
                        nothing on this site exists only inside an SVG. */}
                    {plan && (
                      <ScheduleRow
                        label="Overall"
                        value={plan.dims.map((d) => d.t).join(" × ")}
                      />
                    )}
                    {p.yearBuilt > 0 && (
                      <ScheduleRow label="Built" value={p.yearBuilt} />
                    )}
                    <ScheduleRow label="Type" value={TYPE_LABEL[p.type]} />
                    {agent && <ScheduleRow label="Advisor" value={agent.name} />}
                  </dl>

                  {p.features.length > 0 && (
                    <ul className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="t-small border-t border-rule py-2 text-ink-soft"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link
                      href={`/listings/${p.slug}`}
                      className="t-label group inline-flex items-center gap-2 text-bronze"
                    >
                      Full sheet
                      <IconArrow
                        size={15}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={`/contact?property=${p.slug}`}
                      className="t-label inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                    >
                      Arrange a viewing
                    </Link>
                  </div>
                </div>
              </div>

              {/* --- one plate. Not a gallery. --- */}
              <figure className="mt-14 md:mt-20">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-raised md:aspect-[21/9]">
                  <Image
                    src={p.images[0]}
                    alt={`${p.title}, ${p.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="t-label mt-3 flex justify-between text-ink-soft">
                  <span>{p.title}</span>
                  <span>
                    {p.location}, {p.city}
                  </span>
                </figcaption>
              </figure>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScheduleRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule py-3">
      <dt className="t-label text-ink-soft">{label}</dt>
      <dd className="t-small m-0 tabular-nums text-ink">{value}</dd>
    </div>
  );
}
