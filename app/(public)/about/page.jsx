import Link from "next/link";
import FounderSection from "@/components/about/FounderSection";
import { Rocket, ShieldCheck, Users, Zap } from "lucide-react";

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
        icon: <Rocket className="w-6 h-6 text-green-500" />,
        title: "Innovation First",
        description: "We curate only the most cutting-edge gadgets so you never miss what's next.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
        title: "Trust and Safety",
        description: "Every seller on KES HUB is verified. Every payment is secured. Shop worry-free.",
    },
    {
        icon: <Users className="w-6 h-6 text-green-500" />,
        title: "Community Driven",
        description: "From honest reviews to seller transparency, our community shapes what we stock.",
    },
    {
        icon: <Zap className="w-6 h-6 text-green-500" />,
        title: "Fast and Reliable",
        description: "Quick checkout, real-time order tracking, and support that actually answers.",
    },
];

export default function AboutPage() {
    return (
        <div className="mx-6 overflow-x-hidden">
            {/* 1. Our Story (Text Left, Image Right) */}
            <div className="max-w-7xl mx-auto py-20 flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight mb-6">
                        We believe great tech should be accessible to everyone.
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                        KES HUB started with a simple idea - what if buying gadgets online felt as good as unboxing them? 
                        We set out to build a marketplace where quality is non-negotiable, prices are honest, and sellers are people you can actually trust.
                    </p>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        From a small team of tech enthusiasts to a growing community, we have always been driven by the desire to connect 
                        people with the tools they need to live smarter, work better, and play harder.
                    </p>
                </div>
                <div className="flex-1 w-full relative h-[400px] lg:h-[500px]">
                    <img 
                        src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=80" 
                        alt="Tech gadgets spread out" 
                        className="w-full h-full object-cover rounded-3xl shadow-lg"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl py-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-4xl font-bold text-green-500">{s.value}</p>
                            <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. The Problem We're Solving (Image Left, Text Right) */}
            <div className="max-w-7xl mx-auto py-16 flex flex-col-reverse lg:flex-row items-center gap-16 mb-10">
                <div className="flex-1 w-full relative h-[400px] lg:h-[500px]">
                    <img 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80" 
                        alt="Person frustrated with laptop" 
                        className="w-full h-full object-cover rounded-3xl shadow-lg"
                    />
                </div>
                <div className="flex-1 text-left">
                    <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                        The Problem
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight mb-6">
                        Why we exist today.
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                        The e-commerce world is flooded with counterfeits, unreliable sellers, and complex return policies. 
                        It became increasingly difficult for the average consumer to know if they were buying a genuine product or getting scammed.
                    </p>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        We saw an urgent need to build a protective layer between the consumer and the wild west of online gadget shopping. 
                        We wanted to solve the anxiety of online shopping by building a platform rooted entirely in transparency and strict verification.
                    </p>
                </div>
            </div>

            {/* 3. Our Mission & Vision (Text Left, Image Right) */}
            <div className="bg-slate-50 w-full py-24 mb-16 rounded-[2.5rem]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6">
                    <div className="flex-1 text-left">
                        <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                            Mission & Vision
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight mb-6">
                            Where we're going.
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-6">
                            Our mission is to close the gap between great products and the people who need them. 
                            Whether you're a tech enthusiast hunting for the latest release or someone buying their 
                            first smart gadget, KES HUB is designed to make that journey simple and enjoyable.
                        </p>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Our ultimate vision is to be the undisputed destination for smart technology in the region, 
                            fostering an ecosystem where sellers thrive on merit and buyers never have to second-guess their purchases.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative h-[400px] lg:h-[500px]">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
                            alt="Team collaborating" 
                            className="w-full h-full object-cover rounded-3xl shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* GSAP Founder Section */}
            <FounderSection />

            {/* Our Values */}
            <div className="max-w-7xl mx-auto py-24">
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                            Core Values
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">What We Stand For</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-green-500 transition-all duration-300 group">
                                <div className="mb-6 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    {v.icon}
                                </div>
                                <h3 className="text-slate-800 font-bold text-xl mb-3">{v.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                            FAQ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto">Got questions? We've got answers.</p>
                    </div>
                    <div className="max-w-3xl mx-auto divide-y divide-slate-200">
                        {[
                            {
                                q: "How do I know sellers are verified?",
                                a: "Every seller on KES HUB goes through a manual approval process. We verify identity, business registration, and product authenticity before they can list on the platform.",
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major debit and credit cards, as well as bank transfers. All payments are processed securely through Paystack.",
                            },
                            {
                                q: "Can I return a product I'm not happy with?",
                                a: "Yes. We offer a 7-day return window for most products. Items must be in original condition and packaging. Contact our support team to initiate a return.",
                            },
                            {
                                q: "How long does delivery take?",
                                a: "Delivery times vary by seller and location. Most sellers dispatch within 1–3 business days, and delivery typically arrives within 3–7 business days.",
                            },
                            {
                                q: "How do I become a seller on KES HUB?",
                                a: "Simply create an account, navigate to 'Create Store', fill in your store details, and submit for approval. Our team will review your application within 24–48 hours.",
                            },
                            {
                                q: "Is my personal information safe?",
                                a: "Absolutely. We take privacy seriously. We never sell your data to third parties. Read our Privacy Policy for full details on how we handle your information.",
                            },
                        ].map((item, i) => (
                            <details key={i} className="group py-5 cursor-pointer">
                                <summary className="flex items-center justify-between gap-4 text-slate-800 font-semibold text-lg list-none">
                                    {item.q}
                                    <span className="ml-auto text-slate-400 group-open:rotate-45 transition-transform duration-300 flex-shrink-0 text-2xl font-light">+</span>
                                </summary>
                                <p className="mt-4 text-slate-500 leading-relaxed pr-8">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Legal Links */}
                <div className="flex justify-center gap-6 mb-16 text-sm text-slate-500">
                    <Link href="/privacy" className="hover:text-green-600 transition-colors underline underline-offset-2">Privacy Policy</Link>
                    <span className="text-slate-300">|</span>
                    <Link href="/terms" className="hover:text-green-600 transition-colors underline underline-offset-2">Terms & Conditions</Link>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white mb-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Ready to explore?</h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                            Browse hundreds of curated gadgets, compare prices, and shop from verified sellers all in one place.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="/shop" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-green-500/30">
                                Browse Products
                            </Link>
                            <Link href="/contact" className="bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition border border-slate-600 hover:border-white">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

