"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What industries do you specialize in for recruitment services?",
    answer:
      "We specialize in healthcare, hospitality, facilities management, construction, and corporate services.",
  },
  {
    question: "How can I apply for jobs through your recruitment agency?",
    answer:
      "Browse jobs on our website or send your CV via our contact form — we'll match you with opportunities.",
  },
  {
    question: "Do you offer temporary, permanent, or contract placements?",
    answer:
      "Yes, we offer flexible options: temporary, permanent, and contract placements based on client needs.",
  },
  {
    question: "What is your process for candidate screening and matching?",
    answer:
      "We screen resumes, conduct skill assessments, and hold interviews to ensure cultural and career fit.",
  },
  {
    question: "Can I receive career advice or resume tips from your team?",
    answer:
      "Absolutely! We provide career guidance, resume support, and interview preparation.",
  },
  {
    question: "What are the benefits of using a recruitment agency?",
    answer:
      "Exclusive access to jobs, professional guidance, and advocacy to save time in your job search.",
  },
];

export default function ContactUs() {
  const [openIdx, setOpenIdx] = useState(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const router = useRouter();
  const { data: session } = useSession(); // contains user + role

  const dashboardRoutes = {
    admin: "/dashboard/admin",
    vendor: "/dashboard/vendor",
    client: "/dashboard/client",
    employee: "/dashboard/employee",
  };

  const handlePostJob = () => {
    if (!session) {
      router.push("/signIn");
    } else {
      const role = session.user?.role;
      const route = dashboardRoutes[role] || "/dashboard";
      router.push(route);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 700, once: true, disable: window.innerWidth < 640 });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Please add a subject";
    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // live validation small UX touch
    if (errors[e.target.name])
      setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSending(true);
      // simulate request
      await new Promise((res) => setTimeout(res, 900));
      Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "We’ll be in touch within 24 hours.",
        confirmButtonColor: "#0d9488",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again or use the phone/WhatsApp options.",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setSending(false);
    }
  };

  // Motion variants
  const cardHover = {
    scale: 1.02,
    y: -4,
    boxShadow: "0 10px 30px rgba(16, 185, 129, .12)",
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col bg-gray-50 text-gray-800">
      <Navbar />
      <StickyHeader />

      {/* Hero / Banner (teal theme, recruitment.jpg) */}
      <header className="relative isolate overflow-hidden">
        {/* Stronger gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-teal-800/80 to-emerald-700/75" />

        {/* Banner image cropped (object-top to cut bottom part) */}
        <div
          className="absolute inset-0 bg-[url('/recruitment.jpg')] bg-cover bg-top mix-blend-overlay opacity-75"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-24">
            {/* Left content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.08 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
                <ShieldCheck size={16} /> UK-compliant • 24/7 Support
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                Connect with top UK employers — fast.
              </h1>
              <p className="mt-4 max-w-xl text-white/95 text-base sm:text-lg drop-shadow-md">
                Our recruitment specialists find the right fit for you. Whether
                hiring or searching for work, we make the process personal, fast
                and UK-compliant.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/allJobs"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20 transition-all duration-300"
                >
                  Browse jobs
                  <ArrowRight size={16} />
                </a>
                <button
                  onClick={handlePostJob}
                  className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 transition-all duration-300"
                >
                  Hire Talent
                </button>
              </div>

              {/* Inspirational quotes banner */}
              <motion.blockquote
                className="mt-8 rounded-2xl bg-white/10 p-4 text-sm italic text-white/95 backdrop-blur drop-shadow-md"
                whileHover={{ scale: 1.01 }}
              >
                “Great teams are built when talent meets clarity of purpose.” —
                Join the movement.
              </motion.blockquote>
            </motion.div>

            {/* Right column card with image + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              whileHover={{ scale: 1.01 }}
              className="relative rounded-3xl overflow-hidden bg-white/5 shadow-lg transition-all duration-300 ease-out"
            >
              <div>
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow">
                      Need hiring support?
                    </h3>
                    <p className="mt-2 text-sm text-white/90 drop-shadow-sm">
                      Let us screen, shortlist and manage interviews — tailored
                      to your requirements.
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-white/85">
                      <li>• UK-compliant vetting</li>
                      <li>• DBS checks & reference handling</li>
                      <li>• Fast shortlist within 72 hours</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handlePostJob}
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 transition-all duration-300"
                    >
                      Post a job
                    </button>
                    <a
                      href="#contactUs"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition-all duration-300"
                    >
                      Talk to us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-50/0 to-gray-50" />
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <section
            className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 md:p-8 shadow-sm"
            data-aos="fade-right"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Get in touch
            </h2>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">
              Send us a message and we’ll reply promptly.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 grid grid-cols-1 gap-5"
            >
              {[
                { field: "name", placeholder: "Jane Doe" },
                { field: "email", placeholder: "you@company.com" },
                { field: "subject", placeholder: "How can we help?" },
              ].map(({ field, placeholder }) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="mb-1 block text-sm font-medium capitalize"
                  >
                    {field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-3 py-2 sm:px-4 sm:py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                      errors[field] ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder={placeholder}
                    aria-invalid={!!errors[field]}
                    aria-describedby={
                      errors[field] ? `${field}-error` : undefined
                    }
                    required
                  />
                  {errors[field] && (
                    <p
                      id={`${field}-error`}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-3 py-2 sm:px-4 sm:py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                    errors.message ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Share a few details about your needs..."
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  required
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 sm:px-6 sm:py-3 font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {sending ? "Sending..." : "Send Message"}{" "}
                <ArrowRight size={18} />
              </button>

              <p className="text-xs sm:text-sm text-gray-500">
                Prefer email or phone?{" "}
                <a
                  className="text-teal-700 underline"
                  href="mailto:info@demandrecruitmentservices.co.uk"
                >
                  info@demandrecruitmentservices.co.uk
                </a>{" "}
                ·{" "}
                <a className="text-teal-700 underline" href="tel:+442038761531">
                  +44 0203 876 1531
                </a>
              </p>
            </form>
          </section>

          {/* Contact Info (card with image + hover interaction) */}
          <aside className="grid gap-6 self-start" data-aos="fade-left">
            <motion.div
              whileHover={cardHover}
              className="rounded-3xl border border-gray-100 bg-white p-0 shadow-sm overflow-hidden"
            >
              <div className="relative h-36">
                <img
                  src="/recruitment.jpg"
                  alt="Office"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-800/60 to-transparent" />
                <div className="absolute left-4 bottom-4 text-white">
                  <h3 className="text-lg font-bold">Contact information</h3>
                  <p className="text-xs text-white/90">
                    Reach us directly using the details below.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mt-2 space-y-4">
                  <a
                    href="https://maps.google.com/?q=120%20Staffing,%20London,%20UK"
                    target="_blank"
                    className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 sm:p-4 hover:border-teal-200"
                  >
                    <MapPin className="mt-0.5 text-teal-600" size={20} />
                    <div>
                      <p className="text-sm font-semibold">Address</p>
                      <p className="text-gray-700 text-sm">
                        120 Staffing, London, UK
                      </p>
                      <span className="mt-1 inline-block text-xs text-teal-700">
                        Get directions →
                      </span>
                    </div>
                  </a>

                  <a
                    href="tel:+442038761531"
                    className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 sm:p-4 hover:border-teal-200"
                  >
                    <Phone className="mt-0.5 text-teal-600" size={20} />
                    <div>
                      <p className="text-sm font-semibold">Phone</p>
                      <p className="text-gray-700 text-sm">+44 0203 876 1531</p>
                      <span className="mt-1 inline-block text-xs text-gray-500">
                        Mon–Fri, 9am–5pm
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:info@demandrecruitmentservices.co.uk"
                    className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 sm:p-4 hover:border-teal-200"
                  >
                    <Mail className="mt-0.5 text-teal-600" size={20} />
                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className="text-gray-700 text-sm">
                        info@demandrecruitmentservices.co.uk
                      </p>
                      <span className="mt-1 inline-block text-xs text-gray-500">
                        We reply in ~24 hours
                      </span>
                    </div>
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-teal-50 p-3 sm:p-4 text-teal-800">
                  <Clock size={18} /> 24/7 urgent support available
                </div>

                <a
                  href="https://wa.me/442038761531?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 sm:py-3 font-semibold text-white shadow hover:bg-green-600"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Trust cards */}
            <div className="grid grid-cols-2 gap-3">
              {["ISO 9001", "DBS Checked", "NHS-ready", "UK Coverage"].map(
                (t) => (
                  <motion.div
                    key={t}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 text-center text-xs sm:text-sm font-medium shadow-sm"
                  >
                    <ShieldCheck
                      className="mx-auto mb-1 text-teal-600"
                      size={18}
                    />
                    {t}
                  </motion.div>
                )
              )}
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <div className="my-20">
          <h2
            data-aos="fade-up"
            className="text-4xl font-extrabold text-center text-teal-700 mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Find answers to the most common questions about our recruitment and
            staffing services.
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className={`rounded-2xl border border-teal-100 shadow-lg hover:shadow-2xl transition ${
                  openIndex === index
                    ? "bg-teal-700 text-white"
                    : "bg-white/70 backdrop-blur-md text-gray-800"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center p-6 text-left font-semibold text-lg rounded-2xl transition ${
                    openIndex === index
                      ? "text-white"
                      : "text-gray-800 hover:bg-teal-600 hover:text-white"
                  }`}
                >
                  <span>{faq.question}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-white"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 pb-6"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map */}
        <section className="mt-14 sm:mt-16" data-aos="fade-up">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Find us
          </h3>
          <p className="mt-1 text-gray-600 text-sm sm:text-base">
            120 Staffing, London, UK
          </p>
          <div className="mt-4 h-56 sm:h-72 md:h-80 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <iframe
              title="Demand Recruitment Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19889.03529285766!2d-0.127758!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1611818997208"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <a
            href="https://maps.google.com/?q=120%20Staffing,%20London,%20UK"
            target="_blank"
            className="mt-3 inline-block text-teal-700 underline text-sm sm:text-base"
          >
            Open in Google Maps →
          </a>
        </section>

        {/* CTA */}
        <section
          className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-1 shadow-xl"
          data-aos="zoom-in"
        >
          <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10">
            <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Ready to take the next step?
                </h4>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Join our platform and unlock new opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:justify-end">
                <a
                  href="/allJobs"
                  className="w-full sm:w-auto rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 text-center"
                >
                  Find a Job
                </a>
                <a
                  href="/postJob"
                  className="w-full sm:w-auto rounded-xl bg-indigo-100 px-5 py-3 font-semibold text-indigo-700 hover:bg-indigo-200 text-center"
                >
                  Hire Talent
                </a>
                <a
                  href="/signUp"
                  className="w-full sm:w-auto rounded-xl bg-green-500 px-5 py-3 font-semibold text-white hover:bg-green-600 text-center"
                >
                  Work for Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/442038761531?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 sm:py-3 font-semibold text-white shadow-xl hover:bg-green-600"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} /> Chat
      </a>

      <Footer />
    </div>
  );
}
