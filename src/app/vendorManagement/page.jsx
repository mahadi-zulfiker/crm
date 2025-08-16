// pages/vendor-management.js

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import Head from "next/head";
import {
  FaCheckCircle,
  FaGlobe,
  FaShieldAlt,
  FaCogs,
  FaCalendarAlt,
  FaBolt,
  FaChartPie,
  FaFileInvoice,
} from "react-icons/fa";

export default function VendorManagement() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>
          Vendor Management Solution – Demand Recruitment Services Ltd
        </title>
        <meta
          name="description"
          content="Streamline administration, ensure compliance, and gain control over your temporary staffing operations with our Vendor Management Solution."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              Vendor Management Solution
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Smarter, Safer, More Efficient Temporary Staffing
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-white shadow-lg rounded-2xl p-8 border">
            <p className="text-lg text-gray-700 text-center">
              Managing temporary workers is essential for flexible, responsive
              healthcare services, but it also brings significant administrative
              challenges— from tracking shifts and rates to ensuring compliance
              and managing agency cascades.
            </p>
            <p className="mt-4 text-lg text-gray-700 text-center">
              At <strong>Demand Recruitment Services Ltd</strong>, our vendor
              management solution brings together{" "}
              <strong>People, Processes, and Technology</strong> to:
            </p>
            <ul className="mt-8 space-y-4 text-gray-700 max-w-3xl mx-auto list-disc pl-6">
              <li>
                <strong>Streamline Administration</strong> – Reduce manual
                processes and automate workforce management for greater
                efficiency.
              </li>
              <li>
                <strong>Enhance Visibility & Control</strong> – Gain real-time
                insights into bookings, compliance, agency engagement, and
                invoicing.
              </li>
              <li>
                <strong>Improve Patient Safety</strong> – Trusted by 17
                hospitals across Ireland, ensuring the right staff are in place
                at the right time.
              </li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Our Vendor Management Solution?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaGlobe,
                  title: "Web-Based Technology",
                  desc: "Secure cloud portal accessible anytime, anywhere.",
                },
                {
                  icon: FaShieldAlt,
                  title: "Enhanced Patient Safety",
                  desc: "Full compliance transparency with audit trail.",
                },
                {
                  icon: FaCogs,
                  title: "Customisable Authorisation",
                  desc: "Control bookings from vacancy to timesheet approval.",
                },
                {
                  icon: FaCalendarAlt,
                  title: "Effortless Rostering",
                  desc: "Add shifts and assign staff with a user-friendly calendar.",
                },
                {
                  icon: FaBolt,
                  title: "Automated Cascades",
                  desc: "Align with HSE Framework to fill shifts quickly.",
                },
                {
                  icon: FaChartPie,
                  title: "Comprehensive Reporting",
                  desc: "Track demand, spend, and performance with ease.",
                },
                {
                  icon: FaFileInvoice,
                  title: "Simplified Invoicing & Billing",
                  desc: "Consolidated billing and improved cost control.",
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

        {/* CTA */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let’s Talk About Vendor Management Solutions!
            </h2>
            <p className="mb-6 text-gray-600 text-lg">
              Our UK team is ready to help you streamline administration,
              improve compliance, and gain full control over temporary staffing.
            </p>
            <form className="space-y-6 bg-gray-100 p-8 rounded-lg shadow-md">
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
                Get in touch today and optimise your staffing management!
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
