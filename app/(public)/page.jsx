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
      <LatestProducts />
      <BestSelling />
      <OurSpecs />
      <Newsletter />
    </div>
  );
}
