import type { Agent } from "./types";

// Real portraits, cropped square-ish to faces via Unsplash URL params.
const face = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=1000&q=80`;

export const agents: Agent[] = [
  {
    id: "a1",
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    title: "Principal Broker",
    specialty: "Waterfront & Coastal Estates",
    area: "Amalfi Coast",
    photo: face("1494790108377-be9c29b29330"),
    phone: "+39 06 4200 1180",
    email: "elena@virelle.com",
    bio: "Elena has closed over €900M in coastal and waterfront transactions across the Mediterranean. Known for a quiet, exacting negotiation style, she represents a private roster of buyers seeking generational homes.",
    yearsExperience: 18,
    languages: ["Italian", "English", "French"],
  },
  {
    id: "a2",
    slug: "julian-voss",
    name: "Julian Voss",
    title: "Senior Advisor",
    specialty: "Architectural & New-Build",
    area: "Zürich",
    photo: face("1500648767791-00dcc994a43e"),
    phone: "+41 44 500 2210",
    email: "julian@virelle.com",
    bio: "A former architect, Julian pairs design fluency with market precision. He advises collectors of architecturally significant homes and works closely with several award-winning studios on off-market commissions.",
    yearsExperience: 12,
    languages: ["German", "English", "Italian"],
  },
  {
    id: "a3",
    slug: "amara-okafor",
    name: "Amara Okafor",
    title: "Director, Private Clients",
    specialty: "Penthouses & Urban Residences",
    area: "London",
    photo: face("1573497019940-1c28c88b4f3e"),
    phone: "+44 20 7100 4455",
    email: "amara@virelle.com",
    bio: "Amara leads the firm's private client desk, curating discreet acquisitions for a global clientele. Her network spans Mayfair to Marylebone, and she is trusted with some of the city's most confidential mandates.",
    yearsExperience: 15,
    languages: ["English", "French", "Yoruba"],
  },
  {
    id: "a4",
    slug: "theo-lindqvist",
    name: "Theo Lindqvist",
    title: "Land & Development Specialist",
    specialty: "Land & Vineyard Estates",
    area: "Provence",
    photo: face("1507003211169-0a1dd7228f2d"),
    phone: "+33 4 9000 7788",
    email: "theo@virelle.com",
    bio: "Theo specialises in land assemblage, vineyard estates, and development-ready parcels. He guides buyers through zoning, viticulture, and the long horizon of building something enduring.",
    yearsExperience: 10,
    languages: ["Swedish", "French", "English"],
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
