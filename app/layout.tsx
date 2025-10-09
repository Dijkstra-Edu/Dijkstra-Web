import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "../components/providers/SessionProviderWrapper";
import ThemeProviderWrapper from "../components/providers/ThemeProviderWrapper";
import TanstackProviderWrapper from "@/components/providers/TanstackProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dijkstra",
  description: "Platform for Dijkstra Edu.",
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
        <ThemeProviderWrapper>
          <SessionProviderWrapper>
            <TanstackProviderWrapper>
              {children}
            </TanstackProviderWrapper>
          </SessionProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
