import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";

export default function WorkforceManagement() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>Workforce Management – Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Smarter workforce management to streamline operations and boost productivity."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/2.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              Smarter Workforce Management
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Empowering Your Organization Through Optimized Workforce Solutions
            </p>
          </div>
        </section>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Why Effective Workforce Management Matters
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We provide workforce strategies that align with your
                    business goals—improving flexibility, performance, and
                    productivity.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our tools help monitor, schedule, and optimize employee
                    output while controlling labor costs.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Benefits of Workforce Management
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Smart Scheduling",
                    desc: "Automated shift planning to ensure coverage and minimize overtime.",
                  },
                  {
                    title: "Labor Cost Control",
                    desc: "Forecasting tools to prevent overspending and underutilization.",
                  },
                  {
                    title: "Productivity Tracking",
                    desc: "Monitor and enhance staff performance in real-time.",
                  },
                  {
                    title: "Compliance & Policies",
                    desc: "Built-in regulatory checks to maintain compliance.",
                  },
                  {
                    title: "Employee Empowerment",
                    desc: "Self-service portals for availability, leave, and schedules.",
                  },
                  {
                    title: "Integrated Data",
                    desc: "Unified dashboards to simplify decision-making.",
                  },
                  {
                    title: "Reduced Admin Work",
                    desc: "Streamlined workflows reduce manual HR burdens.",
                  },
                ].map(({ title, desc }, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow text-left flex items-start space-x-4"
                  >
                    <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Section */}
            <div className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-4xl font-bold mb-6 text-center">
                Explore Our Workforce Solutions
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Discover how our digital tools and HR strategies can enhance
                your operational effectiveness.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    text: "Case Study: Workforce Transformation in Healthcare",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Watch Our Workforce Management Webinar",
                    icon: FaPlayCircle,
                  },
                  {
                    text: "Case Study: Retail Efficiency with Smart Scheduling",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Explore Our Analytics Dashboard Demo",
                    icon: FaPlayCircle,
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

            {/* Contact Form */}
            <div className="bg-gray-100 py-10 px-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Talk to Our Experts
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Let us guide you in creating an agile, cost-effective workforce
                model.
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
                  We're here to help you build a future-ready workforce.
                </p>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Access
              </h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                🚀 Request Employee
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Streamlined scheduling & shifts</li>
                <li>Boost employee satisfaction</li>
                <li>Track KPIs & performance</li>
                <li>Ensure compliance & policy fit</li>
                <li>Adaptable for any industry</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
