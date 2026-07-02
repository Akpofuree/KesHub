const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    text: "KESHUB launched with one goal: make device shopping simple and fair for everyday buyers.",
  },

  {
    year: "2020",
    title: "Reached 10,000 Customers",
    text: "Word spread fast — shoppers kept coming back for honest pricing and reliable delivery.",
  },

  {
    year: "2022",
    title: "Global Expansion",
    text: "We extended beyond Nigeria, bringing the same trusted experience to buyers across new markets.",
  },

  {
    year: "2025",
    title: "Industry Leader",
    text: "Today, KESHUB is a go-to name for premium tech at fair prices — built on trust, not hype.",
  },
];

export default function Timeline() {
  return (
    <section className="py-36 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            Our Journey
          </p>

          <h2 className="text-5xl font-semibold mt-5 text-slate-950">
            Milestones
          </h2>
        </div>

        <div className="space-y-16">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="grid lg:grid-cols-3 gap-10 items-center border-b pb-12"
            >
              <h3 className="text-6xl font-bold text-emerald-600">
                {item.year}
              </h3>

              <div>
                <h4 className="text-3xl font-semibold">{item.title}</h4>
              </div>

              <p className="text-slate-600 leading-8">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
