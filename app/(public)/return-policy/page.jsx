export const metadata = {
  title: "Return Policy - KES HUB",
  description: "Return and Refund Policy for KES HUB",
};

export default function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">RETURN POLICY</h1>
        <p className="text-slate-500 font-medium">Last updated July 15, 2026</p>
      </div>

      <div className="space-y-12 text-slate-700 leading-relaxed text-lg">
        <section>
          <p>
            Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund or an exchange. Please see below for more information on our return policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">RETURNS</h2>
          <p>
            All returns must be postmarked within seven (7) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">RETURN PROCESS</h2>
          <p className="mb-6">
            To return an item, please email customer service at{" "}
            <a href="mailto:contactkeshub@gmail.com" className="text-emerald-600 hover:underline font-medium">
              contactkeshub@gmail.com
            </a>{" "}
            to obtain a Return Merchandise Authorisation (RMA) number. After receiving an RMA number, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:
          </p>
          <div className="bg-slate-50 p-8 rounded-2xl font-medium border border-slate-100 mb-6">
            <p>KES HUB</p>
            <p>Attn: Returns</p>
            <p>RMA #</p>
            <p>Emab Plaza, Wuse 2</p>
            <p>Abuja/Kubwa, Abuja/FCT 900101</p>
            <p>Nigeria</p>
          </div>
          <p>
            Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">REFUNDS</h2>
          <p>
            After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least five (5) days from the receipt of your item to process your return or exchange. We will notify you by email when your return has been processed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">EXCEPTIONS</h2>
          <p className="mb-4">
            The following items cannot be returned or exchanged:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Opened earphones/earbuds and other hygiene-related accessories.</li>
            <li>Screen protectors once applied.</li>
            <li>SIM cards, gift cards, and digital products.</li>
            <li>Clearance/final-sale items.</li>
            <li>Products damaged by customer misuse or unauthorized repairs.</li>
            <li>Products returned without original packaging, accessories, or proof of purchase.</li>
          </ul>
          <p>
            For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">QUESTIONS</h2>
          <p className="mb-4">
            If you have any questions concerning our return policy, please contact us at:
          </p>
          <ul className="space-y-2">
            <li>Phone: <span className="font-medium">08136984770</span></li>
            <li>Email: <a href="mailto:contactkeshub@gmail.com" className="text-emerald-600 hover:underline font-medium">contactkeshub@gmail.com</a></li>
          </ul>
        </section>
      </div>

    </div>
  );
}
