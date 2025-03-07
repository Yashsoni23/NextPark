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
    <html
      lang="en"
      className=" bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-100 via-slate-300/60 to-slate-300/60"
    >
      <body className={`${inter.className} `}>
        <AuthContextProvider>
          <HeroUIProvider>
            <ToastProvider placement="top-left" toastOffset={10} />

            <Nav />
            {children}
          </HeroUIProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
