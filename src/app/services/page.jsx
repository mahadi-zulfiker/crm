"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactHomePage";
import { Briefcase, Building2, Users, Sparkles, Star, ShieldCheck, ArrowRight } from "lucide-react";
import CountUp from "react-countup";

// --- Data -------------------------------------------------------
const recruitmentServices = [
  {
    name: "Staffing Services",
    link: "/staffBankSolution",
    image: "/services/med1.jpg",
    description:
      "Comprehensive staffing support across healthcare, cleaning, security, hospitality, and more.",
    cta: "View Staffing Options",
    icon: <Briefcase className="text-teal-600" size={22} />,
    stats: ["48h avg. fill time", "DB of 10k+ pros", "UK-compliant"],
  },
  {
    name: "Workforce Management",
    link: "/workforceManagement",
    image: "/services/1.jpg",
    description:
      "Scheduling, monitoring, and optimization to boost productivity across sectors.",
    cta: "Optimize Workforce",
    icon: <Users className="text-teal-600" size={22} />,
    stats: ["Up to 25% cost save", "Real‑time tracking", "Roster automation"],
  },
  {
    name: "Recruitment Solutions",
    link: "/recruitmentProcessOut",
    image: "/services/2.jpg",
    description:
      "Custom strategies for temporary, permanent, and project-based hiring.",
    cta: "Tailored Hiring Plans",
    icon: <Building2 className="text-teal-600" size={22} />,
    stats: ["Role-fit scoring", "Panel hiring", "Onboarding support"],
  },
];

const facilityServices = [
  {
    name: "Cleaning & Hygiene Services",
    link: "/cleaningServices",
    image: "/1111.jpg",
    description:
      "Maintain a safe, sanitary, and welcoming environment for staff and visitors.",
    cta: "Explore Hygiene Services",
    icon: <Users className="text-teal-600" size={22} />,
    stats: ["CQC ready", "Non‑toxic agents", "Daily/Deep plans"],
  },
  {
    name: "Engineering & Maintenance",
    link: "/engineeringConstruction",
    image: "/services/2.jpg",
    description:
      "Ensure optimal operation of infrastructure with expert engineering services.",
    cta: "View Engineering Plans",
    icon: <Building2 className="text-teal-600" size={22} />,
    stats: ["24/7 callout", "SLA-backed", "Planned & reactive"],
  },
  {
    name: "Integrated Facilities Management",
    link: "/facilitiesTransformation",
    image: "/services/9.jpg",
    description:
      "Streamline operations with a holistic, KPI‑driven approach to facilities management.",
    cta: "Discover Facility Management",
    icon: <Briefcase className="text-teal-600" size={22} />,
    stats: ["One invoice", "Single vendor", "Compliance baked‑in"],
  },
];

const communityServices = [
  {
    name: "Supported Living",
    link: "/supportedLiving",
    image: "/services/41.jpg",
    description:
      "Compassionate and structured support for individuals in supported living environments.",
    cta: "Support Independent Living",
    icon: <Users className="text-teal-600" size={22} />,
    stats: ["Person‑centred", "Safeguarding", "Care plans"],
  },
  {
    name: "Community Engagement & Events",
    link: "/communityEngagement",
    image: "/services/33.jpg",
    description:
      "Build meaningful connections via local events and inclusive experiences.",
    cta: "See Engagement Programs",
    icon: <Building2 className="text-teal-600" size={22} />,
    stats: ["Volunteer network", "Impact KPIs", "Press kits"],
  },
  {
    name: "Housing Management",
    link: "/housingManagement",
    image: "/services/44.jpg",
    description:
      "Professional management ensuring tenant satisfaction, compliance, and efficiency.",
    cta: "Learn About Housing Plans",
    icon: <Briefcase className="text-teal-600" size={22} />,
    stats: ["Repairs portal", "Rent compliance", "Void reduction"],
  },
];

const tabs = [
  { id: "recruitment", label: "Recruitment Services", icon: Briefcase },
  { id: "facility", label: "Facility Management", icon: Building2 },
  { id: "community", label: "Community Services", icon: Users },
];

