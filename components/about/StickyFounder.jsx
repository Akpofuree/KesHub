import founder from "@/assets/IMG_2033.png";

export default function StickyFounder() {
  return (
    <section className="relative overflow-hidden bg-slate-100 min-h-[250vh] md:min-h-[180vh] lg:min-h-[180vh]">
      <div className="relative bg-white overflow-hidden min-h-[250vh] md:min-h-[180vh] lg:min-h-[180vh]">
        <div className="absolute inset-0 md:hidden overflow-hidden [clip-path:inset(0)]">
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${founder.src})`,
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-[250vh] flex-col md:min-h-[180vh] md:flex-row">
          <div
            className="hidden md:block md:w-[45%] lg:w-1/2"
            style={{
              backgroundImage: `url(${founder.src})`,
              backgroundAttachment: "fixed",
              backgroundSize: "45% 100vh",
              backgroundPosition: "left top",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="relative w-full md:w-[55%] lg:w-1/2 px-6 py-16 sm:px-8 md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div className="md:sticky md:top-[24vh] lg:top-[30vh]">
              <div className="mx-auto max-w-xl space-y-5 text-center md:mx-0 md:max-w-none md:text-left">
                <p className="uppercase tracking-[0.35em] text-white/80 md:text-slate-600 text-sm">
                  Founder
                </p>

                <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-white md:text-slate-900">
                  Building
                  <br />
                  Something
                  <br />
                  Bigger Than
                  <br />
                  Business
                </h2>

                <div className="mx-auto max-w-lg space-y-4 leading-snug text-white/90 md:mx-0 md:max-w-none md:text-slate-700">
                  <p>
                    KESHUB didn't start in a boardroom - it started with a
                    simple frustration: buying a good phone or laptop in Nigeria
                    meant choosing between paying too much or trusting too
                    little.
                  </p>

                  <p>
                    We set out to fix that. Every product on KESHUB is checked
                    for quality before it's listed, priced fairly from day one,
                    and backed by support that actually answers.
                  </p>

                  <p>
                    This isn't just a store. It's proof that you can build
                    something people trust - one honest transaction at a time.
                  </p>
                </div>

                <div className="pt-2">
                  <h3 className="text-3xl font-semibold text-white md:text-slate-900">
                    Ramedrin
                  </h3>
                  <span className="text-white/70 md:text-slate-500">
                    Founder & CEO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
