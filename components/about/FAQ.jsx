const faqs = [
  {
    question: "How quickly will my order arrive?",
    answer:
      "Most orders within Nigeria are delivered in 2–4 business days. We work with trusted logistics partners for fast, reliable delivery across major cities and regions.",
  },
  {
    question: "Can I trust the products on KES HUB?",
    answer:
      "Yes. We only list products from verified suppliers and perform quality checks before they reach our catalogue. Every item is described clearly so you know what to expect.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "You can pay with cards, mobile wallets, bank transfers and other local payment options. All payments are processed securely.",
  },
  {
    question: "What is your return policy?",
    answer:
      "If the product is damaged or does not match the description, we offer returns and support through our customer care team within the first 7 days.",
  },
];

export default function FAQ() {
  return (
    <section className="py-36 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            FAQ
          </p>

          <h2 className="text-5xl font-semibold mt-6 text-slate-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-md shadow-slate-200/50"
            >
              <h3 className="text-2xl font-semibold mb-4 text-slate-950">
                {faq.question}
              </h3>

              <p className="text-slate-700 leading-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
