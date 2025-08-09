"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactHomePage";
import { Briefcase, Building2, Users } from "lucide-react";

const recruitmentServices = [
  {
    name: "Staffing Services",
    link: "/staffBankSolution",
    image: "/services/med1.jpg",
    description:
      "Comprehensive staffing support across healthcare, cleaning, security, hospitality, and more.",
    cta: "View Staffing Options →",
  },
  {
    name: "Workforce Management",
    link: "/workforceManagement",
    image: "/services/1.jpg",
    description:
      "Efficient solutions for scheduling, monitoring, and optimizing workforce productivity across sectors.",
    cta: "Optimize Workforce →",
  },
  {
    name: "Recruitment Solutions",
    link: "/recruitmentProcessOut",
    image: "/services/2.jpg",
    description:
      "Custom recruitment strategies to meet unique staffing demands for short- or long-term engagements.",
    cta: "Tailored Hiring Plans →",
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
  },
  {
    name: "Engineering & Maintenance",
    link: "/engineeringConstruction",
    image: "/services/2.jpg",
    description:
      "Ensure optimal operation of infrastructure with our expert engineering services.",
    cta: "View Engineering Plans →",
  },
  {
    name: "Integrated Facilities Management",
    link: "/facilitiesTransformation",
    image: "/services/9.jpg",
    description:
      "Streamline operations with a holistic approach to facilities management.",
    cta: "Discover Facility Management →",
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
  },
  {
    name: "Community Engagement & Events",
    link: "/communityEngagement",
    image: "/services/33.jpg",
    description:
      "Building meaningful connections through local events, engagement strategies, and inclusive community experiences.",
    cta: "See Engagement Programs →",
  },
  {
    name: "Housing Management",
    link: "/housingManagement",
    image: "/services/44.jpg",
    description:
      "Professional management of residential properties ensuring tenant satisfaction, compliance, and efficiency.",
    cta: "Learn About Housing Plans →",
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
            className="max-w-4xl bg-white bg-opacity-90 p-10 ml-8 rounded-lg shadow-lg"
            data-aos="fade-right"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              What We Offer
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Discover a wide range of recruitment, facility, and community services tailored to meet your needs.
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
            <button
              onClick={() => setActiveTab("recruitment")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition ${
                activeTab === "recruitment"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <Briefcase size={18} />
              Recruitment Services
            </button>
            <button
              onClick={() => setActiveTab("facility")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition ${
                activeTab === "facility"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <Building2 size={18} />
              Facility Management
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition ${
                activeTab === "community"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <Users size={18} />
              Community Services
            </button>
          </div>

          {/* Highlights/Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold text-teal-600">500+</h2>
              <p className="text-gray-600">Professionals Placed</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h2 className="text-3xl font-bold text-teal-600">98%</h2>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-3xl font-bold text-teal-600">24/7</h2>
              <p className="text-gray-600">Service Availability</p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getServices().map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 p-4 flex flex-col"
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
                  <h3 className="text-xl font-bold text-gray-800">
                    {service.name}
                  </h3>
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

          {/* Optional: Case study download & video */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <a
              href="/caseStudies"
              target="_blank"
              className="text-teal-600 underline text-sm font-medium"
            >
              📄 Download Full Case Study (PDF)
            </a>
            {/* <ReactPlayer url="https://www.youtube.com/watch?v=..." /> */}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Services;
