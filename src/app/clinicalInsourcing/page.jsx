// pages/clinical-insourcing.js
import React from "react";
import Image from "next/image";
import RequestInfoForm from "@/components/RequestInfoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const ClinicalInsourcingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <StickyHeader></StickyHeader>
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Clinical Insourcing
          </h1>
          <p className="text-lg mt-5">
            Specialist support to boost surgical capacity & reduce waiting lists
          </p>
        </div>
      </div>

      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tailored Clinical Insourcing Solutions
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            At Demand Recruitment Services Ltd, we provide tailored clinical
            insourcing solutions to support NHS Trusts in increasing surgical
            capacity, reducing waiting list backlogs, and enhancing patient
            outcomes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a team of operational and clinical specialists who have
            extensive NHS experience, we integrate seamlessly with existing
            hospital teams to optimize elective care services and tackle
            surgical backlogs effectively.
          </p>
        </div>
        <div className="relative rounded-md overflow-hidden shadow-md">
          <Image
            src="/services/11.jpg"
            alt="Surgical Capacity Support"
            width={500}
            height={350}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="italic text-lg text-gray-700">
            "Helped immensely to reduce our significant waiting list backlog."
          </blockquote>
          <p className="text-sm text-gray-600 mt-2">
            — NHS Clinical Lead – General Surgery
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Our Approach to Insourcing
        </h2>
        <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5">
          <li>
            <strong>Strategic NHS Partnership:</strong> Tailored, high-impact
            solutions for elective surgery and waiting list challenges.
          </li>
          <li>
            <strong>Expert-Led Service Delivery:</strong> Hands-on NHS
            experience ensures safe, compliant, and effective delivery.
          </li>
          <li>
            <strong>Integrated Workforce Solutions:</strong> High standards of
            care and compliance through our clinical governance network.
          </li>
        </ul>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            A Smarter Approach to Insourcing
          </h2>
          <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5">
            <li>
              <strong>Seamless Integration:</strong> Extra surgical activity is
              embedded within existing hospital teams.
            </li>
            <li>
              <strong>Local Staff Involvement:</strong> Ensures continuity and
              efficiency by collaborating with hospital-based staff.
            </li>
            <li>
              <strong>Beyond Routine Cases:</strong> We handle complex
              procedures and long-term conditions often avoided by other
              providers.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="italic text-lg text-gray-700">
            "Demand Recruitment Services Ltd has significantly helped us
            increase our surgical activity and reduce backlogs. Their seamless
            integration with our substantive teams has ensured extra sessions
            align perfectly with routine services."
          </blockquote>
          <p className="text-sm text-gray-600 mt-2">
            — Deputy Director of Operations, NHS Trust – East of England
          </p>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Specialist Support:</strong> Proven experience in
                large-scale elective care management.
              </li>
              <li>
                <strong>Highly Experienced Teams:</strong> Operational and
                clinical leads with deep NHS expertise.
              </li>
              <li>
                <strong>Patient-Centered Approach:</strong> Focused on safety,
                efficiency, and sustainable capacity growth.
              </li>
              <li>
                <strong>Trusted Partner for the NHS:</strong> Measurable
                improvements in waiting list management.
              </li>
            </ul>
          </div>
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/12.jpg"
              alt="Why Choose Demand Recruitment"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

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

export default ClinicalInsourcingPage;
