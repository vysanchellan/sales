import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  properties,
  getProperty,
  getSimilar,
  formatPrice,
} from "@/lib/data/properties";
import { getAgent } from "@/lib/data/agents";
import { getPlan } from "@/lib/data/plans";
import { Plan } from "@/components/Plan";
import { PropertyMap } from "@/components/PropertyMap";
import { InquiryForm } from "@/components/InquiryForm";
import { IconArrow } from "@/components/Icons";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Not found — Virelle" };
  return {
    title: `${p.title}, ${p.city} — Virelle`,
    description: p.description.slice(0, 150),
  };
}

const TYPE_LABEL: Record<string, string> = {
  estate: "Estate",
  house: "House",
  apartment: "Apartment",
  land: "Land",
};
const STATUS_LABEL: Record<string, string> = {
  "for-sale": "For sale",
  "for-rent": "To let",
  sold: "Sold",
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const agent = getAgent(p.agentId);
  const plan = getPlan(p.slug);
  const similar = getSimilar(p).slice(0, 3);
  const ref = p.id.replace(/\D/g, "").padStart(2, "0");

  return (
    <article className="mx-auto max-w-[1560px] px-6 pb-32 pt-32 md:px-12 md:pt-40">
      {/* --- title block --- */}
      <div className="border-t border-rule pt-5">
        <div className="flex items-baseline justify-between gap-6">
          <p className="t-label text-ink-soft">
            <span className="tabular-nums text-bronze">{ref}</span>
            <span className="ml-3">{STATUS_LABEL[p.status]}</span>
          </p>
          <Link
            href="/listings"
            className="t-label shrink-0 text-ink-soft transition-colors hover:text-bronze"
          >
            Back to register
          </Link>
        </div>

        <h1 className="t-display t-d1 mt-8 max-w-[14ch] text-ink">{p.title}</h1>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-3">
          <p className="t-small text-ink-soft">
            {p.location}, {p.city}
          </p>
          <p className="t-label text-ink-soft">
            {TYPE_LABEL[p.type]}
            {p.yearBuilt > 0 && <> · {p.yearBuilt}</>}
          </p>
          <p className="t-figure ml-auto text-2xl text-ink md:text-3xl">
            {formatPrice(p.price, p.status)}
          </p>
        </div>
      </div>

      {/* --- the drawing + the schedule --- */}
      <div className="mt-20 grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          {plan && (
            <>
              <Plan spec={plan} title={p.title} draw />
              <p className="t-label mt-4 flex justify-between border-t border-rule pt-3 text-ink-soft">
                <span>{plan.sheet}</span>
                <span className="text-bronze">Sheet {ref}</span>
              </p>
            </>
          )}
        </div>

        <div>
          <p className="t-lead max-w-[52ch] text-ink-soft">{p.description}</p>

          <dl className="mt-12 border-t border-rule">
            {p.type !== "land" && (
              <>
                <Row label="Bedrooms" value={p.bedrooms} />
                <Row label="Bathrooms" value={p.bathrooms} />
              </>
            )}
            <Row
              label={p.type === "land" ? "Site area" : "Interior"}
              value={`${p.sqm.toLocaleString()} m²`}
            />
            {plan && (
              <Row
                label="Overall"
                value={plan.dims.map((d) => d.t).join(" × ")}
              />
            )}
            {p.yearBuilt > 0 && <Row label="Built" value={p.yearBuilt} />}
            <Row label="Type" value={TYPE_LABEL[p.type]} />
            {agent && <Row label="Advisor" value={agent.name} />}
          </dl>

          {p.features.length > 0 && (
            <>
              <h2 className="t-label mt-14 border-b border-rule pb-3 text-ink-soft">
                Schedule of features
              </h2>
              <ul className="grid list-none gap-x-10 p-0 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="t-small border-b border-rule py-2.5 text-ink-soft"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* --- plates --- */}
      <section className="mt-28">
        <h2 className="t-label border-t border-rule pt-5 text-ink-soft">
          <span className="tabular-nums text-bronze">02</span>
          <span className="ml-3">Plates</span>
        </h2>

        <div className="mt-12 space-y-20">
          {p.rooms.map((r, i) => (
            <figure key={r.name} className="m-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-raised md:aspect-[2/1]">
                <Image
                  src={r.image}
                  alt={`${p.title} — ${r.name}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 grid gap-x-10 gap-y-2 border-t border-rule pt-4 md:grid-cols-[4rem_14rem_minmax(0,1fr)]">
                <span className="t-label tabular-nums text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-label text-ink">{r.name}</span>
                <span className="t-small max-w-[60ch] text-ink-soft">
                  {r.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* --- location --- */}
      <section className="mt-28">
        <h2 className="t-label border-t border-rule pt-5 text-ink-soft">
          <span className="tabular-nums text-bronze">03</span>
          <span className="ml-3">Location</span>
        </h2>
        <div className="mt-10">
          <PropertyMap
            lat={p.coordinates.lat}
            lng={p.coordinates.lng}
            label={`${p.location}, ${p.city}`}
          />
        </div>
      </section>

      {/* --- enquiry --- */}
      <section className="mt-28 grid gap-x-20 gap-y-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="t-label border-t border-rule pt-5 text-ink-soft">
            <span className="tabular-nums text-bronze">04</span>
            <span className="ml-3">Arrange a viewing</span>
          </h2>
          <p className="t-display t-d2 mt-10 max-w-[14ch] text-ink">
            See it properly, and privately
          </p>
          {agent && (
            <div className="mt-10 flex items-center gap-5 border-t border-rule pt-6">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
              />
              <div className="min-w-0">
                <p className="t-small text-ink">{agent.name}</p>
                <p className="t-label text-ink-soft">{agent.title}</p>
                <a
                  href={`mailto:${agent.email}`}
                  className="t-label mt-1 inline-block text-bronze underline-offset-4 hover:underline"
                >
                  {agent.email}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="lg:pt-16">
          <InquiryForm propertyTitle={p.title} propertySlug={p.slug} />
        </div>
      </section>

      {/* --- also on the register --- */}
      {similar.length > 0 && (
        <section className="mt-28">
          <h2 className="t-label border-t border-rule pt-5 text-ink-soft">
            <span className="tabular-nums text-bronze">05</span>
            <span className="ml-3">Also on the register</span>
          </h2>
          <div className="mt-6">
            {similar.map((s) => (
              <Link
                key={s.id}
                href={`/listings/${s.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-1 border-b border-rule py-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_9rem_2rem]"
              >
                <span className="t-display t-d4 text-ink">{s.title}</span>
                <span className="t-small hidden text-ink-soft md:block">
                  {s.location}, {s.city}
                </span>
                <span className="t-figure text-base text-ink md:text-right">
                  {formatPrice(s.price, s.status)}
                </span>
                <span className="hidden justify-self-end text-ink-soft transition-colors group-hover:text-bronze md:block">
                  <IconArrow size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule py-3">
      <dt className="t-label text-ink-soft">{label}</dt>
      <dd className="t-small m-0 tabular-nums text-ink">{value}</dd>
    </div>
  );
}
