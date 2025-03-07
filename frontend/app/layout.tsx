import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from "@/context/WalletContext";
import "./globals.css";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ETN Task AI",
  description: "A marketplace for AI services powered by Electroneum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}