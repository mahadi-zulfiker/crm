import React from "react";
import "animate.css";

const Banner = () => {
  return (
    <div className="relative w-full h-[100vh]">
      {/* Background Video */}
      <video
        src="/hero.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold animate__animated animate__fadeInDown leading-tight">
          Find Your Dream Job with Demand Recruitment Services
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg animate__animated animate__fadeInUp animate__delay-1s">
          Connecting top talent with the best opportunities. Your next big break starts here.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center w-full max-w-xl mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search for jobs"
            className="w-full sm:flex-grow px-4 py-3 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition duration-300">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-3 sm:gap-4">
          {[
            "Healthcare",
            "Construction",
            "Hospitality",
            "IT & Legal",
            "Admin & HR",
            "Security",
            "Haulage & Driving",
          ].map((category, index) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-800 hover:bg-orange-500 text-white rounded-md transition duration-300 animate__animated animate__fadeInUp"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
