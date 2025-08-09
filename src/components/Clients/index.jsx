'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Clients = () => {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Using real image paths and placeholder logo URLs as a fallback
  const logos = [
    {
      src: "/clients/client1.png",
      alt: "Client A"
    },
    {
      src: "/clients/client2.png",
      alt: "Client B"
    },
    {
      src: "/clients/client3.png",
      alt: "Client C"
    },
    {
      src: "/clients/client4.png",
      alt: "Client D"
    },
    {
      src: "/clients/client1.png",
      alt: "Client E"
    },
    {
      src: "/clients/client2.png",
      alt: "Client F"
    },
  ];

  const stats = [
    { number: 500, label: "Clients Served", prefix: "+", suffix: "" },
    { number: 95, label: "Satisfaction Rate", prefix: "", suffix: "%" },
    { number: 24, label: "Customer Support", prefix: "", suffix: "/7" },
    { number: 10, label: "Years of Experience", prefix: "", suffix: "+" },
  ];

  // Use a state to control the start of the count animation
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Start the animation when the component comes into view
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <section className="bg-white py-24 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4" data-aos="fade-up">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Our commitment to excellence has earned the trust of companies worldwide.
          </p>
        </div>

        {/* Client Logos with improved hover effects */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-20" data-aos="fade-up" data-aos-delay="200">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={`#`} // Placeholder link, replace with real URLs
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer transition-transform duration-300 transform hover:scale-110"
              title={`View case study for ${logo.alt}`}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={70}
                className="object-contain grayscale-0 transition duration-300"
              />
            </a>
          ))}
        </div>

        {/* Animated Stats Cards with a more polished design */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-400 hover:scale-[1.03] space-y-3 flex flex-col justify-center items-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-teal-50 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
              <div className="relative z-10 text-5xl font-extrabold text-teal-600 drop-shadow-md transition-colors duration-300 group-hover:text-gray-800">
                {hasAnimated ? (
                  <CountUp
                    start={0}
                    end={item.number}
                    duration={2.5}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                ) : (
                  // Display a non-animated value before it's in view
                  `${item.prefix}${item.number}${item.suffix}`
                )}
              </div>
              <div className="relative z-10 text-md md:text-lg font-medium text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;


  // const logos = [
  //   "/clients/client1.png",
  //   "/clients/client2.png",
  //   "/clients/client3.png",
  //   "/clients/client4.png",
  // ];
