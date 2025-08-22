"use client";
import React, { useEffect } from "react";
import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaReact,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTailwindcss,
  SiNextdotjs,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiFirebase,
  SiFigma,
  SiRedux,
  SiMysql,
} from "react-icons/si";
import Carousel from "../CarouselEducation";
import CardSwap, { Card } from "../CardSwapExperience";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Marquee from "react-fast-marquee";
import { FaDatabase } from "react-icons/fa6";

export default function AboutSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      id="about"
      className="w-full h-fit dark:text-white py-20 px-6 md:px-20 overflow-hidden dark:bg-black"
      style={{ background: "var(--background)" }}
    >
      <div className="relative z-10 space-y-16">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div data-aos="zoom-in-up" className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-[var(--mycolor)] mb-6 border-b-4 border-black dark:border-[var(--mycolor)] pb-2 w-fit">
              About Me
            </h2>

            <p className="text-white text-lg leading-relaxed mb-10 max-w-3xl tracking-wide">
              I&apos;m{" "}
              <span className="text-[var(--mycolor)] font-semibold">
                Abdullah Azhar
              </span>
              , a passionate AI student at{" "}
              <span className="text-[var(--mycolor)] font-bold">
                The University of Faisalabad
              </span>{" "}
              and a Full Stack Web Developer. I&apos;ve led successful projects
              including an LMS platform and a banking system. I&apos;m experienced in{" "}
              <span className="text-[var(--mycolor)]">Python(ML)</span>,{" "}
              <span className="text-[var(--mycolor)]">ReactJS</span>, and{" "}
              <span className="text-[var(--mycolor)]">TailwindCSS</span>.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-black dark:text-[var(--mycolor)]">
              Education
            </h3>
            <div
              className="relative h-[400px]"
              data-aos="flip-up"
              data-aos-duration="2500"
            >
              <Carousel
                baseWidth={300}
                autoplay
                autoplayDelay={2000}
                pauseOnHover
                loop
                round={false}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 flex justify-center lg:block relative">
            <div className="relative h-[300px] md:h-[400px] mb-20 w-full max-w-[500px] ">

              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={2000}
                pauseOnHover
                >
                {[
                  { title: "AI/ML Engineer", img: "/Cryptocurrencyprediction.png" },
                  { title: "Project Lead (LMS in C++)", img: "/LMS.webp" },
                  { title: "E-commerce App", img: "/poshzem.webp" },
                  { title: "NSBPB Ambassador", img: "/NSBPB_Ambassadar.webp" },
                  { title: "AI Intern", img: "/DEN.webp" },
                  { title: "UI/UX", img: "/figma.webp" },
                ].map((card, idx) => (
                  <Card key={idx} className="text-white text-lg font-semibold">
                    <h3 className="text-white text-lg font-semibold">{card.title}</h3>
                    <div className="relative w-full h-[400px] mt-2">
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>

        {/* TECH */}
        <div>
          <h3
            className="text-xl font-bold mb-4 text-black dark:text-[var(--mycolor)]  md:mt-40"
            data-aos="zoom-in-up"
          >
            Tech Stack
          </h3>
          <Marquee
            speed={90}
            pauseOnHover
            gradient
            gradientWidth={40}
            className="py-4 overflow-hidden"
          >
            <div className="flex gap-12 mx-4 text-4xl flex-wrap" data-aos="zoom-in-up">
              {[
                { Icon: FaPython, color: "text-yellow-400", url: "https://www.python.org/doc/" },
                { Icon: SiCplusplus, color: "text-blue-500", url: "https://cplusplus.com/doc/" },
                { Icon: FaHtml5, color: "text-orange-600", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { Icon: FaCss3Alt, color: "text-blue-400", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { Icon: SiTailwindcss, color: "text-cyan-400", url: "https://tailwindcss.com/docs" },
                { Icon: FaReact, color: "text-blue-300", url: "https://react.dev/learn" },
                { Icon: SiNextdotjs, color: "text-white", url: "https://nextjs.org/docs" },
                { Icon: SiTensorflow, color: "text-orange-400", url: "https://www.tensorflow.org/learn" },
                { Icon: FaGithub, color: "text-gray-300", url: "https://docs.github.com/en" },
                { Icon: SiScikitlearn, color: "text-orange-300", url: "https://scikit-learn.org/stable/documentation.html" },
                { Icon: SiPandas, color: "text-white", url: "https://pandas.pydata.org/docs/" },
                { Icon: SiNumpy, color: "text-blue-200", url: "https://numpy.org/doc/" },
                { Icon: SiJavascript, color: "text-yellow-300", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { Icon: SiMongodb, color: "text-green-500", url: "https://www.mongodb.com/docs/" },
                { Icon: SiExpress, color: "text-gray-300", url: "https://expressjs.com/en/starter/installing.html" },
                { Icon: SiFirebase, color: "text-yellow-400", url: "https://firebase.google.com/docs" },
                { Icon: SiMysql, color: "text-blue-600", url: "https://dev.mysql.com/doc/" },
                { Icon: SiFigma, color: "text-pink-400", url: "https://help.figma.com/hc/en-us" },
                { Icon: SiRedux, color: "text-purple-400", url: "https://redux.js.org/introduction/getting-started" },
                { Icon: FaDatabase, color: "text-red-400", url: "https://mongoosejs.com/docs/" },
              ].map(({ Icon, color, url }, idx) => (
                <Icon
                  key={idx}
                  className={`${color} hover:scale-150 transition-transform duration-300 cursor-pointer`}
                  onClick={() => window.open(url, "_blank")}
                />
              ))}
            </div>
          </Marquee>
        </div>

        {/* SOFT */}
        <div>
          <h3
            className="text-xl font-semibold mb-4 text-black dark:text-[var(--mycolor)]"
            data-aos="zoom-in-up"
          >
            Soft Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Leadership",
              "Team Collaboration",
              "Project Planning",
              "Self learning",
              "Problem Solving",
              "Self-Motivated",
            ].map((skill, index) => (
              <div
                key={index}
                data-aos="zoom-in-up"
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-300 dark:bg-white/5 border dark:border-white/10 backdrop-blur-lg shadow-md hover:scale-105 transition-transform duration-300 hover:border-black dark:hover:border-[var(--mycolor)]"
              >
                <p className="dark:text-[#ccd6f6] text-black text-base">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
