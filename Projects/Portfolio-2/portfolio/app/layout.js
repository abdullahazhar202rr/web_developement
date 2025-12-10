import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper"; // client wrapper for ThemeProvider + analytics + nprogress + speedinsights

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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* JSON-LD schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>

      <body className="antialiased">
        {/* This is a client wrapper for your client-side components */}
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
