import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingContactButton from "@/components/FloatingContactButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to Cloudinary CDN for faster resource loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased">
        {children}
        <FloatingContactButton />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
