"use client";
import React, { useState, useEffect } from "react";
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
      title: "Assignement orders",
      subtitle: "Copy of site",
      handle: "scrapping or changing to learn",
      borderColor: "#10B981",
      gradient: "linear-gradient(145deg, #10B981, #000)",
      url: "https://goassignmentclone-by-abdullahazhar.vercel.app/",
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
        {
      image:'/PersonalizedAI.webp',
      title: 'Chatbot',
      subtitle: 'Offline Smart Assistant',
      handle: 'CReact',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)',
      url: 'https://github.com/abdullahazhar202rr/web_developement/tree/main/Projects/jarvis-chatbot'
    }
  ];

  const advancedItems = [
    {
      image: "/architecturediagram.webp",
      title: "Architecture Diagram Generator",
      subtitle: "Fine-tuned LLM → editable system diagrams",
      handle: "Fine-tuned LLM / React Flow",
      borderColor: "#6366F1",
      gradient: "linear-gradient(145deg, #6366F1, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Architecture_diagram_generator",
      details: {
        overview:
          "Turns a plain-English system description into an editable architecture diagram. A fine-tuned LLM emits a structured node/edge graph, which is auto-laid-out and rendered as an interactive canvas.",
        highlights: [
          "Fine-tuned an LLM to output structured diagram JSON from natural-language prompts",
          "React + TypeScript frontend using React Flow (@xyflow) with dagre / ELK auto-layout",
          "Model served over an API the frontend calls to generate diagrams on demand",
        ],
        stack: ["Fine-tuned LLM", "React Flow", "TypeScript", "Vite"],
      },
    },
    {
      image: "/ppedetection.webp",
      title: "PPE Detection",
      subtitle: "Helmet & safety-vest compliance",
      handle: "Ultralytics YOLO",
      borderColor: "#F97316",
      gradient: "linear-gradient(145deg, #F97316, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Personal%20Protective%20Equipement%20detection",
      details: {
        overview:
          "Computer-vision system that checks industrial workers for required protective equipment (helmet, safety vest) and flags violations in real time from video.",
        highlights: [
          "Custom-trained Ultralytics YOLO detector (person / helmet / vest)",
          "Flags 'NO-Safety-Vest' violations with confidence scores on live footage",
          "Runs frame-by-frame on factory video for compliance monitoring",
        ],
        stack: ["Ultralytics YOLO", "OpenCV", "Python"],
      },
    },
    {
      image: "/firesmokedetection.webp",
      title: "Fire & Smoke Detection",
      subtitle: "Real-time fire / smoke alerts",
      handle: "YOLOv8 / OpenCV",
      borderColor: "#EF4444",
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Fire-and-Smoke-Detection",
      details: {
        overview:
          "Real-time fire and smoke detector for safety monitoring. Watches a camera or video feed, draws detections, and saves timestamped snapshots the moment fire or smoke appears.",
        highlights: [
          "YOLOv8 detector trained for fire and smoke classes",
          "OpenCV pipeline for live video with automatic snapshot capture on detection",
          "Built for edge / on-site safety deployment",
        ],
        stack: ["YOLOv8", "OpenCV", "Python"],
      },
    },
    {
      image: "/goldpriceprediction.webp",
      title: "Gold Price Prediction",
      subtitle: "Time-series forecast: actual vs predicted",
      handle: "LSTM",
      borderColor: "#EAB308",
      gradient: "linear-gradient(145deg, #EAB308, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Gold%20Price%20Predcition",
      details: {
        overview:
          "LSTM time-series model that forecasts gold prices from a decade of historical data, with predicted values tracking the actual test data closely.",
        highlights: [
          "LSTM network trained on ~2013–2023 daily gold prices",
          "Predicted vs actual test curves track closely (shown in the chart)",
          "Packaged as a standalone desktop widget (PyInstaller)",
        ],
        stack: ["LSTM", "Keras / TensorFlow", "Python"],
      },
    },
    {
      image: "/lecturegrounded.webp",
      title: "Research-Grounded LLM",
      subtitle: "Phi3+Rag + Qlora",
      handle: "Transformers",
      borderColor: "#22D3EE",
      gradient: "linear-gradient(145deg, #22D3EE, #000)",
      url: "https://www.linkedin.com/posts/abdullahazhar202_rag-llm-qlora-ugcPost-7466123302978347010-DuxP",
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
      image: "/alzheimerdetection.webp",
      title: "Alzheimer's MRI Detection",
      subtitle: "4-class MRI classification · 92% acc.",
      handle: "TensorFlow / CNN Ensemble",
      borderColor: "#A855F7",
      gradient: "linear-gradient(145deg, #A855F7, #000)",
      details: {
        overview:
          "Deep-learning system that classifies brain MRI scans into four Alzheimer's stages (Non-, Very-Mild-, Mild- and Moderate-Demented). Built as a research collaboration with a PhD scholar on a ~10.9k-image dataset.",
        highlights: [
          "Hybrid transfer-learning ensemble (ResNet50 + DenseNet121) with channel-attention fusion",
          "Class-weighted training to handle severe class imbalance (~50:1)",
          "92.18% test accuracy across the 4 dementia classes (confusion matrix shown)",
        ],
        stack: [
          "TensorFlow / Keras",
          "ResNet50 + DenseNet121",
          "Transfer Learning",
        ],
      },
    },
    /* {
      image: "/housepriceprediction.webp",
      title: "House Price Prediction",
      subtitle: "ML + Flask Web App",
      handle: "ML Regression",
      borderColor: "#16A34A",
      gradient: "linear-gradient(145deg, #16A34A, #000)",
      url: "https://github.com/abdullahazhar202rr/web_developement/tree/main/Projects/House%20Price%20Prediction",
    }, */
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
        /* {
      image: "/carpriceprediction.png",
      title: "Car Price Prediction",
      handle: "Python + Regression",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Car_Price_Prediction",
    }, */
        {
      image: "/cryptoprediction.webp",
      title: "Cryptocurrency Prediction",
      handle: "Python + Ensemble",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/BTC_Predictor",
    },
    {
      image:'/PersonalizedAI.webp',
      title: 'Personalized AI System',
      subtitle: 'Offline Smart Assistant',
      handle: 'C++ , llama, React',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)',
      url: 'https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/jarvis'
    },
    {
      image:'/shopmodel.webp',
      title: 'Shop model',
      subtitle: 'People entering, exiting, present',
      handle: 'python, YOLOv8',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)',
      url: 'https://github.com/abdullahazhar202rr/Machine-Learning/tree/main/Projects/Shop%20People%20record'
    }
    
  ];

  const [activeTab, setActiveTab] = useState("ai");
  const [selected, setSelected] = useState(null);

  const tabs = [
    {
      key: "ai",
      label: "AI / ML",
      color: "#DC2626",
      subtitle: "Machine learning, computer vision & full-stack AI systems",
      items: advancedItems,
    },
    {
      key: "web",
      label: "Web",
      color: "#CA8A04",
      subtitle: "Real-world apps with modern UI & logic",
      items: intermediateItems,
    },
    {
      key: "python",
      label: "Python",
      color: "#16A34A",
      subtitle: "Fun mini-projects to build fundamentals",
      items: beginnerItems,
    },
  ];

  const current = tabs.find((t) => t.key === activeTab) || tabs[0];

  return (
    <div
      id="projects"
      className="relative w-full flex flex-col px-4 sm:px-5 lg:px-16 py-20 space-y-10"
      style={{ background: "var(--background)" }}
    >
      {/* Filter pills */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => {
          const on = t.key === activeTab;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 border-2 cursor-pointer ${
                on
                  ? "text-white shadow-lg"
                  : "text-black dark:text-white border-transparent bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
              }`}
              style={on ? { background: t.color, borderColor: t.color } : {}}
            >
              {t.label} Projects
            </button>
          );
        })}
      </div>

      {/* Active tier */}
      <section
        key={current.key}
        className="relative z-10 text-center space-y-8 pb-20"
      >
        <div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: current.color }}
          >
            {current.label} Projects
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {current.subtitle}
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Tap a card for details
          </p>
        </div>
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          <ChromaGrid
            key={current.key}
            items={current.items}
            radius={300}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
            onItemClick={setSelected}
          />
        </div>
      </section>

      <ProjectModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ProjectModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  const d = item.details || {};

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 text-black dark:text-white shadow-2xl border border-black/10 dark:border-white/10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white text-xl leading-none hover:bg-black/70 cursor-pointer"
        >
          ×
        </button>

        {item.image && (
          <div className="w-full bg-neutral-100 dark:bg-black flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full max-h-72 object-contain"
            />
          </div>
        )}

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            {item.handle && (
              <span
                className="text-sm font-semibold"
                style={{ color: item.borderColor }}
              >
                {item.handle}
              </span>
            )}
          </div>

          {d.overview && (
            <p className="text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {d.overview}
            </p>
          )}

          {d.highlights?.length > 0 && (
            <ul className="space-y-2">
              {d.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span style={{ color: item.borderColor }}>▹</span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {d.stack?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {d.stack.map((s, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full border border-black/15 dark:border-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white cursor-pointer"
              style={{ background: item.borderColor }}
            >
              View on GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
