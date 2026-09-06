"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities, propertyTypes } from "@/lib/data/properties";
import { IconChevron, IconArrowRight } from "./Icons";

/* The hero search, sitting on the plate. Native selects on purpose — they are
   keyboard- and screen-reader-correct for free, and on a phone they hand over
   to the OS picker, which beats anything custom. */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Field({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="t-label block text-plate-ink/60">
        {label}
      </label>
      <div className="relative mt-1.5 border-b border-plate-ink/30">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="t-small w-full appearance-none bg-transparent py-2 pr-7 text-plate-ink outline-none [&>option]:bg-paper [&>option]:text-ink"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <IconChevron
          size={15}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-plate-ink/60"
        />
      </div>
    </div>
  );
}

export function HeroSearch() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid w-full max-w-3xl gap-x-8 gap-y-6 sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
    >
      <Field
        id="hs-location"
        label="Location"
        value={city}
        onChange={setCity}
        options={[
          { value: "", label: "Anywhere" },
          ...cities.map((c) => ({ value: c, label: c })),
        ]}
      />
      {/* Type and status are refinements, not entry points — on a phone they
          would push the search button off the first screen, and the register
          offers them anyway. */}
      <div className="hidden sm:block">
        <Field
          id="hs-type"
          label="Type"
          value={type}
          onChange={setType}
          options={[
            { value: "", label: "Any type" },
            ...propertyTypes.map((t) => ({ value: t, label: cap(t) })),
          ]}
        />
      </div>
      <div className="hidden sm:block">
        <Field
          id="hs-status"
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
      </div>
      <button
        type="submit"
        className="t-label group inline-flex items-center gap-3 justify-self-start border-b border-plate-accent pb-2 text-plate-accent sm:col-span-3 lg:col-span-1 lg:mb-1"
      >
        Search the register
        <IconArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
