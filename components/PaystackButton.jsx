'use client'

import { useState } from "react";

export default function PaystackButton({
    email,
    amount,
    orderId,
    onSuccess,
    disabled = false,
    children,
}) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (disabled || !email || !orderId) return;

        setLoading(true);
        try {
            const response = await fetch("/api/payments/initialize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, orderId }),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                throw new Error(result?.message || "Failed to initialize payment");
            }

            if (typeof onSuccess === "function") {
                onSuccess(result.data);
            }

            window.location.href = result.data.authorization_url;
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading || disabled}
            className="w-full bg-emerald-600 text-white py-2.5 rounded hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
            {loading ? "Redirecting..." : children || "Pay with Paystack"}
        </button>
    );
}
