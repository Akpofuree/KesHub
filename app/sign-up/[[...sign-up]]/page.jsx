"use client";

import BrandLogo from "@/components/BrandLogo";
import AuthChoiceCard from "@/components/AuthChoiceCard";
import { SignUp } from "@clerk/nextjs";
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
            title="Sign up as Customer"
            description="Create a customer account to shop on KES HUB."
            href="/sign-up?role=customer"
            buttonLabel="Customer sign up"
            accent="bg-indigo-500"
          />
          <AuthChoiceCard
            title="Sign up as Admin"
            description="Create an admin account and go straight to the admin dashboard."
            href="/sign-up?role=admin"
            buttonLabel="Admin sign up"
            accent="bg-slate-900"
          />
        </div>
        <div className="mt-8 flex justify-center">
          {role === "customer" ? (
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">Customer Sign Up</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create your account</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Use Clerk's built-in sign-up flow so bot protection and verification stay in sync.
                </p>
              </div>
              <SignUp routing="path" path="/sign-up" forceRedirectUrl="/" unsafeMetadata={{ role: "USER" }} />
            </div>
          ) : (
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-900">Admin Sign Up</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create admin access</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Use the same Clerk sign-up flow, then land directly on the admin dashboard.
                </p>
              </div>
              <SignUp routing="path" path="/sign-up" forceRedirectUrl="/admin" unsafeMetadata={{ role: "ADMIN" }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
