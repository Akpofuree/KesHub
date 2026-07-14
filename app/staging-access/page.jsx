export default function StagingAccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
            Staging access
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Access restricted</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            This staging environment requires a shared secret before any page or
            API request will load.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            If you are supposed to have access, send the staging access header
            or cookie to this site.
          </p>
        </div>
      </div>
    </main>
  );
}
