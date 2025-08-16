import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { CheckCircle, ArrowRight } from "lucide-react";
import {
  FaFileAlt,
  FaPlayCircle,
  FaCertificate,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";

export default function IntegratedFacilitiesManagement() {
  return (
    <>
      <Navbar />
      <StickyHeader />
      <Head>
        <title>
          Integrated Facilities Management | Demand Recruitment Services Ltd
        </title>
        <meta
          name="description"
          content="Achieve cost savings and operational excellence with our comprehensive Integrated Facilities Management solutions."
        />
      </Head>

      <main className="bg-gray-50 text-gray-900 font-sans">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/4.jpg')] bg-cover bg-center text-white py-28 text-center px-4">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
          <div className="relative max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Integrated Facilities Management
            </h1>
            <p className="mt-4 text-lg md:text-xl font-medium drop-shadow-md">
              Streamline your operations, unify your teams, and achieve
              significant cost savings with our integrated approach.
            </p>
          </div>
        </section>

        {/* Main Content Section with Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction & Value Proposition */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
                Your Single Solution for Comprehensive Property Management
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                  <p className="text-lg text-gray-700 leading-relaxed font-normal">
                    Managing a facility can be complex, with multiple vendors,
                    disjointed communication, and unpredictable costs. Our
                    <strong className="text-teal-600">
                      {" "}
                      Integrated Facilities Management
                    </strong>{" "}
                    (IFM) services cut through this complexity by providing a
                    <strong className="text-teal-600">
                      {" "}
                      centralized, unified solution
                    </strong>{" "}
                    for all your property’s needs.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                  <p className="text-lg text-gray-700 leading-relaxed font-normal">
                    By combining all your services—from maintenance to
                    cleaning—under one expert team, we eliminate
                    inefficiencies,
                    <strong className="text-teal-600"> optimize costs</strong>,
                    and ensure every aspect of your facility runs smoothly.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Setting the Standard for Excellence
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our commitment to quality is backed by industry-leading
                certifications and a proven track record of client satisfaction.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10">
                <div className="text-center">
                  <FaCertificate className="text-teal-600 w-12 h-12 mx-auto mb-2 animate-bounce-in" />
                  <p className="font-semibold text-lg text-gray-800">
                    ISO 41001:2018
                  </p>
                  <p className="text-sm text-gray-500">
                    Certified Facility Management System
                  </p>
                </div>
                <div className="text-center">
                  <FaHandshake className="text-blue-600 w-12 h-12 mx-auto mb-2 animate-bounce-in animation-delay-200" />
                  <p className="font-semibold text-lg text-gray-800">
                    Trusted Partner
                  </p>
                  <p className="text-sm text-gray-500">
                    Your single point of contact
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section - Grouped as recommended */}
            <div className="bg-gray-100 py-12 px-4 rounded-2xl shadow-inner">
              <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
                Why Partner with Us?
              </h2>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Group 1: Efficiency & Cost Savings */}
                <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800">
                    <FaChartLine className="text-green-600" /> Efficiency & Cost
                    Savings
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Centralized Operations</p>
                        <p className="text-sm text-gray-600">
                          Simplify management by unifying all services under one
                          dedicated team, reducing administrative overhead.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Preventive Maintenance</p>
                        <p className="text-sm text-gray-600">
                          Proactive upkeep to avoid costly, unexpected repairs
                          and minimize facility downtime.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Group 2: Sustainability & Compliance */}
                <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800">
                    <FaCertificate className="text-blue-600" /> Sustainability &
                    Compliance
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">
                          Sustainability Initiatives
                        </p>
                        <p className="text-sm text-gray-600">
                          Implement energy efficiency and waste reduction
                          programs to lower costs and environmental impact.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">
                          Vendor & Contract Management
                        </p>
                        <p className="text-sm text-gray-600">
                          Ensure full compliance and transparency by
                          coordinating with a network of vetted suppliers.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Group 3: Expertise & Support */}
                <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800">
                    <FaHandshake className="text-purple-600" /> Expertise &
                    Support
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">
                          Enhanced Occupant Experience
                        </p>
                        <p className="text-sm text-gray-600">
                          Create a safer, more productive environment that
                          directly improves occupant satisfaction.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">
                          Real-Time Data & Reporting
                        </p>
                        <p className="text-sm text-gray-600">
                          Gain actionable insights from live dashboards and KPIs
                          to make smarter facility decisions.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Visuals Section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Data-Driven Insights for Smarter Management
              </h2>
              <p className="mb-8 text-lg text-gray-600 text-center">
                Our technology platform provides a clear, real-time view of your
                facility's performance. See how we turn raw data into actionable
                intelligence.
              </p>
              <div className="relative w-full h-96 rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/dashboard.png"
                  alt="A screenshot of a facilities management dashboard showing key performance indicators."
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Explore Section */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
                Learn More About Our Expertise
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Discover how our integrated approach has helped other businesses
                succeed.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {/* Downloadable one-pager added here */}
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md hover:bg-teal-50 hover:text-teal-700 transition duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <FaFileAlt className="text-xl text-gray-700 group-hover:text-teal-700 transition" />
                    <span className="text-gray-800 font-medium group-hover:text-teal-700 transition">
                      Download Facilities Management One-Pager PDF
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-teal-700 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md hover:bg-teal-50 hover:text-teal-700 transition duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <FaPlayCircle className="text-xl text-gray-700 group-hover:text-teal-700 transition" />
                    <span className="text-gray-800 font-medium group-hover:text-teal-700 transition">
                      Watch Our Services Overview Video
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-teal-700 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md hover:bg-teal-50 hover:text-teal-700 transition duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <FaFileAlt className="text-xl text-gray-700 group-hover:text-teal-700 transition" />
                    <span className="text-gray-800 font-medium group-hover:text-teal-700 transition">
                      View an IFM Case Study
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-teal-700 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md hover:bg-teal-50 hover:text-teal-700 transition duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <FaPlayCircle className="text-xl text-gray-700 group-hover:text-teal-700 transition" />
                    <span className="text-gray-800 font-medium group-hover:text-teal-700 transition">
                      Watch Our Sustainability Webinar
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-teal-700 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 py-12 px-6 rounded-2xl shadow-inner">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Ready to Simplify Your Facility Operations?
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Let us help you achieve a more efficient, cost-effective, and
                streamlined facility. Fill out the form below to request a call
                back.
              </p>
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-xl">
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  />
                </div>
                <label className="flex items-start gap-2 text-gray-600">
                  <input type="checkbox" className="mt-1 accent-teal-600" />
                  <span className="text-sm">
                    I consent to have Demand Recruitment Services Ltd store my
                    submitted information for updates.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Partner with us for smarter, streamlined facility management.
                </p>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar - Unchanged as requested */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-800">
                Service Highlights
              </h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-3 px-4 rounded-lg font-bold hover:bg-teal-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                🏢 Request Staff
              </a>
              <ul className="list-disc pl-5 text-base text-gray-700 space-y-2">
                <li>Centralized Facility Oversight</li>
                <li>Proactive Maintenance Scheduling</li>
                <li>Sustainability & Energy Efficiency</li>
                <li>Vendor & Contractor Coordination</li>
                <li>Real-Time Facility Analytics</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}