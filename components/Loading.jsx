'use client';

import { CardSkeleton } from "@/components/Skeletons";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e8fff2_0%,_#f8fafc_40%,_#eef2ff_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 w-28 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-64 rounded-full bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 w-28 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton lines={2} />
          <CardSkeleton lines={2} />
          <CardSkeleton lines={2} />
          <CardSkeleton lines={2} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
