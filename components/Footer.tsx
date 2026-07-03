"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { MagneticButton } from "./animations/MagneticButton";
import { Logo } from "./Logo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative border-t border-gold/10 bg-ink-soft/60">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-12 md:px-10 md:py-24">
        <div>
          <Logo markSize={30} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            A private brokerage for architecturally significant homes across Europe. Discretion,
            pace, and an eye for the enduring.
          </p>
          <div className="mt-6 flex gap-4 text-mist">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-gold">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-gold">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-gold">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/70">Explore</h4>
          <ul className="space-y-3 text-sm text-mist">
            <li><Link href="/listings" className="hover:text-cloud">Listings</Link></li>
            <li><Link href="/agents" className="hover:text-cloud">Advisors</Link></li>
            <li><Link href="/about" className="hover:text-cloud">The Firm</Link></li>
            <li><Link href="/contact" className="hover:text-cloud">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/70">Offices</h4>
          <ul className="space-y-3 text-sm text-mist">
            <li>London · +44 20 7100 4455</li>
            <li>Zürich · +41 44 500 2210</li>
            <li>Amalfi · +39 06 4200 1180</li>
            <li>hello@virelle.com</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/70">
            Private previews
          </h4>
          <p className="mb-4 text-sm text-mist">
            Off-market listings, before they are listed.
          </p>
          {done ? (
            <p className="text-sm text-gold-light">Thank you — you're on the list.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire to Formspree/Web3Forms — see components/InquiryForm.tsx
                if (email) setDone(true);
              }}
              className="flex items-center gap-2 rounded-full border border-gold/25 bg-ink/50 py-1 pl-4 pr-1"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent text-sm text-cloud outline-none placeholder:text-mist/60"
              />
              <MagneticButton
                as="button"
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-onaccent"
              >
                <ArrowRight size={16} />
              </MagneticButton>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-gold/10 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 text-xs text-mist/70 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Virelle. All rights reserved.</span>
          <span>Crafted with restraint · Static site · No trackers</span>
        </div>
      </div>
    </footer>
  );
}
