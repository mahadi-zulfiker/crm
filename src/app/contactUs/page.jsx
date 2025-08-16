"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
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

// --- FAQ Content -------------------------------------------------
const faqs = [
  {
    q: "What industries do you recruit for?",
    a: "We cover healthcare, hospitality, facilities management, construction, and corporate services across the UK.",
  },
  {
    q: "How quickly can I expect a response?",
    a: "We aim to respond within 24 hours on weekdays. Urgent requests can be handled 24/7 via phone or WhatsApp.",
  },
  {
    q: "Can I submit my CV through this form?",
    a: "Yes. Paste a link to your CV in the message or request a secure upload link and our team will follow up.",
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

  useEffect(() => {
    AOS.init({ duration: 800, once: true, disable: window.innerWidth < 640 });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSending(true);
      await new Promise((res) => setTimeout(res, 800));
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero */}
      <header className="relative isolate overflow-hidden py-4">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 opacity-70" />

        <div className="absolute inset-0 bg-[url('/contactUs.jpg')] bg-cover bg-center opacity-10" />

        <div className="relative mx-auto flex h-[220px] sm:h-[280px] md:h-[340px] max-w-7xl items-center px-4 sm:px-6 text-white">
          <div className="max-w-3xl" data-aos="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
              <ShieldCheck size={16} /> UK-compliant & 24/7 Support
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              Contact Us
            </h1>
            <p className="mt-2 sm:mt-3 max-w-2xl text-white/90 text-sm sm:text-base">
              We’re here to assist you. Feel free to reach out!
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-gray-50" />
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
              {["name", "email", "subject"].map((field) => (
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
                    placeholder={
                      field === "name"
                        ? "Jane Doe"
                        : field === "email"
                        ? "you@company.com"
                        : "How can we help?"
                    }
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

          {/* Contact Info */}
          <aside className="grid gap-6 self-start" data-aos="fade-left">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Contact information
              </h3>
              <p className="mt-1 text-gray-600 text-sm sm:text-base">
                Reach us directly using the details below.
              </p>
              <div className="mt-5 space-y-4">
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

            {/* Trust cards */}
            <div className="grid grid-cols-2 gap-3">
              {["ISO 9001", "DBS Checked", "NHS-ready", "UK Coverage"].map(
                (t) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 text-center text-xs sm:text-sm font-medium shadow-sm"
                  >
                    <ShieldCheck
                      className="mx-auto mb-1 text-teal-600"
                      size={18}
                    />
                    {t}
                  </div>
                )
              )}
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <section className="mt-14 sm:mt-16" data-aos="fade-up">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h3>
          <div className="mt-4 sm:mt-6 divide-y rounded-2xl border border-gray-100 bg-white shadow-sm">
            {faqs.map((item, i) => (
              <div key={i} className="px-4 sm:px-6 py-4 sm:py-5">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-center justify-between text-left font-semibold text-gray-900"
                >
                  {item.q}
                  <ChevronDown
                    className={`transition ${
                      openIdx === i
                        ? "rotate-180 text-teal-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                {openIdx === i && (
                  <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

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
