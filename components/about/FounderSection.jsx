"use client";
import { useEffect, useRef } from "react";

export default function FounderSection() {
  const wrapRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;

    if (!wrap || !topPanel || !bottomPanel) return;

    const updateCurtain = () => {
      const rect = wrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      topPanel.style.transform = `translateY(${-progress * 100}%)`;
      bottomPanel.style.transform = `translateY(${progress * 100}%)`;
    };

    updateCurtain();
    window.addEventListener("scroll", updateCurtain, { passive: true });
    window.addEventListener("resize", updateCurtain);

    return () => {
      window.removeEventListener("scroll", updateCurtain);
      window.removeEventListener("resize", updateCurtain);
    };
  }, []);

  return (
    <section className="w-full py-24 mb-16">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase self-center lg:self-start">
            Meet The Founder
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-8 tracking-tight">
            Building the future of e-commerce.
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-6 font-light">
            Our journey began with a frustration that many share: finding
            reliable gadgets online was a hit-or-miss experience. I set out to
            create a platform that prioritizes quality, trust, and community
            above all else.
          </p>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-10 font-light">
            Today, KES HUB is more than just a marketplace. It's a community of
            tech lovers, verified sellers, and innovators. We are dedicated to
            bringing you the best tools to shape your tomorrow.
          </p>
          <div className="font-semibold italic text-slate-800 text-3xl">
            Ramedrin
          </div>
        </div>

        <div
          ref={wrapRef}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
        >
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80"
            alt="Founder"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            ref={topPanelRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-white z-10 will-change-transform"
          />
          <div
            ref={bottomPanelRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-white z-10 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
