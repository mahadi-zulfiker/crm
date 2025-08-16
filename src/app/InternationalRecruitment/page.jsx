import React from "react";
import Image from "next/image";
import RequestInfoForm from "@/components/RequestInfoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const InternationalRecruitmentPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            International Recruitment
          </h1>
          <p className="text-lg mt-5">
            Connecting Global Healthcare Talent with the UK
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Global Healthcare Talent
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Demand Recruitment Services Ltd is a leading provider of
              international healthcare staffing, helping NHS Trusts and private
              healthcare providers secure top-tier international talent.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With operations in the UK, Europe, Australasia, Asia, and the
              Middle East, we ensure seamless relocation and long-term retention
              of doctors, nurses, and AHPs through our global network.
            </p>
          </div>
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/4.jpg"
              alt="International Recruitment"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Candidate Support */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/7.jpg"
              alt="Candidate Support"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Exceptional Candidate Support
            </h2>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>Visa guidance & exam preparation</li>
              <li>Pre-arrival orientation & logistics</li>
              <li>VIP welcome and settlement assistance</li>
              <li>Ongoing well-being support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quality Recruitment */}
      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quality Recruitment You Can Trust
          </h2>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>Stringent pre-screening in line with NHS standards</li>
            <li>Selection focused on qualifications and English proficiency</li>
            <li>75%+ interview-to-hire success rate</li>
            <li>99%+ successful long-term placements</li>
          </ul>
        </div>
        <div className="relative rounded-md overflow-hidden shadow-md">
          <Image
            src="/services/5.jpg"
            alt="Quality Recruitment"
            width={500}
            height={350}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* International Services */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/fly.jpg"
              alt="Ireland & Middle East Services"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              International Services
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Ireland:</strong> Dedicated centre in Dublin supporting
              Irish healthcare providers.
            </p>
            <p className="text-gray-700">
              <strong>Middle East:</strong> 20+ years of expertise in UAE, Saudi
              Arabia, Oman, Bahrain, Qatar, and Kuwait.
            </p>
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="py-16 px-8 mt-20 max-w-6xl mx-auto bg-gray-100 rounded-md shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">
                Unrivalled Retention
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              99% of recruits successfully settle and stay.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">
                High-Calibre Candidates
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Only the best professionals are selected.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">
                Global Reach
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Operations across multiple continents.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">
                Comprehensive Support
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              From visa to onboarding and beyond.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700">
                Ethical Recruitment
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Fully compliant and transparent practices.
            </p>
          </div>
        </div>
      </section>
      {/* CTA Paragraph */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8">
          At Demand Recruitment Services Ltd, we are dedicated to bridging
          global healthcare talent with UK opportunities, ensuring that our
          clients benefit from a world-class workforce.
        </p>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-10 md:p-12 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Request More Information
          </h2>
          <RequestInfoForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalRecruitmentPage;
