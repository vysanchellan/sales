import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/animations/CursorGlow";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export const metadata: Metadata = {
  title: "Kassora — Architecturally Significant Homes",
  description:
    "A private brokerage for architecturally significant homes across Europe. Discretion, pace, and an eye for the enduring.",
  keywords: ["luxury real estate", "estates", "penthouses", "villas", "Kassora"],
  openGraph: {
    title: "Kassora — Architecturally Significant Homes",
    description: "A private brokerage for the enduring.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="grain">
      <body>
        <MotionProvider>
          <SmoothScrollProvider>
            <ScrollProgress />
            <CursorGlow />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
