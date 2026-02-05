import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Providers from "@/shared/components/Provider";
import { Toaster } from "sonner";
import Navbar from "@/shared/components/navbar/Navbar";
import Footer from "@/shared/components/footer/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Blog App Challenge",
  description: "Blog Application Challenge - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={inter.variable}
      >
        <Providers>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}