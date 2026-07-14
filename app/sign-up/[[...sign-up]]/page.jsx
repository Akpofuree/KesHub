"use client";

import BrandLogo from "@/components/BrandLogo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  // Block any admin signup attempts and redirect to customer signup
  const role =
    (searchParams.get("role") || "customer") === "admin"
      ? "customer"
      : searchParams.get("role") || "customer";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e8fff2_0%,_#f8fafc_40%,_#eef2ff_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <div className="sr-only">Sign up</div>
        </div>
        <div className="flex justify-center">
          <BrandLogo
            showWordmark={false}
            className="scale-110 sm:scale-125"
            variant="light"
          />
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[560px] rounded-3xl border border-slate-200 bg-white px-3 py-4 sm:px-8 sm:py-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">
                Customer Sign Up
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Join KES HUB to shop for premium gadgets and exclusive deals.
              </p>
            </div>
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              forceRedirectUrl="/"
              unsafeMetadata={{ role: "USER" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
