import founder from "@/assets/IMG_2033.png";

export default function StickyFounder() {
  return (
    <section className="relative min-h-[180vh] bg-slate-100 overflow-hidden">
      <div className="relative min-h-[180vh] bg-white overflow-hidden flex">
        <div
          className="image-window hidden lg:block w-1/2"
          style={{
            backgroundImage: `url(${founder.src})`,
            backgroundAttachment: "fixed",
            backgroundSize: "50% 100vh",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="text-side w-full lg:w-1/2 px-8 py-28 lg:px-16 lg:py-32">
          <div className="text-content sticky top-[30vh] space-y-8">
            <p className="uppercase tracking-[0.35em] text-slate-600 text-sm">
              Founder
            </p>

            <h2 className="text-5xl font-semibold leading-tight text-slate-900">
              Building
              <br />
              Something
              <br />
              Bigger Than
              <br />
              Business
            </h2>

            <div className="space-y-6 text-slate-700 leading-8">
              <p>
                KESHUB didn't start in a boardroom — it started with a simple
                frustration: buying a good phone or laptop in Nigeria meant
                choosing between paying too much or trusting too little.
              </p>

              <p>
                We set out to fix that. Every product on KESHUB is checked for
                quality before it's listed, priced fairly from day one, and
                backed by support that actually answers.
              </p>

              <p>
                This isn't just a store. It's proof that you can build something
                people trust — one honest transaction at a time.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-slate-900">
                Ramedrin
              </h3>
              <span className="text-slate-500">Founder & CEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
