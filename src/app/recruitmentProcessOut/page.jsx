import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";

export default function RecruitmentSolutions() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>Recruitment Solutions – Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Comprehensive recruitment solutions tailored to your organizational goals."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/3.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">
              End-to-End Recruitment Solutions
            </h1>
            <p className="mt-4 text-xl drop-shadow-md">
              Partner with us to find, hire, and retain the best talent—faster.
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
                Why Choose Our Recruitment Solutions?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We streamline your hiring process by sourcing top-tier
                    candidates quickly and efficiently.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our recruitment strategies are data-driven and customized to
                    your company’s culture and goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">
                What We Offer
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Permanent & Temporary Hiring",
                    desc: "Flexible staffing models based on your specific needs.",
                  },
                  {
                    title: "Candidate Screening",
                    desc: "Rigorous vetting and background checks for quality assurance.",
                  },
                  {
                    title: "Industry-Specific Recruitment",
                    desc: "Experts in healthcare, tech, finance, and more.",
                  },
                  {
                    title: "Reduced Time-to-Hire",
                    desc: "Fill critical roles faster without compromising on quality.",
                  },
                  {
                    title: "Talent Pipeline Building",
                    desc: "Ongoing sourcing to future-proof your workforce.",
                  },
                  {
                    title: "Employer Branding Support",
                    desc: "Help candidates connect with your mission and values.",
                  },
                  {
                    title: "Tech-Driven Matching",
                    desc: "AI and analytics-backed candidate matching for accuracy.",
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
                Explore Our Hiring Success Stories
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Our recruitment case studies show how we help companies grow
                through smarter hiring.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    text: "Case Study: Scaling Healthcare Roles Rapidly",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Watch: How We Deliver High-Impact Talent",
                    icon: FaPlayCircle,
                  },
                  {
                    text: "Case Study: Reducing Cost-Per-Hire for Retail",
                    icon: FaFileAlt,
                  },
                  {
                    text: "Webinar: Future-Proofing Recruitment in 2025",
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
                Let’s Build Your Team
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Reach out today to start hiring better, faster, and smarter.
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
                  Let us take the hassle out of recruitment for you.
                </p>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Links
              </h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                📥 Request Talent Now
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Speed up hiring processes</li>
                <li>Attract better-qualified applicants</li>
                <li>Lower your cost-per-hire</li>
                <li>Eliminate recruitment bottlenecks</li>
                <li>Scale up teams with ease</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
