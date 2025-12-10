"use client";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import NProgressDone from "./NProgressDone";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NProgressDone />
      {children}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
