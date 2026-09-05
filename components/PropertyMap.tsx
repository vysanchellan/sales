import { IconSurvey } from "./Icons";

/** OpenStreetMap embed — no key, no tracker, works on a static deploy. Held in
 *  a hairline frame with a title block, like any other sheet. */
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
    <div className="border border-rule">
      <p className="t-label flex items-center gap-2 border-b border-rule px-4 py-3 text-ink-soft">
        <IconSurvey size={14} className="text-bronze" />
        {label}
      </p>
      <iframe
        title={`Location map — ${label}`}
        src={src}
        loading="lazy"
        className="h-[280px] w-full md:h-[360px]"
        style={{ border: 0 }}
      />
    </div>
  );
}
