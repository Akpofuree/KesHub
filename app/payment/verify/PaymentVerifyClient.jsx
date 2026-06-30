'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function PaymentVerifyClient() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const { isLoaded, isSignedIn } = useAuth();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const verify = async () => {
            if (!isLoaded) {
                return;
            }

            if (!reference) {
                setError("Missing payment reference.");
                setLoading(false);
                return;
            }

            if (!isSignedIn) {
                setError("Please sign in to view your payment status");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/payments/verify/${reference}`);
                const data = await response.json();

                if (!response.ok || !data?.success) {
                    throw new Error(data?.message || "Payment verification failed");
                }

                setResult(data.data);
            } catch (err) {
                setError(err.message || "Payment verification failed");
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [reference, isLoaded, isSignedIn]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                {loading ? (
                    <p className="text-slate-500">Verifying payment...</p>
                ) : error ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold text-red-600">Payment failed</h1>
                        <p className="text-slate-600">{error}</p>
                        <Link href="/cart" className="inline-flex rounded bg-slate-800 px-4 py-2 text-white">
                            Try again
                        </Link>
                    </div>
                ) : result?.transactionStatus === "success" ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold text-emerald-700">Payment successful</h1>
                        <p className="text-slate-600">Your order has been marked as paid.</p>
                        <Link href="/orders" className="inline-flex rounded bg-slate-800 px-4 py-2 text-white">
                            View orders
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold text-amber-600">Payment pending</h1>
                        <p className="text-slate-600">The transaction did not complete successfully.</p>
                        <Link href="/cart" className="inline-flex rounded bg-slate-800 px-4 py-2 text-white">
                            Try again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
