"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Aos from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

 const Beams = dynamic(() => import('../Beams'), { ssr: false });

  const ShinyText = dynamic(() => import("@/components/ShinyText"), { ssr: false });

 useEffect(() => {
  Aos.init({ duration: 2000, once: true });
  setMounted(true);

  if (typeof window !== "undefined" && window.innerWidth < 640) {
    setIsMobile(true);
  }
}, []);

  return (
    <section
      className="relative w-full h-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Beams BG */}
      <div className="absolute inset-0  dark:bg-black">
        {mounted && theme === "dark" && !isMobile &&(
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        )}
      </div>

      {mounted ? (
        <div className="flex flex-col md:flex-row w-full h-fit my-[10%]">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center pb-10 md:pb-20">
            <div
              key={theme}
              data-aos="zoom-in"
             className="relative mt-22 z-10 w-[200px] h-[250px] md:w-[350px] md:h-[450px] flex items-center justify-center pointer-events-none select-none dark:md:before:absolute dark:md:before:bottom-10 dark:md:before:w-[300px] dark:md:before:right-0 dark:md:before:h-[400px] dark:md:before:rounded-full dark:md:before:bg-[#ffaa80] dark:md:before:opacity-90 dark:md:before:z-[-1] dark:md:before:shadow-2xl dark:md:before:rotate-[45deg] dark:md:before:shadow-[#ffaa80]"

            >
              <Image
                src="/my_pic_bg.svg"
                fill
                className="absolute object-cover w-full h-full inset-0 -z-10  dark:hidden"
                alt="bg"
                priority
              />
              <Image
                src="/my_pic.webp"
                width={200}
                height={200}
                priority
                className="relative rounded-full w-[150px] bottom-15 h-[300px] md:w-[200px] md:h-[430px] z-10 "
                alt="my image"
              />
            </div>
          </div>

          {/* Text */}
          <div
            data-aos="zoom-in"
            key={theme}
            className="w-full md:w-1/2 relative mb-30 z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4"
          >
            <section className="max-w-2xl space-y-6">
              <p className="text-white dark:text-[#ffaa80] text-md md:text-base font-mono tracking-widest">
                Hi, my name is
              </p>

              <ShinyText
                text="Abdullah Azhar."
                disabled={false}
                speed={5}
                className="text-3xl md:text-6xl font-extrabold"
              />

              <h2 className="text-xl md:text-4xl font-semibold">
                I am a Software Engineer turning your Paperball into Paperplane.
              </h2>

              <p className="text-base md:text-lg leading-7 text-white text-justify">
                I&apos;m a Full Stack Web Developer and passionate AI student at The University of Faisalabad,
                skilled in <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">Python</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">Scikit-Learn</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">Keras</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">Tensorflow</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">C++</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">HTML, CSS, JS</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">ReactJS (NextJS)</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">Express JS</span>,{" "}
                <span className="text-[var(--mycolor)] dark:text-[#ffaa80] font-semibold">SQL</span> and MongoDB.
              </p>
            </section>
          </div>
        </div>
      ) : (
        <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center text-3xl">
          You will be redirected to portfolio — wait please
        </div>
      )}
    </section>
  );
}
