import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "./providers";

// Example of how to add a custom font (from Google Fonts)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// TODO: Set metadata here
export const metadata: Metadata = {
  title: "Title",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
