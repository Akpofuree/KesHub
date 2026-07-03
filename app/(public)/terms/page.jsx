import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions - KES HUB",
  description:
    "Read the Terms and Conditions governing the use of KES HUB Gadgets Marketplace.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using the KES HUB platform, you agree to be bound by these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using the platform.",
  },
  {
    title: "2. Use of the Platform",
    content:
      "KES HUB is a marketplace connecting buyers with verified gadget sellers. You agree to use the platform only for lawful purposes and in a manner that does not infringe the rights of others. You must not misuse the platform by knowingly introducing viruses or any malicious material.",
  },
  {
    title: "3. Account Registration",
    content:
      "To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account.",
  },
  {
    title: "4. Seller Obligations",
    content:
      "Sellers must provide accurate product descriptions, pricing, and availability information. Sellers are responsible for fulfilling orders promptly and handling returns in accordance with our return policy. KES HUB reserves the right to suspend or remove sellers who violate platform standards.",
  },
  {
    title: "5. Buyer Obligations",
    content:
      "Buyers agree to provide accurate delivery information and to make prompt payment for orders placed. By placing an order, you enter into a binding agreement with the seller. Any disputes should first be raised with the seller before escalating to KES HUB support.",
  },
  {
    title: "6. Payments",
    content:
      "All transactions on KES HUB are processed securely via Paystack. We do not store card details. Prices displayed are inclusive of applicable taxes unless stated otherwise. KES HUB is not responsible for currency conversion fees charged by your bank.",
  },
  {
    title: "7. Returns & Refunds",
    content:
      "Our standard return window is 7 days from the date of delivery. Items must be unused, in original packaging, and accompanied by proof of purchase. Refunds are processed within 5-10 business days once the returned item is received and inspected.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content on KES HUB, including logos, text, images, and software, is the property of KES HUB or its content suppliers. You may not reproduce, distribute, or create derivative works without express written permission.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "KES HUB is a marketplace and is not the seller of record for listed products. We are not liable for product quality, fitness for purpose, or any losses arising from transactions between buyers and sellers beyond what is covered by our buyer protection policy.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the platform. Continued use of KES HUB after changes constitutes acceptance of the updated Terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have questions about these Terms, please contact us at support@keshub.com or via our contact page.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mb-12 rounded-[2rem] border border-white/70 bg-white p-8 shadow-sm sm:p-12">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Legal
          </span>
          <h1 className="mt-5 text-4xl font-bold text-slate-900 sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-slate-500">Last updated: July 2025</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-600">
            Please read these Terms and Conditions carefully before using the
            KES HUB platform.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-3 text-xl font-bold text-slate-900">
                {section.title}
              </h2>
              <p className="leading-relaxed text-slate-600">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>(c) 2025 KES HUB. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="transition-colors hover:text-emerald-600">
              Privacy Policy
            </Link>
            <Link href="/about" className="transition-colors hover:text-emerald-600">
              About Us
            </Link>
            <Link href="/contact" className="transition-colors hover:text-emerald-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
