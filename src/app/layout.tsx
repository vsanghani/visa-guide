import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AusVisa Guide — Australian Migration & Visa Points Calculator",
  description:
    "Your comprehensive guide to Australian skilled migration. Calculate your points for subclass 189, 190, 491 visas. Explore employer-sponsored (482, 186) and temporary-to-permanent pathways.",
  keywords:
    "Australian visa, migration, skilled migration, points calculator, subclass 189, 190, 491, 482, 186, PR Australia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <div className="mesh-gradient" />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
