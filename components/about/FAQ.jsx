"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Which payment methods do you accept?",
    answer:
      "You can pay with cards, mobile wallets, bank transfers and other local payment options. All payments are processed securely.",
  },
  {
    question: "Can I trust products on KESHUB?",
    answer:
      "Yes. Every product comes from an authorized distributor and is tested before it's listed - not dropshipped or resold sight-unseen.",
  },
  {
    question: "What if I get a faulty or wrong item?",
    answer:
      "Report it within 7 days and we'll replace or refund it - no back-and-forth required.",
  },
  {
    question: "Do phones and laptops come with a warranty?",
    answer:
      "Yes, every product carries the manufacturer's standard warranty, and we'll help you claim it if something goes wrong.",
  },
  {
    question: "Can I buy on a budget and still get something good?",
    answer:
      "Yes - tell our support team your budget and what you need it for, and they'll point you to the best fit, not just the most expensive option.",
  },
  {
    question: "Do you deliver outside Lagos/Abuja?",
    answer:
      "Yes, we currently deliver to 36 states through trusted logistics partners.",
  },
  {
    question: "How do I know if something's in stock?",
    answer:
      "If it's listed on the site, it's in stock. We take items down the moment they sell out.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <p className="uppercase tracking-[0.4em] text-emerald-600 text-sm font-semibold">
            FAQ
          </p>

          <h2 className="text-4xl sm:text-5xl font-semibold mt-2 text-slate-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 sm:p-8 shadow-md shadow-slate-200/50"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={index * 50}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <h3 className="text-lg sm:text-2xl font-semibold text-slate-950">
                  {faq.question}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-2xl leading-none">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 text-slate-700 leading-snug">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
