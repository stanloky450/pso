import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/ThemeContext";
import MeetPSOButton from "@/components/ui/MeetPSOButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Pastor Sola Olukoya - Raising Disciples, Transforming Lives",
  description: "Official website of Pastor Sola Olukoya - Special Adviser to the General Overseer on Youth Affairs (SATGO), Author, and Ministry Leader",
  keywords: ["Pastor Sola Olukoya", "RCCG", "SATGO", "Youth Ministry", "Christian Ministry"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <MeetPSOButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
