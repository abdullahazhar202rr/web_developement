"use client";

import React from "react";
import Navbar from "@/components/UI/Navbar";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function Donate() {
  return (
    <div className="flex flex-col min-h-screen bg-[image:var(--background)] dark:bg-black text-white">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Support My Work 💙
        </h1>
        <p className="max-w-xl mb-8 text-base sm:text-lg text-gray-300">
          If you find my work helpful, you can support me by donating.
          Just scan a QR code below with Easypaisa or JazzCash. Thank you!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 mb-12 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Easypaisa</h2>
            <Image
              src="/easypaisa-qr.webp"
              alt="Easypaisa QR"
              width={200}
              height={200}
              className="border border-gray-400 rounded-lg"
              priority
            />
            <p className="mt-2 text-gray-400 text-sm">Scan to pay via Easypaisa</p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">JazzCash</h2>
            <Image
              src="/jazzcash-qr.webp"
              alt="JazzCash QR"
              width={200}
              height={200}
              priority
              className="border border-gray-400 rounded-lg"
            />
            <p className="mt-2 text-gray-400 text-sm">QR applicable for any bank</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm sm:text-base">
          Or send manually to: <br />
          <span className="font-semibold">0314 0632577 (Abdullah Azhar)</span>
        </p>
      </main>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-6 border-t border-gray-700 text-gray-400 text-sm text-center">
        <div>
          <p>
            Phone: 0314 0632577 ❤️ <br />
            Email: abdullahazhar202rr@gmail.com
          </p>
        </div>

        <p>
          &copy; {new Date().getFullYear()} Abdullah Azhar. All rights reserved.
          <br />
          Built with Next.js and Tailwind CSS
        </p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/abdullahazhar202rr" target="_blank">
            <Image
              src="/githubpic.webp"
              width={40}
              height={40}
              className="rounded-full"
              alt="GitHub Profile"
            />
          </a>
          <a href="https://www.linkedin.com/in/abdullahazhar202" target="_blank">
            <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
      </footer>
    </div>
  );
}
