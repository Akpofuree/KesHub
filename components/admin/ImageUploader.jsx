"use client";
import { useState } from "react";

export default function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(e) {
    const files = Array.from(e.target.files);
    setUploading(true);

    const urls = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        return data.url;
      })
    );

    onChange([...images, ...urls]);
    setUploading(false);
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
            <img src={url} alt="" className="w-full h-full object-cover rounded-lg border" />
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
            <p className="text-gray-500">Uploading...</p>
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
    </div>
  );
}
