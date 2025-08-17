"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { CheckCircle } from "lucide-react";
import {
  FaFileAlt,
  FaPlayCircle,
  FaShieldAlt,
  FaLeaf,
  FaCalendarCheck,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CleaningServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <StickyHeader />
      <Head>
        <title>Cleaning & Sanitization | Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Professional cleaning and sanitization services tailored for healthcare, commercial, and residential environments."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section with softer overlay */}
        <section className="relative bg-[url('/services/10.jpg')] bg-cover bg-center text-white py-28 text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-teal-800 bg-opacity-40"></div>{" "}
          {/* Softer teal overlay */}
          <div className="relative max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl font-bold drop-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Cleaning & Sanitization Services
            </motion.h1>
            <motion.p
              className="mt-4 text-xl drop-shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Clean, Safe, and Healthy Environments – Every Time
            </motion.p>
            {/* Trust Badges */}
            <div
              className="flex justify-center gap-4 mt-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md">
                <FaShieldAlt className="text-green-500" /> CQC Certified
              </span>
              <span className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md">
                <FaShieldAlt className="text-blue-500" /> GDPR Compliant
              </span>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Hygiene You Can Rely On
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gray-100 p-6 rounded-xl shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>
                    We provide professional-grade cleaning and disinfection
                    services tailored to healthcare, commercial, and residential
                    environments.
                  </p>
                </motion.div>
                <motion.div
                  className="bg-gray-100 p-6 rounded-xl shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>
                    Our trained staff use safe, effective products and follow
                    strict hygiene protocols to ensure a healthy environment for
                    all occupants.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Benefits - Broken into themed clusters */}
            <div
              className="bg-gray-50 py-8 px-4 rounded-xl shadow"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                Why Our Cleaning Services Stand Out
              </h2>
              <div className="space-y-12">
                {/* Cluster 1: Eco-Friendly */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <FaLeaf className="text-green-600" /> Eco-Friendly Solutions
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Eco-Friendly Products",
                        desc: "Sustainable solutions without compromising cleanliness.",
                        icon: CheckCircle,
                      },
                    ].map(({ title, desc, icon: Icon }, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="text-green-600 w-6 h-6 mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">{title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cluster 2: Compliance & Safety */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <FaShieldAlt className="text-blue-600" /> Compliance &
                    Safety
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Hospital-Grade Disinfection",
                        desc: "Eliminate harmful pathogens with trusted cleaning agents.",
                        icon: CheckCircle,
                      },
                      {
                        title: "Trained & Certified Staff",
                        desc: "Professionals trained in infection control and safety.",
                        icon: CheckCircle,
                      },
                      {
                        title: "Compliance & Audit Readiness",
                        desc: "Cleaning logs and records ready for inspections.",
                        icon: CheckCircle,
                      },
                    ].map(({ title, desc, icon: Icon }, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="text-green-600 w-6 h-6 mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">{title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cluster 3: Flexibility */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                    <FaCalendarCheck className="text-teal-600" /> Flexibility
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Scheduled & On-Demand",
                        desc: "Flexible service plans based on your facility’s needs.",
                        icon: CheckCircle,
                      },
                      {
                        title: "Daily, Weekly, Deep Clean Options",
                        desc: "Custom packages for offices, clinics, and homes.",
                        icon: CheckCircle,
                      },
                    ].map(({ title, desc, icon: Icon }, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="text-green-600 w-6 h-6 mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">{title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Explore with hover effects */}
            <div
              className="bg-white p-8 rounded-xl shadow"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="text-4xl font-bold mb-6 text-center">
                Explore Our Cleaning Capabilities
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Discover how our services safeguard your environment from risk
                and contamination.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    text: "View Healthcare Facility Cleaning Case Study",
                    icon: FaFileAlt,
                    href: "#case-study",
                  },
                  {
                    text: "Watch Disinfection Demo Video",
                    icon: FaPlayCircle,
                    href: "#demo-video",
                  },
                  {
                    text: "Download Cleaning Checklist Template",
                    icon: FaFileAlt,
                    href: "#checklist",
                  },
                  {
                    text: "Watch Our Staff Hygiene Training Clip",
                    icon: FaPlayCircle,
                    href: "#training-clip",
                  },
                ].map(({ text, icon: Icon, href }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-xl text-gray-700" />
                    <span className="text-gray-800 font-medium">{text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Customer Review */}
            <div
              className="bg-teal-50 py-10 px-6 rounded-xl shadow"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                What Our Clients Say
              </h2>
              <motion.div
                className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xl italic text-gray-700 mb-4">
                  “Demand Recruitment's cleaning team transformed our clinic's
                  hygiene standards. Their attention to detail and use of
                  eco-friendly products have significantly reduced infection
                  risks.”
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Matthews</p>
                    <p className="text-sm text-gray-500">
                      Clinic Manager, NHS Trust
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div
              className="bg-gray-100 py-10 px-6 rounded-xl shadow"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="text-3xl font-bold mb-4 text-center">
                Talk to Our Cleaning Experts
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Ensure cleanliness, safety, and compliance—speak with our
                cleaning coordinators today.
              </p>
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    I consent to have Demand Recruitment Services Ltd store my
                    submitted information for updates.
                  </span>
                </label>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition w-full md:w-auto"
                >
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Your clean space starts with one message.
                </p>
              </form>
            </div>
          </div>

          {/* WhatsApp Live Chat */}
          <motion.a
            href="https://wa.me/442038761531"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-xl hover:bg-green-600 transition-all duration-300 z-50 transform hover:scale-110"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaWhatsapp className="w-8 h-8" />
          </motion.a>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Access
              </h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                🧹 Request Staff
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Hospital-grade sanitization</li>
                <li>Scheduled deep cleaning</li>
                <li>Eco-friendly cleaning agents</li>
                <li>Trained and certified cleaners</li>
                <li>24/7 emergency cleaning</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
