const hero =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] sm:min-h-[82vh] flex items-center justify-center py-16 sm:py-20"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <p className="uppercase tracking-[0.35em] text-gray-300 mb-4 text-sm sm:text-base">
          About Us
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05] sm:leading-tight">
          Great tech shouldn't mean stretching your budget.
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mt-6 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-8">
          We work with what you have, not against it.
        </p>

        <button className="mt-10 px-10 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}