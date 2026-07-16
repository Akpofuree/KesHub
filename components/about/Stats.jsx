"use client";

const stats = [
  {
    number: "12K+",

    label: "Happy Customers",
  },

  {
    number: "250+",

    label: "Projects",
  },

  {
    number: "36",
    label: "States",
  },

  {
    number: "98%",

    label: "Customer Satisfaction",
  },
];

import ScrollReveal from "../ScrollReveal";

export default function Stats() {
  return (
    <section className="py-36 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              animation="zoom-in"
              delay={index * 100}
              className="text-center"
            >
              <h2 className="text-7xl font-bold">{stat.number}</h2>

              <p className="mt-5 text-gray-400">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
