"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home } from "lucide-react";
import { cities, propertyTypes } from "@/lib/data/properties";
import { MagneticButton } from "./animations/MagneticButton";
import { Dropdown } from "./ui/Dropdown";

const MAX_PRICE = 25_000_000;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const locationOptions = [{ value: "", label: "Anywhere" }, ...cities.map((c) => ({ value: c, label: c }))];
const typeOptions = [{ value: "", label: "Any type" }, ...propertyTypes.map((t) => ({ value: t, label: cap(t) }))];

/** Hero search overlay. Purely client-side — composes query params and routes. */
export function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [deal, setDeal] = useState<"for-sale" | "for-rent">("for-sale");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("city", location);
    if (type) params.set("type", type);
    if (maxPrice < MAX_PRICE) params.set("maxPrice", String(maxPrice));
    params.set("status", deal);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-lg border border-cloud/15 bg-ink/50 p-3 backdrop-blur-xl"
    >
      <div className="mb-3 flex w-fit rounded-full bg-ink/60 p-1 text-sm">
        {(["for-sale", "for-rent"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDeal(d)}
            className={`rounded-full px-5 py-1.5 transition-colors ${
              deal === d ? "bg-gold text-onaccent" : "text-mist hover:text-cloud"
            }`}
          >
            {d === "for-sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1.3fr_auto] md:items-end">
        <div className="flex flex-col gap-1">
          <span className="px-1 text-[11px] uppercase tracking-wider text-mist/70">Location</span>
          <Dropdown
            options={locationOptions}
            value={location}
            onChange={setLocation}
            icon={<MapPin size={16} />}
            placeholder="Anywhere"
            buttonClassName="rounded-xl bg-ink/60 px-3 py-2.5 text-sm hover:bg-ink/80"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="px-1 text-[11px] uppercase tracking-wider text-mist/70">Type</span>
          <Dropdown
            options={typeOptions}
            value={type}
            onChange={setType}
            icon={<Home size={16} />}
            placeholder="Any type"
            buttonClassName="rounded-xl bg-ink/60 px-3 py-2.5 text-sm hover:bg-ink/80"
          />
        </div>

        <label className="flex flex-col gap-1">
          <span className="px-1 text-[11px] uppercase tracking-wider text-mist/70">
            Max price · €{(maxPrice / 1_000_000).toFixed(1)}M
          </span>
          <div className="flex items-center rounded-xl bg-ink/60 px-3 py-3.5">
            <input
              type="range"
              min={500_000}
              max={MAX_PRICE}
              step={250_000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
        </label>

        <MagneticButton
          as="button"
          type="submit"
          className="flex h-[46px] items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-medium text-onaccent"
        >
          <Search size={16} /> Search
        </MagneticButton>
      </div>
    </form>
  );
}
