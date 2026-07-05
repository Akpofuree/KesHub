'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import SellerNavbar from "./StoreNavbar"
import SellerSidebar from "./StoreSidebar"

async function safeJson(response) {
    const text = await response.text()
    if (!text) return null
    try {
        return JSON.parse(text)
    } catch {
        return null
    }
}

const StoreLayout = ({ children }) => {


    const [isSeller, setIsSeller] = useState(false)
    const [loading, setLoading] = useState(true)
    const [storeInfo, setStoreInfo] = useState(null)

    const fetchIsSeller = async () => {
        const response = await fetch("/api/stores/status")
        const result = await safeJson(response)
        const store = result.data || null
        setIsSeller(Boolean(store && store.status === "approved"))
        setStoreInfo(store)
        setLoading(false)
    }

    useEffect(() => {
        fetchIsSeller()
    }, [])

    return loading ? (
        <Loading />
    ) : isSeller ? (
        <div className="flex flex-col h-screen">
            <SellerNavbar />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <SellerSidebar storeInfo={storeInfo} />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">Your store is not live yet</h1>
            <p className="mt-4 max-w-xl text-slate-500">
                Submit your store application first, then come back here after approval.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/create-store" className="bg-slate-700 text-white flex items-center gap-2 p-2 px-6 max-sm:text-sm rounded-full">
                  Create store <ArrowRightIcon size={18} />
              </Link>
              <Link href="/" className="border border-slate-300 text-slate-700 flex items-center gap-2 p-2 px-6 max-sm:text-sm rounded-full">
                  Go to home <ArrowRightIcon size={18} />
              </Link>
            </div>
        </div>
    )
}

export default StoreLayout
