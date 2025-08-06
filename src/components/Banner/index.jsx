"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "SMARTER STAFFING. BETTER CARE.",
    subtitle:
      "Connecting people to purpose-driven careers across healthcare, hospitality, and beyond.",
    image: "/meddd111.jpg",
  },
  {
    title: "Streamline Recruitment",
    subtitle: "Simplify your hiring process with ease and efficiency",
    image: "/services/2.jpg",
  },
  {
    title: "Fuel Your Growth with the Right Talent",
    subtitle:
      "Unlock your business potential by connecting with top-tier professionals",
    image: "/services/3.jpg",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white px-6 text-center space-y-4 z-10">
            <h1 className="text-4xl md:text-6xl font-bold">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-2xl font-medium text-gray-200 max-w-2xl">
              {slides[current].subtitle}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/allJobs">
                <button className="bg-teal-700 hover:bg-teal-800 px-6 py-3 rounded-md font-semibold transition">
                  Search Jobs
                </button>
              </Link>
              <Link href="/requestEmployee">
                <button className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition">
                  Request Staff
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-20">
        <button
          onClick={handlePrev}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-20">
        <button
          onClick={handleNext}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;
