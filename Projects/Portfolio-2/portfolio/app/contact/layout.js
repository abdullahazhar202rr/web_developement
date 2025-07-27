import { Toaster } from "react-hot-toast";
import NProgressProvider from "../providers/NProgressDone";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

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
