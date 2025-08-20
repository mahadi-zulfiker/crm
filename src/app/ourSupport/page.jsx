"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Swal from "sweetalert2";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import {
  Phone,
  Mail,
  MessageSquare,
  BookOpen,
  Wrench,
  Users,
  MonitorPlay,
  MessageCircle,
  Check,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quotes = [
  {
    text: "Great support turns obstacles into outcomes.",
    author: "Demand Recruitment",
  },
  {
    text: "We don’t just answer tickets—we unlock momentum.",
    author: "Support Team",
  },
  {
    text: "Every question is a step closer to clarity.",
    author: "Customer Success",
  },
];

const cardVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const hoverFx =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-200 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
    <ShieldCheck className="w-3.5 h-3.5" />
    {children}
  </span>
);

// Reusable support card
function SupportCard({
  icon: Icon,
  title,
  bullets,
  delay = 0,
  accent = "teal",
  children,
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      className={`group bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 ${hoverFx} focus-within:ring-2 focus-within:ring-${accent}-500`}
      role="region"
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-200">
            <Icon
              className="w-5 sm:w-6 h-5 sm:h-6 text-teal-700"
              aria-hidden="true"
            />
          </span>
          <h3
            id={title.replace(/\s+/g, "-").toLowerCase()}
            className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight"
          >
            {title}
          </h3>
        </div>
        {children ? (
          children
        ) : (
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 sm:mt-1 flex-none text-teal-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 sm:mt-5">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-teal-700 font-medium text-sm sm:text-base hover:underline"
          >
            Get help <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurSupport() {
  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const quote = useMemo(() => quotes[qIndex], [qIndex]);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "We’ll be in touch within 24 hours!",
      confirmButtonColor: "#0f766e",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <StickyHeader />

      {/* Hero / Banner */}
      <section className="relative isolate">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-full w-full"
          >
            <Image
              src="/hb2.jpg"
              alt="Dedicated support team banner"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-teal-900/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.15),_transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:py-32 text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Our Support
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-teal-50"
          >
            We’re here to assist you every step of the way. Explore our support
            services and resources.
          </motion.p>

          {/* Animated quote */}
          <div className="mt-6 sm:mt-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={qIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="max-w-full sm:max-w-3xl rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-4 sm:p-5"
              >
                <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed">
                  “{quote.text}”
                </p>
                <footer className="mt-2 text-xs sm:text-sm text-teal-100">
                  — {quote.author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Quick actions */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#support-grid"
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-white font-semibold shadow-lg hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Explore Support <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-white font-semibold ring-1 ring-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Contact Us <Phone className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Assurance badges */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge>24/7 Availability</Badge>
            <Badge>Human + AI Assistance</Badge>
            <Badge>SLA-backed Responses</Badge>
            <Badge>Privacy First</Badge>
          </div>
        </div>
      </section>

      {/* Support Grid */}
      <section
        id="support-grid"
        className="bg-gradient-to-b from-teal-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              How we can help
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Clear, organized, and fast pathways to support—no overwhelm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            <SupportCard
              icon={Phone}
              title="Customer Assistance"
              bullets={[
                "24/7 phone, email, and live chat support",
                "Phone: 1-800-123-4567",
                "Email: support@example.com",
                "Live Chat: Available 24/7",
              ]}
            />

            <SupportCard icon={BookOpen} title="Resource Center" delay={0.05}>
              <div className="overflow-hidden rounded-xl mb-4">
                <Image
                  src="/recruitment.jpg"
                  alt="Resource library"
                  width={1200}
                  height={800}
                  className="h-32 sm:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                {[
                  "Step-by-step guides",
                  "FAQs & troubleshooting",
                  "Product feature articles",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 sm:mt-1 flex-none text-teal-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </SupportCard>

            <SupportCard
              icon={MessageSquare}
              title="Engagement & Feedback"
              delay={0.1}
              bullets={[
                "Customer satisfaction surveys",
                "Product improvement suggestions",
                "Feedback forums",
              ]}
            />

            <SupportCard
              icon={Wrench}
              title="Technical Support"
              delay={0.15}
              bullets={[
                "Software installations",
                "Network configuration",
                "Bug reporting",
              ]}
            />

            <SupportCard
              icon={Users}
              title="Community Support"
              delay={0.2}
              bullets={[
                "Discussion boards",
                "Peer-to-peer help",
                "Community events",
              ]}
            />

            <SupportCard
              icon={MonitorPlay}
              title="Live Webinars"
              delay={0.25}
              bullets={[
                "Monthly webinars",
                "Product demos",
                "Q&A with experts",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ (Accessible accordions) */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Quick answers to common questions. Use Tab/Enter/Space to
              navigate.
            </p>
          </div>

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {[
              {
                q: "What industries do you recruit for?",
                a: "We support a broad range of sectors, including technology, finance, healthcare, retail, and more. If you have a niche requirement, reach out—our team will advise the best route.",
              },
              {
                q: "Can I apply for jobs directly from the website?",
                a: "Yes. You can browse roles and apply directly via our Careers section. If you need help, our team is available via chat or email.",
              },
              {
                q: "Do you offer temporary or permanent placements?",
                a: "We offer both temporary and permanent placements, plus contract-to-hire options based on your needs.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex w-full cursor-pointer items-center justify-between p-4 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {item.q}
                    </span>
                  </div>
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-5 pt-0 text-gray-600 text-sm sm:text-base">
                  {item.a}
                </div>
                <div className="h-px bg-gray-200" />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (wraps your existing validated form) */}
      <section id="contact" className="bg-gradient-to-b from-white to-teal-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Get in touch
              </h2>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Prefer email or phone? We’ve got you covered. Otherwise, use the
                form.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="tel:+4402038761531"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white font-semibold shadow hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
              <Link
                href="mailto:info@demandrecruitmentservices.co.uk"
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-teal-700 font-semibold ring-1 ring-teal-200 hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 sm:gap-7 lg:gap-10">
              {/* Contact info - now a sticky sidebar on large screens */}
              <motion.aside
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 lg:sticky lg:top-8 self-start rounded-2xl bg-white p-4 sm:p-6 ring-1 ring-gray-200 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  We respond quickly—typically within a few business hours.
                </p>
                <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-teal-700 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        Phone
                      </div>
                      <a
                        href="tel:+4402038761531"
                        className="text-gray-600 hover:underline text-sm sm:text-base"
                      >
                        +44 0203 876 1531
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-teal-700 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        Email
                      </div>
                      <a
                        href="mailto:info@demandrecruitmentservices.co.uk"
                        className="text-gray-600 hover:underline text-sm sm:text-base"
                      >
                        info@demandrecruitmentservices.co.uk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-teal-700 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        Office
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">
                        120 Staffing, London, UK
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-gray-200">
                    <Image
                      src="/hb2.jpg"
                      alt="Office map placeholder"
                      width={800}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.aside>

              {/* Your existing validated contact form */}
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="lg:col-span-3 rounded-2xl bg-white p-4 sm:p-6 ring-1 ring-gray-200 shadow-sm"
              >
                {/* Contact Info + Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Info */}
                  <motion.div
                    data-aos="fade-right"
                    className="space-y-8 text-gray-700"
                  >
                    <h3 className="text-4xl font-extrabold text-gray-800">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      We're here to help you with your recruitment and staffing
                      needs. Fill out the form or use one of the options below
                      to connect.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 hover:translate-x-2 transition">
                        <FaMapMarkerAlt className="text-teal-600 text-2xl mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">
                            Office Address
                          </h4>
                          <p>120 Staffing, London, UK</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 hover:translate-x-2 transition">
                        <FaPhone className="text-teal-600 text-2xl mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">Phone</h4>
                          <a
                            href="tel:+442038761531"
                            className="hover:text-teal-600 transition"
                          >
                            +44 0203 876 1531
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 hover:translate-x-2 transition">
                        <FaEnvelope className="text-teal-600 text-2xl mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">Email</h4>
                          <a
                            href="mailto:info@demandrecruitmentservices.co.uk"
                            className="hover:text-teal-600 transition"
                          >
                            info@demandrecruitmentservices.co.uk
                          </a>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="https://wa.me/442038761531?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
                      >
                        <FaWhatsapp className="text-xl animate-pulse" />
                        Chat on WhatsApp
                      </motion.a>
                    </div>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    data-aos="fade-left"
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-teal-100"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                      required
                    />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                      required
                    />
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none transition"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition"
                    >
                      Send Message
                    </motion.button>
                  </motion.form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
