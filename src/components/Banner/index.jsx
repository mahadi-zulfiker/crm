"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const texts = [
  {
    title: "SMARTER STAFFING. BETTER CARE.",
    subtitle:
      "Connecting people to purpose-driven careers across healthcare, hospitality, and beyond.",
  },
  {
    title: "Streamline Recruitment",
    subtitle: "Simplify your hiring process with ease and efficiency.",
  },
  {
    title: "Fuel Your Growth with the Right Talent",
    subtitle:
      "Unlock your business potential by connecting with top-tier professionals.",
  },
];

const BannerSlider = () => {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* ✅ Background Image or Video */}
      <div className="absolute inset-0 z-0">
        {/* Option 1: Background Image */}
        {/* <Image
          src="/meddd111.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        /> */}

        {/* Option 2: Uncomment for Video Background (MP4) */}
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay with Animated Text */}
      <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-white px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              {texts[currentText].title}
            </h1>
            <p className="text-lg md:text-2xl font-medium text-gray-200">
              {texts[currentText].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 z-20">
          <Link href="/allJobs">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 transition">
              <Search size={18} />
              Search Jobs
            </button>
          </Link>
          <Link href="/requestEmployee">
            <button className="bg-transparent border border-white text-white hover:bg-white hover:text-teal-700 px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition">
              <UserPlus size={18} />
              Request Staff
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
