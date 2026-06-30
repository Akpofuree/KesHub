'use client';

export function TextSkeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-full bg-slate-200 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="group max-xl:mx-auto animate-pulse">
      <div className="bg-slate-200 h-40 sm:w-60 sm:h-68 rounded-lg" />
      <div className="flex justify-between gap-3 pt-2 max-w-60">
        <div className="space-y-2 flex-1">
          <TextSkeleton className="h-4 w-4/5" />
          <div className="flex gap-1">
            <TextSkeleton className="h-3 w-3" />
            <TextSkeleton className="h-3 w-3" />
            <TextSkeleton className="h-3 w-3" />
            <TextSkeleton className="h-3 w-3" />
            <TextSkeleton className="h-3 w-3" />
          </div>
        </div>
        <TextSkeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <TextSkeleton className="h-4 w-28" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <TextSkeleton key={index} className="h-3 w-full" />
        ))}
      </div>
    </div>
  );
}
