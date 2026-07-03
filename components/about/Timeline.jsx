const steps = [
  {
    title: "Sourcing",
    text: "Bought direct from trusted brands & authorized distributors.",
  },
  {
    title: "Quality Check",
    text: "Every unit tested and verified before it's listed.",
  },
  {
    title: "Fair Pricing",
    text: "No padded margin. What you see is what you pay.",
  },
  {
    title: "Your Budget",
    text: "We help you fit tech to what you have, not the other way round.",
  },
  {
    title: "Fast Delivery",
    text: "2-4 working days, tracked from dispatch.",
  },
  {
    title: "Real Support",
    text: "A real person, before and after you buy.",
  },
];

export default function Timeline() {
  return (
    <section className="py-24 sm:py-28 lg:py-36 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <div className="receipt-card w-full max-w-[420px] bg-white rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.12)] px-6 py-8 sm:px-8 sm:py-10 border border-slate-200">
          <div className="text-center pb-6 border-b border-dashed border-slate-300">
            <p className="text-3xl font-bold text-slate-950 tracking-[0.25em]">KESHUB</p>
            <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500 font-[family-name:var(--font-jetbrains-mono)]">
              HOW WE WORK - VERIFIED
            </p>
          </div>

          <div className="py-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={index < steps.length - 1 ? "pb-4 border-b border-dashed border-slate-200" : ""}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#1FCB5E] text-white">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-4 flex items-center justify-between font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-slate-950">
            <span>TOTAL TRUST</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}