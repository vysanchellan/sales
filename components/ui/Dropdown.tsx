"use client";

import { useState, useRef, useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { EASE } from "@/lib/animations";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  align?: "left" | "right";
  // When true, styles the trigger as an active/filled pill (for filter bars).
  active?: boolean;
}

/**
 * Fully custom, accessible listbox — replaces the native <select> so the panel,
 * hover states, and check marks match the site's palette and motion. Closes on
 * outside click and Escape.
 */
export function Dropdown({
  options,
  value,
  onChange,
  label,
  icon,
  placeholder = "Select",
  className = "",
  buttonClassName = "",
  align = "left",
  active = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  // Decide open direction from available space so the panel is never clipped
  // below the fold (e.g. the hero search sitting near the viewport bottom).
  const toggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const below = window.innerHeight - rect.bottom;
      const estimate = Math.min(288, options.length * 40 + 16);
      setFlip(below < estimate + 24 && rect.top > below);
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        className={`flex w-full items-center gap-2 outline-none transition-colors ${buttonClassName}`}
      >
        {icon && <span className="shrink-0 text-gold">{icon}</span>}
        <span
          className={`truncate ${
            active ? "text-gold-light" : selected ? "text-cloud" : "text-mist"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`ml-auto shrink-0 text-mist transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: flip ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: flip ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE.outExpo }}
            className={`absolute z-50 max-h-72 min-w-full overflow-auto rounded-xl border border-cloud/12 bg-ink-soft/95 p-1.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${
              flip ? "bottom-full mb-2" : "top-full mt-2"
            } ${align === "right" ? "right-0" : "left-0"}`}
          >
            {options.map((o) => {
              const isSel = o.value === value;
              return (
                <li key={o.value || "__any"}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isSel
                        ? "bg-gold/12 text-gold-light"
                        : "text-cloud/85 hover:bg-cloud/5 hover:text-cloud"
                    }`}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSel && <Check size={14} className="shrink-0 text-gold" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      {label && (
        <span className="pointer-events-none absolute -top-5 left-1 text-[11px] uppercase tracking-wider text-mist/70">
          {label}
        </span>
      )}
    </div>
  );
}
