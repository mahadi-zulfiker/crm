"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import StickyHeader from "@/components/StickyHeader";

import { FaUserMd, FaUsersCog, FaBriefcase, FaWhatsapp } from "react-icons/fa";
import { Sparkles, Star, ShieldCheck, ArrowRight } from "lucide-react";

// The data for the service cards
const selectedServices = [
  {
    name: "Staffing Services",
    link: "/staffBankSolution",
    image: "/services/med1.jpg",
    description:
      "Comprehensive staffing support across healthcare, cleaning, security, hospitality, and more.",
    stats: ["48h avg. fill time", "10k+ database", "UK-compliant"],
    cta: "View Staffing Options",
    icon: <FaUserMd className="text-emerald-600" size={22} />,
  },
  {
    name: "Workforce Management",
    link: "/workforceManagement",
    image: "/services/1.jpg",
    description:
      "Efficient solutions for scheduling, monitoring, and optimizing workforce productivity across sectors.",
    stats: ["Up to 30% productivity boost", "Real-time tracking", "Roster automation"],
    cta: "Optimize Workforce",
    icon: <FaUsersCog className="text-emerald-600" size={22} />,
  },
  {
    name: "Recruitment Solutions",
    link: "/recruitmentProcessOut",
    image: "/services/2.jpg",
    description:
      "Custom recruitment strategies to meet unique staffing demands for short- or long-term engagements.",
    stats: ["95% client retention", "Tailored solutions", "End-to-end support"],
    cta: "Tailored Hiring Plans",
    icon: <FaBriefcase className="text-emerald-600" size={22} />,
  },
];

const Recruitment = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <StickyHeader />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden">
        <div
          className="relative h-[520px] md:h-[560px] bg-cover bg-center"
          style={{ backgroundImage: "url('/services/1.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-5xl mx-6 md:mx-10">
              <div
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur text-white mb-4"
                data-aos="fade-up"
              >
                <Sparkles size={16} />
                <span className="text-sm font-medium">
                  Your Partner in Workforce Excellence
                </span>
              </div>
              <h1
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Our Key Recruitment Services
              </h1>
              <p
                className="mt-4 max-w-2xl text-gray-200"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Tailored solutions to address modern workforce challenges with precision and efficiency.
              </p>
              <div
                className="mt-6 flex flex-wrap gap-3"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <a
                  href="#services-section"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition"
                >
                  Explore Services <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Animated Counters */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
            {[
              { value: 500, suffix: "+", label: "Professionals Placed" },
              { value: 95, suffix: "%", label: "Client Retention Rate" },
              { value: 24, suffix: "/7", label: "Dedicated Support" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-600">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                </h2>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div id="services-section" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedServices.map((service, index) => (
              <article
                key={index}
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                    <Star size={14} className="text-amber-500" /> Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {service.icon}
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Service-specific stats chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.stats?.map((chip, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-medium"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <Link href={service.link}>
                    <span
                      className="mt-5 inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800"
                      aria-label={`${service.cta} for ${service.name}`}
                    >
                      {service.cta} <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-100 to-white" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-1 shadow-xl">
            <div className="rounded-3xl bg-white p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Ready to hire or streamline operations?
                </h3>
                <p className="mt-2 text-gray-600">
                  Speak with our team for a tailored plan in minutes.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="contactUs"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition"
                  >
                    Get a Proposal <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <ul className="grid gap-3">
                {[
                  "Dedicated account manager",
                  "Transparent pricing & SLAs",
                  "Rapid deployment within days",
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="text-emerald-600" size={18} /> {li}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center"
            data-aos="fade-up"
          >
            {["NHS-compliant", "ISO 9001", "DBS Checked", "UK Coverage"].map(
              (badge, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 bg-gray-50 rounded-2xl border border-gray-100 p-4 shadow-sm"
                >
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {badge}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <ContactUsHomePage />
      <Footer />

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
    </div>
  );
};

export default Recruitment;