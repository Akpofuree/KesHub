"use client";
import { useState } from "react";
import { X, UploadCloud, Loader2 } from "lucide-react";
import ProductImage from "@/components/ProductImage";

export default function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files);
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      const urls = [];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.url) {
          throw new Error(data?.error || "Failed to upload image");
        }
        urls.push(data.url);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      onChange([...images, ...urls]);
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function removeImage(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">Product Images</label>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-3 mb-4">
        {images.map((url, i) => (
          <div key={i} className="relative w-24 h-24">
            <ProductImage src={url} className="w-full h-full object-cover rounded-lg border" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Upload input */}
      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
        <div className="text-center">
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"
                  style={{ transform: `rotate(${(progress / 100) * 360}deg)` }}
                ></div>
              </div>
              <p className="text-gray-600 font-medium">{progress}% uploaded</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500">Click to upload images</p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
            </>
          )}
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
          disabled={uploading}
        />
      </label>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
