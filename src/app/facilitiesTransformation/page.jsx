// app/services/integrated-facilities-management/page.jsx
"use client";

import { useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";

import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Gauge,
  Leaf,
  Users,
  BarChart3,
  ShieldCheck,
  FileDown,
  PlayCircle,
  PhoneCall,
  BadgeCheck,
  Layers3,
  Workflow,
} from "lucide-react";

import {
  FaFileAlt,
  FaPlayCircle,
  FaCertificate,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

export default function IntegratedFacilitiesManagement() {
  // Before/After slider position (0–100)
  const [slider, setSlider] = useState(50);

  // Animated stat values (simple, deterministic)
  const stats = useMemo(
    () => [
      {
        label: "Avg. Cost Saving",
        value: 20,
        suffix: "%",
        icon: <Gauge className="w-5 h-5" />,
      },
      {
        label: "Task SLA Compliance",
        value: 98,
        suffix: "%",
        icon: <BadgeCheck className="w-5 h-5" />,
      },
      {
        label: "Response Time Improvement",
        value: 35,
        suffix: "%",
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        label: "Waste Reduction",
        value: 28,
        suffix: "%",
        icon: <Leaf className="w-5 h-5" />,
      },
    ],
    []
  );

  return (
    <>
      <Navbar />
      <StickyHeader />
      <Head>
        <title>
          Integrated Facilities Management | Demand Recruitment Services Ltd
        </title>
        <meta
          name="description"
          content="Achieve cost savings and operational excellence with our comprehensive Integrated Facilities Management solutions."
        />
      </Head>

      <main className="bg-gray-50 text-gray-900 font-sans">
        {/* ======= Hero / Cinematic Banner ======= */}
        <section className="relative overflow-hidden">
          <div className="relative isolate">
            <div className="absolute inset-0 -z-10">
              {/* Background image with subtle pan */}
              <motion.img
                src="/services/4.jpg"
                alt="Integrated Facilities Management banner"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="h-[72vh] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 via-teal-900/70 to-gray-900/80" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl text-white"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm backdrop-blur-md ring-1 ring-white/20">
                  <Sparkles className="w-4 h-4" /> Unified. Predictive.
                  Sustainable.
                </span>
                <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  Integrated Facilities Management
                </h1>
                <p className="mt-5 text-lg md:text-xl text-white/90">
                  Streamline operations, unify teams, and unlock measurable
                  savings with our data-driven IFM—your single source of truth
                  for every facility.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#facilities-upgrade"
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 transition"
                  >
                    Start a Facilities Upgrade{" "}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#resources"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20 ring-1 ring-white/25 transition"
                  >
                    Explore Resources
                  </a>
                </div>
              </motion.div>

              {/* Quote strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10 md:mt-16 grid gap-4 md:grid-cols-3"
              >
                {[
                  {
                    q: "“Great buildings aren’t just maintained—they’re orchestrated.”",
                    a: "— IFM Principle",
                  },
                  {
                    q: "“The best facility is the one you barely notice—because everything just works.”",
                    a: "— Operations Creed",
                  },
                  {
                    q: "“Data turns maintenance into foresight.”",
                    a: "— Smart FM Ethos",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/10 p-5 text-white/90 ring-1 ring-white/20 backdrop-blur"
                  >
                    <p className="text-base leading-relaxed">{item.q}</p>
                    <p className="mt-2 text-sm text-white/70">{item.a}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======= KPI / Stats ======= */}
        <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-14 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100 hover:shadow-teal-100/60 hover:-translate-y-1 transition"
              >
                <div className="flex items-center gap-2 text-teal-600">
                  {s.icon}
                  <span className="text-sm font-semibold">{s.label}</span>
                </div>
                <div className="mt-2 text-3xl font-extrabold text-gray-900">
                  {s.value}
                  <span className="text-teal-600">{s.suffix}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Based on recent IFM rollouts
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======= IFM vs Standard FM (clarity) ======= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
            How IFM Differs from Standard FM
          </h2>
          <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
            IFM unifies services, vendors, and data under one contract and one
            team. Standard FM is siloed and reactive; IFM is integrated and
            predictive.
          </p>

          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition">
              <div className="flex items-center gap-3">
                <Layers3 className="w-5 h-5 text-teal-600" />
                <h3 className="text-xl font-bold">
                  Integrated Facilities Management (IFM)
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                  One contract, unified team & dashboards across maintenance,
                  cleaning, security, grounds, and vendors.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                  Preventive and predictive maintenance powered by real-time
                  data/KPIs.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                  Centralized budgets & procurement with performance guarantees.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                  Outcomes: cost transparency, faster responses, elevated
                  occupant experience.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition">
              <div className="flex items-center gap-3">
                <Workflow className="w-5 h-5 text-gray-500" />
                <h3 className="text-xl font-bold">
                  Standard Facilities Management
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                  Multiple vendors, disjointed contracts, limited oversight.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                  Reactive maintenance; limited data visibility and reporting.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                  Fragmented budgeting and duplicated admin effort.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                  Outcomes: inconsistent quality and slower decisions.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======= Core Benefits (Efficiency / Insight / Comfort) ======= */}
        <section className="bg-gradient-to-b from-white to-teal-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center">
              Facilities Transformation — Core Benefits
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
              Grouped by what matters most: Efficiency, Insight, and Comfort.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {/* Efficiency */}
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-2 text-teal-600 font-bold">
                  <FaChartLine className="w-5 h-5" /> Efficiency
                </div>
                <ul className="mt-4 space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Centralized operations & vendor orchestration
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Preventive schedules reduce downtime
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Transparent budgeting and procurement
                  </li>
                </ul>
              </motion.div>

              {/* Insight */}
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-2 text-teal-600 font-bold">
                  <BarChart3 className="w-5 h-5" /> Insight
                </div>
                <ul className="mt-4 space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" /> Live
                    dashboards, KPIs & SLA tracking
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Predictive alerts with IoT sensors
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Audit-ready reports and compliance
                  </li>
                </ul>
              </motion.div>

              {/* Comfort */}
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
              >
                <div className="flex items-center gap-2 text-teal-600 font-bold">
                  <Users className="w-5 h-5" /> Comfort
                </div>
                <ul className="mt-4 space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Safer, more productive spaces
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Frictionless occupant experiences
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                    Accessibility & wellness standards
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======= Transformation Visual (Before/After Slider) ======= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                See the Transformation
              </h2>
              <p className="mt-3 text-gray-600">
                Drag the handle to compare a fragmented, reactive operation vs.
                an orchestrated, data-driven IFM model.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" /> Unified
                  dashboards replace siloed updates
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                  Predictive maintenance cuts surprise failures
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />{" "}
                  Real-time SLA tracking drives accountability
                </li>
              </ul>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-100">
              {/* After image (bottom layer) */}
              <Image
                src="/after.png"
                alt="After IFM"
                width={1600}
                height={900}
                className="w-full h-[380px] object-cover"
                priority
              />
              {/* Before image (top layer clipped) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
              >
                <Image
                  src="/before.png"
                  alt="Before IFM"
                  width={1600}
                  height={900}
                  className="w-full h-[380px] object-cover"
                  priority
                />
              </div>

              {/* Slider control */}
              <div className="absolute inset-0 flex items-center">
                <div
                  className="h-full w-0.5 bg-white/80 mx-auto shadow"
                  style={{ transform: `translateX(${(slider - 50) * 0.01}px)` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={(e) => setSlider(parseInt(e.target.value))}
                aria-label="Compare before and after"
                className="absolute inset-x-0 bottom-3 mx-auto w-[90%] accent-teal-600"
              />
            </div>
          </div>
        </section>

        {/* ======= Data Visuals / Dashboard ======= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-100">
            <h2 className="text-3xl font-extrabold text-center">
              Data-Driven Insights for Smarter Management
            </h2>
            <p className="mt-3 mb-8 text-lg text-gray-600 text-center">
              Our platform converts raw facility data into KPIs, alerts, and
              actions—so you can decide with confidence.
            </p>
            <div className="relative w-full h-96 rounded-xl overflow-hidden group">
              <Image
                src="/dashboard.png"
                alt="Facilities management dashboard with key performance indicators"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 960px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* ======= Certifications & Partners ======= */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="rounded-3xl bg-white/90 backdrop-blur-sm p-12 shadow-2xl ring-1 ring-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center md:text-left space-y-6">
                <h3 className="text-3xl font-extrabold text-gray-900 leading-snug">
                  Setting the Standard for Excellence
                </h3>
                <p className="text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
                  We align with leading global frameworks and collaborate with
                  trusted vendors to deliver best-in-class IFM solutions.
                </p>

                {/* Features */}
                <div className="mt-8 flex flex-wrap gap-12 items-start justify-center md:justify-start">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-center text-center w-40">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 hover:bg-teal-100 transition-colors">
                      <FaCertificate className="text-teal-600 w-10 h-10" />
                    </div>
                    <p className="mt-3 font-semibold text-gray-800">
                      ISO 41001:2018
                    </p>
                    <p className="text-sm text-gray-500 leading-snug">
                      Facility Management System
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-center text-center w-40">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 hover:bg-teal-100 transition-colors">
                      <FaHandshake className="text-teal-600 w-10 h-10" />
                    </div>
                    <p className="mt-3 font-semibold text-gray-800">
                      Strategic Partners
                    </p>
                    <p className="text-sm text-gray-500 leading-snug">
                      Vetted vendor ecosystem
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Logos */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                {[
                  "/clients/client1.png",
                  "/clients/client2.png",
                  "/clients/client3.png",
                  "/clients/client4.png",
                  "/clients/client1.png",
                  "/clients/client2.png",
                ].map((p, i) => (
                  <div
                    key={i}
                    className="aspect-square w-28 rounded-xl bg-gradient-to-br from-teal-50 to-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center 
            hover:scale-110 hover:shadow-lg hover:ring-teal-200 transition-all duration-300 ease-out"
                  >
                    <img
                      src={p}
                      alt="Partner Logo"
                      className="max-w-[75%] max-h-[75%] object-contain"
                    />
                    <span className="sr-only">Partner Logo</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======= Resources (Playbook, Case Study, Video, Webinar) ======= */}
        <section
          id="resources"
          className="bg-gradient-to-b from-teal-50 to-white py-16"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center">
              Facilities Transformation — Resources
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
              Practical guides, playbooks, and walkthroughs to help you
              modernize your facilities—step by step.
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <a
                href="#"
                className="group rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <FileDown className="text-teal-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Download the IFM Innovation Playbook
                    </p>
                    <p className="text-sm text-gray-600">
                      Roadmap to automation, KPIs, and predictive maintenance
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="group rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <FaFileAlt className="text-teal-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      FM Automation Guide
                    </p>
                    <p className="text-sm text-gray-600">
                      Sensor strategy, alerting, and SLA design patterns
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="group rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <FaFileAlt className="text-teal-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      IFM Case Study
                    </p>
                    <p className="text-sm text-gray-600">
                      From multi-vendor chaos to one-team clarity
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="group rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <FaPlayCircle className="text-teal-600 w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Sustainability Webinar
                    </p>
                    <p className="text-sm text-gray-600">
                      Greener operations without the guesswork
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Video Walkthrough */}
            <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-100">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/S9eirikdfcI?si=SBjQ9REsR4Jp78O7"
                  title="Smart Building Transformation Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======= Sticky Sidebar + Main Grid ======= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main (short intro cards to keep your original narrative) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl ring-1 ring-gray-100 shadow-lg"
              >
                <p className="text-gray-700">
                  Managing a facility can be complex: multiple vendors,
                  fragmented comms, and unpredictable costs. Our{" "}
                  <strong className="text-teal-600">
                    Integrated Facilities Management
                  </strong>{" "}
                  (IFM) cuts the noise with a{" "}
                  <strong className="text-teal-600">
                    centralized, unified solution
                  </strong>{" "}
                  for your entire property.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl ring-1 ring-gray-100 shadow-lg"
              >
                <p className="text-gray-700">
                  By combining services—from maintenance to cleaning—under one
                  expert team, we remove inefficiencies,
                  <strong className="text-teal-600"> optimize costs</strong>,
                  and keep every aspect running smoothly.
                </p>
              </motion.div>
            </div>

            {/* Quick highlight row */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  t: "SLA-Backed Quality",
                  d: "Measurable outcomes with accountability",
                },
                {
                  icon: <Leaf className="w-5 h-5" />,
                  t: "Sustainable by Design",
                  d: "Energy, water, and waste optimized",
                },
                {
                  icon: <Building2 className="w-5 h-5" />,
                  t: "Scalable Footprint",
                  d: "From single sites to portfolios",
                },
              ].map((x, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100"
                >
                  <div className="flex items-center gap-2 text-teal-600 font-semibold">
                    {x.icon}
                    {x.t}
                  </div>
                  <p className="mt-2 text-gray-600">{x.d}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-28 h-fit">
            <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                Service Highlights
              </h3>
              <div className="mt-4 grid gap-3">
                <a
                  href="/requestEmployee"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 font-bold text-white shadow-lg shadow-teal-500/30 hover:bg-teal-500 transition"
                >
                  🏢 Request Staff
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="rounded-xl bg-teal-50 p-4 ring-1 ring-teal-100">
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />{" "}
                      Centralized Facility Oversight
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />{" "}
                      Proactive Maintenance Scheduling
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />{" "}
                      Sustainability & Energy Efficiency
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />{" "}
                      Vendor & Contractor Coordination
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5" />{" "}
                      Real-Time Facility Analytics
                    </li>
                  </ul>
                </div>

                <a
                  href="#resources"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-teal-700 ring-1 ring-teal-200 hover:bg-teal-50 transition"
                >
                  📘 Brochures & Guides
                </a>

                <a
                  href="tel:+44 0203 876 1531"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 transition"
                >
                  <PhoneCall className="w-4 h-4" /> 24/7 IFM Helpline
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* ======= Facilities Upgrade Inquiry Form ======= */}
        <section
          id="facilities-upgrade"
          className="max-w-7xl mx-auto px-4 pb-20"
        >
          <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-100">
            <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  Ready to Upgrade Your Facilities?
                </h2>
                <p className="mt-3 text-gray-600">
                  Tell us about your sites and objectives. We’ll map an IFM plan
                  with clear KPIs, governance, and an onboarding timeline.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm text-teal-700 ring-1 ring-teal-100">
                  <ShieldCheck className="w-4 h-4" /> We respect your privacy
                  and keep your data secure.
                </div>
              </div>

              <div className="w-full md:max-w-md">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      placeholder="Company / Organization"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition">
                      <option>Portfolio Size</option>
                      <option>1–2 sites</option>
                      <option>3–10 sites</option>
                      <option>10+ sites</option>
                    </select>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition">
                      <option>Priority Area</option>
                      <option>Cost Optimization</option>
                      <option>Compliance & SLAs</option>
                      <option>Occupant Experience</option>
                      <option>Sustainability</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Describe your current challenges or goals"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                  />
                  <label className="flex items-start gap-2 text-gray-600 text-sm">
                    <input type="checkbox" className="mt-1 accent-teal-600" />I
                    consent to have Demand Recruitment Services Ltd store my
                    submitted information for updates.
                  </label>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl bg-teal-600 text-white font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-500 transition"
                  >
                    Request Facilities Upgrade Plan
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    You’ll receive a tailored plan with expected KPIs (e.g.,
                    ~20% cost reduction with smart tech).
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
