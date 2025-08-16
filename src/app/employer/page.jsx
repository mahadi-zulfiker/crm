"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactUsHomePage from "@/components/ContactHomePage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServiceGrid from "@/components/employerService";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";

const EmployerBenefits = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const sectors = [
    { icon: "🩺", label: "Healthcare" },
    { icon: "🏢", label: "Facilities" },
    { icon: "🏘️", label: "Community" },
    { icon: "🗂️", label: "Admin" },
    { icon: "🧼", label: "Cleaning" },
    { icon: "⚙️", label: "Engineering" },
  ];

  const steps = [
    {
      icon: "🎯",
      title: "Attract",
      description:
        "We promote innovative and targeted advertising campaigns, bespoke to our partnership, across a myriad of platforms.",
    },
    {
      icon: "🔍",
      title: "Screen",
      description:
        "Our comprehensive screening and interview process gives us detailed insight into our applicants, ensuring we nail talent matching every time.",
    },
    {
      icon: "🚀",
      title: "Onboard",
      description:
        "Our service is an extension of your business, and first impressions count. We’re passionate about delivering the perfect introduction to you and the role, and we are hands-on in providing that experience.",
    },
    {
      icon: "💡",
      title: "Engage",
      description:
        "As recruitment experts, our service doesn’t stop at resourcing talent. We are invested in the retention of staff and in managing the aspects that achieve this.",
    },
  ];

  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">Employer Hub</h1>
          <div className="flex justify-center gap-4 flex-wrap mt-5">
            <Link href="requestEmployee">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-semibold">
                Request Staff
              </button>
            </Link>
            <Link href="employerTestimonial">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold">
                Refer A Vacancy
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 bg-white px-6 lg:px-20" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Why Choose Us
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We’re more than just recruiters – we’re your workforce partners,
          helping you scale, hire, and retain the best talent faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-indigo-600 text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tailored Recruitment
            </h3>
            <p className="text-gray-600 text-sm">
              Customized staffing solutions that match your company culture,
              goals, and growth needs.
            </p>
          </div>
          <div
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-indigo-600 text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fast Turnaround
            </h3>
            <p className="text-gray-600 text-sm">
              Swift recruitment process ensures minimal downtime and quick
              access to top candidates.
            </p>
          </div>
          <div
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-indigo-600 text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Data-Driven Matching
            </h3>
            <p className="text-gray-600 text-sm">
              AI & analytics-powered candidate screening improves accuracy and
              job fit.
            </p>
          </div>
          <div
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="text-indigo-600 text-4xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Diverse Talent Network
            </h3>
            <p className="text-gray-600 text-sm">
              Access candidates from multiple industries, backgrounds, and
              experience levels.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="bg-gray-100 py-16 px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Sectors We Serve
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <span className="text-4xl mb-2">{sector.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">
                {sector.label}
              </h3>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/requestCallBack">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition">
              Request a Callback
            </button>
          </Link>
        </div>
      </section>
      {/* Recruitment Process */}
      <section
        className="mt-16 animate__animated animate__fadeInUp px-10"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Recruitment Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-4xl">{step.icon}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactUsHomePage />
      <Footer />
    </>
  );
};

export default EmployerBenefits;
