const story =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80";

export default function Story() {
  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <div>
          <span className="uppercase tracking-[0.3em] text-emerald-600 text-sm font-semibold">
            Our Story
          </span>

          <h2 className="text-4xl sm:text-5xl font-semibold mt-2 leading-[1.08] text-slate-950">
            Building a trusted shopping experience for modern buyers.
          </h2>

          <p className="mt-4 text-slate-600 leading-snug text-base sm:text-lg">
            KES HUB was created to make device shopping simple, reliable and
            locally relevant. We curate technology from trusted brands and bring
            it to customers with fast delivery, clear pricing and real support.
          </p>

          <p className="mt-3 text-slate-600 leading-snug text-base sm:text-lg">
            From Lagos to the rest of Nigeria and beyond, our focus is on
            helping everyday shoppers find the right gadget without the
            guesswork.
          </p>

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-white text-base font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition">
            Explore Our Story
          </button>
        </div>

        <div>
          <img
            src={story}
            className="rounded-[32px] shadow-2xl shadow-slate-300/30"
            alt="Our story image"
          />
        </div>
      </div>
    </section>
  );
}
