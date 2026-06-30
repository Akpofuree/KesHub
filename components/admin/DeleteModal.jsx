"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteModal({ productId, productName, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    setLoading(false);
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{productName}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
