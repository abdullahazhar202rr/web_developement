"use client";
import React from "react";
import ChromaGrid from "../ChromaGridProjects";

export default function ProjectsSection() {
  const beginnerItems = [
    {
      image: "/guessgame.webp",
      title: "Voice Guess Game",
      subtitle: "Voice activated CLI Game in Python",
      handle: "Python",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/abdullahazhar202rr/python/blob/main/voice_Guess_game.py",
    },
    {
      image: "/pdftowork.webp",
      title: "PDF to Word",
      subtitle: "File Converter",
      handle: "Streamlit",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(145deg, #06B6D4, #000)",
      url: "https://pdftowordpy.streamlit.app/",
    },
        {
      image: "/guessgame.webp",
      title: "Weather APP",
      subtitle: "Weather Forecast",
      handle: "Python",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(145deg, #06B6D4, #000)",
      url: "https://github.com/abdullahazhar202rr/python/blob/main/weatherapp.py",
    },
  ];

  const intermediateItems = [
    {
      image: "/servicemate.webp",
      title: "Service Mate",
      subtitle: "Modern UI Redesign",
      handle: "React",
      borderColor: "#7C3AED",
      gradient: "linear-gradient(145deg, #7C3AED, #000)",
      url: "https://servicemate-abdullahazhar202rr.netlify.app/",
    },
    {
      image: "/goassignment.webp",
      title: "Assignement orders taking",
      subtitle: "Copy of GoAssignment site",
      handle: "scrapping and changing to learn scrapping",
      borderColor: "#10B981",
      gradient: "linear-gradient(145deg, #10B981, #000)",
      url: "https://goassignmentskilltestclone.netlify.app/",
    },
    {
      image: "/poshzem.webp",
      title: "Poshzem E-commerce",
      subtitle: "Modern UI design",
      handle: "React",
      borderColor: "#7C3AED",
      gradient: "linear-gradient(145deg, #7C3AED, #000)",
      url: "https://poshzem-abdullahazhar202rr.netlify.app/",
    },
    {
      image: "/LMS.webp",
      title: "Library Management System",
      subtitle: "Console Based App",
      handle: "C++",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(145deg, #8B5CF6, #000)",
      url: "https://github.com/abdullahazhar202rr/DEN/blob/main/LMS.cpp",
    },
    {
      image: "/weatherapp.webp",
      title: "Weather App",
      subtitle: "With OpenWeather API",
      handle: "HTML/CSS/JS",
      borderColor: "#EC4899",
      gradient: "linear-gradient(145deg, #EC4899, #000)",
      url: "https://weatherappbyabdullahazhar.netlify.app/",
    },
    {
      image: "/eloramade.webp",
      title: "Eloramade E-commerce Brand",
      subtitle: "Full admin page E-commerce",
      handle: "React",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://eloramade-abdullahazhar202rr.netlify.app/",
    },
    {
      image: "/passwordmanager.webp",
      title: "Password Manager",
      subtitle: "Auth + Storage",
      handle: "React",
      borderColor: "#F97316",
      gradient: "linear-gradient(145deg, #F97316, #000)",
      url: "https://passwordmanagerbyabdullahazhar.netlify.app/",
    },
    {
      image: "/netflix.webp",
      title: "Netflix Clone Frontend",
      subtitle: "Static UI Clone",
      handle: "HTML/CSS",
      borderColor: "#DC2626",
      gradient: "linear-gradient(145deg, #DC2626, #000)",
      url: "https://clonesitebyabdullahazhar.netlify.app/",
    },
    {
      image: "/ultraedit.webp",
      title: "UltraEdit Clone Frontend",
      subtitle: "Modern UI Redesign",
      handle: "HTML/CSS",
      borderColor: "#7C3AED",
      gradient: "linear-gradient(145deg, #7C3AED, #000)",
      url: "https://ultraeditsiteclonebyabdullahazhar.netlify.app/",
    },
  ];

  const advancedItems = [
    {
      image: "/objectdetection.webp",
      title: "Object Detection",
      subtitle: "Flask Backend + YOLOv3",
      handle: "Computer Vision",
      borderColor: "#22D3EE",
      gradient: "linear-gradient(145deg, #22D3EE, #000)",
      url: "https://github.com/abdullahazhar202rr/web_developement/tree/main/Projects/Object%20Detection",
    },
    {
      image: "/virtualtryon.webp",
      title: "Virtual Try-On",
      subtitle: "Model Inference & UI",
      handle: "VITONHD / PyTorch",
      borderColor: "#EF4444",
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/virtual%20try%20on%20model(totally%20working)",
    },
    {
      image: "/diabitiesprediction.webp",
      title: "Diabetes Prediction",
      subtitle: "ANN Model with UI",
      handle: "Keras, scikit-learn",
      borderColor: "#A855F7",
      gradient: "linear-gradient(145deg, #A855F7, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Diabetes_Prediction",
    },
    {
      image: "/housepriceprediction.webp",
      title: "House Price Prediction",
      subtitle: "ML + Flask Web App",
      handle: "ML Regression",
      borderColor: "#16A34A",
      gradient: "linear-gradient(145deg, #16A34A, #000)",
      url: "https://github.com/abdullahazhar202rr/web_developement/tree/main/Projects/House%20Price%20Prediction",
    },
    {
      image: "/personalizedai.webp",
      title: "Personalized AI System",
      subtitle: "Offline Smart Assistant",
      handle: "Python",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/personal-ai",
    },
    {
      image: "/firedetection.webp",
      title: "Real-time Fire Detection",
      subtitle: "on ReComputer J10",
      handle: "Python",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Real%20time%20object%20detection",
    },
    {
      image: "/labelprediction.webp",
      title: "Package Label Prediction",
      subtitle: "on Jetson Nano",
      handle: "Python",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Pakage%20Label%20Detection",
    },
        {
      image: "/carpriceprediction.png",
      title: "Car Price Prediction",
      handle: "Python + Regression",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Car_Price_Prediction",
    },
        {
      image: "/Cryptocurrencyprediction.png",
      title: "Cryptocurrency Prediction",
      handle: "Python + Ensemble",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/BTC_Predictor",
    },
    
  ];

  return (
    <div
      id="projects"
      className="relative w-full flex flex-col px-4 sm:px-5 lg:px-16 py-20 space-y-32"
      style={{ background: "var(--background)" }}
    >
      <section className="relative z-10 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-400">
          Python Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Fun mini-projects to build fundamentals
        </p>
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden ">
          <ChromaGrid
            items={beginnerItems}
            radius={300}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          />
        </div>
      </section>

      <section className="relative z-10 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">
          Web Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Real-world apps with modern UI & logic
        </p>
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          <ChromaGrid
            items={intermediateItems}
            radius={300}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          />
        </div>
      </section>

      <section className="relative z-10 text-center space-y-8 pb-32">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-500">
          AI/ML Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Machine learning, full-stack AI systems
        </p>
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          <ChromaGrid
            items={advancedItems}
            radius={300}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          />
        </div>
      </section>
    </div>
  );
}
