import React from "react";
import Image from "next/image";
import RequestInfoForm from "@/components/RequestInfoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const StaffBankPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero Section */}
      <div className="p-10 bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Staff Bank Solutions
          </h1>
          <p className="text-lg mt-5">
            Efficient workforce management with guaranteed shift fill rates
          </p>
        </div>
      </div>

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comprehensive Staff Bank Solutions
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At Demand Recruitment Services Ltd, we provide comprehensive Staff
              Bank solutions that go beyond technology to ensure seamless
              workforce management and exceptional shift fill rates. We work
              closely with NHS Trusts and private healthcare providers to
              recruit, retain, and sustain a workforce that reduces dependency
              on costly agency staff while increasing workforce flexibility and
              stability.
            </p>
          </div>
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/1.jpg"
              alt="Staff Bank Solutions"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/2.jpg"
              alt="Why Choose Our Staff Bank"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Our Staff Bank Services?
            </h2>
            <ul className="text-gray-700 list-disc ml-6 space-y-2">
              <li>
                Guaranteed Fill Rates – We ensure high shift fill rates with
                minimal disruption.
              </li>
              <li>
                Technology-Enabled, People-Led Approach – Seamlessly integrates
                with your preferred e-rostering system or VMS.
              </li>
              <li>
                Sustainable Workforce Growth – Actively recruit bank-only
                workers to support long-term workforce stability.
              </li>
              <li>
                Cost Savings & Rate Control – Foster healthy competition to
                reduce reliance on costly agency staff.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Approach: Flexible & NHS-First
          </h2>
          <ul className="text-gray-700 list-disc ml-6 space-y-2">
            <li>
              Minimize operational disruption and ensure a smooth transition to
              new workforce technology.
            </li>
            <li>
              Provide continuous workforce engagement, keeping staff active and
              available for shift bookings.
            </li>
            <li>
              Embed our expert team within your organization, working as an
              extension of your employer brand.
            </li>
          </ul>
        </div>
        <div className="relative rounded-md overflow-hidden shadow-md">
          <Image
            src="/services/3.jpg"
            alt="Flexible Workforce Approach"
            width={500}
            height={350}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Staff Bank Benefits: At a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Bank Attraction & Expansion
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We grow and sustain a diverse resource pool, including agency
                and bank-only workers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Proactive Engagement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our team ensures high levels of participation and engagement to
                maintain shift fill rates.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Workforce Planning & Demand Management
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Optimize shift coverage and balance supply with demand to reduce
                staffing shortages.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Intelligent Matching
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our data-driven insights help match the right staff to the right
                shifts, improving efficiency.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Managing Organizational Change
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We support NHS Trusts and private providers in adapting to new
                workforce models.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Compliance Management
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure all workers meet NHS and CQC regulatory requirements,
                with full documentation tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8">
          Our Staff Bank services are designed to deliver workforce
          optimization, cost savings, and enhanced shift fill rates. We work
          hand-in-hand with healthcare organizations to ensure a smooth
          transition to a more sustainable staffing model.
        </p>
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

export default StaffBankPage;
