import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";



import "./globals.css";
import { NavbarUser } from "@/components/shared/navbar/navbar.types";
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

/*
 * Temporary mock user.
 * Better Auth যুক্ত করার পরে এটি remove করা হবে।
 */
const mockUser: NavbarUser | null = {
  name: "Ayesha Rahman",
  email: "ayesha@example.com",
  role: "property-holder",
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <AppNavbar user={mockUser} />

        <main className="flex-1">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}