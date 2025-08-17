"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import StickyHeader from "@/components/StickyHeader";
import { CheckCircle } from "lucide-react";
import {
  FaFileAlt,
  FaPlayCircle,
  FaHardHat,
  FaBuilding,
  FaChartLine,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EngineeringConstruction() {
  const [activeTab, setActiveTab] = useState("Safety");

  const capabilities = {
    Safety: [
      {
        title: "Strict Safety Standards",
        desc: "95%+ safety compliance rating across client projects.",
      },
      {
        title: "Certified Workforce",
        desc: "All workers vetted for health, safety & compliance training.",
      },
    ],
    Hiring: [
      {
        title: "Rapid Placement",
        desc: "Average time-to-hire: under 10 days for skilled roles.",
      },
      {
        title: "Tailored Matching",
        desc: "Cultural fit and technical expertise aligned with your project.",
      },
    ],
    Cost: [
      {
        title: "Cost-Efficient Recruitment",
        desc: "Streamlined hiring reduces project overheads.",
      },
      {
        title: "Flexible Contracts",
        desc: "Permanent, temporary & on-demand models to fit budgets.",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <StickyHeader />
      <Head>
        <title>
          Engineering & Construction Recruitment | Demand Recruitment Services
          Ltd
        </title>
        <meta
          name="description"
          content="Specialized recruitment services for FM engineering and construction sectors, delivering safe, skilled, and reliable workforce solutions."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/43.jpg')] bg-cover bg-center text-white py-28 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-5xl mx-auto">
            <motion.h1
              className="text-5xl font-bold drop-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Engineering & Construction Recruitment
            </motion.h1>
            <motion.p
              className="mt-4 text-xl drop-shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connecting You with Skilled Professionals for Successful Projects
            </motion.p>

            {/* KPI badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md font-semibold">
                ⚡ Avg. Placement Speed:{" "}
                <span className="text-green-600">10 Days</span>
              </span>
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md font-semibold">
                🛡️ Safety Rating: <span className="text-green-600">95%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Distinction Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Two Specialized Recruitment Streams
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                >
                  <FaHardHat className="text-teal-600 text-4xl mb-4" />
                  <h3 className="font-semibold text-xl mb-2">
                    FM Engineering Recruitment
                  </h3>
                  <p>
                    Technical engineers, maintenance experts, and facilities
                    specialists ensuring operational excellence.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                >
                  <FaBuilding className="text-blue-600 text-4xl mb-4" />
                  <h3 className="font-semibold text-xl mb-2">
                    Construction Recruitment
                  </h3>
                  <p>
                    Project managers, skilled trades, and laborers delivering
                    construction success across the UK.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Capabilities Section */}
            <div className="bg-gray-50 py-10 px-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Our Engineering & Construction Capabilities
              </h2>
              {/* Tabs */}
              <div className="flex justify-center gap-4 mb-8">
                {Object.keys(capabilities).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full font-semibold transition ${
                      activeTab === tab
                        ? "bg-teal-600 text-white"
                        : "bg-white border shadow text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-6">
                {capabilities[activeTab].map(({ title, desc }, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-xl shadow flex gap-4"
                  >
                    <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Showcase Projects */}
            <div className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Trusted by Leading UK Projects
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                We’ve successfully staffed engineering & construction projects
                nationwide.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {[
                  "/clients/client1.png",
                  "/clients/client2.png",
                  "/clients/client3.png",
                  "/clients/client4.png",
                ].map((logo, idx) => (
                  <motion.img
                    key={idx}
                    src={logo}
                    alt="Client Logo"
                    className="h-12 mx-auto grayscale hover:grayscale-0 transition"
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Explore Section */}
            <div className="bg-gray-100 p-8 rounded-xl shadow">
              <h2 className="text-4xl font-bold mb-6 text-center">
                Explore Our Recruitment Expertise
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Learn how we’ve successfully placed talent in engineering and
                construction projects of all scales.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    text: "View Engineering Recruitment Case Study",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Watch Construction Staffing Overview Video",
                    icon: FaPlayCircle,
                  },
                  {
                    text: "Download Project Staffing Checklist",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Watch Our Safety & Compliance Webinar",
                    icon: FaPlayCircle,
                  },
                ].map(({ text, icon: Icon }, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                  >
                    <Icon className="text-xl text-gray-700" />
                    <span className="text-gray-800 font-medium">{text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 py-10 px-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Get in Touch with Our Recruitment Team
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Whether you need skilled engineers or construction specialists,
                we’re here to help you build success.
              </p>
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    I consent to have Demand Recruitment Services Ltd store my
                    submitted information for updates.
                  </span>
                </label>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition w-full md:w-auto"
                >
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Let’s build your perfect team together.
                </p>
              </form>
            </div>
          </div>

          {/* WhatsApp Live Chat */}
          <motion.a
            href="https://wa.me/442038761531"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-xl hover:bg-green-600 transition-all duration-300 z-50 transform hover:scale-110"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaWhatsapp className="w-8 h-8" />
          </motion.a>

          {/* Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Access
              </h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                👷 Request Staff
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>FM Engineers & Specialists</li>
                <li>Project Managers & Trades</li>
                <li>Safety & Compliance Focus</li>
                <li>Temporary & Permanent Staffing</li>
                <li>Rapid & Reliable Hiring</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
