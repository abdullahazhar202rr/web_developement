'use client'

import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import NProgressDone from "./providers/NProgressDone";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Abdullah Azhar - Portfolio",
  description: "Abdullah Azhar — ML Engineer and Full Stack Developer",
  icons: {
    icon: "/favicon-32x32.ico",
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abdullah Azhar",
    "url": "https://abdullahazhar202rr.vercel.app/",
    "image": "https://avatars.githubusercontent.com/u/180684670?v=4",
    "sameAs": [
      "https://www.linkedin.com/in/abdullahazhar202",
      "https://github.com/abdullahazhar202rr"
    ],
    "jobTitle": "ML Engineer and Full Stack Developer",
    "description": "Bachelor’s in Artificial Intelligence student at The University of Faisalabad. Skilled in Python for AI applications, C++, HTML, CSS, API integration, and web development.",
    "alumniOf": "The University of Faisalabad"
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        {/* JSON-LD schema added via Next.js Script (safe) */}
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NProgressDone />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
