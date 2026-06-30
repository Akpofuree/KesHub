"use client";

import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { LayoutDashboard, Repeat2 } from "lucide-react";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import { fetchJson } from "@/lib/fetch-json";
import { setProduct } from "@/lib/features/product/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role;
  const dashboardHref =
    role === "ADMIN" ? "/admin" : role === "SELLER" ? "/store" : null;
  const dashboardTitle =
    role === "ADMIN" ? "Open admin dashboard" : "Open seller dashboard";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) dispatch(setProduct(data));
      });
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <section className="px-6 mt-6">
        <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-px bg-slate-200">
            <Link
              href="/shop"
              className="bg-white p-6 hover:bg-slate-50 transition"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Shop products
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Browse phones, accessories, and essentials.
              </p>
            </Link>
            <SignedIn>
              {dashboardHref ? (
                <Link
                  href={dashboardHref}
                  className="bg-slate-900 p-6 text-white hover:bg-slate-800 transition"
                >
                  <LayoutDashboard size={22} />
                  <h2 className="mt-4 text-lg font-semibold">Dashboard</h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Jump straight back into your dashboard.
                  </p>
                  <span className="inline-flex mt-5 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900">
                    {dashboardTitle}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/swap-device"
                  className="bg-white p-6 hover:bg-slate-50 transition"
                >
                  <Repeat2 className="text-slate-800" size={22} />
                  <h2 className="mt-4 text-lg font-semibold text-slate-900">
                    Swap device
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Get a trade-in estimate from your current and target phone
                    specs.
                  </p>
                </Link>
              )}
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="bg-white p-6 hover:bg-slate-50 transition"
              >
                <LayoutDashboard size={22} className="text-slate-800" />
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  Sign in
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Access your dashboard or swap tools after login.
                </p>
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>
      <LatestProducts />
      <BestSelling />
      <OurSpecs />
      <Newsletter />
    </div>
  );
}
