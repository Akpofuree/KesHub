'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, BatteryCharging, MessageCircle, Sparkles } from "lucide-react"

const storageOptions = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"]
const conditionOptions = ["Like new", "Good", "Fair", "Rough"]

const brandWeights = {
    Apple: 1.25,
    Samsung: 1.18,
    Google: 1.12,
    Xiaomi: 1.05,
    OnePlus: 1.08,
    Tecno: 0.9,
    Infinix: 0.88,
    Oppo: 0.95,
    Vivo: 0.94,
}

function estimateValue({ brand, storage, condition, batteryHealth, targetPrice }) {
    const storageIndex = storageOptions.indexOf(storage)
    const conditionIndex = conditionOptions.indexOf(condition)
    const brandWeight = brandWeights[brand] || 1
    const storageBoost = 1 + storageIndex * 0.12
    const conditionPenalty = [1.18, 1, 0.84, 0.68][Math.max(conditionIndex, 0)]
    const batteryBoost = Math.max(0.7, Math.min(1.05, batteryHealth / 100))
    const base = Math.max(targetPrice * 0.72, 18000)
    return Math.round(base * brandWeight * storageBoost * conditionPenalty * batteryBoost)
}

export default function SwapDevicePage() {
    const [currentPhone, setCurrentPhone] = useState({
        brand: "Samsung",
        model: "",
        storage: "128 GB",
        condition: "Good",
        batteryHealth: 86,
        targetPrice: 250000,
    })
    const [wantedPhone, setWantedPhone] = useState({
        brand: "Apple",
        model: "",
        storage: "256 GB",
        condition: "Like new",
        targetPrice: 650000,
    })

    const currentValue = useMemo(() => estimateValue(currentPhone), [currentPhone])
    const wantedValue = useMemo(() => estimateValue(wantedPhone), [wantedPhone])
    const balance = wantedValue - currentValue

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(17,24,39,0.06),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ffffff_55%,#eef2ff_100%)]">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="max-w-3xl">
                    <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white">
                        <Sparkles size={14} />
                        Trade-in assistant
                    </p>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">Swap your phone with a quote that updates as you type.</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                        Tell us the phone you have, the phone you want, and the important specs. We estimate the trade-in gap so you can decide faster.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                        <div className="flex items-center gap-3 text-slate-900">
                            <MessageCircle size={20} />
                            <h2 className="text-xl font-semibold">Swap chat</h2>
                        </div>
                        <div className="mt-6 space-y-5 text-sm">
                            <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-slate-700">
                                Hi, what phone are you using right now?
                            </div>
                            <div className="rounded-2xl rounded-tr-sm bg-green-50 px-4 py-3 text-slate-700">
                                {currentPhone.brand} {currentPhone.model || "model"} · {currentPhone.storage} · {currentPhone.condition}
                            </div>
                            <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-slate-700">
                                What phone do you want to swap to?
                            </div>
                            <div className="rounded-2xl rounded-tr-sm bg-blue-50 px-4 py-3 text-slate-700">
                                {wantedPhone.brand} {wantedPhone.model || "model"} · {wantedPhone.storage} · {wantedPhone.condition}
                            </div>
                        </div>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Current phone brand
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={currentPhone.brand} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, brand: e.target.value }))}>
                                    {Object.keys(brandWeights).map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Current model
                                <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={currentPhone.model} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, model: e.target.value }))} placeholder="e.g. Galaxy S22" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Current storage
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={currentPhone.storage} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, storage: e.target.value }))}>
                                    {storageOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Battery health
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                                    <BatteryCharging size={18} className="text-green-600" />
                                    <input type="range" min="50" max="100" value={currentPhone.batteryHealth} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, batteryHealth: Number(e.target.value) }))} className="w-full" />
                                    <span className="w-10 text-right">{currentPhone.batteryHealth}%</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Current condition
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={currentPhone.condition} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, condition: e.target.value }))}>
                                    {conditionOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Estimated market price
                                <input type="number" className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={currentPhone.targetPrice} onChange={(e) => setCurrentPhone((prev) => ({ ...prev, targetPrice: Number(e.target.value) }))} />
                            </label>
                        </div>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Desired phone brand
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={wantedPhone.brand} onChange={(e) => setWantedPhone((prev) => ({ ...prev, brand: e.target.value }))}>
                                    {Object.keys(brandWeights).map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Desired model
                                <input className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={wantedPhone.model} onChange={(e) => setWantedPhone((prev) => ({ ...prev, model: e.target.value }))} placeholder="e.g. iPhone 15 Pro" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Desired storage
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={wantedPhone.storage} onChange={(e) => setWantedPhone((prev) => ({ ...prev, storage: e.target.value }))}>
                                    {storageOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                Desired condition
                                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={wantedPhone.condition} onChange={(e) => setWantedPhone((prev) => ({ ...prev, condition: e.target.value }))}>
                                    {conditionOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700 sm:col-span-2">
                                Desired phone price
                                <input type="number" className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none" value={wantedPhone.targetPrice} onChange={(e) => setWantedPhone((prev) => ({ ...prev, targetPrice: Number(e.target.value) }))} />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Live quote</p>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl bg-white/8 p-4">
                                <p className="text-sm text-slate-300">Your phone estimate</p>
                                <p className="mt-2 text-3xl font-semibold">NGN {currentValue.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl bg-white/8 p-4">
                                <p className="text-sm text-slate-300">Desired phone estimate</p>
                                <p className="mt-2 text-3xl font-semibold">NGN {wantedValue.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl bg-white/8 p-4">
                                <p className="text-sm text-slate-300">Balance to pay</p>
                                <p className={`mt-2 text-3xl font-semibold ${balance <= 0 ? "text-green-300" : "text-amber-300"}`}>
                                    {balance <= 0 ? `We owe you NGN ${Math.abs(balance).toLocaleString()}` : `NGN ${balance.toLocaleString()}`}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                            The estimate is based on brand, storage, battery health, condition, and the target phone price. For a final offer, the device still needs inspection.
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950">
                                Talk to support <ArrowRight size={16} />
                            </Link>
                            <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-medium text-white">
                                Browse phones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
