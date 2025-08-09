'use client'

import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaHeartbeat, FaConciergeBell, FaWrench } from 'react-icons/fa';

const Brief = () => {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Cycle through service items every 3 seconds
  useEffect(() => {
    const serviceItems = [
      { name: "Healthcare", icon: <FaHeartbeat /> },
      { name: "Hospitality", icon: <FaConciergeBell /> },
      { name: "Facilities Management", icon: <FaWrench /> },
    ];
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % serviceItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const serviceItems = [
    { name: "Healthcare", icon: <FaHeartbeat /> },
    { name: "Hospitality", icon: <FaConciergeBell /> },
    { name: "Facilities Management", icon: <FaWrench /> },
  ];

  const currentService = serviceItems[currentServiceIndex];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Demand Recruitment Services Ltd
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We connect top talent with life-changing roles across the UK. We specialize in delivering high-quality staffing across multiple sectors, empowering both businesses and professionals.
          </p>
        </div>

        {/* Main Content with Animated Service Showcase */}
        <div className="flex flex-col lg:flex-row items-center bg-white p-8 md:p-12 shadow-xl rounded-2xl border border-gray-100" data-aos="fade-up" data-aos-delay="200">
          
          {/* Main Brief Text */}
          <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Our Expertise</h3>
            <p className="text-lg text-gray-700 text-justify leading-relaxed">
              At Demand Recruitment Services, we pride ourselves on being the bridge between ambitious professionals and leading organizations. Our deep industry knowledge allows us to consistently place the right people in the right roles, creating successful partnerships that drive growth and innovation.
            </p>
          </div>

          {/* Animated Services Showcase */}
          <div className="relative lg:w-1/3 flex items-center justify-center p-6 bg-teal-50 rounded-2xl overflow-hidden shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                key={currentServiceIndex} // Use key to trigger re-animation on state change
                className="flex flex-col items-center justify-center text-teal-800 animate-service-fade"
              >
                <div className="text-6xl mb-4">
                  {currentService.icon}
                </div>
                <div className="text-xl font-bold">
                  {currentService.name}
                </div>
              </div>
            </div>
            <div className="w-48 h-48 rounded-full bg-teal-200 opacity-30 animate-pulse"></div>
          </div>

        </div>
      </div>
      <style jsx>{`
        @keyframes service-fade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-service-fade {
          animation: service-fade 3s ease-in-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Brief;