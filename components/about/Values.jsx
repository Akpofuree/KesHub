import { Rocket, ShieldCheck, HeartHandshake } from "lucide-react";

const values = [
  {
    title: "Honest Pricing",
    icon: Rocket,
    text: "We keep prices clear and fair so customers always know what they are paying for.",
  },
  {
    title: "Reliable Service",
    icon: ShieldCheck,
    text: "Every order is backed by clear delivery updates and responsive support.",
  },
  {
    title: "Curated Selection",
    icon: HeartHandshake,
    text: "We handpick products for quality, value and everyday performance.",
  },
];

export default function Values() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <p className="uppercase tracking-[0.3em] text-emerald-600 text-sm font-semibold">
            What We Believe
          </p>

          <h2 className="text-4xl sm:text-5xl font-semibold mt-2 text-slate-950">
            Core Values
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="rounded-[32px] bg-white/90 p-8 sm:p-10 shadow-md shadow-slate-200/40 backdrop-blur-sm text-center"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={index * 100}
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                <Icon className="text-emerald-600" size={38} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold mt-4 text-slate-950">
                {title}
              </h3>

              <p className="mt-2 text-slate-600 leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
