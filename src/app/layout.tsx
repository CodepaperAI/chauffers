import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { StickyHeader } from "@/components/sticky-header";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Docklands 1998 | Melbourne chauffeur service",
  description:
    "Premium Melbourne chauffeur service for airport transfers, weddings, corporate rides, concerts, family tours, winery days and Australia-wide arrangements.",
  keywords: [
    "Docklands 1998",
    "Melbourne chauffeur",
    "airport transfers Melbourne",
    "wedding chauffeur Melbourne",
    "Yarra Valley winery tour chauffeur",
    "Puffing Billy chauffeur",
    "Great Ocean Road chauffeur",
    "Mount Hotham transfers",
    "Mornington Peninsula spa chauffeur",
    "corporate chauffeur Australia",
  ],
  openGraph: {
    title: "Docklands 1998 | Melbourne chauffeur service",
    description:
      "Private chauffeur service from Melbourne Docklands for airport transfers, weddings, tours and business travel.",
    type: "website",
    locale: "en_AU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionController />
        <StickyHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
