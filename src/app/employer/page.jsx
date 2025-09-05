"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactUsHomePage from "@/components/ContactHomePage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";
import bannerImg from "../../../public/recruitment.jpg"; // Banner image

const EmployerBenefits = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
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
      <StickyHeader />

      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={bannerImg}
          alt="Recruitment Banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-gray-900/60"></div>
        <div className="relative z-10 text-center px-6 lg:px-20">
          <h1
            className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg"
            data-aos="fade-down"
          >
            Empower Your Workforce with <span className="text-teal-400">Excellence</span>
          </h1>
          <p
            className="mt-6 text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto"
            data-aos="fade-up"
          >
            “The strength of the team is each individual member. The strength of each
            member is the team.” – Phil Jackson
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <Link href="requestEmployee">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                data-aos="zoom-in"
              >
                Request Staff
              </button>
            </Link>
            <Link href="employerTestimonial">
              <button
                className="bg-white hover:bg-gray-100 text-teal-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                Refer A Vacancy
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white px-6 lg:px-20" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Why Choose <span className="text-teal-600">Us</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          We’re more than just recruiters – we’re your workforce partners,
          helping you scale, hire, and retain the best talent faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: "🤝",
              title: "Tailored Recruitment",
              desc: "Customized staffing solutions that match your company culture, goals, and growth needs.",
            },
            {
              icon: "⚡",
              title: "Fast Turnaround",
              desc: "Swift recruitment process ensures minimal downtime and quick access to top candidates.",
            },
            {
              icon: "📊",
              title: "Data-Driven Matching",
              desc: "AI & analytics-powered candidate screening improves accuracy and job fit.",
            },
            {
              icon: "🌍",
              title: "Diverse Talent Network",
              desc: "Access candidates from multiple industries, backgrounds, and experience levels.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-teal-50 p-8 rounded-2xl shadow-md hover:shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-teal-600 text-5xl mb-6">{card.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="bg-gradient-to-b from-gray-50 to-teal-50 py-20 px-6" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Sectors We <span className="text-teal-600">Serve</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300"
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
        <div className="mt-12 text-center">
          <Link href="/requestCallBack">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
              Request a Callback
            </button>
          </Link>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="mt-20 px-6 lg:px-20" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Our <span className="text-teal-600">Recruitment Process</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center space-y-5 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-5xl text-teal-600">{step.icon}</span>
              <h3 className="text-2xl font-semibold text-gray-800">
                {step.title}
              </h3>
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
