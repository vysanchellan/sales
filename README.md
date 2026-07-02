# Kassora

A cinematic, animation-forward marketing site for a fictional private real-estate
brokerage. Fully static / client-side — **no database, no backend, no auth.** All
property, agent and testimonial data lives in typed arrays under `lib/data/` and is
filtered, sorted and searched entirely in the browser.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15.5 (App Router, Turbopack) |
| UI runtime | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + tailwindcss-animate |
| Component animation | Framer Motion |
| Scroll animation | GSAP + @gsap/react (ScrollTrigger) |
| Smooth scroll | Lenis, driven by the GSAP ticker |
| Icons | lucide-react |
| Images | next/image |
| Hosting | Vercel (static, no backend) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project shape

```
app/                      App Router pages
  page.tsx                Home (hero, cinematic, featured, stats, testimonials, CTA)
  listings/               Grid + client-side filtering/sorting
  listings/[slug]/        Property detail (gallery, map, inquiry, similar)
  agents/                 Advisor grid + bio modal
  about/                  Pinned brand-story narrative + stats
  contact/                Inquiry form
components/               Nav, footer, cards, forms, providers
  animations/             Reusable wrappers: ScrollReveal, TextReveal, Parallax,
                          MagneticButton, CursorGlow, CountUp, TiltCard, ScrollProgress
  sections/               Home/about page sections
lib/
  data/                   properties.ts, agents.ts, testimonials.ts (source of truth)
  animations.ts           Shared timing / easing / spring tokens
  hooks/                  useReducedMotion, useCoarsePointer
public/                   Generated SVG placeholder imagery
```

## Data

Everything renders from `lib/data/properties.ts`, `agents.ts`, and `testimonials.ts`.
To add a property, append a typed object to the `properties` array — the listings
grid, filters, featured grid, agent listings and "similar" carousel all pick it up.

## Media placeholders

Imagery under `public/` is generated SVG. To regenerate or replace, see the
generator approach; drop real 4:3 photos to swap them in. Video is optional — see
`public/video/README.md`.

## Contact forms

`components/InquiryForm.tsx` runs in **demo mode** until you connect a static-site
form handler (Formspree / Web3Forms / EmailJS). Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
(Vercel → Project → Environment Variables) to go live. Property inquiries auto-include
the property title/slug as a hidden field.

## Accessibility & performance

- `prefers-reduced-motion` is honoured globally (Framer `MotionConfig` + per-component
  guards) and swaps scroll-scrubbed video for simple fades.
- Touch / coarse-pointer devices drop animated `blur()` filters for compositor-friendly
  transform/opacity variants (`useCoarsePointer`).
- The heavy cinematic section is code-split and IntersectionObserver-gated so it never
  blocks first paint.

## Deploy

Push to GitHub and import into Vercel. No environment variables are required unless a
form handler key is added — in which case use Vercel's env settings, never hardcode.
