import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luca Mimmo — Software Developer",
  description: "Junior web developer building clean, performant web applications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-[#080808] text-white antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
