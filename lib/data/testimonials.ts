import type { Testimonial } from "./types";

const face = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&h=200&q=80`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sofia & Marcus Delacroix",
    photo: face("1544005313-94ddf0286df2"),
    quote:
      "Kassora found us a home we didn't know existed — off-market, exactly to our brief. The entire process felt like it was handled before we even asked.",
    role: "Private buyers",
    propertyTitle: "Villa Serena, Amalfi Coast",
    transaction: "bought",
  },
  {
    id: "t2",
    name: "Dr. Priya Raman",
    photo: face("1580489944761-15a19d654956"),
    quote:
      "I've bought and sold with the largest firms in Europe. None matched this level of discretion and pace. My penthouse sold in eleven days, above asking.",
    role: "Seller",
    propertyTitle: "The Marylebone Penthouse, London",
    transaction: "sold",
  },
  {
    id: "t3",
    name: "Henrik Aalto",
    photo: face("1519085360753-af0119f7cbe7"),
    quote:
      "Theo understood the vineyard before I did. He translated a complicated purchase into something calm and inevitable. Two harvests in, it was the right call.",
    role: "Estate buyer",
    propertyTitle: "Domaine du Vallon, Provence",
    transaction: "bought",
  },
  {
    id: "t4",
    name: "The Nakamura Family",
    photo: face("1521119989659-a83eee488004"),
    quote:
      "Buying across borders is usually a nightmare of paperwork and time zones. Kassora made it feel like a single conversation from start to keys.",
    role: "International buyers",
    propertyTitle: "Lakeview Residence, Zürich",
    transaction: "bought",
  },
  {
    id: "t5",
    name: "Isabelle Fontaine",
    photo: face("1506794778202-cad84cf45f1d"),
    quote:
      "Elena's read on the coastal market is uncanny. She told us to wait three months. She was right to the week, and we saved a fortune.",
    role: "Private buyer",
    propertyTitle: "Casa del Faro, Positano",
    transaction: "bought",
  },
  {
    id: "t6",
    name: "Oliver Grant",
    photo: face("1552058544-f2b08422138a"),
    quote:
      "The photography, the walkthrough, the way the listing was presented — it drew the right buyer, not just any buyer. That distinction is everything.",
    role: "Seller",
    propertyTitle: "Glasshouse on the Hill, Zürich",
    transaction: "sold",
  },
];
