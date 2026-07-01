"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/admin/DeleteModal";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";

const CATEGORIES = ["PHONES", "LAPTOPS", "HEADPHONES", "ACCESSORIES", "TABLETS", "SMARTWATCHES", "GAMING"];
const CONDITIONS = ["BRAND_NEW", "BOX_TON", "UK_USED", "GRADE_A", "GRADE_B", "GRADE_C"];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryFilter) params.set("category", categoryFilter);
    if (conditionFilter) params.set("condition", conditionFilter);
    if (search) params.set("search", search);
    
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setProducts(data?.products || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, conditionFilter, search]);

  function formatPrice(amount) {
    return "₦" + amount.toLocaleString("en-NG");
  }

  return (
    <div className="text-slate-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">
          Products <span className="text-slate-800 font-medium">Management</span>
        </h1>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          <PlusIcon size={18} />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-64 rounded-lg border border-gray-300 px-4 py-2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All Conditions</option>
          {CONDITIONS.map((cond) => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-3">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">📦</div>
                    )}
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.brand}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs">{product.category}</span>
                  </td>
                  <td className="p-3">{formatPrice(product.price)}</td>
                  <td className="p-3">
                    <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        className="p-2 hover:bg-slate-100 rounded"
                        title="Edit"
                      >
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteModal(product)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded"
                        title="Delete"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}

      {deleteModal && (
        <DeleteModal
          productId={deleteModal.id}
          productName={deleteModal.name}
          onClose={() => setDeleteModal(null)}
        />
      )}
    </div>
  );
}
