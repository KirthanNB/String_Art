import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingContactButton from "@/components/FloatingContactButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Versatile String Art - Custom String Art Creations",
  description: "Transform your memories into stunning string art. Custom face portraits, and personalized string art creations delivered to your door.",
  keywords: "string art, custom string art, face portraits, geometric art, personalized gifts, handmade art",
  authors: [{ name: "Versatile String Art" }],
  openGraph: {
    title: "Versatile String Art - Custom String Art Creations",
    description: "Transform your memories into stunning string art",
    type: "website",
  },
};

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <FloatingContactButton />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
