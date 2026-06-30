'use client'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import Loading from "@/components/Loading"
import { fetchJson } from "@/lib/fetch-json"

export default function StoreManageProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")

    const fetchProducts = async () => {
        const storesResponse = await fetchJson("/api/stores")
        if (!storesResponse.ok) {
            setError(storesResponse.data?.message || "Failed to load products")
            setLoading(false)
            return
        }
        const storeId = storesResponse.data?.data?.[0]?.id
        const response = await fetchJson("/api/products")
        if (!response.ok) {
            setError(response.data?.message || "Failed to load products")
            setLoading(false)
            return
        }
        setProducts((response.data?.data || []).filter((product) => !storeId || product.storeId === storeId))
        setLoading(false)
    }

    const toggleStock = async (productId) => {
        const current = products.find((product) => product.id === productId)
        const response = await fetch(`/api/products/${productId}/stock`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inStock: !current?.inStock }),
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || "Failed to update product stock")
        setProducts((prev) => prev.map((product) => product.id === productId ? result.data : product))
    }

    const removeProduct = async (productId) => {
        if (!confirm("Remove this product? This cannot be undone.")) return
        const response = await fetch(`/api/products/${productId}`, { method: "DELETE" })
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || "Failed to remove product")
        setProducts((prev) => prev.filter((product) => product.id !== productId))
    }

    useEffect(() => {
            fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <>
            {error && <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
            <h1 className="text-2xl text-slate-500 mb-5">Manage <span className="text-slate-800 font-medium">Products</span></h1>
            <table className="w-full max-w-4xl text-left  ring ring-slate-200  rounded overflow-hidden text-sm">
                <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3 hidden md:table-cell">Description</th>
                        <th className="px-4 py-3 hidden md:table-cell">MRP</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700">
                    {products.map((product) => (
                        <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div className="flex gap-2 items-center">
                                    <Image width={40} height={40} className='p-1 shadow rounded cursor-pointer' src={product.images[0]} alt="" />
                                    {product.name}
                                </div>
                            </td>
                            <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">{product.description}</td>
                            <td className="px-4 py-3 hidden md:table-cell">{currency} {product.mrp.toLocaleString()}</td>
                            <td className="px-4 py-3">{currency} {product.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                        <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleStock(product.id), { loading: "Updating data..." })} checked={product.inStock} />
                                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                        <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                                    </label>
                                    <Link href={`/store/manage-product/${product.id}`} className="rounded-full border border-slate-300 px-4 py-1.5 text-slate-700 hover:bg-slate-100 transition">
                                        Edit
                                    </Link>
                                    <button onClick={() => toast.promise(removeProduct(product.id), { loading: "Removing...", success: "Product removed" })} className="rounded-full border border-red-200 px-4 py-1.5 text-red-600 hover:bg-red-50 transition">
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
