"use client";

import React, { useEffect, useState } from "react";
import { FaHeartbeat, FaConciergeBell, FaWrench, FaHandshake, FaBullhorn, FaBriefcase } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  { id: "healthcare", name: "Healthcare", icon: <FaHeartbeat className="text-5xl text-[#3b82f6]" /> },
  { id: "hospitality", name: "Hospitality", icon: <FaConciergeBell className="text-5xl text-[#f472b6]" /> },
  { id: "fm", name: "Facilities", icon: <FaWrench className="text-5xl text-[#10b981]" /> },
];

export default function Brief() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % services.length), 3500);
    return () => clearInterval(interval);
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative w-full bg-white text-gray-800 font-sans overflow-hidden py-16 lg:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-teal-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
            data-aos="fade-up"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 tracking-tight">
              Connecting Exceptional{" "}
              <br className="hidden lg:inline" /> Talent with{" "}
              <span className="text-gray-700">Transformative Roles</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We are a leading recruitment partner in the UK, specializing in
              sectors where talent makes the greatest impact. Our mission is to
              bridge ambitious professionals with organizations that are shaping
              the future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <motion.a
                href="/insight"
                className="inline-flex items-center px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-[#155e57] text-white font-semibold text-sm md:text-base shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-teal-200 transition-all duration-300"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Explore Our Services
              </motion.a>
              <a
                href="/caseStudies"
                className="text-sm md:text-base text-[#155e57] font-medium hover:text-teal-700 transition-colors duration-300"
              >
                View Case Studies &rarr;
              </a>
            </div>
          </div>

          {/* Right Glassmorphic Card */}
          <motion.div
            className="relative w-full lg:w-1/2 p-8 md:p-10 bg-white/50 backdrop-blur-3xl border border-white/80 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            data-aos="fade-left"
          >
            {/* Floating Icon Circle */}
            <div className="absolute -top-10 -right-10 w-36 h-36 md:w-48 md:h-48 rounded-full bg-teal-100/50 flex items-center justify-center p-8 opacity-90 z-20 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[index].id}
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 15, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center text-teal-800"
                >
                  {services[index].icon}
                  <div className="mt-2 text-sm md:text-lg font-bold text-gray-700 text-center">
                    {services[index].name}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card Content */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Our Core Expertise
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-prose">
              We specialize in providing top-tier staffing solutions and recruitment
              technology for key sectors, ensuring every placement adds significant
              value and fuels growth.
            </p>
            <hr className="my-6 border-gray-200" />

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 rounded-full text-xs md:text-sm bg-white/70 backdrop-blur-lg border border-white/90 text-[#155e57] font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaHandshake className="inline-block mr-2" /> Recruitment
              </motion.button>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 rounded-full text-xs md:text-sm bg-white/70 backdrop-blur-lg border border-white/90 text-[#155e57] font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaBullhorn className="inline-block mr-2" /> Consulting
              </motion.button>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 rounded-full text-xs md:text-sm bg-white/70 backdrop-blur-lg border border-white/90 text-[#155e57] font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaBriefcase className="inline-block mr-2" /> Platform
              </motion.button>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 font-light">
                Trusted by leading UK organisations
              </div>
              <a
                href="/services"
                className="text-sm font-semibold text-[#155e57] hover:text-teal-700 transition-colors duration-300"
              >
                Our Sectors &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
