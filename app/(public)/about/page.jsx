import Hero from "@/components/about/Hero";
import HowWeWork from "@/components/about/HowWeWork";
import Story from "@/components/about/Story";
import Values from "@/components/about/Values";
import StickyFounder from "@/components/about/StickyFounder";
import Testimonials from "@/components/about/Testimonials";

import Stats from "@/components/about/Stats";
import FAQ from "@/components/about/FAQ";
import CTA from "@/components/about/CTA";

export const metadata = {
  title: "About Us - KES HUB",
  description:
    "Learn how KES HUB builds trusted gadget shopping for modern buyers across West Africa and beyond.",
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50 overflow-clip relative">
      <Hero />

      <HowWeWork />

      <Story />

      <Values />

      <StickyFounder />

      <Testimonials />

      <Stats />

      <FAQ />

      <CTA />
    </main>
  );
}
