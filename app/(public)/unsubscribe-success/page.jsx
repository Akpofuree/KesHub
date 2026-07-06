import Link from "next/link";
import { CheckCircle, XCircle, Info } from "lucide-react";

export const metadata = {
  title: "Unsubscribe | KESHUB",
};

export default async function UnsubscribeSuccessPage({ searchParams }) {
  const { status, error } = await searchParams;

  let content = {
    icon: <Info className="w-16 h-16 text-blue-500 mb-6" />,
    title: "Processing Request",
    message: "We are processing your unsubscribe request.",
  };

  if (status === "success") {
    content = {
      icon: <CheckCircle className="w-16 h-16 text-emerald-500 mb-6" />,
      title: "Successfully Unsubscribed",
      message:
        "You have been successfully removed from the KESHUB weekly newsletter. We're sorry to see you go!",
    };
  } else if (status === "already_unsubscribed") {
    content = {
      icon: <Info className="w-16 h-16 text-blue-500 mb-6" />,
      title: "Already Unsubscribed",
      message: "Your email address is already unsubscribed from our newsletter.",
    };
  } else if (error) {
    let errorMessage = "There was an error processing your request. Please try again.";
    if (error === "missing_token") errorMessage = "Missing unsubscribe token.";
    if (error === "invalid_token") errorMessage = "Invalid unsubscribe token.";

    content = {
      icon: <XCircle className="w-16 h-16 text-red-500 mb-6" />,
      title: "Unsubscribe Failed",
      message: errorMessage,
    };
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center">
        {content.icon}
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          {content.title}
        </h1>
        <p className="text-slate-500 mb-8">{content.message}</p>
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-full transition-colors w-full"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
