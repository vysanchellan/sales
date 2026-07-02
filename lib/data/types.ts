export type PropertyStatus = "for-sale" | "for-rent" | "sold";
export type PropertyType = "house" | "apartment" | "estate" | "land";

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  area: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
  yearsExperience: number;
  languages: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  quote: string;
  role: string;
  propertyTitle: string;
  transaction: "bought" | "sold";
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  price: number;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: PropertyType;
  images: string[];
  heroVideo?: string;
  description: string;
  features: string[];
  agentId: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  yearBuilt: number;
  createdAt: string; // ISO date, used for "newest" sort
}
