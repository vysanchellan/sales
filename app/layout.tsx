import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Editorial pairing: Fraunces (high-contrast serif with optical sizing) for
// display, Inter for UI text. Loaded as CSS variables so globals.css owns the
// font stacks.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/animations/CursorGlow";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export const metadata: Metadata = {
  title: "Virelle — Architecturally Significant Homes",
  description:
    "A private brokerage for architecturally significant homes across Europe. Discretion, pace, and an eye for the enduring.",
  keywords: ["luxury real estate", "estates", "penthouses", "villas", "Virelle"],
  openGraph: {
    title: "Virelle — Architecturally Significant Homes",
    description: "A private brokerage for the enduring.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`grain ${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved theme before paint to avoid a flash of the wrong one */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light');}catch(e){}})();",
          }}
        />
      </head>
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
