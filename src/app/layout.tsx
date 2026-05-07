import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpendCheck | Stop Overpaying for AI Tools",
  description: "Get a free 60-second audit of your AI subscriptions. Discover how to save up to 40% on Cursor, Copilot, ChatGPT, and API costs.",
  keywords: ["AI Spend", "Cost Optimization", "Cursor", "GitHub Copilot", "SaaS Audit"],
  authors: [{ name: "Credex" }],
  openGraph: {
    title: "SpendCheck | AI Spend Audit",
    description: "Discover hidden savings in your AI tool stack.",
    url: "https://spendcheck.ai", // Replace with real URL later
    siteName: "SpendCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendCheck | AI Spend Audit",
    description: "Discover hidden savings in your AI tool stack.",
    images: ["/og-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
