import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mineers Smile Center - Inventory Management",
  description: "Inventory management system for Mineers Smile Center",
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
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
          <nav className="bg-gradient-to-r from-teal-600 to-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-white">
                      🦷 Mineers Smile Center
                    </h1>
                  </div>
                  <div className="ml-6 flex space-x-8">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/inventory"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Inventory
                    </Link>
                    <Link
                      href="/categories"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/brands"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Brands
                    </Link>
                    <Link
                      href="/suppliers"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Suppliers
                    </Link>
                    <Link
                      href="/storage-locations"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-teal-200 border-b-2 border-transparent hover:border-teal-200 transition-all"
                    >
                      Storage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
