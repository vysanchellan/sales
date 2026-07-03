"use client";

import { MapPin } from "lucide-react";

/**
 * Lightweight map with no API key: OpenStreetMap's embed export pinned to the
 * property coordinates. No backend, no env secrets, works on a static deploy.
 */
export function PropertyMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const d = 0.02;
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="overflow-hidden rounded-lg border border-cloud/10">
      <div className="flex items-center gap-2 border-b border-cloud/10 bg-ink-soft px-5 py-3 text-sm text-mist">
        <MapPin size={15} className="text-gold" /> {label}
      </div>
      <iframe
        title={`Map of ${label}`}
        src={src}
        loading="lazy"
        className="h-[360px] w-full grayscale-[0.3] contrast-[1.1]"
        style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
      />
    </div>
  );
}
