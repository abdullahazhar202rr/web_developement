"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Mail, Phone, Clock } from "lucide-react";
import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

export default function Contact() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const sendPromise = async () => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (result.status === "OK") {
        setSubmittedData(data);
        reset();
      } else {
        throw new Error("Failed to send message.");
      }
    };

    toast.promise(
      sendPromise(),
      {
        loading: "Sending message...",
        success: "Your message is sent!",
        error: "Failed to send message. Please try again.",
      },
      {
        style: {
          minWidth: "200px",
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[image:var(--background)] dark:bg-black flex flex-col">
      <Toaster position="top-right" />

      <header>
        <Navbar />
      </header>

      <main className="px-4 md:px-6 py-12 flex-grow mt-20">
        <div className="max-w-6xl mx-auto">
          {!submittedData ? (
            <>
              {/* Hero */}
              <div className="text-center mb-12 md:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let&apos;s Work Together
                </h1>
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
                  Ready to bring your vision to life? I&apos;m here to help create something extraordinary.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* Contact Form */}
                <div>
                  <div className="bg-[image:var(--background)] dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800">
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-900 dark:text-white">
                      Send a Message
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block mb-1 text-sm text-black dark:text-gray-300">
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="Abdullah Azhar"
                          {...register("name", { required: "Name is required" })}
                          className="w-full h-12 px-4 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-transparent"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-1 text-sm text-black dark:text-gray-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="w-full h-12 px-4 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-transparent"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block mb-1 text-sm text-black dark:text-gray-300">
                          Subject
                        </label>
                        <input
                          type="text"
                          placeholder="Project Inquiry"
                          {...register("subject", { required: "Subject is required" })}
                          className="w-full h-12 px-4 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-transparent"
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block mb-1 text-sm text-black dark:text-gray-300">
                          Message
                        </label>
                        <textarea
                          rows="5"
                          placeholder="Tell me about your project..."
                          {...register("message", { required: "Message is required" })}
                          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 rounded-xl bg-transparent"
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 bg-blue-600 cursor-pointer hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Get in Touch
                    </h2>
                    <p className="text-white text-base md:text-lg">
                      I&apos;m always excited to discuss new ideas and projects. Let&apos;s connect!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Email Link */}
                    <a
                      href="mailto:abdullahazhar202rr@gmail.com"
                      className="flex items-center gap-4 bg-[image:var(--background)] dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 transition"
                    >
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Email <span className="text-[10px] text-gray-500">click to mail</span>
                        </h3>
                        <p className="text-white dark:text-gray-300">abdullahazhar202rr@gmail.com</p>
                      </div>
                    </a>

                    {/* Phone Link */}
                    <a
                      href="https://wa.me/923140632577"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-[image:var(--background)] dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-600 transition"
                    >
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Phone <span className="text-[10px] text-gray-500">click for WhatsApp</span>
                        </h3>
                        <p className="text-white dark:text-gray-300">0314 0632577</p>
                      </div>
                    </a>
                  </div>

                  {/* Response Note */}
                  <div className="flex items-center gap-4 bg-[image:var(--background)] dark:bg-slate-900 p-5 rounded-xl border border-blue-100 dark:border-blue-800">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Quick Response</h4>
                      <p className="text-sm text-white dark:text-gray-300">
                        I typically respond within 24 hours if you send me a message.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-[image:var(--background)] dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Thank You!
                  </h1>
                  <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                    Your message has been successfully received. We appreciate you reaching out!
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-8 sm:p-10">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Your Submission Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Name:</span>
                      <p className="text-gray-900 dark:text-white">{submittedData.name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Email:</span>
                      <p className="text-gray-900 dark:text-white">{submittedData.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Subject:</span>
                      <p className="text-gray-900 dark:text-white">{submittedData.subject}</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Message:</span>
                      <p className="text-gray-900 dark:text-white flex-1">{submittedData.message}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/"
                    className="inline-block mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors duration-300"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {submittedData ? null : <footer><Footer /></footer>}
    </div>
  );
}
