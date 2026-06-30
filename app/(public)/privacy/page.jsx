export const metadata = {
    title: "Privacy Policy - KES HUB.",
    description: "Privacy Policy for KES HUB.",
};

export default function PrivacyPage() {
    return (
        <div className="mx-6">
            <div className="max-w-3xl mx-auto py-16 text-slate-600">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Privacy Policy</h1>

                <div className="space-y-6">
                    <p>Last updated: October 2025</p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">1. Introduction</h2>
                    <p>Welcome to KES HUB. We respect your privacy and are committed to protecting your personal data.</p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">2. The data we collect about you</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you.</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Financial Data</strong> includes payment card details processed securely via Paystack.</li>
                        <li><strong>Transaction Data</strong> includes details about payments and products you have purchased from us.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">3. How we use your personal data</h2>
                    <p>We will only use your personal data when the law allows us to.</p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">4. Data security</h2>
                    <p>We have put in place appropriate security measures to prevent your personal data from being lost, used or accessed in an unauthorised way.</p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">5. Contact Details</h2>
                    <p>If you have any questions about this privacy policy, please contact us at:</p>
                    <p className="mt-2 font-medium">Email: contact@keshub.com</p>
                </div>
            </div>
        </div>
    );
}
