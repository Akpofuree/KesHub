"use client";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

const CATEGORIES = ["PHONES", "LAPTOPS", "HEADPHONES", "ACCESSORIES", "TABLETS", "SMARTWATCHES", "GAMING"];
const CONDITIONS = ["BRAND_NEW", "BOX_TON", "UK_USED", "GRADE_A", "GRADE_B", "GRADE_C"];
const CONDITION_LABELS = {
  BRAND_NEW: "Brand New",
  BOX_TON: "Box Ton (New, No Box)",
  UK_USED: "UK Used",
  GRADE_A: "Grade A (Excellent)",
  GRADE_B: "Grade B (Good)",
  GRADE_C: "Grade C (Fair)",
};

function FormInput({ label, value, onChange, type = "text", required = false, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options, labels = {} }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels[opt] || opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-black"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default function ProductForm({ defaultValues = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    category: "PHONES",
    isSecondhand: false,
    isFeatured: false,
    isActive: true,
    images: [],
    condition: "",
    simStatus: "",
    storage: "",
    ram: "",
    color: "",
    network: "",
    batteryHealth: "",
    processor: "",
    screenSize: "",
    storageType: "",
    os: "",
    laptopBattery: "",
    graphics: "",
    ...defaultValues,
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isPhone = form.category === "PHONES";
  const isLaptop = form.category === "LAPTOPS";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-8">

      {/* SECTION 1 — Basic Info */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Product Name *" value={form.name} onChange={(v) => update("name", v)} required />
          <FormInput label="Brand *" value={form.brand} onChange={(v) => update("brand", v)} required />
          <FormInput label="Model" value={form.model} onChange={(v) => update("model", v)} />
          <FormSelect label="Category *" value={form.category} onChange={(v) => update("category", v)} options={CATEGORIES} />
          <FormInput label="Price (₦) *" type="number" value={form.price} onChange={(v) => update("price", v)} required />
          <FormInput label="Compare Price (₦)" type="number" value={form.comparePrice} onChange={(v) => update("comparePrice", v)} />
          <FormInput label="Stock *" type="number" value={form.stock} onChange={(v) => update("stock", v)} required />
        </div>
        <div className="mt-4">
          <FormTextarea label="Description *" value={form.description} onChange={(v) => update("description", v)} required />
        </div>
        <div className="flex gap-6 mt-4">
          <Toggle label="Active (visible on shop)" checked={form.isActive} onChange={(v) => update("isActive", v)} />
          <Toggle label="Featured Product" checked={form.isFeatured} onChange={(v) => update("isFeatured", v)} />
        </div>
      </section>

      {/* SECTION 2 — Images */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Images</h2>
        <ImageUploader images={form.images} onChange={(urls) => update("images", urls)} />
      </section>

      {/* SECTION 3 — Condition (secondhand) */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Condition</h2>
        <Toggle label="This is a Secondhand Item" checked={form.isSecondhand} onChange={(v) => update("isSecondhand", v)} />
        {form.isSecondhand && (
          <div className="mt-4">
            <FormSelect
              label="Condition Grade *"
              value={form.condition}
              onChange={(v) => update("condition", v)}
              options={CONDITIONS}
              labels={CONDITION_LABELS}
            />
          </div>
        )}
      </section>

      {/* SECTION 4 — Phone Fields */}
      {isPhone && (
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Phone Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SIM Status</label>
              <div className="flex gap-3">
                {["UNLOCKED", "LOCKED"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update("simStatus", s)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      form.simStatus === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {s === "UNLOCKED" ? "SIM Unlocked" : "SIM Locked"}
                  </button>
                ))}
              </div>
            </div>
            <FormSelect label="Storage" value={form.storage} onChange={(v) => update("storage", v)}
              options={["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "Other"]} />
            <FormSelect label="RAM" value={form.ram} onChange={(v) => update("ram", v)}
              options={["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "Other"]} />
            <FormInput label="Color" value={form.color} onChange={(v) => update("color", v)} placeholder="e.g. Midnight Black" />
            <FormSelect label="Network" value={form.network} onChange={(v) => update("network", v)}
              options={["5G", "4G LTE", "3G", "Other"]} />
            {form.isSecondhand && (
              <FormInput label="Battery Health" value={form.batteryHealth} onChange={(v) => update("batteryHealth", v)}
                placeholder="e.g. 87%" />
            )}
          </div>
        </section>
      )}

      {/* SECTION 5 — Laptop Fields */}
      {isLaptop && (
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Laptop Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Processor *" value={form.processor} onChange={(v) => update("processor", v)}
              placeholder="e.g. Intel Core i7 12th Gen" />
            <FormSelect label="RAM *" value={form.ram} onChange={(v) => update("ram", v)}
              options={["4GB", "8GB", "12GB", "16GB", "32GB", "64GB", "Other"]} />
            <FormSelect label="Storage *" value={form.storage} onChange={(v) => update("storage", v)}
              options={["128GB", "256GB", "512GB", "1TB", "2TB", "Other"]} />
            <FormSelect label="Storage Type" value={form.storageType} onChange={(v) => update("storageType", v)}
              options={["SSD", "HDD", "EMMC", "SSD_HDD_COMBO"]}
              labels={{ SSD: "SSD", HDD: "HDD", EMMC: "eMMC", SSD_HDD_COMBO: "SSD + HDD" }} />
            <FormSelect label="Screen Size" value={form.screenSize} onChange={(v) => update("screenSize", v)}
              options={['11"', '13"', '13.3"', '14"', '15.6"', '16"', '17"', "Other"]} />
            <FormSelect label="Operating System" value={form.os} onChange={(v) => update("os", v)}
              options={["Windows 11", "Windows 10", "macOS", "No OS", "Other"]} />
            <FormInput label="Graphics" value={form.graphics} onChange={(v) => update("graphics", v)}
              placeholder="e.g. NVIDIA RTX 3060 / Integrated" />
            {form.isSecondhand && (
              <FormInput label="Battery Health" value={form.laptopBattery} onChange={(v) => update("laptopBattery", v)}
                placeholder="e.g. 80% / Replaced" />
            )}
          </div>
        </section>
      )}

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button type="button" onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
