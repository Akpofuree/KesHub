import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.08]">
          Ready to upgrade your shopping experience?
        </h2>

        <p className="mt-5 sm:mt-7 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-7 sm:leading-8">
          Discover smarter device shopping backed by fast delivery, friendly
          support and trusted products.
        </p>

        <Link
          href="/shop"
          className="inline-flex mt-8 sm:mt-10 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
