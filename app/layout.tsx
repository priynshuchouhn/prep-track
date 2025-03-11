import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { WakeUpServer } from "@/components/ui/wakeup";
import { API_BASE_URL } from "@/lib/utils";
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
  title: "Prep Track - Stay Consistent, Get Placed",
  description: "Track your placement preparation journey, share daily learning updates, and stay accountable with a community of students. Join Prep Track to boost your consistency and land your dream job.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await fetch(`${API_BASE_URL}/wakeup`);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-center" />
        <WakeUpServer/>
        <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
