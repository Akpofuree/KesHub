const testimonials = [
  {
    name: "Chimamanda Okafor",
    company: "Lagos Home",
    text: "KES HUB made it easy to find the right speakers for my small store, and the delivery was fast and reliable.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Ibrahim Musa",
    company: "Abuja Tech Hub",
    text: "I trust KES HUB for every gadget purchase. The prices are fair and the support team is always helpful.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Aisha Bello",
    company: "Kano Connect",
    text: "The checkout experience was seamless, and my order arrived sooner than expected. Highly recommended.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-30 bg-slate-50 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            Testimonials
          </p>

          <h2 className="text-4xl sm:text-5xl font-semibold mt-2 text-slate-950">
            What customers are saying
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-xl text-slate-950">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500">{item.company}</p>
                </div>
              </div>

              <p className="mt-4 text-slate-700 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
