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
  metadataBase: new URL("https://abdullahazhar202rr.vercel.app"),
  title: {
    default: "Abdullah Azhar — AI Engineer & Full Stack Developer",
    template: "%s | Abdullah Azhar",
  },
  description:
    "Portfolio of Abdullah Azhar — AI Engineer specializing in machine learning, computer vision (YOLO), fine-tuned LLMs and full-stack development with Next.js. BSAI at The University of Faisalabad.",
  keywords: [
    "Abdullah Azhar",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Computer Vision",
    "YOLO",
    "LLM fine-tuning",
    "Next.js developer",
    "Python",
    "TensorFlow",
    "Faisalabad",
    "Pakistan",
  ],
  authors: [{ name: "Abdullah Azhar", url: "https://github.com/abdullahazhar202rr" }],
  creator: "Abdullah Azhar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://abdullahazhar202rr.vercel.app",
    siteName: "Abdullah Azhar — Portfolio",
    title: "Abdullah Azhar — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer building ML systems, computer-vision pipelines, fine-tuned LLMs and full-stack apps.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Azhar — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer building ML systems, computer-vision pipelines, fine-tuned LLMs and full-stack apps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ODktWk6NEYT8DeozNsW8pf5K60av2jvXEBOYFmMsaAk",
  },
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
    "jobTitle": "AI Engineer and Full Stack Developer",
    "description":
      "AI Engineer specializing in machine learning, computer vision (YOLO), LLM fine-tuning and full-stack development. BS Artificial Intelligence student at The University of Faisalabad.",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "The University of Faisalabad",
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Oz Armour Australia",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Faisalabad",
      "addressRegion": "Punjab",
      "addressCountry": "PK",
    },
    "email": "mailto:abdullahazhar202rr@gmail.com",
    "knowsAbout": [
      "Machine Learning",
      "Computer Vision",
      "YOLO object detection",
      "LLM fine-tuning",
      "Retrieval-Augmented Generation",
      "TensorFlow",
      "PyTorch",
      "Python",
      "Next.js",
      "React",
      "MongoDB",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>

      <body className="antialiased">
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}
