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

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={index * 100}
            >
              <h2 className="text-7xl font-bold">{stat.number}</h2>

              <p className="mt-2 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
