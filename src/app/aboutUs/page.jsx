"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import Vendors from "@/components/vendors";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  Lightbulb,
  Sparkles,
  Quote,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

import team1 from "../../../public/team/team1.jpg";
import team2 from "../../../public/team/team2.jpg";
import team3 from "../../../public/team/team3.jpg";
import whoImage1 from "../../../public/services/1.jpg";
import whoImage2 from "../../../public/services/2.jpg";

const AboutUs = () => {
  // ---- Animations / Variants ----
  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // ---- Hero Parallax state ----
  const heroRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  const springY = useSpring(y, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-30, Math.min(30, relX / 12)));
    y.set(Math.max(-30, Math.min(30, relY / 12)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ---- Quotes Carousel ----
  const quotes = useMemo(
    () => [
      {
        text: "Talent wins games, but teamwork and intelligence win championships.",
        author: "Michael Jordan",
      },
      {
        text: "Alone we can do so little; together we can do so much.",
        author: "Helen Keller",
      },
      {
        text: "Quality means doing it right when no one is looking.",
        author: "Henry Ford",
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
      },
    ],
    []
  );

  const [qIndex, setQIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setQIndex((i) => (i + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(t);
  }, [quotes.length]);

  // ---- Fun stats count-up ----
  const [stats, setStats] = useState({ clients: 0, placements: 0, partners: 0 });
  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1400;

    const animate = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setStats({
        clients: Math.floor(220 * p),
        placements: Math.floor(1200 * p),
        partners: Math.floor(65 * p),
      });
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ---- Card list (Core values) ----
  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Integrity",
      desc: "We operate with honesty, transparency and strong ethics in everything we do.",
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "We deliver quality outcomes and continuously raise the bar on service.",
    },
    {
      icon: Users,
      title: "Collaboration",
      desc: "We foster teamwork, open communication and meaningful partnerships.",
    },
    {
      icon: CheckCircle,
      title: "Accountability",
      desc: "We own our outcomes and deliver consistent, measurable results.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "We embrace change and craft forward-looking workforce solutions.",
    },
  ];

  // ---- Simple Hover component replacing Tilt ----
  const HoverCard = ({ children, className = "" }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Navbar />
      <StickyHeader />

      {/* ===== HERO / BANNER ===== */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative isolate overflow-hidden"
      >
        <motion.div
          style={{ translateX: springX, translateY: springY }}
          className="relative h-[68vh] w-full"
        >
          <Image
            src="/hb2.jpg"
            alt="Demand Recruitment — People Powered"
            fill
            priority
            className="object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-teal-900/30 to-teal-700/10 mix-blend-multiply" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.18),transparent_60%)] animate-pulse-slow" />
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/30 px-3 py-1.5 text-white backdrop-blur">
                <Sparkles size={16} />
                People-first staffing
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Driven by People, <span className="text-teal-300">Defined by Purpose</span>
              </h1>
              <p className="mt-4 text-white/90 leading-relaxed text-sm sm:text-base">
                From recruitment to managed services and community staffing — we connect
                ambition with opportunity and turn workforce challenges into momentum.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#who-we-are"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 sm:px-5 sm:py-3 font-semibold shadow-lg shadow-teal-500/30 transition"
                >
                  Explore our story <ArrowRight size={18} />
                </a>
                <a
                  href="#values"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2 sm:px-5 sm:py-3 font-semibold ring-1 ring-white/30 transition"
                >
                  Our values
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="bubble-teal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 4}s`,
                "--size": `${10 + Math.random() * 25}px`,
              }}
            />
          ))}
        </div>
      </section>

      {/* ===== QUOTES CAROUSEL ===== */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
          <div className="flex items-center justify-between">
            <button
              aria-label="Previous quote"
              onClick={() => setQIndex((qIndex - 1 + quotes.length) % quotes.length)}
              className="rounded-full border border-teal-200 p-2 hover:bg-teal-50 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex-1 mx-4 text-center"
            >
              <Quote className="mx-auto mb-3 text-teal-600" size={28} />
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                “{quotes[qIndex].text}”
              </p>
              <p className="mt-2 text-sm text-teal-700 font-semibold">
                — {quotes[qIndex].author}
              </p>
            </motion.div>
            <button
              aria-label="Next quote"
              onClick={() => setQIndex((qIndex + 1) % quotes.length)}
              className="rounded-full border border-teal-200 p-2 hover:bg-teal-50 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section id="who-we-are" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          Who We Are
        </motion.h2>
        <motion.p
          className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          Demand Recruitment Services Ltd began by bridging the gap between businesses and
          skilled professionals. Today, we deliver comprehensive staffing—Recruitment, Managed
          Service Provision, Facility Management, and Community Services—so organisations can
          scale with confidence.
        </motion.p>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <HoverCard className="group relative">
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
              <div className="relative h-64 sm:h-72">
                <Image
                  src={whoImage1}
                  alt="Skilled workforce collaboration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-teal-700">
                    Healthcare & Facilities
                  </span>
                  <span className="rounded-full bg-teal-600/90 px-3 py-1 text-sm font-semibold text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  People-first staffing that scales
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  We connect top talent with leading organisations across healthcare,
                  facilities and community support—faster, safer and smarter.
                </p>
                <a
                  href="#values"
                  className="mt-4 inline-flex items-center gap-2 text-teal-700 font-semibold hover:underline text-sm sm:text-base"
                >
                  See how we work <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </HoverCard>

          <HoverCard className="group">
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white h-full">
              <div className="relative h-64 sm:h-72">
                <Image
                  src={whoImage2}
                  alt="Team strategy session"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Partnership over placement
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  We go beyond roles to craft long-term partnerships that align capability,
                  culture and outcomes.
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span>MSP</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Facility Management</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Community Services</span>
                </div>
              </div>
            </div>
          </HoverCard>
        </div>

        <div className="relative mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="rounded-2xl border border-teal-100 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Mission</h3>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Simplify hiring with reliable workforce solutions and empower people with
              meaningful career opportunities.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="rounded-2xl border border-teal-100 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Vision</h3>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Be the leading staffing partner recognised for quality, efficiency and
              innovation in workforce solutions.
            </p>
          </motion.div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-teal-50 p-4 sm:p-6 ring-1 ring-teal-100">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 tabular-nums">
              {stats.clients}+
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 tabular-nums">
              {stats.placements}+
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Successful Placements</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 tabular-nums">
              {stats.partners}+
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Partner Organisations</p>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section id="values" className="bg-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map(({ icon: Icon, title, desc }, i) => (
              <HoverCard key={i}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="group relative rounded-2xl border border-teal-100 bg-gradient-to-b from-white to-teal-50/40 p-4 sm:p-6 shadow-sm transition"
                >
                  <div className="absolute inset-x-0 -top-px mx-auto h-px w-11/12 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-teal-100 p-2 sm:p-3 ring-1 ring-teal-200">
                      <Icon className="text-teal-700" size={20} />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm sm:text-base">{desc}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-teal-700 opacity-0 group-hover:opacity-100 transition">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </div>
                </motion.div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="bg-gray-50 py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            Meet Our Leadership Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { img: team1, name: "Robert Lee", title: "Founder & CEO" },
              { img: team2, name: "John Malik", title: "Director of Operations" },
              { img: team3, name: "Sara Lee", title: "Head of Recruitment" },
            ].map((m, i) => (
              <HoverCard key={i}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition"
                >
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{m.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{m.title}</p>
                  </div>
                </motion.div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 sm:p-8 md:p-10 text-white shadow-lg">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                Ready to build your next great team?
              </h3>
              <p className="mt-2 text-white/90 max-w-2xl text-sm sm:text-base">
                Let&apos;s align skills with strategy and turn hiring into a competitive edge.
              </p>
              <div className="mt-5">
                <a
                  href="/contactUs"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-teal-700 px-4 sm:px-5 py-2 sm:py-3 font-semibold shadow-sm hover:shadow-md transition"
                >
                  Get in touch <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .bubble-teal {
          position: absolute;
          bottom: -60px;
          width: var(--size);
          height: var(--size);
          background: rgba(20, 184, 166, 0.25);
          border: 1px solid rgba(20, 184, 166, 0.35);
          border-radius: 9999px;
          animation: floatUp linear infinite;
          opacity: 0.9;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-50vh) scale(1.05);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(1.1);
            opacity: 0;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;