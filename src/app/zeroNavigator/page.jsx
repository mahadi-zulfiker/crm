"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Target,
  Leaf,
  BarChart2,
  Rocket,
  CheckCircle,
  Zap,
  Scale,
} from "lucide-react";

// NetZero Navigator - Redesigned single-file page (responsive + interactive)

const TARGET_DATE = new Date("2025-12-31T23:59:59Z");

function useCountdown(target) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

export default function NetZeroNavigator2025Page() {
  // core feature definitions (grouped by priority)
  const navigatorFeatures = [
    {
      id: 1,
      title: "Baseline Carbon Assessment",
      summary:
        "Comprehensive analysis of current emissions across Scopes 1, 2 & 3 to establish an auditable starting point.",
      icon: BarChart2,
      image: "/hb2.jpg",
      priority: "Immediate",
      link: "#zeroNavigator/baseline-assessment",
    },
    {
      id: 2,
      title: "Tailored Decarbonization Roadmaps",
      summary:
        "Actionable strategies, prioritized milestones and budget estimates to reach net-zero targets.",
      icon: Target,
      priority: "Immediate",
      link: "#zeroNavigator/roadmaps",
    },
    {
      id: 3,
      title: "Renewable Energy Integration",
      summary:
        "Turn-key guidance for solar, wind, and PPAs plus energy storage readiness assessments.",
      icon: Zap,
      priority: "Mid-Term",
      link: "#zeroNavigator/renewable-energy",
    },
    {
      id: 4,
      title: "Supply Chain Engagement",
      summary:
        "Programs and supplier scorecards to reduce Scope 3 footprint across your value chain.",
      icon: Globe,
      priority: "Mid-Term",
      link: "#zeroNavigator/supply-chain",
    },
    {
      id: 5,
      title: "Offsetting & Carbon Removal",
      summary:
        "Due-diligence led selection of high-integrity offsets and nature-based removal pathways.",
      icon: Leaf,
      priority: "Ongoing",
      link: "#zeroNavigator/offsetting",
    },
    {
      id: 6,
      title: "Compliance & Reporting",
      summary:
        "Reporting templates aligned with GHG Protocol, TCFD and emerging regulatory needs.",
      icon: Scale,
      priority: "Ongoing",
      link: "#zeroNavigator/reporting",
    },
  ];

  const programBenefits = [
    {
      id: 1,
      title: "Accelerated Net-Zero Achievement",
      description: "Proven playbooks and rapid pilot-to-scale support.",
      icon: Rocket,
    },
    {
      id: 2,
      title: "Enhanced Brand Reputation",
      description:
        "Visible sustainability wins that attract customers, partners and talent.",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Operational Cost Savings",
      description:
        "Energy and process efficiency that improves the bottom line.",
      icon: Zap,
    },
    {
      id: 4,
      title: "Future-Proofed Business",
      description:
        "Stay ahead of regulation and investor expectations with matured reporting.",
      icon: Globe,
    },
  ];

  const quotes = [
    "Sustainability isn’t a buzzword — it’s the business advantage of our time.",
    "Act now: the costs of delay are counted in reputation and capital.",
    "Net Zero is a strategy, not a checkbox. We help you build it.",
    "Small operational changes compound into measurable climate impact.",
  ];

  const grouped = useMemo(() => {
    return {
      Immediate: navigatorFeatures.filter((f) => f.priority === "Immediate"),
      "Mid-Term": navigatorFeatures.filter((f) => f.priority === "Mid-Term"),
      Ongoing: navigatorFeatures.filter((f) => f.priority === "Ongoing"),
    };
  }, []);

  const countdown = useCountdown(TARGET_DATE);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setActiveQuoteIndex((p) => (p + 1) % quotes.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white text-gray-800">
      <Navbar />
      <StickyHeader />

      {/* HERO */}
      <header className="relative">
        <div className="relative h-[62vh] md:h-[68vh] lg:h-[72vh] overflow-hidden rounded-b-3xl">
          {/* Background image (use hb2.jpg) */}
          <motion.img
            src="/hb2.jpg"
            alt="Net Zero banner"
            className="absolute inset-0 w-full h-full object-cover scale-100 will-change-transform"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.0 }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* teal overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/70 via-teal-800/45 to-transparent" />

          {/* content */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 h-full flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-xl"
                >
                  Net Zero Navigator 2025
                </motion.h1>

                {/* stat badge & testimonial */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                  <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span className="text-xs text-teal-200">Join</span>
                    <strong className="text-2xl md:text-3xl text-white">
                      300+
                    </strong>
                    <span className="text-sm text-teal-100">
                      orgs targeting net-zero
                    </span>
                  </div>

                  <div className="text-sm text-teal-100 italic max-w-md">
                    <span className="block">“{quotes[activeQuoteIndex]}”</span>
                    <span className="block mt-2 text-xs opacity-80">
                      — Change makers & sustainability leaders
                    </span>
                  </div>
                </div>

                {/* CTA + animated micro interaction */}
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 6 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                    href="/contactUs"
                    className="inline-flex items-center gap-3 bg-white text-teal-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all"
                  >
                    Get Started — Book a Free Audit
                    <motion.span
                      className="inline-block ml-1"
                      animate={{ rotate: [0, -8, 0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
                    >
                      ➜
                    </motion.span>
                  </motion.a>

                  <a
                    href="#zero-overview.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white/90 py-2 px-4 rounded-lg hover:bg-white/10 transition"
                  >
                    Download Overview (PDF)
                  </a>

                  {/* countdown */}
                  <div className="ml-auto sm:ml-0 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg text-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-xs opacity-90">Target</div>
                      <div className="font-medium">Dec 31, 2025</div>
                    </div>
                    <div className="mt-1 text-sm font-mono">
                      {countdown.days}d{" "}
                      {String(countdown.hours).padStart(2, "0")}h{" "}
                      {String(countdown.minutes).padStart(2, "0")}m
                    </div>
                  </div>
                </div>

                {/* micro trust badges */}
                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <div className="bg-white/10 px-3 py-1 rounded-lg text-xs text-teal-50">
                    ISO-aligned process
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-lg text-xs text-teal-50">
                    GHG Protocol
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-lg text-xs text-teal-50">
                    Verified partners
                  </div>
                </div>
              </div>

              {/* right column: testimonial card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full lg:w-[420px] bg-white rounded-2xl shadow-2xl p-6 ring-1 ring-black/5"
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/team/team1.jpg"
                    alt="Client"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold">Aria Kumar</div>
                    <div className="text-xs text-gray-500">
                      Head of Sustainability — GreenWorks
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  “Their roadmap cut our emissions by 32% in 9 months.
                  Practical, data-led and fast.”
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-xs text-gray-500">Impact</div>
                  <div className="text-teal-700 font-bold">32% ↓ Emissions</div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#features"
                    className="text-teal-700 text-sm font-medium hover:underline"
                  >
                    Explore Features
                  </a>
                  <a
                    href="/caseStudies"
                    className="text-gray-500 text-sm hover:underline"
                  >
                    Read Case Study
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main id="features" className="flex-grow container mx-auto px-6 py-16">
        {/* Modules grouped by priority */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
            Program Features & Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(grouped).map((group) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{group}</h3>
                  <div className="text-xs text-gray-500">Priority</div>
                </div>

                <div className="space-y-4">
                  {grouped[group].map((feature, idx) => (
                    <motion.article
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-4 items-start p-3 rounded-lg hover:shadow-lg transition"
                    >
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-50">
                        {feature.image ? (
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <feature.icon className="w-7 h-7 text-teal-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {feature.summary}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <Link
                            href={feature.link}
                            className="text-teal-600 text-sm font-medium hover:underline"
                          >
                            Learn more →
                          </Link>
                          <a
                            href={`/schedule-demo?module=${feature.id}`}
                            className="text-xs text-gray-400"
                          >
                            Schedule demo
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits + Social Proof */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 bg-gradient-to-tr from-white to-teal-50 rounded-2xl p-8 shadow">
              <h3 className="text-2xl font-bold mb-4">
                Why Choose Net Zero Navigator?
              </h3>
              <p className="text-gray-600 mb-6">
                We combine data, supplier engagement and practical pilots to
                reduce emissions and create value.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programBenefits.map((b) => (
                  <motion.div
                    key={b.id}
                    whileHover={{ translateY: -4 }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <b.icon className="w-8 h-8 text-teal-600" />
                      <div>
                        <div className="font-semibold">{b.title}</div>
                        <div className="text-sm text-gray-500">
                          {b.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="bg-white rounded-2xl p-6 shadow text-center">
              <div className="text-sm text-gray-500">Recent Wins</div>
              <div className="mt-4 text-3xl font-extrabold text-teal-700">
                32%
              </div>
              <div className="text-sm text-gray-500">
                Average emissions reduction in pilots
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="/caseStudies"
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  See case studies
                </a>
                <a href="/contactUs" className="text-sm text-gray-500">
                  Transparent pricing
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Infographic / Strategy flow */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow">
            <h3 className="text-xl font-semibold mb-4">Strategy at a glance</h3>
            <p className="text-sm text-gray-500 mb-6">
              A simple visual path from audit → pilot → scale.
            </p>
            <div className="w-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 200"
                className="w-full max-w-2xl h-44"
              >
                {/* Audit */}
                <circle cx="100" cy="100" r="35" fill="#14b8a6" />
                <text
                  x="100"
                  y="105"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Audit
                </text>

                {/* Arrow 1 */}
                <line
                  x1="135"
                  y1="100"
                  x2="220"
                  y2="100"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />

                {/* Pilot */}
                <circle cx="260" cy="100" r="35" fill="#0ea5e9" />
                <text
                  x="260"
                  y="105"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Pilot
                </text>

                {/* Arrow 2 */}
                <line
                  x1="295"
                  y1="100"
                  x2="380"
                  y2="100"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />

                {/* Scale */}
                <circle cx="420" cy="100" r="35" fill="#6366f1" />
                <text
                  x="420"
                  y="105"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Scale
                </text>

                {/* Arrowhead definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Ready to lead the race to Net Zero?
              </h3>
              <p className="mt-2 text-sm opacity-90">
                Book a discovery call. We'll provide a 30-minute audit and an
                actionable next-step plan.
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <Link
                href="/contactUs"
                className="inline-flex items-center gap-3 bg-white text-teal-800 font-semibold py-3 px-6 rounded-lg shadow hover:scale-105 transition"
              >
                Book discovery
              </Link>
              <a
                href="#zero-overview.pdf"
                download
                className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white/90 py-2 px-4 rounded-lg"
              >
                Download overview
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
