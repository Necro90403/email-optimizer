import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubjectLine.ai — AI Email Subject Line Optimizer",
  description:
    "Get 10 AI-optimized email subject lines in seconds. 3x your open rates with data-backed alternatives ranked by predicted performance.",
  openGraph: {
    title: "SubjectLine.ai — 10 AI-Optimized Subject Lines in Seconds",
    description: "Stop guessing. Get data-backed subject line alternatives ranked by predicted open rate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
