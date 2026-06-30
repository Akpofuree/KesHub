import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ClerkAppProvider from "@/app/clerk-provider";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import "./globals.css";

export const metadata = {
  title: "KES HUB - Shop smarter",
  description: "KES HUB - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
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
