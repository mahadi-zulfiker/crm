import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Brief = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Demand Recruitment Services Ltd
          </h2>
        </div>

        {/* Main Content */}
        <div
          className="border-t-4 border-teal-600 bg-white p-8 shadow-md rounded-md"
          data-aos="fade-up"
        >
          <p className="text-lg text-gray-700 text-justify leading-relaxed">
            Your trusted partner for flexible workforce solutions. We specialize
            in delivering high-quality staffing across healthcare, hospitality,
            and facilities management — empowering businesses and professionals
            across the UK.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brief;
