const hero =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  return (
    <section
      className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center py-20"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <p className="uppercase tracking-[0.5em] text-gray-300 mb-5 text-sm sm:text-base">
          About Us
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight">
          Premium tech. Zero markup games.
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mt-8 text-base sm:text-lg leading-8">
          We built KESHUB because good gadgets shouldn't come with a bad price
          tag — or a confusing checkout.
        </p>

        <button className="mt-12 px-10 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
