"use client"
import React, { useEffect, useState } from "react";
import Vendors from "@/components/vendors";
import Image from "next/image";
import img1 from "../../../public/about-us/about-1.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Award, Users, CheckCircle, Lightbulb } from 'lucide-react';
import { motion } from "framer-motion";
import team1 from "../../../public/team/team1.jpg";
import team2 from "../../../public/team/team2.jpg";
import team3 from "../../../public/team/team3.jpg";
import whoImage1 from "../../../public/services/1.jpg";
import whoImage2 from "../../../public/services/2.jpg";

const AboutUs = () => {
  const [gradient, setGradient] = useState(
    "bg-gradient-to-r from-blue-50 to-blue-100"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGradient(
        gradient === "bg-gradient-to-r from-blue-50 to-blue-100"
          ? "bg-gradient-to-r from-blue-100 to-blue-200"
          : "bg-gradient-to-r from-blue-50 to-blue-100"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [gradient]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="bubble"
              style={{
                "--i": Math.random() * (30 - 10) + 10,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * (15 - 8) + 8}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-extrabold text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 1 }}
          >
            Driven by People, Defined by Purpose.
          </motion.h2>
          <motion.p
            className="mt-6 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Demand Recruitment Services Ltd started as a recruitment company with a vision to bridge the gap between businesses and skilled professionals. Over the years, we have grown into a comprehensive staffing solutions provider, offering Managed Service Provision, Facility Management, and Community Services staffing.
          </motion.p>
        </div>

        <style jsx>{`
          .bubble {
            position: absolute;
            bottom: -50px;
            width: calc(var(--i) * 1px);
            height: calc(var(--i) * 1px);
            background: rgba(173, 216, 230, 0.6);
            border-radius: 50%;
            opacity: 0.9;
            animation: floatBubble linear infinite;
          }

          @keyframes floatBubble {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.9;
            }
            50% {
              transform: translateY(-50vh) scale(1.1);
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) scale(1.2);
              opacity: 0;
            }
          }
        `}</style>
      </section>

      {/* Who We Are Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Who We Are
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          We are a dynamic and trusted recruitment agency committed to delivering staffing solutions that go beyond expectations. With a strong focus on healthcare, facilities, and community support, we bring together top talent and leading organisations to improve lives and outcomes.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Image src={whoImage1} alt="Team" className="rounded-xl shadow-md w-full h-auto object-cover" />
          <Image src={whoImage2} alt="Meeting" className="rounded-xl shadow-md w-full h-auto object-cover" />
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Top-left square */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom-right square */}
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-orange-500 rounded-sm translate-x-1/2 translate-y-1/2"></div>

        <motion.div
          className="border-r-2 border-teal-600 pr-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            Our mission is to simplify hiring by providing businesses with reliable workforce solutions and empowering job seekers with meaningful career opportunities.
          </p>
        </motion.div>

        <motion.div
          className="pl-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 text-lg">
            To be the leading staffing partner known for quality, efficiency, and innovation in workforce solutions.
          </p>
        </motion.div>
      </section>


      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="text-teal-600 mb-4" size={36} />,
                title: "Integrity",
                desc: "We operate with honesty, transparency, and strong moral principles in everything we do."
              },
              {
                icon: <Award className="text-teal-600 mb-4" size={36} />,
                title: "Excellence",
                desc: "We are committed to delivering high-quality service and going above expectations."
              },
              {
                icon: <Users className="text-teal-600 mb-4" size={36} />,
                title: "Collaboration",
                desc: "We foster teamwork, communication, and meaningful partnerships."
              },
              {
                icon: <CheckCircle className="text-teal-600 mb-4" size={36} />,
                title: "Accountability",
                desc: "We take responsibility for our actions and deliver consistent, measurable results."
              },
              {
                icon: <Lightbulb className="text-teal-600 mb-4" size={36} />,
                title: "Innovation",
                desc: "We embrace new ideas and adapt to the evolving workforce landscape."
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                {value.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-md">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Meet Our Leadership Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: team1, name: "Robert Lee", title: "Founder & CEO" },
              { img: team2, name: "John Malik", title: "Director of Operations" },
              { img: team3, name: "Sara Lee", title: "Head of Recruitment" },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Image src={member.img} alt={member.name} className="rounded-full mx-auto mb-4 w-32 h-32 object-cover" />
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Vendors />
      <Footer />
    </div>
  );
};

export default AboutUs;
