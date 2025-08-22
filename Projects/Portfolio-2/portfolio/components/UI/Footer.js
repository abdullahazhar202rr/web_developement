"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";
import Button from "../Button";
import ShinyText from "../ShinyText";
import TrueFocus from "../Name";
import Aos from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";
import Link from "next/link";
import { MailIcon, Phone, PhoneCallIcon, PhoneForwarded, PhoneIcon } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
    setMounted(true);
  }, []);

  return (
    <footer
      className=" dark:bg-black bg-white text-black dark:text-white px-4 py-8 text-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <section className="relative w-full overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[10px] dark:bg-gradient-to-r from-[#ff512f] via-[#ff9966] to-[#ff512f] blur-md opacity-80 z-20" />

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center relative max-w-7xl mx-auto gap-10">
          {/* Video + BG */}
          <div className="relative w-full lg:w-1/2 flex justify-center py-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[200px] blur-2xl rotate-45 overflow-hidden z-0 pointer-events-none">
              <div className="w-1/2 h-full fixed bottom-1/2 left-0 bg-gradient-to-r from-[#ff7e5f] to-transparent" />
              <div className="w-1/2 h-full fixed top-1/2 right-0 bg-gradient-to-r from-transparent to-[#007cf0]" />
            </div>

            <div data-aos="zoom-in" className="relative z-10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-full w-[250px] md:w-[400px]"
                style={{ pointerEvents: "none", mixBlendMode: "screen" }}
              >
                <source
                  src="Everything App for your teams.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start max-w-xl px-4">
            <TrueFocus
              sentence="Abdullah Azhar"
              manualMode={false}
              blurAmount={2}
              borderColor="#ff7e5f"
              glowColor="#007cf0"
              animationDuration={1}
              pauseBetweenAnimations={1}
            />

            {mounted && theme === "dark" && (
              <ShinyText
                text="Success isn&apos;t defined by perfection, but by persistence the quiet strength to keep moving forward despite setbacks. Every challenge faced, every failure endured, is a lesson in resilience and growth. True achievement comes not from avoiding obstacles, but from the courage to rise each time we fall, stronger and more determined than before."
                disabled={false}
                speed={5}
                className="text-justify mt-6"
              />
            )}

            {mounted && theme !== "dark" && (
              <p className="text-justify mt-6">
                Success isn&apos;t defined by perfection, but by persistence the quiet strength to keep moving forward despite setbacks. Every challenge faced, every failure endured, is a lesson in resilience and growth. True achievement comes not from avoiding obstacles, but from the courage to rise each time we fall, stronger and more determined than before.
              </p>
            )}

            {!mounted && (
              <p className="text-justify mt-6">Loading...</p>
            )}

            <Link href="/contact" className="mt-6">
              <Button text="Hire Me" classes="mr-20" />
            </Link>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 z-10 mt-10 max-w-5xl mx-auto">
          <div>
            <h1 className="text-sm md:text-base text-left">
              <span className="flex gap-2"><PhoneCallIcon/> 03140632577</span>
               <br />
               <span className="flex gap-2">
                 <MailIcon/> abdullahazhar202rr@gmail.com
                </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-center">
            &copy; {new Date().getFullYear()} Abdullah Azhar. All rights reserved.
            <br />
            Built with Next.js & Tailwind CSS.
            <br />
            Currently Working at <a href="https://aipredictions.ai/" target="_blank" className="text-green-400">AI Predictons</a>
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/abdullahazhar202rr" target="_blank">
              <Image
                src="/githubpic.webp"
                width={40}
                height={40}
                className="rounded-full"
                alt="GitHub Profile"
                unoptimized
              />
            </a>
            <a
              href="https://www.linkedin.com/in/abdullahazhar202"
              target="_blank"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
