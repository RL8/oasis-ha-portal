import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Oasis Housing Association - Your Future Lifestyle Community",
  description: "The Oasis Housing Association is dedicated to acquiring affordable, high-quality land to develop a legally secure, integrated community with residential, commercial, and agricultural facilities in Zimbabwe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased text-gray-800`}
        style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f7f9fb' }}
      >
        {children}
      </body>
    </html>
  );
}
