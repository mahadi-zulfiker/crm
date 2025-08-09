"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Building2, Users } from "lucide-react";
import ContactSection from "@/components/ContactHomePage";

// Import CountUp for animated counters
import CountUp from "react-countup";

const recruitmentServices = [
  {
    name: "Staffing Services",
    link: "/staffBankSolution",
    image: "/services/med1.jpg",
    description:
      "Comprehensive staffing support across healthcare, cleaning, security, hospitality, and more.",
    cta: "View Staffing Options →",
    icon: <Briefcase className="text-teal-600" size={24} />,
  },
  {
    name: "Workforce Management",
    link: "/workforceManagement",
    image: "/services/1.jpg",
    description:
      "Efficient solutions for scheduling, monitoring, and optimizing workforce productivity across sectors.",
    cta: "Optimize Workforce →",
    icon: <Users className="text-teal-600" size={24} />,
  },
  {
    name: "Recruitment Solutions",
    link: "/recruitmentProcessOut",
    image: "/services/2.jpg",
    description:
      "Custom recruitment strategies to meet unique staffing demands for short- or long-term engagements.",
    cta: "Tailored Hiring Plans →",
    icon: <Building2 className="text-teal-600" size={24} />,
  },
];

const facilityServices = [
  {
    name: "Cleaning & Hygiene Services",
    link: "/cleaningServices",
    image: "/1111.jpg",
    description:
      "Maintain a safe, sanitary, and welcoming environment for staff and visitors.",
    cta: "Explore Hygiene Services →",
    icon: <Users className="text-teal-600" size={24} />,
  },
  {
    name: "Engineering & Maintenance",
    link: "/engineeringConstruction",
    image: "/services/2.jpg",
    description:
      "Ensure optimal operation of infrastructure with our expert engineering services.",
    cta: "View Engineering Plans →",
    icon: <Building2 className="text-teal-600" size={24} />,
  },
  {
    name: "Integrated Facilities Management",
    link: "/facilitiesTransformation",
    image: "/services/9.jpg",
    description:
      "Streamline operations with a holistic approach to facilities management.",
    cta: "Discover Facility Management →",
    icon: <Briefcase className="text-teal-600" size={24} />,
  },
];

const communityServices = [
  {
    name: "Supported Living",
    link: "/supportedLiving",
    image: "/services/41.jpg",
    description:
      "Providing compassionate and structured support for individuals in supported living environments.",
    cta: "Support Independent Living →",
    icon: <Users className="text-teal-600" size={24} />,
  },
  {
    name: "Community Engagement & Events",
    link: "/communityEngagement",
    image: "/services/33.jpg",
    description:
      "Building meaningful connections through local events, engagement strategies, and inclusive community experiences.",
    cta: "See Engagement Programs →",
    icon: <Building2 className="text-teal-600" size={24} />,
  },
  {
    name: "Housing Management",
    link: "/housingManagement",
    image: "/services/44.jpg",
    description:
      "Professional management of residential properties ensuring tenant satisfaction, compliance, and efficiency.",
    cta: "Learn About Housing Plans →",
    icon: <Briefcase className="text-teal-600" size={24} />,
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("recruitment");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getServices = () => {
    if (activeTab === "recruitment") return recruitmentServices;
    if (activeTab === "facility") return facilityServices;
    if (activeTab === "community") return communityServices;
    return [];
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Banner */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/services/med1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 h-full flex items-center">
          <div
            className="max-w-4xl bg-white bg-opacity-90 p-10 ml-8 rounded-xl shadow-2xl backdrop-blur-sm"
            data-aos="fade-right"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              What We Offer
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Discover a wide range of recruitment, facility, and community
              services tailored to meet your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex justify-center gap-4 mb-10 flex-wrap"
            data-aos="fade-up"
          >
            {[
              { id: "recruitment", label: "Recruitment Services", icon: Briefcase },
              { id: "facility", label: "Facility Management", icon: Building2 },
              { id: "community", label: "Community Services", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 shadow-sm hover:shadow-md ${
                    activeTab === tab.id
                      ? "bg-teal-600 text-white scale-105"
                      : "bg-white text-gray-800 border hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Highlights / Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
            {[
              { value: 500, suffix: "+", label: "Professionals Placed" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 24, suffix: "/7", label: "Service Availability" },
            ].map((stat, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <h2 className="text-3xl font-bold text-teal-600">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                </h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getServices().map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 p-4 flex flex-col"
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover h-48 w-full"
                />
                <div className="mt-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    {service.icon}
                    <h3 className="text-xl font-bold text-gray-800">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mt-2 flex-grow">
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    className="mt-4 inline-block text-teal-600 font-semibold hover:underline"
                  >
                    {service.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Case Study Link */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <a
              href="/caseStudies"
              target="_blank"
              className="text-teal-600 underline text-sm font-medium"
            >
              📄 Download Full Case Study (PDF)
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Services;