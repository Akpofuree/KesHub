"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Title from "./Title";
import AnimatedSubmitButton from "./ui/AnimatedSubmitButton";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "You're subscribed! 🎉");
        setEmail("");
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        toast.error(data.error || "Failed to subscribe.");
        setStatus("idle");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setStatus("idle");
    }
  };

  return (
    <div className="flex flex-col items-center mx-4 my-36 px-2 sm:px-0">
      <Title
        title="Never miss a drop."
        description="Get first access to new arrivals, price drops, and gadget guides — straight to your inbox, no spam."
        visibleButton={false}
      />
      <form
        onSubmit={subscribe}
        className="flex flex-col sm:flex-row bg-white text-sm p-2 sm:p-1 rounded-[28px] sm:rounded-full w-full max-w-xl my-10 border border-slate-200 shadow-sm"
      >
        <input
          className="flex-1 px-5 py-3 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 min-w-0 rounded-full"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={status !== "idle"}
        />
        <AnimatedSubmitButton
          status={status}
          idleText="Get updates"
          loadingText="Subscribing..."
          successText="Subscribed!"
          className="mt-3 sm:mt-0 sm:ml-2 w-full sm:w-auto font-semibold bg-emerald-600 text-white px-7 py-3 rounded-full hover:bg-emerald-700 disabled:opacity-70"
        />
      </form>
    </div>
  );
};

export default Newsletter;
