"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./animations/MagneticButton";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { EASE } from "@/lib/animations";

const links = [
  { href: "/listings", label: "Listings" },
  { href: "/agents", label: "Advisors" },
  { href: "/about", label: "The Firm" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // These routes open on a full-bleed dark hero (home + property detail), so a
  // transparent nav over them needs light content in BOTH themes. Anywhere
  // else, or once scrolled onto the solid bar, the nav follows the theme.
  const overDarkHero =
    pathname === "/" || /^\/listings\/.+/.test(pathname);
  const lightNav = overDarkHero && !scrolled;

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-ink) 72%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid color-mix(in srgb, var(--color-gold) 18%, transparent)"
            : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label="Virelle home">
            <Logo light={lightNav} />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <MagneticButton key={l.href} as="div" strength={0.25}>
                <Link
                  href={l.href}
                  className={`group relative text-xs uppercase tracking-[0.18em] transition-colors ${
                    pathname.startsWith(l.href)
                      ? lightNav
                        ? "text-ember"
                        : "text-gold"
                      : lightNav
                        ? "text-snow/70 hover:text-snow"
                        : "text-mist hover:text-cloud"
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </MagneticButton>
            ))}
            <MagneticButton
              as="a"
              href="/contact"
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                lightNav
                  ? "border-snow/40 bg-snow/5 text-snow hover:bg-snow/15"
                  : "border-gold/40 bg-gold/5 text-gold-light hover:bg-gold/15"
              }`}
            >
              Enquire
            </MagneticButton>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className={lightNav ? "text-snow" : "text-cloud"}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.6, ease: EASE.outExpo }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-cloud">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[...links, { href: "/contact", label: "Enquire" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASE.outExpo }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-4xl text-cloud/90 hover:text-gold sm:text-5xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
