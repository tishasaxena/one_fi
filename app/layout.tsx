import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "1Fi — Shop today, pay later using mutual funds",
  description:
    "1Fi Marketplace: browse phones, laptops and more, and pay in no-cost EMIs backed by your mutual funds.",
  applicationName: "1Fi",
};

export const viewport: Viewport = {
  themeColor: "#712CDC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
