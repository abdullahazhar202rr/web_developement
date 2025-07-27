'use client'

import HeroSection from "@/components/UI/HeroSection";
import AboutSection from "@/components/UI/AboutSection";
import ProjectsSection from "@/components/UI/ProjectsSection";
import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";

export default function Page() {
  return (
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
  );
}
