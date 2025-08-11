"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
  FaHome,
  FaHandsHelping,
} from "react-icons/fa";
import CountUp from "react-countup";

const services = [
  {
    name: "Supported Living",
    subtitle: "Safe, compassionate care",
    link: "/supportedLiving",
    image: "/services/41.jpg",
    description:
      "Providing compassionate and structured support for individuals in supported living environments.",
    icon: <FaHandsHelping className="text-teal-600 text-3xl" />,
  },
  {
    name: "Community Engagement & Events",
    subtitle: "Connecting people & opportunities",
    link: "/communityEngagement",
    image: "/services/33.jpg",
    description:
      "Building meaningful connections through local events, engagement strategies, and inclusive community experiences.",
    icon: <FaUsers className="text-teal-600 text-3xl" />,
  },
  {
    name: "Housing Management",
    subtitle: "Tenant-first property care",
    link: "/housingManagement",
    image: "/services/44.jpg",
    description:
      "Professional management of residential properties ensuring tenant satisfaction, compliance, and efficiency.",
    icon: <FaHome className="text-teal-600 text-3xl" />,
  },
];

export default function CommunityServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gray-900 overflow-hidden">
        <Image
          src="/services/41.jpg"
          alt="Community Services UK"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 max-w-3xl px-4">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
            data-aos="fade-up"
          >
            Community Services
          </h1>
          <p
            className="text-lg md:text-xl text-gray-200 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            “We don’t just provide services — we build communities of care.”
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
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            data-aos="fade-up"
            data-aos-delay={i * 150}
          >
            <div className="relative h-56">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-[280px]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {service.icon}
                  <h3 className="text-2xl font-semibold">{service.name}</h3>
                </div>
                <p className="text-teal-600 text-sm font-medium mb-3">
                  {service.subtitle}
                </p>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
              <Link
                href={service.link}
                className="block text-center bg-teal-600 text-white font-semibold py-3 rounded-md hover:bg-teal-700 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-teal-50 py-12 text-center">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {[
            { label: "Client Satisfaction", value: 98, suffix: "%" },
            { label: "Event Participants", value: 10000, suffix: "+" },
            { label: "Properties Managed", value: 500, suffix: "+" },
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
}
