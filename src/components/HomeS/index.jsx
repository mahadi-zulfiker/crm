"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Target,
  Globe,
  Folder,
  Hospital,
  ArrowRight,
} from "lucide-react";

// Simplified TestimonialCard with enhanced hover effects
const TestimonialCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className="mt-20 max-w-3xl mx-auto"
    >
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
        <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed">
          “Demand Recruitment Services helped us reduce costs and improve staff fill rates dramatically. Their support has been nothing short of transformational.”
        </p>
        <div className="mt-6 border-t border-gray-200 w-1/4 mx-auto transition-all duration-300 group-hover:border-teal-500" />
        <div className="mt-6 flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold shadow-md"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            SM
          </motion.div>
          <div>
            <p className="font-semibold text-gray-900">Senior Workforce Manager</p>
            <p className="text-sm text-gray-500">NHS Trust</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhatWeOfferSection = () => {
  return (
    <section className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800"
        >
          What We Offer
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Empowering your workforce with strategic solutions for every challenge.
        </motion.p>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {[
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
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Link href={item.href} className="group block">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-teal-300">
                  <motion.div
                    className="inline-flex items-center justify-center bg-teal-50 rounded-full p-5 mb-6 group-hover:bg-teal-100 transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon size={42} className="text-teal-600 group-hover:text-teal-700" />
                  </motion.div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <motion.div
                    className="flex items-center justify-center text-teal-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} className="ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <TestimonialCard />
      </div>
    </section>
  );
};

export default WhatWeOfferSection;