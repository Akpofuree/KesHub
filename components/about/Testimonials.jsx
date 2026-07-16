"use client";

import Image from "next/image";
import profilePic3 from "@/assets/profile_pic3.jpg";
import ScrollReveal from "../ScrollReveal";

const testimonials = [
  {
    name: "Chimamanda Okafor",
    company: "Lagos Home",
    text: "KES HUB made it easy to find the right speakers for my small store, and the delivery was fast and reliable.",
    image:
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Ibrahim Musa",
    company: "Abuja Tech Hub",
    text: "I trust KES HUB for every gadget purchase. The prices are fair and the support team is always helpful.",
    image:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Aisha Bello",
    company: "Kano Connect",
    text: "The checkout experience was seamless, and my order arrived sooner than expected. Highly recommended.",
    image: profilePic3,
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-30 bg-slate-50 pt-36 pb-36">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal animation="fade-up" className="text-center mb-20">
          <div className="w-24 h-1 bg-emerald-600 rounded-full mx-auto mb-8" />
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            Testimonials
          </p>
          <h2 className="text-5xl font-semibold mt-6 text-slate-950">
            What customers are saying
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <ScrollReveal
              key={item.name}
              animation="zoom-in"
              delay={index * 100}
              className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-xl text-slate-950">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">{item.company}</p>
                </div>
              </div>

              <p className="mt-8 text-slate-700 leading-8">{item.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
