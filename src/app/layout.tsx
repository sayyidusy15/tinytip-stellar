import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TinyTip — Small tips. Real impact.",
  description:
    "A micro-support platform built on Stellar. Support creators, open-source developers, artists, and public goods with micro-payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
