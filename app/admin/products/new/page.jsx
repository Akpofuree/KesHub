"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(form) {
    setLoading(true);
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
