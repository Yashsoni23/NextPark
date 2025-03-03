import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Navbar";
import { AuthContextProvider } from "./context/firebase";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextPark",
  description:
    "Welcome to NextPark – Your Smart Parking Solution! Finding a parking spot has never been easier! NextPark helps you locate, book, and manage parking spaces hassle-free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <HeroUIProvider>
            <ToastProvider placement="top-center" toastOffset={10} />

            <Nav />
            {children}
          </HeroUIProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
