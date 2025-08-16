// pages/managed-services.js

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import Head from "next/head";
import {
  FaCheckCircle,
  FaChartLine,
  FaMobileAlt,
  FaUserTie,
  FaCogs,
  FaClock,
  FaDatabase,
  FaFileAlt,
  FaPlayCircle,
} from "react-icons/fa";

export default function ManagedServices() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>
          Managed Staffing Solutions – Demand Recruitment Services Ltd
        </title>
        <meta
          name="description"
          content="Seamless, cost-effective workforce management with end-to-end staffing solutions tailored for NHS Trusts."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              Managed Staffing Solutions
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Seamless, Cost-Effective Workforce Management
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Simplify Workforce Management with Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                We leverage our vast network of 100+ supply partners,
                cutting-edge technology, and industry expertise to ensure you
                have access to the right clinicians, when you need them.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                Our experts become an extension of your team, working across
                departments to analyze demand, improve efficiency, and deliver
                measurable cost savings.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                With a trusted network of healthcare professionals, we guarantee
                high fill rates, strict compliance, and top-quality care—aligned
                with NHS standards.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <p>
                As a framework-approved provider, we offer flexible vendor
                models tailored to your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Benefits of Our Managed Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaCheckCircle,
                  title: "Patient Safety First",
                  desc: "Improved fill rates mean better continuity of care and patient outcomes.",
                },
                {
                  icon: FaChartLine,
                  title: "Gain-Share Savings",
                  desc: "Reduce third-party spend with clear cost savings through structured models.",
                },
                {
                  icon: FaCogs,
                  title: "Smart Rate Management",
                  desc: "Reduce-and-replace strategies ensure cost-efficient, top-tier hires.",
                },
                {
                  icon: FaUserTie,
                  title: "Vendor Oversight",
                  desc: "Manage all supplier contracts, audits, and SLAs with ease.",
                },
                {
                  icon: FaDatabase,
                  title: "Quality Talent Access",
                  desc: "100% compliance and vetting of all healthcare professionals.",
                },
                {
                  icon: FaClock,
                  title: "Streamlined Processes",
                  desc: "We manage the entire recruitment journey so you can focus on care.",
                },
                {
                  icon: FaFileAlt,
                  title: "Real-Time Insights",
                  desc: "Track fill rates, cost savings, and workforce use by department or ward.",
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
              See Our Impact in Action!
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Click below to explore our latest case studies:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                {
                  text: "Cheshire & Wirral Partnership – Staffing Transformation Case Study",
                  icon: FaFileAlt,
                },
                {
                  text: "East Suffolk & North Essex – Cost-Efficient Staffing Approach",
                  icon: FaFileAlt,
                },
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
              Let’s Talk About Managed Services!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Our UK team is ready to help you streamline your workforce and
              improve patient care.
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
                  submitted information to provide updates on workforce
                  solutions.
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
                staffing!
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
