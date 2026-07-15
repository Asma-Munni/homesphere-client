import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";



import "./globals.css";

import { AppNavbar } from "@/components/shared/navbar/page";
import { AppFooter } from "@/components/shared/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HomeSphere",
    template: "%s | HomeSphere",
  },
  description:
    "Find, rent and manage properties with HomeSphere.",
};

interface RootLayoutProps {
  children: ReactNode;
}


export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        
        <AppNavbar />

        <main className="flex-1">{children}</main>
        <AppFooter />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}