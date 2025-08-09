import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Clients = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const logos = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
  ];

  const stats = [
    { number: 500, label: "Clients Served" },
    { number: 95, label: "Satisfaction Rate", suffix: "%" },
    { number: 24, label: "Customer Support", suffix: "/7" },
    { number: 10, label: "Years of Experience", suffix: "+" },
  ];

  // Detect when stats come into view
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-white py-10 px-4 rounded-xl shadow">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10" data-aos="fade-up">
        Trusted by Industry Leaders
      </h2>

      {/* Client Logos (clickable) */}
      <div className="flex flex-wrap justify-around items-center mb-12" data-aos="fade-up">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={`/case-studies/client${index + 1}`} // Replace with real URLs
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={logo}
              alt={`Client ${index + 1}`}
              width={100}
              height={50}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </a>
        ))}
      </div>

      {/* Animated Stats (trigger on scroll) */}
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto"
        data-aos="fade-up"
      >
        {stats.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-4xl font-extrabold text-teal-600 drop-shadow-sm">
              {inView ? (
                <CountUp end={item.number} duration={2} suffix={item.suffix || ''} />
              ) : (
                0
              )}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
