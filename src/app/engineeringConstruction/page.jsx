import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { CheckCircle } from "lucide-react";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import StickyHeader from "@/components/StickyHeader";

export default function EngineeringConstruction() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>
          Engineering & Construction Recruitment | Demand Recruitment Services
          Ltd
        </title>
        <meta
          name="description"
          content="Specialized recruitment services for engineering and construction industries to deliver skilled workforce solutions."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/43.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              Engineering & Construction Recruitment
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Connecting You with Skilled Professionals for Successful Projects
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Tailored Recruitment Solutions for Engineering & Construction
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We specialize in sourcing and placing qualified engineers,
                    project managers, skilled trades, and construction workers
                    to meet the evolving needs of your projects.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our recruitment process focuses on quality, safety
                    compliance, and cultural fit, ensuring your team performs at
                    its best.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Why Choose Our Recruitment Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Skilled Workforce Access",
                    desc: "Wide network of vetted engineering and construction professionals.",
                  },
                  {
                    title: "Safety & Compliance Focus",
                    desc: "Strict adherence to industry safety and regulatory standards.",
                  },
                  {
                    title: "Flexible Staffing Options",
                    desc: "Permanent, temporary, and contract placements tailored to project needs.",
                  },
                  {
                    title: "Project Management Expertise",
                    desc: "Recruitment support for complex engineering and construction roles.",
                  },
                  {
                    title: "Timely Hiring",
                    desc: "Rapid response to staffing demands to keep your project on schedule.",
                  },
                  {
                    title: "Cost-Effective Solutions",
                    desc: "Streamlined hiring processes that reduce overheads.",
                  },
                ].map(({ title, desc }, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow flex items-start space-x-4"
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
                  className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
                >
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Let’s build your perfect team together.
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
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                👷 Request Staff
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Engineers & Project Managers</li>
                <li>Skilled Trades & Laborers</li>
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
