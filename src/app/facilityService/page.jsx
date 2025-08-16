"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaBroom,
  FaTools,
  FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const selectedServices = [
  {
    name: "Cleaning & Hygiene Services",
    link: "/cleaningServices",
    image: "/1111.jpg",
    description:
      "Maintain a safe, sanitary, and welcoming environment for staff and visitors.",
    icon: <FaBroom className="text-teal-600 text-3xl" />,
    stat: {
      icon: <FaCheckCircle className="text-teal-600" />,
      text: "99% Hygiene Compliance",
    },
  },
  {
    name: "Engineering & Maintenance",
    link: "/engineeringConstruction",
    image: "/services/2.jpg",
    description:
      "Ensure optimal operation of infrastructure with our expert engineering services.",
    icon: <FaTools className="text-teal-600 text-3xl" />,
    stat: {
      icon: <FaCheckCircle className="text-teal-600" />,
      text: "24/7 Maintenance Support",
    },
  },
  {
    name: "Integrated Facilities Management",
    link: "/facilitiesTransformation",
    image: "/services/9.jpg",
    description:
      "Streamline operations with a holistic approach to facilities management.",
    icon: <FaBuilding className="text-teal-600 text-3xl" />,
    stat: {
      icon: <FaCheckCircle className="text-teal-600" />,
      text: "100+ Facilities Managed",
    },
  },
];

const FacilityManagement = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <StickyHeader />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gray-900 overflow-hidden">
        <Image
          src="/services/2.jpg"
          alt="Facility Management in the UK"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 max-w-3xl px-4">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
            data-aos="fade-up"
          >
            Facility Management
          </h1>
          <p
            className="text-lg md:text-xl text-gray-200 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Streamlined Solutions for Smarter Facilities.
          </p>
          {/* Trust badges */}
          <div
            className="flex justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md">
              <FaCheckCircle className="text-green-500" /> CQC Certified
            </span>
            <span className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md">
              <FaShieldAlt className="text-blue-500" /> GDPR Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="container mx-auto px-6 pt-12 pb-16 grid md:grid-cols-3 gap-10">
        {selectedServices.map((service, idx) => (
          <motion.div
            key={idx}
            className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="relative h-56">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-[280px]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {service.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {service.stat.icon}
                  <span>{service.stat.text}</span>
                </div>
              </div>
              <Link
                href={service.link}
                className="block text-center bg-teal-600 text-white font-semibold py-3 rounded-md hover:bg-teal-700 transition-all duration-300 mt-4"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-teal-50 py-12 text-center">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {[
            { label: "Client Satisfaction", value: 95, suffix: "%" },
            { label: "Facilities Served", value: 150, suffix: "+" },
            { label: "Maintenance Requests", value: 5000, suffix: "+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <h3 className="text-4xl font-bold text-teal-600">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                />
              </h3>
              <p className="text-gray-700 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center mt-10 mb-16">
        <Link href="/contactUs">
          <span className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300 ease-in-out shadow-md">
            Get in Touch
          </span>
        </Link>
      </section>

      {/* Contact with GDPR */}
      <section className="container mx-auto px-6 pb-16">
        <ContactUsHomePage
          extraFields={
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" id="gdpr" className="w-4 h-4" />
              <label htmlFor="gdpr" className="text-sm text-gray-600">
                I consent to having this website store my submitted information
                in accordance with the privacy policy.
              </label>
            </div>
          }
        />
      </section>

      <Footer />
    </>
  );
};

export default FacilityManagement;

// const selectedServices = [
//   {
//     name: "Cleaning & Hygiene Services",
//     link: "/cleaningServices",
//     image: "/1111.jpg",
//     description:
//       "Maintain a safe, sanitary, and welcoming environment for staff and visitors.",
//   },
//   {
//     name: "Engineering & Maintenance",
//     link: "/engineeringConstruction",
//     image: "/services/2.jpg",
//     description:
//       "Ensure optimal operation of infrastructure with our expert engineering services.",
//   },
//   {
//     name: "Integrated Facilities Management",
//     link: "/facilitiesTransformation",
//     image: "/services/9.jpg",
//     description:
//       "Streamline operations with a holistic approach to facilities management.",
//   },
// ];
