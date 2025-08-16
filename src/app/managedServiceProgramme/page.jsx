import React from "react";
import Image from "next/image";
import RequestInfoForm from "@/components/RequestInfoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const ManagedServiceProgrammesPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Managed Service Programmes
          </h1>
          <p className="text-lg mt-5">
            Optimizing Workforce Efficiency & Cost Control
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comprehensive Workforce Solutions
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At Demand Recruitment Services Ltd, our Managed Service Programmes
              (MSP) provide a comprehensive, end-to-end workforce solution,
              ensuring exceptional fill rates, streamlined workforce management,
              and cost-effective staffing.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By leveraging our expertise in contingent workforce management, we
              help healthcare organizations reduce agency spending, enhance
              workforce planning, and improve operational efficiency while
              maintaining high standards of patient care.
            </p>
          </div>
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/8.jpg"
              alt="Managed Services"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose MSP */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            At a Glance – Why Choose Our MSP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Guaranteed Fill Rates – Our services consistently achieve over 95% fill rates, ensuring workforce continuity and minimizing staffing gaps.",
              "24/7 Support – Dedicated account managers and resourcing specialists provide round-the-clock support to maintain a reliable staffing pipeline.",
              "Rate Management – Optimized spend control through strategic rate setting, cost reduction initiatives, and compliance with framework agreements.",
              "Workforce Planning – Proactive workforce forecasting to meet fluctuating demand and optimize staffing efficiency.",
              "Supply Chain Management – Effective vendor management to ensure the best suppliers deliver high-quality, compliant staff.",
              "Permanent Recruitment – Transitioning high-performing temporary staff into permanent roles, reducing reliance on agency workers.",
              "Governance & Compliance – Stringent audit processes ensure full regulatory compliance and adherence to NHS and private sector standards.",
            ].map((point, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 leading-relaxed">✔ {point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Case Study: Improving Workforce Efficiency & Reducing Costs
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In 2015, Swansea Bay University Health Board sought a
              cost-effective, strategic solution to manage their temporary
              staffing expenditure. Partnering with a Master Vendor, they
              implemented an onsite Managed Service, enabling:
            </p>
            <ul className="text-gray-700 mb-4 list-disc pl-5 leading-relaxed">
              <li>
                ✔ Improved workforce planning, ensuring agency spend is utilized
                only when necessary.
              </li>
              <li>
                ✔ Better cost control, reducing overall temporary staffing
                expenses.
              </li>
              <li>
                ✔ Strategic recruitment support, increasing continuity of care
                while maintaining budget targets.
              </li>
            </ul>
            <blockquote className="italic text-gray-600 mt-4 border-l-4 border-blue-600 pl-4">
              "Working with an onsite team has allowed for better planning,
              meaning we only spend on agency when needed. Their support with
              strategic analysis and permanent recruitment has helped improve
              workforce stability and financial efficiency."
              <br />— Senior Medical Workforce Manager, Cardiff and Vale
              University Health Board
            </blockquote>
          </div>
          <div className="relative rounded-md overflow-hidden shadow-md">
            <Image
              src="/services/9.jpg"
              alt="Case Study"
              width={500}
              height={350}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800">
                What is a Managed Service Programme (MSP)?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                An MSP is a comprehensive staffing solution where we manage the
                entire temporary workforce process—from sourcing and compliance
                to scheduling and vendor management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                How do MSPs save costs?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                MSPs reduce costs through improved planning, centralized
                management, rate control, and reducing unnecessary agency spend.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Is 24/7 support really available?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, our account managers and resourcing teams are available
                24/7 to address urgent staffing needs and provide operational
                continuity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Can MSP help with permanent recruitment?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely. We help transition high-performing temporary staff
                into permanent roles to reduce reliance on agencies and increase
                workforce stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8">
          With Demand Recruitment Services Ltd’s MSP, your organization gains a
          reliable, cost-efficient, and expertly managed workforce solution to
          face tomorrow’s healthcare demands with confidence.
        </p>
      </section>

      {/* Request Info Form */}
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

export default ManagedServiceProgrammesPage;
