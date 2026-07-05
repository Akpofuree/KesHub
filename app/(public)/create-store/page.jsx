'use client';

import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialStoreInfo = {
  name: "",
  username: "",
  description: "",
  email: "",
  contact: "",
  address: "",
  image: null,
};

async function safeJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default function CreateStore() {
  const { isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [message, setMessage] = useState("");
  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);
  const [previewSrc, setPreviewSrc] = useState(assets.upload_area);

  const isApproved = statusData?.status === "approved";
  const isPending = statusData?.status === "pending";
  const isRejected = statusData?.status === "rejected";

  const onChangeHandler = (e) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!storeInfo.image) {
      setPreviewSrc(assets.upload_area);
      return;
    }

    const objectUrl = URL.createObjectURL(storeInfo.image);
    setPreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [storeInfo.image]);

  const fetchSellerStatus = async () => {
    try {
      const response = await fetch("/api/stores/status");
      const result = await safeJson(response);

      if (!response.ok) {
        setStatusData(null);
        setMessage(result?.message || "Unable to check store status.");
        return;
      }

      setStatusData(result.data || null);

      if (result.data?.status === "approved") {
        setMessage(
          `Your store "${result.data.name}" is live. You can manage it from your seller dashboard.`,
        );
      } else if (result.data?.status === "pending") {
        setMessage(
          `Your store "${result.data.name}" is awaiting approval. We'll notify you once it's reviewed.`,
        );
      } else if (result.data?.status === "rejected") {
        setMessage(
          "Your previous store request was rejected. You can submit a new one below.",
        );
      } else {
        setMessage("");
      }
    } catch {
      setStatusData(null);
      setMessage("Unable to check store status right now.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      throw new Error("Please sign in before submitting a store request.");
    }

    if (!storeInfo.image) {
      throw new Error("Please upload a store logo.");
    }

    setSubmitting(true);

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", storeInfo.image);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });
      const uploadResult = await safeJson(uploadResponse);
      if (!uploadResponse.ok) {
        throw new Error(uploadResult?.error || "Logo upload failed");
      }

      const response = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...storeInfo,
          logo: uploadResult.url,
        }),
      });

      const result = await safeJson(response);
      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit store");
      }

      setStatusData(result.data || result);
      setMessage("Your store request has been submitted and is now pending review.");
      setStoreInfo(initialStoreInfo);
      return result;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      setMessage("Please sign in to submit a store request.");
      return;
    }
    fetchSellerStatus();
  }, [isLoaded, isSignedIn]);

  if (loading || !isLoaded) {
    return <Loading />;
  }

  if (isApproved) {
    return (
      <div className="mx-6 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">Your store is live</p>
          <p className="mt-3 text-slate-500">{message}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/storefront/${statusData?.username}`}
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Go to your store
            </Link>
            <Link
              href="/store"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Open dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-6 min-h-[70vh] my-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl text-slate-900">
            Add Your <span className="font-medium text-slate-800">Store</span>
          </h1>
          <p className="mt-3 max-w-2xl text-slate-500">
            To become a seller on KES HUB, submit your store details for review.
            Your store will be activated after admin verification.
          </p>
          {message ? (
            <div
              className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                isPending
                  ? "bg-yellow-50 text-yellow-800"
                  : isRejected
                    ? "bg-red-50 text-red-700"
                    : "bg-slate-50 text-slate-600"
              }`}
            >
              {message}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(e) =>
            toast.promise(onSubmitHandler(e), {
              loading: "Submitting data...",
              success: "Store submitted successfully.",
              error: (err) => err.message || "Submission failed",
            })
          }
          className="flex flex-col items-start gap-3 text-slate-500"
        >
          <label className="mt-4 cursor-pointer">
            Store Logo
            <Image
              src={previewSrc}
              className="mt-2 h-20 w-auto rounded-lg border border-slate-200 bg-white object-contain p-2"
              alt=""
              width={180}
              height={120}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setStoreInfo({ ...storeInfo, image: e.target.files?.[0] || null })
              }
              hidden
            />
          </label>

          <p>Username</p>
          <input
            name="username"
            onChange={onChangeHandler}
            value={storeInfo.username}
            type="text"
            placeholder="Enter your store username"
            className="w-full max-w-lg rounded border border-slate-300 p-2 outline-slate-400"
          />

          <p>Name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={storeInfo.name}
            type="text"
            placeholder="Enter your store name"
            className="w-full max-w-lg rounded border border-slate-300 p-2 outline-slate-400"
          />

          <p>Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={storeInfo.description}
            rows={5}
            placeholder="Enter your store description"
            className="w-full max-w-lg resize-none rounded border border-slate-300 p-2 outline-slate-400"
          />

          <p>Email</p>
          <input
            name="email"
            onChange={onChangeHandler}
            value={storeInfo.email}
            type="email"
            placeholder="Enter your store email"
            className="w-full max-w-lg rounded border border-slate-300 p-2 outline-slate-400"
          />

          <p>Contact Number</p>
          <input
            name="contact"
            onChange={onChangeHandler}
            value={storeInfo.contact}
            type="text"
            placeholder="Enter your store contact number"
            className="w-full max-w-lg rounded border border-slate-300 p-2 outline-slate-400"
          />

          <p>Address</p>
          <textarea
            name="address"
            onChange={onChangeHandler}
            value={storeInfo.address}
            rows={5}
            placeholder="Enter your store address"
            className="w-full max-w-lg resize-none rounded border border-slate-300 p-2 outline-slate-400"
          />

          <button
            disabled={submitting}
            className="mt-10 mb-40 rounded bg-slate-800 px-12 py-2 text-white transition hover:bg-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
