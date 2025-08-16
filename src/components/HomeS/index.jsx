"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Briefcase,
  Users,
  Target,
  Globe,
  Folder,
  Hospital,
  ArrowRight,
} from "lucide-react";

// Testimonial component to keep the main component clean
const TestimonialCard = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glowEffect = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(52, 211, 153, 0.4), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, rotateX: 1.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true, amount: 0.5 }}
      onMouseMove={handleMouseMove}
      className="mt-20 max-w-3xl mx-auto relative cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div className="group relative bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-10 shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-teal-400/40">
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: glowEffect }}
        />
        <div className="absolute -top-6 -left-6 bg-gradient-to-tr from-teal-500 to-purple-500 text-white p-4 rounded-full shadow-lg z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        </div>
        <p className="relative z-10 text-xl md:text-2xl text-gray-800 italic leading-relaxed">
          “Demand Recruitment Services helped us reduce costs and improve staff
          fill rates dramatically. Their support has been nothing short of
          transformational.”
        </p>
        <div className="mt-6 border-t border-gray-200 w-1/4 group-hover:w-full transition-all duration-500 mx-auto" />
        <div className="mt-6 relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold shadow-md transform group-hover:scale-105 transition-transform duration-300">
            SM
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Senior Workforce Manager
            </p>
            <p className="text-sm text-gray-500">NHS Trust</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhatWeOfferSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      icon: Users,
      label: "Staff Bank Solutions",
      href: "/staffBankSolution",
      description: "Flexible staffing with improved efficiency.",
    },
    {
      icon: Briefcase,
      label: "Managed Services",
      href: "/managedServices",
      description: "End-to-end workforce management.",
    },
    {
      icon: Target,
      label: "RPO",
      href: "/rpo",
      description: "Recruitment process outsourcing at scale.",
    },
    {
      icon: Globe,
      label: "International Recruitment",
      href: "/InternationalRecruitment",
      description: "Hire qualified talent across borders.",
    },
    {
      icon: Folder,
      label: "Workforce Consulting",
      href: "/workforceConsulting",
      description: "Strategic insights for workforce planning.",
    },
    {
      icon: Hospital,
      label: "Occupational Health",
      href: "/occupationalHealth",
      description: "Support employee wellness and safety.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 py-20 px-4 md:px-8 font-sans overflow-hidden">
      {/* Dynamic Gradient Blobs with improved animation */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_6s_ease-in-out_infinite]"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[blob_6s_ease-in-out_infinite_1.5s]"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800"
        >
          What We Offer
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Empowering your workforce with strategic solutions for every challenge.
        </motion.p>

        {/* Service Grid with enhanced card design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {services.map(({ icon: Icon, label, href, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Link href={href} className="group cursor-pointer">
                <div className="relative p-0.5 rounded-[2.5rem] bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  {/* Inner card with full content */}
                  <div className="relative z-10 bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:bg-white group-hover:border group-hover:border-teal-400">
                    <div className="bg-gradient-to-tr from-teal-100 via-white to-teal-50 p-5 rounded-full mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[30deg] group-hover:shadow-xl group-hover:shadow-teal-400/40">
                      <Icon
                        size={42}
                        className="text-teal-600 transition-transform duration-500"
                      />
                    </div>
                    <p className="font-bold text-2xl text-gray-900 transition-colors duration-300 group-hover:text-teal-600">
                      {label}
                    </p>
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                      {description}
                    </p>
                    <div className="flex items-center mt-6 text-teal-600 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-semibold">Learn More</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Improved Testimonial Section with separate component */}
        <TestimonialCard />
      </div>
    </section>
  );
};

export default WhatWeOfferSection;