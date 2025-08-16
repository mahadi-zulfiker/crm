// pages/rpo.js

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import Head from "next/head";
import {
  FaCheckCircle,
  FaUserTie,
  FaChartLine,
  FaCogs,
  FaPhoneAlt,
  FaDatabase,
  FaUsers,
  FaHandshake,
  FaFileAlt,
  FaPlayCircle,
} from "react-icons/fa";

export default function RPO() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>
          Recruitment Process Outsourcing – Smarter, Faster, Cost-Effective
          Hiring | Demand Recruitment Services Ltd
        </title>
        <meta
          name="description"
          content="Streamline your healthcare recruitment with Demand Recruitment Services Ltd's RPO solution."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section with Background Image */}
        <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Content */}
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              Recruitment Process Outsourcing
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Smarter, Faster, Cost-Effective Hiring
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose Our RPO Solution?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                We manage your entire recruitment process, from identifying
                vacancies to onboarding, allowing you to focus on what matters
                most.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                Our RPO solutions help you reduce costs, improve hiring speed,
                and deliver a better candidate experience—attracting top-tier
                talent efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Benefits of Our RPO Solutions
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaUsers,
                  title: "Unrivalled Global Talent Network",
                  desc: "30+ years of experience with a vast network of healthcare professionals and 100+ partners worldwide.",
                },
                {
                  icon: FaChartLine,
                  title: "Faster Hiring, Reduced Time-to-Fill",
                  desc: "Streamlined processes that speed up hiring, improving application-to-offer ratios.",
                },
                {
                  icon: FaCogs,
                  title: "Next-Level Candidate Attraction",
                  desc: "Data-driven marketing strategies and a people-first approach to attract the best talent.",
                },
                {
                  icon: FaPhoneAlt,
                  title: "Dedicated Recruitment Partner",
                  desc: "A specialized team works as an extension of your organization to enhance your employer brand.",
                },
                {
                  icon: FaDatabase,
                  title: "Top-Quality, Compliant Talent",
                  desc: "We ensure top-quality candidates while maintaining compliance and regulatory standards.",
                },
                {
                  icon: FaHandshake,
                  title: "Cost Savings & Improved Hiring Speed",
                  desc: "Reduce vacancy rates, cut hiring times, and save money with our streamlined hiring process.",
                },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4"
                >
                  <Icon className="text-3xl mx-auto text-gray-600" />
                  <h3 className="font-semibold text-xl">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Learn More About Our RPO Services
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Discover how our RPO solutions can transform your healthcare
              recruitment process and improve hiring outcomes.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                { text: "Request a Case Study", icon: FaFileAlt },
                { text: "Watch Our RPO Webinar", icon: FaPlayCircle },
              ].map(({ text, icon: Icon }, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                  <Icon className="text-xl text-gray-700" />
                  <span className="text-gray-800 font-medium">{text}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Let’s Talk About Recruitment Process Outsourcing!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Request a call back and learn how our RPO solution can streamline
              your recruitment process.
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
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Request a Call Back
              </button>
              <p className="text-sm text-gray-600 text-center">
                Get in touch today and discover a smarter approach to healthcare
                recruitment!
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
