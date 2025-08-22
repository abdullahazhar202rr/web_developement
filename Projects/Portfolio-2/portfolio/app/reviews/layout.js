import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import NProgressProvider from "../providers/NProgressDone";

export default function ReviewLayout({ children }) {
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
