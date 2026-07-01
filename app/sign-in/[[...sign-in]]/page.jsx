"use client";

import BrandLogo from "@/components/BrandLogo";
import AuthChoiceCard from "@/components/AuthChoiceCard";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "customer";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e8fff2_0%,_#f8fafc_40%,_#eef2ff_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center">
          <BrandLogo className="scale-110 sm:scale-125" variant="light" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <AuthChoiceCard
            title="Sign in as Customer"
            description="Use this to shop, add items to cart, and place orders."
            href="/sign-in?role=customer"
            buttonLabel="Customer login"
            accent="bg-indigo-500"
          />
          <AuthChoiceCard
            title="Sign in as Admin"
            description="Use this to access the admin dashboard and manage the catalog."
            href="/sign-in?role=admin"
            buttonLabel="Admin login"
            accent="bg-slate-900"
          />
        </div>
        <div className="mt-8 flex justify-center">
          {role === "customer" ? (
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">
                  Customer Sign In
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Sign in to access your account and continue shopping.
                </p>
              </div>
              <SignIn routing="path" path="/sign-in" forceRedirectUrl="/" />
            </div>
          ) : (
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-900">
                  Admin Sign In
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  Admin access
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Sign in to access the admin dashboard and manage your store.
                </p>
              </div>
              <SignIn
                routing="path"
                path="/sign-in"
                forceRedirectUrl="/admin"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
