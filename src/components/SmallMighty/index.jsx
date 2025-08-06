"use client";
import React, { useEffect, useRef } from "react";
import "animate.css";

function SmallMighty() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 animate-on-scroll">
          The Power of Precision Staffing
        </h2>
        <p className="text-lg text-gray-700 mb-8 animate-on-scroll">
          Demand Recruitment Services Ltd delivers comprehensive staffing solutions designed to empower your business.
          From permanent placements to flexible temporary staff and strategic managed service provisions, we connect
          you with the exceptional talent needed to achieve your organizational goals. Our expertise spans Managed
          Service Provision (MSP), Facility Management, and Community Services, ensuring efficient and effective
          workforce management across diverse industries.
        </p>

        <div className="py-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 animate-on-scroll">
            Tangible Results, Real Impact
          </h3>
          <p className="text-gray-600 mb-8 animate-on-scroll">
            The numbers speak for themselves. Here's a glimpse into the scale and efficiency we bring to workforce
            management:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { number: "14,569,103", text: "Shifts planned annually (avg.)" },
              { number: "47,992", text: "Annual leave requests (avg.)" },
              { number: "598,365", text: "Annual overtime hours (avg.)" },
              { number: "36", text: "Countries with our solutions" },
              { number: "435+", text: "Average client company size" },
              { number: "10", text: "Dedicated support phone lines" },
              { number: "146+", text: "Hours of support video content" },
              { number: "10,452", text: "Annual hot beverage consumption" },
              { number: "< 1", text: "Minutes of unscheduled downtime (since inception)" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 animate-on-scroll"
              >
                <p className="text-3xl font-bold text-teal-600">{item.number}</p>
                <p className="text-gray-700 mt-2 text-md font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmallMighty;