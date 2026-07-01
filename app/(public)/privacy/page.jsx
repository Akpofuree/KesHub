import Link from "next/link";

export const metadata = {
    title: "Privacy Policy - KES HUB.",
    description: "Learn how KES HUB collects, uses, and protects your personal data.",
};

const sections = [
    {
        title: "1. Introduction",
        content: "Welcome to KES HUB. We are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. Please read it carefully.",
    },
    {
        title: "2. Information We Collect",
        bullets: [
            "Identity Data: first name, last name, username or similar identifier.",
            "Contact Data: billing address, delivery address, email address, and telephone numbers.",
            "Financial Data: payment card details processed securely via Paystack. We never store your full card number.",
            "Transaction Data: details about payments to and from you, and details of products and services you have purchased from us.",
            "Technical Data: internet protocol (IP) address, browser type and version, and operating system.",
            "Usage Data: information about how you use our website and services.",
        ],
    },
    {
        title: "3. How We Use Your Data",
        content: "We will only use your personal data when the law allows us to. Most commonly, we use it to process and fulfil your orders, manage your account, send you service notifications, improve our platform based on usage patterns, and comply with legal obligations. We will never sell your data to third parties.",
    },
    {
        title: "4. Cookies",
        content: "We use cookies and similar tracking technologies to improve your browsing experience on our platform. Cookies help us remember your preferences, understand how you use our platform, and personalise content. You can set your browser to refuse all or some browser cookies at any time.",
    },
    {
        title: "5. Sharing Your Data",
        content: "We may share your personal data with trusted third-party service providers who assist us in operating our platform, such as payment processors (Paystack), cloud storage providers, and logistics partners. All third parties are required to protect your data and only process it in accordance with our instructions.",
    },
    {
        title: "6. Data Security",
        content: "We have put in place appropriate technical and organisational security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way. We limit access to your personal data to those employees, contractors, and third parties who have a business need to know.",
    },
    {
        title: "7. Data Retention",
        content: "We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. When we no longer need your data, we will securely delete or anonymise it.",
    },
    {
        title: "8. Your Legal Rights",
        content: "Under data protection law, you have rights including the right to access your personal data, to request correction of inaccurate data, to request erasure of your data, and to object to or restrict processing of your data. To exercise any of these rights, please contact us at support@keshub.com.",
    },
    {
        title: "9. Third-Party Links",
        content: "Our platform may include links to third-party websites. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.",
    },
    {
        title: "10. Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.",
    },
    {
        title: "11. Contact Us",
        content: "If you have any questions about this Privacy Policy or our data practices, please contact our team at: support@keshub.com or through our contact page.",
    },
];

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                    Legal
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
                <p className="text-slate-500 text-lg">Last updated: July 2025</p>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                    Your privacy is important to us. This policy explains what data we collect, why we collect it, and how we use it to power your experience on KES HUB.
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
                {sections.map((section, i) => (
                    <div key={i} className="border-b border-slate-100 pb-10 last:border-none">
                        <h2 className="text-xl font-bold text-slate-800 mb-3">{section.title}</h2>
                        {section.content && (
                            <p className="text-slate-500 leading-relaxed">{section.content}</p>
                        )}
                        {section.bullets && (
                            <ul className="mt-3 space-y-2">
                                {section.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-2 text-slate-500 leading-relaxed">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-green-400 flex-shrink-0"></span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                <p>© 2025 KES HUB. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/terms" className="hover:text-green-600 transition-colors">Terms & Conditions</Link>
                    <Link href="/about" className="hover:text-green-600 transition-colors">About Us</Link>
                    <Link href="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
                </div>
            </div>
        </div>
    );
}

