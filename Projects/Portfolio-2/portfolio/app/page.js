'use client'
import HeroSection from "@/components/UI/HeroSection";
import AboutSection from "@/components/UI/AboutSection";
import ProjectsSection from "@/components/UI/ProjectsSection";
import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";

export default function Page() {
  return (
    <>
      {/* Schema Markup for Google (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Abdullah Azhar",
            "url": "https://abdullahazhar202rr.vercel.app/",
            "image": "https://avatars.githubusercontent.com/u/180684670?v=4",
            "sameAs": [
              "https://www.linkedin.com/in/abdullahazhar202",
              "https://github.com/abdullahazhar202rr"
            ],
            "jobTitle": "Aspiring AI Engineer | Programming Enthusiast | Problem Solver | Full Stack Developer",
            "description": "Bachelor’s in Artificial Intelligence student at The University of Faisalabad. Skilled in Python for AI applications, C++, HTML, CSS, API integration, and web development.",
            "alumniOf": "The University of Faisalabad"
          }),
        }}
      />

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
