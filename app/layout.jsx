import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ClerkAppProvider from "@/app/clerk-provider";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import AOSInit from "@/components/AOSInit";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";

const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";

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
    <html lang="en" className={`${poppins.variable} ${jetBrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="antialiased font-sans">
        <AOSInit />
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
