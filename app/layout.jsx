import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ClerkAppProvider from "@/app/clerk-provider";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import "./globals.css";

const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";

export const metadata = {
  title: "KES HUB - Shop smarter",
  description: "KES HUB - Shop smarter",
  ...(isStaging
    ? {
        robots: {
          index: false,
          follow: false,
        },
      }
    : {}),
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ClerkAppProvider>
          <StoreProvider>
            <Toaster />
            {children}
            <WhatsAppFloating />
          </StoreProvider>
        </ClerkAppProvider>
      </body>
    </html>
  );
}
