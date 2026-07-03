import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ClerkAppProvider from "@/app/clerk-provider";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "KES HUB - Shop smarter",
  description: "KES HUB - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased font-sans">
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
