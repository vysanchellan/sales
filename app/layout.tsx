import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

// Bodoni Moda: a true Didone. Vertical stress, hairline thins, rational
// construction — the letterform equivalent of a measured drawing. The optical
// size axis is what makes it work at both 96px and 15px.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  axes: ["opsz"],
  display: "swap",
});

// One clean UI face, carrying labels, body and every numeral in the schedule.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Virelle — Architecturally Significant Homes",
  description:
    "A private brokerage representing architecturally significant estates, penthouses and land across Europe.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light');}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bronze focus:px-4 focus:py-2 focus:text-on-bronze"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
