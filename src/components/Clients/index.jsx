import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const stepTime = 1000 / stat.number;
      return setInterval(() => {
        setCounters((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.number) {
            updated[index] += 1;
          }
          return updated;
        });
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="bg-white py-10 px-4 rounded-xl shadow">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10" data-aos="fade-up">
        Trusted by Industry Leaders
      </h2>

      {/* Client Logos */}
      <div className="flex flex-wrap justify-center items-center gap-16 mb-12" data-aos="fade-up">
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Client ${index + 1}`}
            width={100}
            height={50}
            className="object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        ))}
      </div>

      {/* Animated Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto" data-aos="fade-up">
        {stats.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-3xl font-bold text-teal-600">
              {counters[index]}
              {item.suffix || ""}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
