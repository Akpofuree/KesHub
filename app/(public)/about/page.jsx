import Link from "next/link";

export const metadata = {
    title: "About Us - KES HUB.",
    description: "Learn about KES HUB, our mission, values, and the team behind your favourite smart gadget marketplace.",
};

const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "500+", label: "Products Listed" },
    { value: "50+", label: "Verified Sellers" },
    { value: "4.8/5", label: "Average Rating" },
];

const values = [
    {
        emoji: "Rocket",
        title: "Innovation First",
        description: "We curate only the most cutting-edge gadgets so you never miss what's next.",
    },
    {
        emoji: "Lock",
        title: "Trust and Safety",
        description: "Every seller on KES HUB is verified. Every payment is secured. Shop worry-free.",
    },
    {
        emoji: "Heart",
        title: "Community Driven",
        description: "From honest reviews to seller transparency, our community shapes what we stock.",
    },
    {
        emoji: "Bolt",
        title: "Fast and Reliable",
        description: "Quick checkout, real-time order tracking, and support that actually answers.",
    },
];

export default function AboutPage() {
    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto py-16">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight mb-6">
                        We believe great tech should be accessible to everyone.
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        KES HUB started with a simple idea - what if buying gadgets online felt as good as unboxing them?
                        We set out to build a marketplace where quality is non-negotiable, prices are honest,
                        and sellers are people you can actually trust.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl py-8 border border-slate-100">
                            <p className="text-3xl font-bold text-slate-800">{s.value}</p>
                            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
                    <div className="flex-1 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl h-80 flex items-center justify-center">
                        <div className="text-center p-8">
                            <p className="text-6xl mb-4">Shop</p>
                            <p className="text-green-800 font-semibold text-xl">Shop smarter, not harder.</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-slate-800 mb-5">Our Mission</h2>
                        <p className="text-slate-500 leading-relaxed mb-4">
                            We exist to close the gap between great products and the people who need them.
                            Whether you're a tech enthusiast hunting for the latest release or someone buying their
                            first smart gadget, KES HUB is designed to make that journey simple, transparent, and enjoyable.
                        </p>
                        <p className="text-slate-500 leading-relaxed">
                            We partner with verified sellers, offer secure payment options, and make sure every
                            product on our platform meets a quality bar. When you shop with us, you shop with confidence.
                        </p>
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">What We Stand For</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                                <p className="text-xl mb-4">{v.emoji}</p>
                                <h3 className="text-slate-800 font-semibold mb-2">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                        Browse hundreds of curated gadgets, compare prices, and shop from verified sellers all in one place.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/shop" className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-full transition">
                            Browse Products
                        </Link>
                        <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-full transition border border-white/20">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
