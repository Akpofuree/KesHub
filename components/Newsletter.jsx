import React from "react";
import Title from "./Title";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-4 my-36">
      <Title
        title="Never miss a drop."
        description="Get first access to new arrivals, price drops, and gadget guides — straight to your inbox, no spam."
        visibleButton={false}
      />
      <div className="flex flex-col sm:flex-row bg-white text-sm p-1 rounded-full w-full max-w-xl my-10 border border-slate-200 shadow-sm">
        <input
          className="flex-1 pl-5 outline-none bg-transparent text-slate-700 placeholder:text-slate-400 min-w-0"
          type="text"
          placeholder="Enter your email address"
        />
        <button className="mt-3 sm:mt-0 sm:ml-2 w-full sm:w-auto font-semibold bg-emerald-600 text-white px-7 py-3 rounded-full hover:bg-emerald-700 transition">
          Get updates
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
