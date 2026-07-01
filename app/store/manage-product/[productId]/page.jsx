'use client'

import Loading from "@/components/Loading"
import { fetchJson } from "@/lib/fetch-json"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']
const deviceStates = ['Brand New', 'Boxed', 'Unboxed', 'Second-hand', 'UK Used']
const grades = ['A+', 'A', 'B', 'C', 'Refurbished']
const simStatuses = ['SIM Unlocked', 'SIM Locked']
const usageTypes = ['Brand New', 'Used', 'UK Used']

export default function EditProductPage() {
    const params = useParams()
    const router = useRouter()
    const productId = params?.productId
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        brand: "",
        storage: "",
        deviceType: "",
        deviceState: "",
        grade: "",
        simStatus: "",
        usageType: "",
        mrp: "",
        price: "",
        category: "",
    })

    useEffect(() => {
        const loadProduct = async () => {
            const response = await fetchJson(`/api/products/${productId}`)
            if (!response.ok) {
                setError(response.data?.message || "Failed to load product")
                setLoading(false)
                return
            }
            const product = response.data?.data
            setProductInfo({
                name: product?.name || "",
                description: product?.description || "",
                brand: product?.brand || "",
                storage: product?.storage || "",
                deviceType: product?.deviceType || "",
                deviceState: product?.deviceState || "",
                grade: product?.grade || "",
                simStatus: product?.simStatus || "",
                usageType: product?.usageType || "",
                mrp: product?.mrp ?? "",
                price: product?.price ?? "",
                category: product?.category || "",
            })
            setLoading(false)
        }

        if (productId) loadProduct()
    }, [productId])

    const onSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const response = await fetch(`/api/products/${productId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...productInfo,
                mrp: Number(productInfo.mrp),
                price: Number(productInfo.price),
            }),
        })
        const result = await response.json()
        setSaving(false)
        if (!response.ok) throw new Error(result.message || "Failed to update product")
        router.push("/store/manage-product")
    }

    if (loading) return <Loading />

    return (
        <form onSubmit={(e) => toast.promise(onSubmit(e), { loading: "Saving changes..." })} className="max-w-2xl">
            {error && <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl text-slate-500">Edit <span className="text-slate-800 font-medium">Product</span></h1>
                <Link href="/store/manage-product" className="text-sm text-slate-600 hover:text-slate-900">Back to inventory</Link>
            </div>

            <label className="flex flex-col gap-2 my-6 text-slate-600">
                Name
                <input type="text" value={productInfo.name} onChange={(e) => setProductInfo((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
            </label>

            <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2 text-slate-600">
                    Brand
                    <input type="text" value={productInfo.brand} onChange={(e) => setProductInfo((prev) => ({ ...prev, brand: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    Storage
                    <input type="text" value={productInfo.storage} onChange={(e) => setProductInfo((prev) => ({ ...prev, storage: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-4">
                <label className="flex flex-col gap-2 text-slate-600">
                    Device type
                    <input type="text" value={productInfo.deviceType} onChange={(e) => setProductInfo((prev) => ({ ...prev, deviceType: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    Device state
                    <select value={productInfo.deviceState} onChange={(e) => setProductInfo((prev) => ({ ...prev, deviceState: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select state</option>
                        {deviceStates.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-4">
                <label className="flex flex-col gap-2 text-slate-600">
                    Grade
                    <select value={productInfo.grade} onChange={(e) => setProductInfo((prev) => ({ ...prev, grade: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select grade</option>
                        {grades.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                    </select>
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    SIM status
                    <select value={productInfo.simStatus} onChange={(e) => setProductInfo((prev) => ({ ...prev, simStatus: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                        <option value="">Select SIM status</option>
                        {simStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                </label>
            </div>

            <label className="flex flex-col gap-2 my-6 text-slate-600 max-w-sm">
                Usage type
                <select value={productInfo.usageType} onChange={(e) => setProductInfo((prev) => ({ ...prev, usageType: e.target.value }))} className="w-full p-2 px-4 outline-none border border-slate-200 rounded" required>
                    <option value="">Select usage type</option>
                    {usageTypes.map((usage) => <option key={usage} value={usage}>{usage}</option>)}
                </select>
            </label>

            <label className="flex flex-col gap-2 my-6 text-slate-600">
                Description
                <textarea value={productInfo.description} onChange={(e) => setProductInfo((prev) => ({ ...prev, description: e.target.value }))} rows={5} className="w-full p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
            </label>

            <div className="flex gap-5">
                <label className="flex flex-col gap-2 text-slate-600">
                    MRP
                    <input type="number" value={productInfo.mrp} onChange={(e) => setProductInfo((prev) => ({ ...prev, mrp: e.target.value }))} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 text-slate-600">
                    Price
                    <input type="number" value={productInfo.price} onChange={(e) => setProductInfo((prev) => ({ ...prev, price: e.target.value }))} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
            </div>

            <select value={productInfo.category} onChange={(e) => setProductInfo((prev) => ({ ...prev, category: e.target.value }))} className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded" required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <button type="submit" disabled={saving} className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition">
                Save changes
            </button>
        </form>
    )
}
