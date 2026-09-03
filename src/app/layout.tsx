import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Fi | 0% Interest EMI backed by Mutual Funds",
  description: "Borrow against digital assets like mutual funds and shares for inclusive, flexible, and low-cost credit access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 selection:bg-[#6B21A8] selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-500 text-sm mt-auto">
          <p>© {new Date().getFullYear()} 1Fi. Building the world's first 0% interest EMI platform.</p>
        </footer>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
