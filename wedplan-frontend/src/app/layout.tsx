import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify'
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "WedPlan",
  description: "Discover and book trusted wedding venues and vendors with WedPlan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
      <Navbar/>
        <main className="flex-1">
          {children}
        </main>
        <ToastContainer autoClose={2000} position="top-right" />
        <Footer/> 
      </body>
    </html>
  );
}
