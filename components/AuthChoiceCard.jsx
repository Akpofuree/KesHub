'use client'

import Link from "next/link";

export default function AuthChoiceCard({ title, description, href, buttonLabel, accent = "bg-indigo-500" }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            <Link href={href} className={`mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-white ${accent}`}>
                {buttonLabel}
            </Link>
        </div>
    );
}
