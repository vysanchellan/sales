"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  properties as allProperties,
  cities,
  propertyTypes,
} from "@/lib/data/properties";
import { getAgent } from "@/lib/data/agents";
import { ListingIndex } from "@/components/ListingIndex";
import { DrawnRule } from "@/components/SectionHead";
import { IconChevron } from "@/components/Icons";

/* Four controls, not six. A portfolio of ten does not need a price slider and
   a bedroom minimum; offering them would advertise a catalogue this firm does
   not have. Native selects on purpose — they are quieter than a custom
   listbox, they are keyboard- and screen-reader-correct for free, and on a
   phone they hand over to the OS picker, which is better than anything we
   would build. */

type Sort = "newest" | "price-desc" | "price-asc" | "area";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block min-w-0">
      <span className="t-label block text-ink-soft">{label}</span>
      <span className="relative mt-2 block border-b border-rule-strong">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="t-small w-full appearance-none bg-transparent py-2 pr-7 text-ink outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <IconChevron
          size={15}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink-soft"
        />
      </span>
    </label>
  );
}

export function ListingsView() {
  const params = useSearchParams();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    setAgentId(params.get("agent") ?? "");
    setCity(params.get("city") ?? "");
    setType(params.get("type") ?? "");
    setStatus(params.get("status") ?? "");
  }, [params]);

  const list = useMemo(() => {
    const out = allProperties.filter((p) => {
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      if (agentId && p.agentId !== agentId) return false;
      return true;
    });
    out.sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "area":
          return b.sqm - a.sqm;
        default:
          return +new Date(b.createdAt) - +new Date(a.createdAt);
      }
    });
    return out;
  }, [city, type, status, agentId, sort]);

  const agent = agentId ? getAgent(agentId) : undefined;
  const filtered = Boolean(city || type || status || agentId);

  return (
    <div className="mx-auto max-w-[1560px] px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <DrawnRule />
      <p className="t-label pt-5 text-ink-soft">
        <span className="tabular-nums text-bronze">01</span>
        <span className="ml-3">The portfolio</span>
      </p>

      <h1 className="t-display t-d1 mt-8 max-w-[14ch] text-ink">
        {agent ? `Represented by ${agent.name}` : "The register"}
      </h1>

      <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,14rem))]">
        <Field
          label="Location"
          value={city}
          onChange={setCity}
          options={[
            { value: "", label: "Anywhere" },
            ...cities.map((c) => ({ value: c, label: c })),
          ]}
        />
        <Field
          label="Type"
          value={type}
          onChange={setType}
          options={[
            { value: "", label: "Any type" },
            ...propertyTypes.map((t) => ({ value: t, label: cap(t) })),
          ]}
        />
        <Field
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "", label: "Any status" },
            { value: "for-sale", label: "For sale" },
            { value: "for-rent", label: "To let" },
            { value: "sold", label: "Sold" },
          ]}
        />
        <Field
          label="Order"
          value={sort}
          onChange={(v) => setSort(v as Sort)}
          options={[
            { value: "newest", label: "Most recent" },
            { value: "price-desc", label: "Price — high to low" },
            { value: "price-asc", label: "Price — low to high" },
            { value: "area", label: "Area" },
          ]}
        />
      </div>

      <p
        className="t-label mt-14 flex items-baseline gap-4 text-ink-soft"
        aria-live="polite"
      >
        <span className="tabular-nums">
          {String(list.length).padStart(2, "0")}
        </span>
        <span>{list.length === 1 ? "sheet" : "sheets"}</span>
        {filtered && (
          <button
            onClick={() => {
              setCity("");
              setType("");
              setStatus("");
              setAgentId("");
            }}
            className="t-label ml-auto text-bronze underline-offset-4 hover:underline"
          >
            Clear
          </button>
        )}
      </p>

      {list.length === 0 ? (
        <div className="mt-8 border-y border-rule py-24 text-center">
          <p className="t-display t-d3 text-ink">Nothing matches — yet</p>
          <p className="t-small mx-auto mt-4 max-w-[40ch] text-ink-soft">
            The portfolio is deliberately small. Widen the criteria, or speak
            with an advisor about work that is not on the register.
          </p>
        </div>
      ) : (
        <ListingIndex properties={list} className="mt-6" />
      )}
    </div>
  );
}