// --- Component --------------------------------------------------
export default function Services() {
  const [activeTab, setActiveTab] = useState("recruitment");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getServices = () => {
    if (activeTab === "recruitment") return recruitmentServices;
    if (activeTab === "facility") return facilityServices;
    if (activeTab === "community") return communityServices;
    return [];
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Banner / Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[520px] md:h-[560px] bg-cover bg-center" style={{ backgroundImage: "url('/services/med1.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-5xl mx-6 md:mx-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur text-white mb-4" data-aos="fade-up">
                <Sparkles size={16} />
                <span className="text-sm font-medium">End‑to‑end Talent & Operations</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight" data-aos="fade-up" data-aos-delay="100">
                What We Offer
              </h1>
              <p className="mt-4 max-w-2xl text-gray-200" data-aos="fade-up" data-aos-delay="200">
                Discover recruitment, facility, and community services tailored to your organisation. Built for speed, compliance, and impact.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="300">
                <a href="#services" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 text-white px-5 py-3 font-semibold shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition">
                  Explore Services <ArrowRight size={18} />
                </a>
                <a href="/caseStudies" target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-gray-900 px-5 py-3 font-semibold hover:bg-white transition">
                  <ShieldCheck size={18} /> Case Studies (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section id="services" className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-3 md:gap-4 mb-10 flex-wrap" data-aos="fade-up">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-sm md:text-base transition-all duration-300 border ${
                    active
                      ? "bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/30 scale-[1.03]"
                      : "bg-white text-gray-800 border-gray-200 hover:border-teal-300 hover:shadow-md"
                  }`}
                >
                  <Icon size={18} className={active ? "text-white" : "text-teal-600"} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Highlights / Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
            {[
              { value: 500, suffix: "+", label: "Professionals Placed" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 24, suffix: "/7", label: "Service Availability" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay={i * 100}>
                <h2 className="text-3xl md:text-4xl font-extrabold text-teal-600">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                </h2>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getServices().map((service, index) => (
              <article
                key={index}
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                data-aos="zoom-in-up" data-aos-delay={index * 100}
              >
                <div className="relative h-52 w-full">
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                    <Star size={14} className="text-amber-500" /> Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {service.icon}
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>

                  {/* Service-specific stats chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.stats?.map((chip, i) => (
                      <span key={i} className="rounded-full bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 text-xs font-medium">
                        {chip}
                      </span>
                    ))}
                  </div>

                  <a
                    href={service.link}
                    className="mt-5 inline-flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-800"
                    aria-label={`${service.cta} for ${service.name}`}
                  >
                    {service.cta} <ArrowRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center" data-aos="fade-up">
            {["NHS-compliant", "ISO 9001", "DBS Checked", "UK Coverage"].map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-2 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <ShieldCheck size={18} className="text-teal-600" />
                <span className="text-sm font-medium text-gray-700">{badge}</span>
              </div>
            ))}
          </div>

          {/* Case Study Link */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <a href="/caseStudies" target="_blank" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium underline">
              📄 Download Full Case Study (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="relative py-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-100 to-white" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-1 shadow-xl">
            <div className="rounded-3xl bg-white p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ready to hire or streamline operations?</h3>
                <p className="mt-2 text-gray-600">Speak with our team for a tailored plan in minutes.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="contactUs" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 text-white px-5 py-3 font-semibold shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition">
                    Get a Proposal <ArrowRight size={18} />
                  </a>
                  <a href="/caseStudies" className="inline-flex items-center gap-2 rounded-xl bg-gray-100 text-gray-900 px-5 py-3 font-semibold hover:bg-gray-200 transition">
                    View Proof & Results
                  </a>
                </div>
              </div>
              <ul className="grid gap-3">
                {[
                  "Dedicated account manager",
                  "Transparent pricing & SLAs",
                  "Rapid deployment within days",
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700"><ShieldCheck className="text-teal-600" size={18} /> {li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section from existing component */}
      <ContactSection />
      <Footer />

      {/* Floating Help Button (lightweight \"live chat\" entry) */}
      {/* <a
        href="#contact"
        aria-label="Chat with us"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-teal-600 text-white px-4 py-3 shadow-xl hover:bg-teal-700 transition"
      >
        <MessageCircle size={18} /> Need help?
      </a> */}
    </div>
  );
}
