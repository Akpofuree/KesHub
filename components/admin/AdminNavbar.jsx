'use client'
import Link from "next/link"
import BrandLogo from "@/components/BrandLogo"

const AdminNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative inline-flex items-center gap-2">
                <BrandLogo showWordmark={false} />
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white bg-green-500 self-start mt-1">
                    Admin
                </span>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, Admin</p>
            </div>
        </div>
    )
}

export default AdminNavbar
