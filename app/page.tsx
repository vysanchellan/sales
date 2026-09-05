import { Hero } from "@/components/sections/Hero";
import { ListingIndex } from "@/components/ListingIndex";
import { SectionHead } from "@/components/SectionHead";
import { Firm } from "@/components/sections/Firm";
import { Enquire } from "@/components/sections/Enquire";
import { getFeatured } from "@/lib/data/properties";

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Hero />

      <section
        id="portfolio"
        className="mx-auto max-w-[1560px] scroll-mt-24 px-6 pb-24 md:px-12 md:pb-36"
      >
        <SectionHead
          index="01"
          label="Current selection"
          link={{ href: "/listings", label: "Full portfolio" }}
        />
        <p className="t-small mt-10 max-w-[46ch] text-ink-soft">
          Pull a sheet to open it. Each is a measured plan of the property, its
          schedule of accommodation, and a single plate.
        </p>
        <ListingIndex properties={featured} className="mt-10" />
      </section>

      <Firm />
      <Enquire />
    </>
  );
}
