'use client'
import dynamic from "next/dynamic";
import HeroSection from "@/components/UI/HeroSection";
import Navbar from "@/components/UI/Navbar";

// Below-the-fold sections are code-split so the initial bundle stays lean
const AboutSection = dynamic(() => import("@/components/UI/AboutSection"));
const ProjectsSection = dynamic(() => import("@/components/UI/ProjectsSection"));
const Footer = dynamic(() => import("@/components/UI/Footer"));

export default function Page() {
  return (
    <>
      <div className="relative w-full h-full overflow-hidden">

        <header>
          <Navbar />
        </header>

        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
