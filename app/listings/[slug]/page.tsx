import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, Calendar, Check, ArrowLeft, Phone, Mail } from "lucide-react";
import {
  properties,
  getProperty,
  getSimilar,
  formatPrice,
} from "@/lib/data/properties";
import { getAgent } from "@/lib/data/agents";
import { RoomWalkthrough } from "@/components/RoomWalkthrough";
import { PropertyMap } from "@/components/PropertyMap";
import { SimilarCarousel } from "@/components/SimilarCarousel";
import { InquiryForm } from "@/components/InquiryForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Parallax } from "@/components/animations/Parallax";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Not found — Virelle" };
  return {
    title: `${property.title}, ${property.city} — Virelle`,
    description: property.description.slice(0, 150),
  };
}

const statusLabel: Record<string, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const similar = getSimilar(property);

  return (
    <article>
      {/* Full-bleed cinematic room-by-room walkthrough, opening on the cover. */}
      <RoomWalkthrough rooms={property.rooms} title={property.title} />

      <div className="mx-auto max-w-[1400px] px-5 pt-12 md:px-10">
        <Link
          href="/listings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-gold"
        >
          <ArrowLeft size={16} /> All listings
        </Link>

        <div className="mt-4 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs tracking-wide text-gold-light">
                {statusLabel[property.status]}
              </span>
              <span className="text-xs uppercase tracking-wider text-mist">
                {property.location}, {property.city}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl text-cloud sm:text-4xl md:text-6xl">{property.title}</h1>

            <div className="mt-6 flex flex-wrap gap-8 border-y border-cloud/10 py-6">
              {property.type !== "land" && (
                <Stat icon={<Bed size={18} />} value={property.bedrooms} label="Bedrooms" />
              )}
              {property.type !== "land" && (
                <Stat icon={<Bath size={18} />} value={property.bathrooms} label="Bathrooms" />
              )}
              <Stat
                icon={<Maximize size={18} />}
                value={`${property.sqm.toLocaleString()} m²`}
                label="Interior"
              />
              {property.yearBuilt > 0 && (
                <Stat icon={<Calendar size={18} />} value={property.yearBuilt} label="Built" />
              )}
            </div>

            <ScrollReveal className="mt-8">
              <h2 className="mb-3 font-display text-2xl text-cloud">The residence</h2>
              <p className="max-w-2xl leading-relaxed text-mist">{property.description}</p>
            </ScrollReveal>

            {/* Parallax feature band with clip-path reveal */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {property.images.slice(0, 2).map((img, i) => (
                <Parallax key={img} speed={i === 0 ? 0.25 : 0.4} className="overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img}
                      alt={`${property.title} detail ${i + 1}`}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                </Parallax>
              ))}
            </div>

            <ScrollReveal className="mt-12">
              <h2 className="mb-5 font-display text-2xl text-cloud">Features</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-cloud/90">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Check size={13} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <div className="mt-12">
              <h2 className="mb-5 font-display text-2xl text-cloud">Location</h2>
              <PropertyMap
                lat={property.coordinates.lat}
                lng={property.coordinates.lng}
                label={`${property.location}, ${property.city}`}
              />
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-cloud/10 bg-ink-soft p-6">
              <p className="text-xs uppercase tracking-wider text-mist">Guide price</p>
              <p className="mt-1 font-display text-3xl text-gold-light">
                {formatPrice(property.price, property.status)}
              </p>

              {agent && (
                <div className="mt-6 flex items-center gap-4 border-y border-cloud/10 py-5">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-cloud">{agent.name}</p>
                    <p className="truncate text-xs text-mist">{agent.title}</p>
                    <div className="mt-1 flex gap-3 text-xs text-gold">
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-1 hover:underline">
                        <Phone size={12} /> Call
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail size={12} /> Email
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="mb-4 font-display text-lg text-cloud">Arrange a viewing</h3>
                <InquiryForm propertyTitle={property.title} propertySlug={property.slug} compact />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-10 border-t border-cloud/10">
        <SimilarCarousel items={similar} />
      </div>
    </article>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <div>
        <p className="font-display text-xl text-cloud">{value}</p>
        <p className="text-xs text-mist">{label}</p>
      </div>
    </div>
  );
}
