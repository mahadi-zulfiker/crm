"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeartbeat, FaConciergeBell, FaWrench } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Brief() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    { id: 'healthcare', name: 'Healthcare', icon: <FaHeartbeat /> },
    { id: 'hospitality', name: 'Hospitality', icon: <FaConciergeBell /> },
    { id: 'fm', name: 'Facilities Management', icon: <FaWrench /> },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % services.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-[420px] font-sans">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/photo_2025-08-10_10-38-14.jpg"
          alt="abstract background"
          priority
          fill
          className="object-cover object-center grayscale contrast-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 flex flex-col justify-center" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-[#155e57]">
              We connect top talent <br /> with life-changing roles across the UK.
            </h1>
            <p className="mt-5 text-gray-700 max-w-lg text-base md:text-lg leading-relaxed">
              How can FM leaders face the challenging headwinds of today's business world head-on? Our white paper and expert services help organisations transform operations, reduce cost and improve experience across estates.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                className="inline-flex items-center px-5 py-2 rounded-full bg-[#155e57] text-white font-medium shadow-lg hover:shadow-xl focus:ring-4 focus:ring-[#155e57]/30 transition"
                href="/insight"
              >
                Read now
              </a>
              <a className="text-sm text-[#155e57] underline hover:text-[#0d3c36]" href="/caseStudies">
                Check Case Studies
              </a>
            </div>
          </div>

          <motion.div
            className="relative w-full lg:w-1/2 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl p-8 shadow-2xl flex flex-col justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            data-aos="fade-up"
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#d6f0ed] flex items-center justify-center shadow-inner overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[index].id}
                  initial={{ opacity: 0, x: -10, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-[#155e57]"
                >
                  <div className="text-4xl">{services[index].icon}</div>
                  <div className="mt-1 text-sm font-semibold">{services[index].name}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <h3 className="text-2xl font-semibold text-[#155e57]">Our Expertise</h3>
            <hr className="my-4 border-gray-200" />
            <p className="text-gray-700 leading-relaxed max-w-prose">
              At Demand Recruitment Services, we bridge ambitious professionals with leading organisations across the UK. Our deep industry expertise ensures the right placements that drive long-term value and innovation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#155e57] hover:shadow-lg transition">Staffing Services</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#155e57] hover:shadow-lg transition">SaaS Product</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#155e57] hover:shadow-lg transition">Recruitment Platform</button>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">Trusted by leading organisations</div>
              <a className="text-sm font-medium text-[#155e57] underline" href="/services">See case studies</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
