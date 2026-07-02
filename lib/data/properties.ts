import type { Property, PropertyType, PropertyStatus } from "./types";

// Single source of truth. All filtering, sorting and search runs client-side
// against this array — there is no backend or API route anywhere on the site.
export const properties: Property[] = [
  {
    id: "p1",
    slug: "villa-serena",
    title: "Villa Serena",
    location: "Ravello",
    city: "Amalfi Coast",
    price: 8950000,
    status: "for-sale",
    bedrooms: 6,
    bathrooms: 7,
    sqm: 720,
    type: "estate",
    images: ["/properties/p1-1.svg", "/properties/p1-2.svg", "/properties/p1-3.svg"],
    heroVideo: "/video/walkthrough.mp4",
    description:
      "Suspended between sky and sea, Villa Serena is a restored 18th-century estate commanding an uninterrupted view of the Tyrrhenian coastline. Terraced gardens of lemon and olive descend toward a heated infinity pool, while the interiors balance frescoed ceilings with quiet contemporary restraint.",
    features: [
      "Infinity pool",
      "Terraced citrus gardens",
      "Frescoed ceilings",
      "Private beach access",
      "Wine cellar",
      "Staff quarters",
      "Sea-view primary suite",
    ],
    agentId: "a1",
    coordinates: { lat: 40.6491, lng: 14.6118 },
    featured: true,
    yearBuilt: 1782,
    createdAt: "2026-05-18",
  },
  {
    id: "p2",
    slug: "marylebone-penthouse",
    title: "The Marylebone Penthouse",
    location: "Marylebone",
    city: "London",
    price: 12400000,
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 4,
    sqm: 410,
    type: "apartment",
    images: ["/properties/p2-1.svg", "/properties/p2-2.svg", "/properties/p2-3.svg"],
    description:
      "A full-floor penthouse wrapped in floor-to-ceiling glass, crowning one of Marylebone's most discreet addresses. A private lift opens directly into a gallery hall; a wraparound terrace frames the London skyline from the Shard to the BT Tower.",
    features: [
      "Private lift access",
      "Wraparound terrace",
      "Smart-home automation",
      "24-hour concierge",
      "Temperature-controlled cellar",
      "Two secure parking bays",
    ],
    agentId: "a3",
    coordinates: { lat: 51.5205, lng: -0.1536 },
    featured: true,
    yearBuilt: 2019,
    createdAt: "2026-06-02",
  },
  {
    id: "p3",
    slug: "glasshouse-on-the-hill",
    title: "Glasshouse on the Hill",
    location: "Zollikon",
    city: "Zürich",
    price: 15750000,
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 6,
    sqm: 560,
    type: "house",
    images: ["/properties/p3-1.svg", "/properties/p3-2.svg", "/properties/p3-3.svg"],
    heroVideo: "/video/walkthrough.mp4",
    description:
      "An architecturally significant residence by a Pritzker-shortlisted studio, cantilevered over the hillside above Lake Zürich. Structural glass dissolves the boundary between interior and alpine horizon; radiant stone floors and a suspended steel stair anchor the composition.",
    features: [
      "Cantilevered architecture",
      "Structural glass façade",
      "Lake and alpine views",
      "Radiant stone floors",
      "Home cinema",
      "Indoor lap pool",
      "Geothermal heating",
    ],
    agentId: "a2",
    coordinates: { lat: 47.3401, lng: 8.5747 },
    featured: true,
    yearBuilt: 2021,
    createdAt: "2026-06-20",
  },
  {
    id: "p4",
    slug: "domaine-du-vallon",
    title: "Domaine du Vallon",
    location: "Lourmarin",
    city: "Provence",
    price: 6200000,
    status: "for-sale",
    bedrooms: 8,
    bathrooms: 6,
    sqm: 940,
    type: "estate",
    images: ["/properties/p4-1.svg", "/properties/p4-2.svg", "/properties/p4-3.svg"],
    description:
      "A working vineyard estate of forty hectares in the Luberon valley, anchored by a honey-stone bastide and a modern cuverie. Rows of Grenache and Syrah run to the tree line; the property produces a small, well-regarded appellation vintage each year.",
    features: [
      "40 hectares of vineyard",
      "Working cuverie",
      "18th-century bastide",
      "Guest cottage",
      "Olive grove",
      "Truffle oaks",
      "Spring-fed pond",
    ],
    agentId: "a4",
    coordinates: { lat: 43.764, lng: 5.362 },
    featured: true,
    yearBuilt: 1806,
    createdAt: "2026-04-11",
  },
  {
    id: "p5",
    slug: "casa-del-faro",
    title: "Casa del Faro",
    location: "Positano",
    city: "Amalfi Coast",
    price: 24000,
    status: "for-rent",
    bedrooms: 4,
    bathrooms: 4,
    sqm: 320,
    type: "house",
    images: ["/properties/p5-1.svg", "/properties/p5-2.svg", "/properties/p5-3.svg"],
    description:
      "A cliffside villa beside the old lighthouse, available for seasonal lease. Whitewashed vaulted rooms open onto a sun terrace hovering over the water. Steps carved into the rock lead to a private swimming platform.",
    features: [
      "Private swimming platform",
      "Sun terrace",
      "Vaulted ceilings",
      "Outdoor kitchen",
      "Daily housekeeping",
      "Boat mooring",
    ],
    agentId: "a1",
    coordinates: { lat: 40.6281, lng: 14.4842 },
    featured: false,
    yearBuilt: 1965,
    createdAt: "2026-05-30",
  },
  {
    id: "p6",
    slug: "lakeview-residence",
    title: "Lakeview Residence",
    location: "Küsnacht",
    city: "Zürich",
    price: 18500,
    status: "for-rent",
    bedrooms: 5,
    bathrooms: 4,
    sqm: 480,
    type: "house",
    images: ["/properties/p6-1.svg", "/properties/p6-2.svg", "/properties/p6-3.svg"],
    description:
      "A serene lakefront family home with a private jetty and boathouse, available on a long lease. Wide oak floors, a wood-burning core, and a kitchen built for gathering. The garden runs unbroken to the water's edge.",
    features: [
      "Private jetty & boathouse",
      "Lakefront garden",
      "Wide oak floors",
      "Wine room",
      "Sauna",
      "Two-car garage",
    ],
    agentId: "a2",
    coordinates: { lat: 47.3187, lng: 8.5836 },
    featured: false,
    yearBuilt: 2008,
    createdAt: "2026-03-22",
  },
  {
    id: "p7",
    slug: "the-camden-loft",
    title: "The Camden Loft",
    location: "Camden",
    city: "London",
    price: 3350000,
    status: "for-sale",
    bedrooms: 2,
    bathrooms: 2,
    sqm: 180,
    type: "apartment",
    images: ["/properties/p7-1.svg", "/properties/p7-2.svg", "/properties/p7-3.svg"],
    description:
      "A converted warehouse loft with double-height ceilings, exposed steelwork, and a mezzanine studio. Industrial bones softened by warm timber and a wall of restored Crittall glazing overlooking the canal.",
    features: [
      "Double-height ceilings",
      "Crittall glazing",
      "Mezzanine studio",
      "Canal views",
      "Underfloor heating",
      "Secure bike store",
    ],
    agentId: "a3",
    coordinates: { lat: 51.541, lng: -0.1426 },
    featured: false,
    yearBuilt: 1912,
    createdAt: "2026-06-25",
  },
  {
    id: "p8",
    slug: "olive-ridge-parcel",
    title: "Olive Ridge Parcel",
    location: "Gordes",
    city: "Provence",
    price: 1450000,
    status: "for-sale",
    bedrooms: 0,
    bathrooms: 0,
    sqm: 62000,
    type: "land",
    images: ["/properties/p8-1.svg", "/properties/p8-2.svg", "/properties/p8-3.svg"],
    description:
      "Six hectares of elevated, building-ready land with panoramic views toward the Monts de Vaucluse. Mature olive terraces, an existing well, and full planning consent for a single private residence of up to 400 m².",
    features: [
      "Planning consent secured",
      "Panoramic ridge views",
      "Mature olive terraces",
      "Existing well & access road",
      "South-facing aspect",
    ],
    agentId: "a4",
    coordinates: { lat: 43.9114, lng: 5.2 },
    featured: false,
    yearBuilt: 0,
    createdAt: "2026-02-14",
  },
  {
    id: "p9",
    slug: "the-belgravia-townhouse",
    title: "The Belgravia Townhouse",
    location: "Belgravia",
    city: "London",
    price: 21900000,
    status: "sold",
    bedrooms: 6,
    bathrooms: 6,
    sqm: 640,
    type: "house",
    images: ["/properties/p9-1.svg", "/properties/p9-2.svg", "/properties/p9-3.svg"],
    description:
      "A white-stucco Georgian townhouse on a garden square, restored over three years to a standard rarely seen. Six storeys served by a lift, a subterranean pool and spa, and a private mews house to the rear.",
    features: [
      "Garden square setting",
      "Subterranean pool & spa",
      "Passenger lift",
      "Private mews house",
      "Original cornicing",
      "Staff apartment",
    ],
    agentId: "a3",
    coordinates: { lat: 51.4975, lng: -0.1509 },
    featured: false,
    yearBuilt: 1848,
    createdAt: "2026-01-09",
  },
  {
    id: "p10",
    slug: "capri-cliff-villa",
    title: "Capri Cliff Villa",
    location: "Capri",
    city: "Amalfi Coast",
    price: 11200000,
    status: "sold",
    bedrooms: 5,
    bathrooms: 5,
    sqm: 500,
    type: "estate",
    images: ["/properties/p10-1.svg", "/properties/p10-2.svg", "/properties/p10-3.svg"],
    description:
      "An iconic modernist villa clinging to the Faraglioni cliffs, sold in a private off-market transaction. Sculpted white terraces cascade toward a sea-water pool cut into the rock.",
    features: [
      "Faraglioni cliff position",
      "Sea-water rock pool",
      "Sculpted terraces",
      "Funicular access",
      "Guest pavilion",
    ],
    agentId: "a1",
    coordinates: { lat: 40.5468, lng: 14.2412 },
    featured: false,
    yearBuilt: 1974,
    createdAt: "2026-01-28",
  },
];

// --- Helpers (all pure, client-safe) ---------------------------------------

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeatured(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getSimilar(current: Property, limit = 6): Property[] {
  return properties
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.city === current.city || p.type === current.type)
    )
    .slice(0, limit);
}

export function getByAgent(agentId: string): Property[] {
  return properties.filter((p) => p.agentId === agentId);
}

export const cities = [...new Set(properties.map((p) => p.city))].sort();
export const propertyTypes: PropertyType[] = ["house", "apartment", "estate", "land"];
export const statuses: PropertyStatus[] = ["for-sale", "for-rent", "sold"];

export function formatPrice(price: number, status: PropertyStatus): string {
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
  return status === "for-rent" ? `${formatted}/mo` : formatted;
}
