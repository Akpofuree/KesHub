import { Suspense } from "react";
import PaymentVerifyClient from "./PaymentVerifyClient";

export default function PaymentVerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center px-6 text-slate-500">Verifying payment...</div>}>
            <PaymentVerifyClient />
        </Suspense>
    );
}
