import { Rocket, ShieldCheck, HeartHandshake } from "lucide-react";

const values = [
  {
    title: "Curated Selection",
    icon: Rocket,
    text: "We handpick products for quality, value and everyday performance.",
  },

  {
    title: "Reliable Service",
    icon: ShieldCheck,
    text: "Every order is backed by clear delivery updates and responsive support.",
  },

  {
    title: "Customer Focus",
    icon: HeartHandshake,
    text: "We build trust through honest pricing, easy returns and helpful advice.",
  },
];

export default function Values() {
  return (
    <section className="py-36 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            What We Believe
          </p>

          <h2 className="text-5xl font-semibold mt-5 text-slate-950">
            Core Values
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[32px] bg-white/90 p-10 shadow-md shadow-slate-200/40 backdrop-blur-sm"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                <Icon className="text-emerald-600" size={38} />
              </div>

              <h3 className="text-3xl font-semibold mt-8 text-slate-950">
                {title}
              </h3>

              <p className="mt-6 text-slate-600 leading-8">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
