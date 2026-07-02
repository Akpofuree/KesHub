"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const founderImage =
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=80";

export default function FounderSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Pin the section (window effect) - content stays fixed
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      });

      // Binoculars effect - content blurs into focus when entering viewport
      gsap.fromTo(
        content,
        {
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.95,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Normal Image Element */}
      <img
        src={founderImage}
        alt="Founder"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />

      {/* Content - Fixed while section above scrolls over it */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-xl rounded-[2rem] p-8 text-center lg:p-10 lg:text-left bg-white/90 backdrop-blur-sm shadow-xl">
              <span className="mb-6 inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#7c3f13]">
                The Founder
              </span>
              <h2 className="mb-7 text-4xl font-bold leading-tight tracking-tight text-[#6b3510] sm:text-5xl">
                Building a better shopping experience for modern buyers.
              </h2>
              <p className="mb-6 text-lg font-light leading-relaxed text-[#7a4a22] sm:text-xl">
                Our journey began with a simple belief: online shopping should
                feel trustworthy, inspiring, and genuinely human. That idea
                shaped every step of what we are building today.
              </p>
              <p className="mb-8 text-lg font-light leading-relaxed text-[#7a4a22] sm:text-xl">
                From curated picks to dependable service, we are creating a
                space where quality, transparency, and community come first.
              </p>
              <div className="flex items-center justify-center gap-4 pt-2 lg:justify-start">
                <div className="h-px w-12 bg-[#c99263]" />
                <div className="text-3xl font-semibold italic text-[#6b3510]">
                  Ramedrin
                </div>
              </div>
            </div>

            {/* Empty space for the image to show through */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
