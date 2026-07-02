import type { Property, PropertyType, PropertyStatus, Room } from "./types";

// Real photography from Unsplash, sized/cropped on the fly via URL params so
// nothing heavy lives in the repo. `u()` builds a wide cinematic frame.
const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const room = (name: string, caption: string, id: string): Room => ({
  name,
  caption,
  image: u(id),
});

// Base records carry the ordered `rooms` (the room-by-room walkthrough); the
// flat `images` array is derived from them for cards, galleries and OG.
type Base = Omit<Property, "images"> & { rooms: Room[] };

const base: Base[] = [
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
    heroVideo: undefined,
    rooms: [
      room("Arrival", "A gated drive opens onto terraces suspended above the sea.", "1613490493576-7fde63acd811"),
      room("The Salon", "Frescoed ceilings meet quiet contemporary restraint.", "1600607687939-ce8a6c25118c"),
      room("The Kitchen", "A working kitchen built around a marble island.", "1600047509807-ba8f99d2cdde"),
      room("Primary Suite", "The bed faces the water; the water is the only art.", "1600585152915-d208bec867a1"),
      room("The View", "Terraced citrus descends toward the Tyrrhenian horizon.", "1508214751196-bcfd4ca60f91"),
    ],
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
    rooms: [
      room("The Approach", "A private lift opens directly into a gallery hall.", "1567016432779-094069958ea5"),
      room("The Living Room", "Floor-to-ceiling glass frames the London skyline.", "1522708323590-d24dbb6b0267"),
      room("The Kitchen", "A chef's kitchen in book-matched stone and brass.", "1600047509358-9dc75507daeb"),
      room("Primary Suite", "A calm, low-lit retreat above the city.", "1600210492486-724fe5c67fb0"),
      room("The Terrace", "A wraparound terrace from the Shard to the BT Tower.", "1505691938895-1758d7feb511"),
    ],
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
    heroVideo: undefined,
    rooms: [
      room("Arrival", "A cantilevered form floats over the hillside.", "1600585154340-be6161a56a0c"),
      room("The Great Room", "Structural glass dissolves the alpine horizon indoors.", "1600607687920-4e2a09cf159d"),
      room("The Kitchen", "Radiant stone and a suspended steel stair.", "1556909114-f6e7ad7d3136"),
      room("Primary Suite", "Wake to the lake and the mountains beyond.", "1600566752355-35792bedcfea"),
      room("The View", "Lake Zürich, kept for you alone.", "1439066615861-d1af74d74000"),
    ],
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
    rooms: [
      room("The Bastide", "A honey-stone bastide anchors forty hectares.", "1583608205776-bfd35f0d9f83"),
      room("The Salon", "Beamed ceilings and light the colour of the valley.", "1493809842364-78817add7ffb"),
      room("The Kitchen", "A farmhouse kitchen made for long lunches.", "1600047509807-ba8f99d2cdde"),
      room("A Bedroom", "Shuttered calm above the vines.", "1600210491369-e753d80a41f3"),
      room("The Vineyard", "Grenache and Syrah run to the tree line.", "1500382017468-9049fed747ef"),
    ],
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
    rooms: [
      room("The Cliffside", "A whitewashed villa beside the old lighthouse.", "1580587771525-78b9dba3b914"),
      room("Vaulted Living", "Cool vaulted rooms open to the water.", "1600566753086-00f18fb6b3ea"),
      room("The Kitchen", "An outdoor kitchen under the pergola.", "1556909114-f6e7ad7d3136"),
      room("A Bedroom", "Linen, lime plaster, and sea air.", "1616046229478-9901c5536a45"),
      room("The Terrace", "Steps in the rock lead to a swimming platform.", "1507525428034-b723cf961d3e"),
    ],
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
    rooms: [
      room("Arrival", "A serene lakefront home behind a quiet gate.", "1568605114967-8130f3a36994"),
      room("The Living Room", "Wide oak floors and a wood-burning core.", "1600607688969-a5bfcd646154"),
      room("The Kitchen", "A kitchen built for gathering.", "1600047509358-9dc75507daeb"),
      room("Primary Suite", "The garden runs to the water's edge.", "1600585152915-d208bec867a1"),
      room("The Jetty", "A private jetty and boathouse on the lake.", "1470071459604-3b5ec3a7fe05"),
    ],
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
    rooms: [
      room("The Building", "A converted warehouse on the canal.", "1560185007-cde436f6a4d0"),
      room("The Loft", "Double-height ceilings and exposed steelwork.", "1616486338812-3dadae4b4ace"),
      room("The Kitchen", "Warm timber softens the industrial bones.", "1600047509358-9dc75507daeb"),
      room("The Mezzanine", "A studio floats above the living space.", "1616046229478-9901c5536a45"),
      room("The Outlook", "A wall of restored Crittall over the water.", "1416331108676-a22ccb276e35"),
    ],
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
    rooms: [
      room("The Ridge", "Six hectares of elevated, building-ready land.", "1500382017468-9049fed747ef"),
      room("The Panorama", "Uninterrupted views toward the Monts de Vaucluse.", "1466692476868-aef1dfb1e735"),
      room("Olive Terraces", "Mature terraces run down the south-facing slope.", "1518495973542-4542c06a5843"),
      room("The Plot", "Planning consent secured for a single residence.", "1449844908441-8829872d2607"),
    ],
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
    rooms: [
      room("The Façade", "White stucco on a private garden square.", "1600585154526-990dced4db0d"),
      room("The Drawing Room", "Original cornicing, restored to the year.", "1616594039964-ae9021a400a0"),
      room("The Kitchen", "A garden-level kitchen and breakfast room.", "1556909114-f6e7ad7d3136"),
      room("Primary Suite", "Six storeys served by a passenger lift.", "1600566752355-35792bedcfea"),
      room("The Spa", "A subterranean pool and spa below.", "1615529182904-14819c35db37"),
    ],
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
    rooms: [
      room("The Cliff", "A modernist villa on the Faraglioni cliffs.", "1600596542815-ffad4c1539a9"),
      room("The Terraces", "Sculpted white terraces cascade to the sea.", "1600585153490-76fb20a32601"),
      room("The Living Room", "Light, air, and an endless blue.", "1502672260266-1c1ef2d93688"),
      room("A Bedroom", "Simple rooms that defer to the view.", "1600210492486-724fe5c67fb0"),
      room("The Sea Pool", "A sea-water pool cut into the rock.", "1507525428034-b723cf961d3e"),
    ],
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

// Single source of truth. All filtering, sorting and search runs client-side.
export const properties: Property[] = base.map((p) => ({
  ...p,
  images: p.rooms.map((r) => r.image),
}));

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

// A curated cinematic reel for the homepage scroll sequence.
export const cinematicReel: Room[] = [
  properties[2].rooms[0], // glasshouse arrival
  properties[0].rooms[1], // villa salon
  properties[1].rooms[1], // penthouse living
  properties[0].rooms[4], // amalfi view
];
