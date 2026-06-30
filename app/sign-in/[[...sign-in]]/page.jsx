"use client";

import BrandLogo from "@/components/BrandLogo";
import AuthChoiceCard from "@/components/AuthChoiceCard";
import AuthForm from "@/components/AuthForm";
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
          <AuthForm mode="signin" role={role} />
        </div>
      </div>
    </main>
  );
}
