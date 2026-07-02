"use client";
import React from "react";
import toast from "react-hot-toast";

export default function Banner() {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClaim = () => {
    setIsOpen(false);
    toast.success("Coupon copied to clipboard!");
    navigator.clipboard.writeText("NEW20");
  };

  return (
    isOpen && (
      <div className="w-full px-6 py-1 font-medium text-sm text-slate-900 text-center bg-gradient-to-r from-emerald-100 via-slate-100 to-emerald-100 border-b border-slate-200">
        <div className="flex flex-col gap-3 md:flex-row items-center justify-between max-w-7xl mx-auto">
          <p className="text-slate-800">
            Get 20% off your first order. Shop the latest gadgets with trusted
            delivery.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClaim}
              type="button"
              className="font-semibold text-slate-900 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition max-sm:hidden"
            >
              Claim Offer
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="font-medium text-slate-700 py-2 rounded-full hover:bg-slate-100 transition px-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
