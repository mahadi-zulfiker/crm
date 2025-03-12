import React from "react";

function Banner() {
  return (
    <div className="relative w-full h-[90vh]">
      {/* Background Video */}
      <video
        src="/hero.mp4" // Make sure to place the video in the 'public/videos' directory
        type="video/mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold">
          Find Your Dream Job with Demand Recruitment Services
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm md:text-lg">
          Connecting top talent with the best opportunities. Your next big break starts here.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-2xl mt-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for jobs"
            className="flex-grow px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mt-8 space-x-2">
          {["Healthcare","Construction","Hospitality","IT & Legal","Admin & HR","Security","Haulage & Driving"].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-800 hover:bg-orange-500 text-white rounded-md transition duration-300"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
