import { Toaster } from "react-hot-toast";
import NProgressProvider from "../providers/NProgressDone";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Abdullah Azhar — AI Engineer & Full Stack Developer. Discuss ML, computer vision, LLM or web projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <div>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

                  <NProgressProvider />
        {children}
         </ThemeProvider>
        <Toaster position="top-right" toastOptions={{ style: { zIndex: 99999 } }} />
      </div>
    </>
  );
}
