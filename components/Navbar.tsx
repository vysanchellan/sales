"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logotype } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { IconMenu, IconClose } from "./Icons";

/* The bar carries no blur. A backdrop-filter on a fixed element repaints the
   whole viewport on every scroll frame, which is the single most expensive
   thing a phone can be asked to do. It is a flat surface with a hairline. */

const links = [
  { href: "/listings", label: "Portfolio" },
  { href: "/about", label: "The Firm" },
  { href: "/agents", label: "Advisors" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // The home page and every property sheet open on full-bleed photography, so
  // an unscrolled bar sits on an image rather than on the page surface. There
  // it uses the fixed plate tokens in BOTH themes — theme-coloured text over a
  // photograph is a coin toss, and it loses over a bright sky.
  const overImage =
    (pathname === "/" || /^\/listings\/.+/.test(pathname)) && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-rule bg-paper" : "border-transparent bg-transparent"
        }`}
      >
        {/* A gradient, not a backdrop-filter: a blur on a fixed bar repaints the
            whole viewport every scroll frame on a phone. This costs nothing. */}
        {overImage && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-plate/75 via-plate/35 to-transparent"
          />
        )}

        <nav className="relative mx-auto flex h-[68px] max-w-[1560px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            aria-label="Virelle — home"
            className={`transition-colors ${
              overImage ? "text-plate-ink" : "text-ink hover:text-bronze"
            }`}
          >
            <Logotype height={16} />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`t-label transition-colors ${
                    overImage
                      ? active
                        ? "text-plate-accent"
                        : "text-plate-ink/80 hover:text-plate-ink"
                      : active
                        ? "text-bronze"
                        : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <ThemeToggle
              className={`-mr-2 ${overImage ? "text-plate-ink hover:text-plate-accent" : ""}`}
            />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle className={overImage ? "text-plate-ink" : ""} />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`inline-flex h-8 w-8 items-center justify-center ${
                overImage ? "text-plate-ink" : "text-ink"
              }`}
            >
              <IconMenu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex h-[68px] items-center justify-between px-6">
              <Logotype height={16} className="text-ink" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-8 w-8 items-center justify-center text-ink"
              >
                <IconClose size={22} />
              </button>
            </div>
            <div className="mt-8 border-t border-rule px-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="t-display block border-b border-rule py-6 text-[2rem] leading-none text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
