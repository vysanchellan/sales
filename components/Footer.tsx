"use client";

import Link from "next/link";
import { useState } from "react";
import { Logotype } from "./Logo";
import { IconArrowRight } from "./Icons";

/* The social row is gone. It pointed at href="#" — three dead links dressed as
   a presence the firm does not have. A colophon with nothing to prove is
   quieter than one with placeholder icons. */

const offices = [
  { city: "London", line: "12 Chiltern Street, W1U", tel: "+44 20 7100 4455" },
  { city: "Zürich", line: "Bahnhofstrasse 21, 8001", tel: "+41 44 500 2210" },
  { city: "Amalfi", line: "Via dei Mulini 8, 84017", tel: "+39 06 4200 1180" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1560px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logotype height={18} className="text-ink" />
            <p className="t-small mt-6 max-w-[38ch] text-ink-soft">
              A private brokerage for architecturally significant homes across
              Europe. Discretion, pace, and an eye for the enduring.
            </p>
            <Link
              href="/contact"
              className="t-label mt-8 inline-block text-bronze underline-offset-4 hover:underline"
            >
              hello@virelle.com
            </Link>
          </div>

          <div>
            <h2 className="t-label border-b border-rule pb-3 text-ink-soft">
              Offices
            </h2>
            <ul className="m-0 list-none p-0">
              {offices.map((o) => (
                <li key={o.city} className="border-b border-rule py-4">
                  <p className="t-small text-ink">{o.city}</p>
                  <p className="t-small text-ink-soft">{o.line}</p>
                  <a
                    href={`tel:${o.tel.replace(/\s/g, "")}`}
                    className="t-small tabular-nums text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                  >
                    {o.tel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-label border-b border-rule pb-3 text-ink-soft">
              Private previews
            </h2>
            <p className="t-small mt-4 max-w-[34ch] text-ink-soft">
              Off-market work, before it reaches the register.
            </p>

            {done ? (
              <p className="t-small mt-6 text-bronze">
                Thank you — you are on the list.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setDone(true);
                }}
                className="mt-6"
              >
                <label htmlFor="preview-email" className="t-label text-ink-soft">
                  Email address
                </label>
                <div className="mt-2 flex items-center gap-3 border-b border-rule-strong">
                  <input
                    id="preview-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="t-small w-full bg-transparent py-2 text-ink outline-none placeholder:text-ink-soft/60"
                  />
                  <button
                    type="submit"
                    aria-label="Join the private preview list"
                    className="shrink-0 py-2 text-bronze transition-transform duration-500 hover:translate-x-0.5"
                  >
                    <IconArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}

            <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: "/listings", label: "Portfolio" },
                { href: "/about", label: "The Firm" },
                { href: "/agents", label: "Advisors" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="t-label text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-rule pt-6 md:flex-row">
          <p className="t-label text-ink-soft">
            © {new Date().getFullYear()} Virelle
          </p>
          <p className="t-label text-ink-soft">
            Drawings by the practice · Static site · No trackers
          </p>
        </div>
      </div>
    </footer>
  );
}
