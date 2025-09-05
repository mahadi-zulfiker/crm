"use client";
import { useEffect } from "react";
import "animate.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactUsHomePage from "@/components/ContactHomePage";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";
import bannerImg from "../../../public/about-us/about-1.jpg";
import Link from "next/link";

export default function Employees() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <StickyHeader />

      {/* Banner Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src={bannerImg}
          alt="Team Banner"
          fill
          className="object-cover animate__animated animate__fadeIn"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-teal-900/60 to-teal-700/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate__animated animate__fadeInDown">
            Join Our Dream Team
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-teal-100 max-w-3xl animate__animated animate__fadeInUp animate__delay-1s">
            "Great things in business are never done by one person. They’re done
            by a team of people." – Steve Jobs
          </p>
          <Link href="/allJobs">
            <button className="mt-10 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate__animated animate__zoomIn animate__delay-2s">
              Explore Careers
            </button>
          </Link>
        </div>
      </section>

      {/* Hiring Process */}
      <div className="container mx-auto px-6 lg:px-12 py-20 bg-gray-50">
        <section
          className="mb-20 bg-gradient-to-br from-teal-50 to-white rounded-2xl p-10 shadow-xl"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Our Hiring Process
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start space-x-5 bg-white hover:bg-teal-50 border-l-4 border-teal-400 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <span className="text-4xl text-teal-500">{step.icon}</span>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </p>
                  <p className="text-gray-600 text-lg">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Employee Benefits */}
        <section data-aos="fade-up" data-aos-duration="1200">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-14">
            Employee Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <p className="text-lg font-medium text-gray-700">{item.text}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-10 transition-all"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section
          id="steps"
          className="mt-24 w-full bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20 px-6 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                We Believe in Keeping It Simple
              </h2>
              <p className="text-lg md:text-xl text-teal-100">
                Let’s get to know each other and make your journey effortless.
              </p>
            </div>

            <div className="space-y-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  className="relative flex flex-col md:flex-row items-center md:items-start border-l-4 border-white/40 pl-8 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg"
                >
                  {/* Step Number */}
                  <div className="absolute -left-6 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {feature.step}
                  </div>

                  {/* Content */}
                  <div className="md:flex-1 ml-8">
                    <h3 className="text-2xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-teal-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg font-light text-teal-100">
                Ready to take the next step? We’re here to make it smooth and
                inspiring.
              </p>
            </div>
          </div>
        </section>
      </div>

      <ContactUsHomePage />
      <Footer />
    </>
  );
}

const processSteps = [
  { icon: "📞", title: "Application", desc: "Call, email, or apply online." },
  {
    icon: "☕",
    title: "Intro Chat",
    desc: "Informal discussion to understand fit.",
  },
  {
    icon: "📝",
    title: "Interview",
    desc: "Meet our team and discuss your skills.",
  },
  {
    icon: "🎉",
    title: "Offer",
    desc: "Join the team and begin your journey with us!",
  },
];

const benefits = [
  { icon: "💰", text: "Competitive Salary & Bonuses" },
  { icon: "🏡", text: "Hybrid & Remote Work Options" },
  { icon: "📚", text: "Professional Growth & Learning Support" },
  { icon: "🎉", text: "Team Events & Socials" },
  { icon: "🏥", text: "Private Healthcare Plans" },
  { icon: "🌴", text: "Paid Time Off & Holidays" },
  { icon: "💼", text: "Commission Earning from Day One" },
  { icon: "🔓", text: "No Threshold on Commission" },
  { icon: "⏰", text: "4pm Finishes" },
  { icon: "🍹", text: "Companywide Incentives & Competitions" },
  { icon: "📈", text: "Training & Subsidised Courses" },
  { icon: "🏆", text: "Awards Evening with 'Winners Trip'" },
  { icon: "🛡️", text: "Life Cover" },
  { icon: "👨‍👩‍👧‍👦", text: "Annual Family Day" },
  { icon: "📅", text: "Work with Days" },
  { icon: "🔗", text: "LinkedIn Premium" },
  { icon: "🏡", text: "Cottage Breaks" },
  { icon: "✈️", text: "Sabbatical - Take Time to Travel" },
  { icon: "🎗️", text: "Charity Day - Day Off" },
  { icon: "💼", text: "Holiday Trading - Buy/Sell a Week" },
  { icon: "🏠", text: "Day Off to Move Home" },
  { icon: "👥", text: "All Staff Meetings (Wider Team Access)" },
  { icon: "🍻", text: "Monthly Socials" },
];

const features = [
  {
    step: "01",
    title: "Apply",
    description:
      "You can call us for a confidential chat, email us your CV, or visit our branches to discuss opportunities. We also advertise all our roles on our website.",
  },
  {
    step: "02",
    title: "Coffee chat",
    description:
      "We have a chat over a coffee either in person or Zoom and see if we’re a potential match for each other…",
  },
  {
    step: "03",
    title: "Interview process",
    description:
      "A slightly more formalized version of the coffee chat. We want to know the real you, not just what's on your CV. We’ll ensure the next move is right for both of us.",
  },
  {
    step: "04",
    title: "Offer and start",
    description:
      "A formal offer is sent, we agree start dates, and then your onboarding into the ACS Family begins – this is where the real fun starts.",
  },
];
