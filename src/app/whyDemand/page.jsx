"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ContactSection from "@/components/ContactHomePage";

// ---------------- Data ---------------- //
const insights = [
  {
    title: "News & Events",
    link: "/newsEvent",
    image: "/services/3.jpg",
    description:
      "Stay updated with the latest trends, events, and industry news.",
  },
  {
    title: "Case Studies",
    link: "/caseStudies",
    image: "/services/56.jpg",
    description: "Real stories of impact, success, and transformations.",
  },
  {
    title: "Insights & White Papers",
    link: "/insight",
    image: "/services/2.jpg",
    description: "In-depth research and industry analysis for decision makers.",
  },
  {
    title: "Podcasts & Videos",
    link: "/podcastVideo",
    image: "/services/26.jpg",
    description: "Engaging conversations with thought leaders and innovators.",
  },
];

const technologies = [
  {
    title: "Artificial Intelligence",
    link: "/artificialIntelligence",
    image: "/meddd111.jpg",
    description: "Leveraging AI to transform the recruitment landscape.",
  },
  {
    title: "Facilities Transformation",
    link: "/facilitiesTransformation",
    image: "/services/4.jpg",
    description: "Innovating facility management with modern solutions.",
  },
  {
    title: "Net Zero Navigator 2025",
    link: "/zeroNavigator",
    image: "/hb2.jpg",
    description: "Driving sustainable change and carbon neutrality goals.",
  },
];

const tabs = [
  { id: "insights", label: "Insights & News", icon: Newspaper },
  { id: "technologies", label: "Technology & Innovation", icon: Lightbulb },
];

const quotes = [
  {
    text: "Great vision without great people is irrelevant.",
    author: "Jim Collins",
  },
  {
    text: "Hire character. Train skill.",
    author: "Peter Schutz",
  },
  {
    text: "The secret of my success is that we have gone to exceptional lengths to hire the best people.",
    author: "Steve Jobs",
  },
  {
    text: "Talent wins games, but teamwork and intelligence win championships.",
    author: "Michael Jordan",
  },
];

// ---------------- Component ---------------- //
export default function WhyDemand() {
  const [activeTab, setActiveTab] = useState("insights");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const cards = useMemo(
    () => (activeTab === "insights" ? insights : technologies),
    [activeTab]
  );

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  // Rotate hero quotes
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  // Subtle parallax on hero (mouse-based)
  useEffect(() => {
    const hero = document.getElementById("hero-parallax");
    if (!hero) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const rx = (e.clientY / h - 0.5) * 4; // rotate X
      const ry = (e.clientX / w - 0.5) * -4; // rotate Y
      hero.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    };
    const onLeave = () => {
      hero.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-white text-gray-900">
      <Navbar />
      <StickyHeader />

      {/* Hero Banner */}
      <section className="relative h-[620px] md:h-[760px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/about-us/about-1.jpg"
            alt="Why Demand Recruitment"
            fill
            priority
            className="object-cover"
          />
          {/* Teal glass gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-teal-900/40 to-teal-700/30 mix-blend-multiply" />
          {/* Texture bubbles (dribbble/pinterest style) */}
          <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full">
          <div
            id="hero-parallax"
            className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20 transition-transform duration-500 will-change-transform"
          >
            <div
              className="max-w-3xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md ring-1 ring-white/20 mb-4">
                <Sparkles size={16} className="text-white" />
                <span className="text-sm text-white">Why Demand Recruitment</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_6px_20px_rgba(20,184,166,0.55)]">
                Bridging Talent & Innovation
              </h1>

              {/* Rotating Inspiring Quotes */}
              <div className="mt-5 h-[92px] md:h-[72px]">
                {quotes.map((q, i) => (
                  <blockquote
                    key={i}
                    className={`transition-all duration-700 ${
                      i === quoteIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-3 pointer-events-none absolute"
                    }`}
                  >
                    <p className="text-lg md:text-xl text-teal-50/95 italic max-w-2xl">
                      “{q.text}”
                    </p>
                    <footer className="mt-2 text-teal-100/90 text-sm">
                      — {q.author}
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="#explore"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-teal-500/90 hover:bg-teal-600 text-white px-6 py-3 font-semibold shadow-[0_10px_30px_rgba(20,184,166,0.5)] hover:shadow-[0_12px_34px_rgba(20,184,166,0.65)] transition-all"
                >
                  Explore More
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                {/* Secondary CTA linking to an existing card (uses a card image on hover preview) */}
                <Link
                  href="/caseStudies"
                  className="relative group rounded-2xl bg-white/10 text-white px-5 py-3 font-semibold backdrop-blur-md ring-1 ring-white/20 hover:ring-teal-200/60 transition-all"
                >
                  View Case Studies
                  <span className="ml-2 text-teal-200 group-hover:text-white">
                    →
                  </span>
                  {/* Hover image preview (uses an existing card's image) */}
                  <span className="absolute -right-3 -top-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="block rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
                      <Image
                        src="/services/56.jpg"
                        alt="Case Studies Preview"
                        width={180}
                        height={120}
                        className="object-cover"
                      />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom glass banner card */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[86%] lg:w-[80%]">
            <div
              className="rounded-3xl bg-white/20 backdrop-blur-xl ring-1 ring-white/30 p-4 md:p-6 shadow-[0_10px_50px_rgba(13,148,136,0.35)]"
              data-aos="zoom-in-up"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/95 text-center md:text-left text-sm md:text-base">
                  We connect mission-driven organizations with exceptional people using{" "}
                  <span className="font-semibold text-white">AI-enabled sourcing</span>,{" "}
                  <span className="font-semibold text-white">human insight</span>, and{" "}
                  <span className="font-semibold text-white">ethical hiring</span>.
                </p>
                <Link
                  href="/newsEvent"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/90 hover:bg-white text-teal-700 px-4 py-2 font-semibold transition-all"
                >
                  Latest News <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section id="explore" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div
            className="flex justify-center gap-3 md:gap-6 mb-12 flex-wrap"
            data-aos="fade-up"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm md:text-base transition-all border backdrop-blur-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 ${
                    active
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-gray-800 border-gray-200 hover:border-teal-300"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-white" : "text-teal-600"}
                  />
                  {tab.label}
                  {/* Active underline */}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-1/2 rounded-full bg-teal-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Cards (Glass + Pinterest feel) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {cards.map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl border border-teal-100/60 shadow-[0_10px_40px_rgba(13,148,136,0.12)] hover:shadow-[0_18px_60px_rgba(13,148,136,0.22)] transition-all hover:-translate-y-2"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Teal gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-teal-700/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Floating badge */}
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 text-teal-700 text-xs font-semibold px-3 py-1 shadow">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-teal-700 font-semibold">
                    Learn More{" "}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>

                {/* Subtle decorative glass chip */}
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-3xl bg-teal-200/30 backdrop-blur-md" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "Trusted by 200+ Clients",
            "ISO Certified",
            "AI-Driven Solutions",
            "Global Reach",
          ].map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 transform hover:scale-110 transition duration-500"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <ShieldCheck size={36} className="text-white drop-shadow-md" />
              <p className="text-lg font-medium">{badge}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
