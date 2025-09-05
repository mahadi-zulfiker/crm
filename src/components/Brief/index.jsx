"use client";

import React, { useEffect, useState } from "react";
import { FaHeartbeat, FaConciergeBell, FaWrench, FaHandshake, FaBullhorn, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  { id: "healthcare", name: "Healthcare", icon: <FaHeartbeat className="text-5xl text-teal-600" /> },
  { id: "hospitality", name: "Hospitality", icon: <FaConciergeBell className="text-5xl text-teal-600" /> },
  { id: "fm", name: "Facilities", icon: <FaWrench className="text-5xl text-teal-600" /> },
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
    hover: { scale: 1.05, boxShadow: "0 6px 18px rgba(0,0,0,0.15)" },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative w-full bg-white text-gray-800 font-sans overflow-hidden py-20 lg:py-28">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2" data-aos="fade-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug text-gray-900 tracking-tight">
              Your Partner in <span className="text-teal-700">Recruitment Excellence</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              At AMGoal Recruitment, we specialize in connecting ambitious professionals with
              transformative opportunities. With expertise across key industries, we deliver staffing
              solutions that drive organizational success and career growth.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="/insight"
                className="inline-flex items-center px-6 py-3 md:px-8 md:py-3 rounded-lg bg-teal-700 text-white font-semibold text-sm md:text-base shadow-lg hover:bg-teal-800 transition-all duration-300"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Explore Opportunities
              </motion.a>
              <a
                href="/caseStudies"
                className="text-sm md:text-base text-teal-700 font-medium hover:underline"
              >
                View Case Studies →
              </a>
            </div>
          </div>

          {/* Right Glassmorphic Card */}
          <motion.div
            className="relative w-full lg:w-1/2 p-10 bg-white/70 backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-xl flex flex-col"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            data-aos="fade-left"
          >

            {/* Content */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Our Core Expertise
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              We provide tailored staffing and recruitment solutions in high-impact industries.
              Every placement ensures mutual growth — empowering both professionals and businesses.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Recruitment", icon: <FaHandshake /> },
                { label: "Consulting", icon: <FaBullhorn /> },
                { label: "Platform", icon: <FaBriefcase /> },
              ].map((tag, i) => (
                <motion.button
                  key={i}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 rounded-full text-xs md:text-sm bg-gray-50 border border-gray-200 text-teal-700 font-medium flex items-center gap-2 shadow-sm hover:bg-gray-100"
                >
                  {tag.icon} {tag.label}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-sm text-gray-500">
                Trusted by leading UK organisations
              </div>
              <a
                href="/services"
                className="text-sm font-semibold text-teal-700 hover:underline"
              >
                Our Sectors →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
