
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import NProgressDone from "./providers/NProgressDone";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

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
  return (
    <html lang="en" >
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NProgressDone/>
          {children}
          <Analytics />
          <SpeedInsights />

        </ThemeProvider>
      </body>
    </html>
  );
}
