"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import {
  properties as allProperties,
  cities,
  propertyTypes,
  formatPrice,
} from "@/lib/data/properties";
import { getAgent } from "@/lib/data/agents";
import { PropertyCard } from "@/components/PropertyCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Dropdown } from "@/components/ui/Dropdown";

type Sort = "newest" | "price-asc" | "price-desc" | "beds";

const PAGE_SIZE = 6;
const MAX = 25_000_000;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const statusOptions = [
  { value: "", label: "Any status" },
  { value: "for-sale", label: "For sale" },
  { value: "for-rent", label: "For rent" },
  { value: "sold", label: "Sold" },
];
const cityOptions = [{ value: "", label: "Anywhere" }, ...cities.map((c) => ({ value: c, label: c }))];
const typeOptions = [{ value: "", label: "Any type" }, ...propertyTypes.map((t) => ({ value: t, label: cap(t) }))];
const bedOptions = [
  { value: "0", label: "Any beds" },
  ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ beds` })),
];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "beds", label: "Most bedrooms" },
];

/** Rounded pill wrapper that hosts a filter Dropdown in the sticky filter bar. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-ink/60 px-4 py-2 text-cloud transition-colors">
      {children}
    </div>
  );
}

interface Filters {
  city: string;
  type: string;
  status: string;
  agentId: string;
  minBeds: number;
  maxPrice: number;
}

const emptyFilters: Filters = {
  city: "",
  type: "",
  status: "",
  agentId: "",
  minBeds: 0,
  maxPrice: MAX,
};

export function ListingsView() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Seed from query params (set by the hero search / agent links).
  useEffect(() => {
    setFilters({
      city: params.get("city") ?? "",
      type: params.get("type") ?? "",
      status: params.get("status") ?? "",
      agentId: params.get("agent") ?? "",
      minBeds: Number(params.get("minBeds") ?? 0),
      maxPrice: Number(params.get("maxPrice") ?? MAX),
    });
    setPage(1);
  }, [params]);

  const filtered = useMemo(() => {
    const result = allProperties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.agentId && p.agentId !== filters.agentId) return false;
      if (filters.minBeds && p.bedrooms < filters.minBeds) return false;
      // Only price-gate sale/rent items; the slider is in sale-price terms.
      if (p.status !== "for-rent" && p.price > filters.maxPrice) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "beds":
          return b.bedrooms - a.bedrooms;
        default:
          return +new Date(b.createdAt) - +new Date(a.createdAt);
      }
    });
    return result;
  }, [filters, sort]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const activeAgent = filters.agentId ? getAgent(filters.agentId) : undefined;
  const activeCount = Object.entries(filters).filter(([k, v]) =>
    k === "maxPrice" ? v < MAX : k === "minBeds" ? v > 0 : Boolean(v)
  ).length;

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10">
      <div className="mb-10 border-t border-cloud/10 pt-6">
        <p className="mb-6 flex items-baseline gap-3 text-xs uppercase tracking-[0.22em] text-mist">
          <span className="font-display tabular-nums text-gold">(01)</span>
          The Portfolio
        </p>
        <h1 className="font-display text-3xl leading-[1.02] text-cloud sm:text-4xl md:text-6xl">
          {activeAgent ? `Represented by ${activeAgent.name}` : "All listings"}
        </h1>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 mb-10 rounded-lg border border-cloud/10 bg-ink/70 p-3 backdrop-blur-xl md:p-4">
        {/* Mobile: compact row with toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex flex-1 items-center gap-2 text-xs uppercase tracking-wider text-mist"
          >
            <SlidersHorizontal size={14} />
            Filters {activeCount > 0 && `(${activeCount})`}
            <ChevronDown size={14} className={`ml-auto transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>
          <Pill>
            <Dropdown
              options={sortOptions}
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              align="right"
              buttonClassName="text-xs"
            />
          </Pill>
        </div>

        {/* Mobile: expandable filter grid */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden"
            >
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Pill>
                  <Dropdown
                    options={statusOptions}
                    value={filters.status}
                    onChange={(v) => update("status", v)}
                    placeholder="Any status"
                    active={!!filters.status}
                    buttonClassName="text-xs"
                  />
                </Pill>
                <Pill>
                  <Dropdown
                    options={cityOptions}
                    value={filters.city}
                    onChange={(v) => update("city", v)}
                    placeholder="Anywhere"
                    active={!!filters.city}
                    buttonClassName="text-xs"
                  />
                </Pill>
                <Pill>
                  <Dropdown
                    options={typeOptions}
                    value={filters.type}
                    onChange={(v) => update("type", v)}
                    placeholder="Any type"
                    active={!!filters.type}
                    buttonClassName="text-xs"
                  />
                </Pill>
                <Pill>
                  <Dropdown
                    options={bedOptions}
                    value={String(filters.minBeds)}
                    onChange={(v) => update("minBeds", Number(v))}
                    placeholder="Any beds"
                    active={filters.minBeds > 0}
                    buttonClassName="text-xs"
                  />
                </Pill>
                <label className="col-span-2 flex items-center gap-3 rounded-full bg-ink/60 px-4 py-2 text-xs text-mist">
                  <span className="shrink-0">≤ €{(filters.maxPrice / 1_000_000).toFixed(1)}M</span>
                  <input
                    type="range"
                    min={500_000}
                    max={MAX}
                    step={250_000}
                    value={filters.maxPrice}
                    onChange={(e) => update("maxPrice", Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                </label>
                {activeCount > 0 && (
                  <button
                    onClick={() => { setFilters(emptyFilters); setPage(1); }}
                    className="col-span-2 flex items-center justify-center gap-1 rounded-full border border-gold/30 px-3 py-2 text-xs text-gold-light hover:bg-gold/10"
                  >
                    <X size={12} /> Clear all ({activeCount})
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: inline row */}
        <div className="hidden flex-wrap items-center gap-3 md:flex">
          <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-mist">
            <SlidersHorizontal size={14} /> Filter
          </span>

          <Pill>
            <Dropdown
              options={statusOptions}
              value={filters.status}
              onChange={(v) => update("status", v)}
              placeholder="Any status"
              active={!!filters.status}
              buttonClassName="text-xs"
            />
          </Pill>

          <Pill>
            <Dropdown
              options={cityOptions}
              value={filters.city}
              onChange={(v) => update("city", v)}
              placeholder="Anywhere"
              active={!!filters.city}
              buttonClassName="text-xs"
            />
          </Pill>

          <Pill>
            <Dropdown
              options={typeOptions}
              value={filters.type}
              onChange={(v) => update("type", v)}
              placeholder="Any type"
              active={!!filters.type}
              buttonClassName="text-xs"
            />
          </Pill>

          <Pill>
            <Dropdown
              options={bedOptions}
              value={String(filters.minBeds)}
              onChange={(v) => update("minBeds", Number(v))}
              placeholder="Any beds"
              active={filters.minBeds > 0}
              buttonClassName="text-xs"
            />
          </Pill>

          <label className="flex items-center gap-3 rounded-full bg-ink/60 px-4 py-2 text-xs text-mist">
            <span>≤ €{(filters.maxPrice / 1_000_000).toFixed(1)}M</span>
            <input
              type="range"
              min={500_000}
              max={MAX}
              step={250_000}
              value={filters.maxPrice}
              onChange={(e) => update("maxPrice", Number(e.target.value))}
              className="w-28 accent-gold"
            />
          </label>

          <div className="ml-auto flex items-center gap-3">
            <Pill>
              <Dropdown
                options={sortOptions}
                value={sort}
                onChange={(v) => setSort(v as Sort)}
                align="right"
                buttonClassName="text-xs"
              />
            </Pill>
            {activeCount > 0 && (
              <button
                onClick={() => {
                  setFilters(emptyFilters);
                  setPage(1);
                }}
                className="flex items-center gap-1 rounded-full border border-gold/30 px-3 py-2 text-xs text-gold-light hover:bg-gold/10"
              >
                <X size={12} /> Clear ({activeCount})
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-mist">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState onClear={() => setFilters(emptyFilters)} />
      ) : (
        <>
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length < filtered.length && (
            <div className="mt-14 flex justify-center">
              <MagneticButton
                as="button"
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-gold/40 px-8 py-3 text-sm text-gold-light hover:bg-gold/10"
              >
                Load more ({filtered.length - visible.length} remaining)
              </MagneticButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-cloud/15 py-24 text-center"
    >
      <h3 className="font-display text-2xl text-cloud">Nothing matches — yet</h3>
      <p className="max-w-sm text-sm text-mist">
        The portfolio is deliberately small. Try widening your criteria, or speak with an advisor
        about off-market opportunities.
      </p>
      <button
        onClick={onClear}
        className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-onaccent"
      >
        Clear filters
      </button>
    </motion.div>
  );
}
