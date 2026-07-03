"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/properties";
import { TiltCard } from "./animations/TiltCard";

const statusLabel: Record<Property["status"], string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
};

const statusColor: Record<Property["status"], string> = {
  "for-sale": "bg-gold/90 text-onaccent",
  "for-rent": "bg-indigo/90 text-cloud",
  sold: "bg-ink/80 text-mist border border-mist/30",
};

export function PropertyCard({
  property,
  priority = false,
  className = "",
}: {
  property: Property;
  priority?: boolean;
  className?: string;
}) {
  return (
    <TiltCard max={6} className={`h-full ${className}`}>
      <Link
        href={`/listings/${property.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-cloud/10 bg-ink-soft"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${statusColor[property.status]}`}
          >
            {statusLabel[property.status]}
          </span>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="flex items-center gap-1 text-xs text-cloud/70">
                <MapPin size={12} /> {property.location}, {property.city}
              </p>
              <h3 className="font-display text-xl text-cloud">{property.title}</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-lg text-gold-light">
            {formatPrice(property.price, property.status)}
          </span>
          <div className="flex items-center gap-3 text-xs text-mist">
            {property.type !== "land" && (
              <>
                <span className="flex items-center gap-1">
                  <Bed size={14} /> {property.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={14} /> {property.bathrooms}
                </span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Maximize size={14} /> {property.sqm.toLocaleString()} m²
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
