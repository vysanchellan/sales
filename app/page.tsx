import { Hero } from "@/components/sections/Hero";
import { LazyCinematic } from "@/components/sections/LazyCinematic";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { AboutStats } from "@/components/sections/AboutStats";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <LazyCinematic />
      <AboutStats />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
