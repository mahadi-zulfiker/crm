"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";

/* ------------------------- FAQ (unchanged data) ------------------------- */
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

/* ----------------------------- UI Helpers ------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const cardHover = {
  scale: 1.02,
  y: -3,
  boxShadow: "0 18px 40px rgba(13,148,136,0.18)",
};

function Tooltip({ text, id }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-200 hover:bg-teal-100"
      >
        <HelpCircle className="h-3.5 w-3.5 text-teal-700" />
      </button>
      {open && (
        <motion.div
          id={id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          role="tooltip"
          className="absolute z-20 mt-2 w-64 rounded-xl bg-gray-900 px-3 py-2 text-xs text-white shadow-xl"
        >
          {text}
        </motion.div>
      )}
    </span>
  );
}

/* --------------------------- Main Component ---------------------------- */
export default function ContactUs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    inquiryType: "general", // general | hiring | jobseeker
    name: "",
    email: "",
    subject: "",
    message: "",
    companyName: "",
    jobType: "", // Permanent | Temporary | Contract
    experience: "", // Entry | Mid | Senior
    preferredContact: "email", // email | phone | whatsapp
    phone: "",
    consent: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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
    AOS.init({
      duration: 700,
      once: true,
      disable: typeof window !== "undefined" ? window.innerWidth < 640 : true,
    });
  }, []);

  /* ------------------------- Live Validation -------------------------- */
  const validators = useMemo(
    () => ({
      inquiryType: (v) => (!v ? "Please select an inquiry type" : ""),
      name: (v) => (!v.trim() ? "Please enter your name" : ""),
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email",
      subject: (v) => (!v.trim() ? "Please add a subject" : ""),
      message: (v) =>
        v.trim().length < 10 ? "Message must be at least 10 characters" : "",
      companyName: (v, f) =>
        f.inquiryType === "hiring" && !v.trim()
          ? "Company name is required"
          : "",
      jobType: (v, f) =>
        f.inquiryType === "hiring" && !v ? "Select a job type" : "",
      experience: (v, f) =>
        f.inquiryType === "jobseeker" && !v
          ? "Select your experience level"
          : "",
      phone: (v, f) =>
        f.preferredContact !== "email" && !/^[\d+\-\s()]{6,}$/.test(v.trim())
          ? "Provide a valid phone/WhatsApp number"
          : "",
      consent: (v) => (!v ? "Please accept data processing consent" : ""),
    }),
    []
  );

  const validateAll = (data = form) => {
    const newErrors = {};
    Object.entries(validators).forEach(([key, fn]) => {
      const err = fn(data[key], data);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    const updated = { ...form, [name]: value };

    // Reset dependent fields when inquiry type changes
    if (name === "inquiryType") {
      if (value === "hiring") {
        updated.experience = "";
      } else if (value === "jobseeker") {
        updated.companyName = "";
        updated.jobType = "";
      } else {
        updated.companyName = "";
        updated.jobType = "";
        updated.experience = "";
      }
    }

    setForm(updated);

    if (touched[name] || name === "inquiryType") {
      const err = validators[name]?.(updated[name], updated);
      setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    }

    // live validate phone when switching preferred contact
    if (name === "preferredContact") {
      const err = validators.phone?.(updated.phone, updated);
      setErrors((prev) => ({ ...prev, phone: err || undefined }));
    }
  };

  const markTouched = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validators[name]?.(form[name], form);
    setErrors((prev) => ({ ...prev, [name]: err || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      setSending(true);

      // Simulate API call
      await new Promise((res) => setTimeout(res, 900));

      const result = await Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "We’ll be in touch within 24 hours.",
        confirmButtonColor: "#0d9488",
        confirmButtonText: "Go to Jobs",
        showCancelButton: true,
        cancelButtonText: "Stay here",
        cancelButtonColor: "#134e4a",
        background: "#f0fdfa",
      });

      setForm({
        inquiryType: "general",
        name: "",
        email: "",
        subject: "",
        message: "",
        companyName: "",
        jobType: "",
        experience: "",
        preferredContact: "email",
        phone: "",
        consent: false,
      });
      setTouched({});
      setErrors({});

      if (result.isConfirmed) {
        router.push("/allJobs");
      }
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

  const fieldStatusIcon = (field) => {
    if (!touched[field]) return null;
    const isError = !!errors[field];
    return isError ? (
      <XCircle className="h-4 w-4 text-red-500" />
    ) : (
      <CheckCircle2 className="h-4 w-4 text-teal-600" />
    );
  };

  /* ------------------------------- Render ------------------------------- */
  return (
    <div className="flex flex-col bg-gray-50 text-gray-800">
      <Navbar />
      <StickyHeader />

      {/* ====== Banner (left as-is per instruction) ====== */}
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

      {/* ============================== Main ============================== */}
      <main
        id="contactUs"
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 py-10 sm:py-12 md:py-16"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr]">
          {/* ------------------------------ Form ------------------------------ */}
          <section
            className="rounded-3xl border border-teal-100 bg-white shadow-sm p-5 sm:p-7 md:p-9"
            data-aos="fade-right"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Get in touch
                </h2>
                <p className="mt-1 text-gray-600 text-sm sm:text-base">
                  Send us a message and we’ll reply promptly.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-teal-800 text-xs ring-1 ring-teal-200">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure form
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 grid grid-cols-1 gap-5 sm:gap-6"
            >
              {/* Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="mb-1.5 flex items-center text-sm font-medium"
                  >
                    Inquiry type
                    <Tooltip
                      id="tip-inquiry"
                      text="Choose 'Hiring' if you're recruiting, 'Job seeker' if you're looking for a role, or 'General' for other questions."
                    />
                  </label>
                  <div className="relative">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      onBlur={markTouched}
                      className={`w-full appearance-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                        errors.inquiryType
                          ? "border-red-400"
                          : "border-teal-200"
                      }`}
                    >
                      <option value="general">General</option>
                      <option value="hiring">Hiring (employer)</option>
                      <option value="jobseeker">Job seeker</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <div className="absolute right-9 top-1/2 -translate-y-1/2">
                      {fieldStatusIcon("inquiryType")}
                    </div>
                  </div>
                  {errors.inquiryType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.inquiryType}
                    </p>
                  )}
                </div>

                {/* Preferred Contact */}
                <div>
                  <label
                    htmlFor="preferredContact"
                    className="mb-1.5 flex items-center text-sm font-medium"
                  >
                    Preferred contact
                    <Tooltip
                      id="tip-contact"
                      text="If you pick Phone or WhatsApp, please provide a reachable number."
                    />
                  </label>
                  <div className="relative">
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={form.preferredContact}
                      onChange={handleChange}
                      onBlur={markTouched}
                      className="w-full appearance-none rounded-xl border border-teal-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { field: "name", placeholder: "Jane Doe", label: "Name" },
                  {
                    field: "email",
                    placeholder: "you@company.com",
                    label: "Email",
                  },
                ].map(({ field, placeholder, label }) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="mb-1.5 flex items-center text-sm font-medium"
                    >
                      {label}
                      {field === "email" && (
                        <Tooltip
                          id="tip-email"
                          text="We’ll only use your email to respond to your inquiry."
                        />
                      )}
                    </label>
                    <div className="relative">
                      <input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={form[field]}
                        onChange={handleChange}
                        onBlur={markTouched}
                        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                          errors[field] ? "border-red-400" : "border-teal-200"
                        }`}
                        placeholder={placeholder}
                        aria-invalid={!!errors[field]}
                        aria-describedby={
                          errors[field] ? `${field}-error` : undefined
                        }
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {fieldStatusIcon(field)}
                      </div>
                    </div>
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
              </div>

              {/* Phone (conditional usefulness) + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 flex items-center text-sm font-medium"
                  >
                    Phone / WhatsApp
                    <Tooltip
                      id="tip-phone"
                      text="If you chose Phone or WhatsApp, add a number we can reach quickly."
                    />
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={markTouched}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                        errors.phone ? "border-red-400" : "border-teal-200"
                      }`}
                      placeholder="+44 1234 567890"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {fieldStatusIcon("phone")}
                    </div>
                  </div>
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 flex items-center text-sm font-medium"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={markTouched}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                        errors.subject ? "border-red-400" : "border-teal-200"
                      }`}
                      placeholder="How can we help?"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {fieldStatusIcon("subject")}
                    </div>
                  </div>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional: Hiring */}
              {form.inquiryType === "hiring" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-1.5 flex items-center text-sm font-medium"
                    >
                      Company name
                    </label>
                    <div className="relative">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={form.companyName}
                        onChange={handleChange}
                        onBlur={markTouched}
                        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                          errors.companyName
                            ? "border-red-400"
                            : "border-teal-200"
                        }`}
                        placeholder="Acme Ltd."
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {fieldStatusIcon("companyName")}
                      </div>
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="jobType"
                      className="mb-1.5 flex items-center text-sm font-medium"
                    >
                      Job type
                    </label>
                    <div className="relative">
                      <select
                        id="jobType"
                        name="jobType"
                        value={form.jobType}
                        onChange={handleChange}
                        onBlur={markTouched}
                        className={`w-full appearance-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                          errors.jobType ? "border-red-400" : "border-teal-200"
                        }`}
                        required
                      >
                        <option value="" disabled>
                          Select type…
                        </option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Contract">Contract</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <div className="absolute right-9 top-1/2 -translate-y-1/2">
                        {fieldStatusIcon("jobType")}
                      </div>
                    </div>
                    {errors.jobType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.jobType}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Conditional: Job seeker */}
              {form.inquiryType === "jobseeker" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label
                      htmlFor="experience"
                      className="mb-1.5 flex items-center text-sm font-medium"
                    >
                      Experience level
                    </label>
                    <div className="relative">
                      <select
                        id="experience"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        onBlur={markTouched}
                        className={`w-full appearance-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                          errors.experience
                            ? "border-red-400"
                            : "border-teal-200"
                        }`}
                        required
                      >
                        <option value="" disabled>
                          Select level…
                        </option>
                        <option value="Entry">Entry</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <div className="absolute right-9 top-1/2 -translate-y-1/2">
                        {fieldStatusIcon("experience")}
                      </div>
                    </div>
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div className="hidden sm:block">
                    <div className="mt-8 text-xs text-gray-500">
                      Tip: You can also attach your CV when we reply.
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 flex items-center text-sm font-medium"
                >
                  Message
                  <Tooltip
                    id="tip-message"
                    text="Tell us about your needs, timelines, and any must-have requirements."
                  />
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={markTouched}
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
                      errors.message ? "border-red-400" : "border-teal-200"
                    }`}
                    placeholder="Share a few details about your needs..."
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    required
                  />
                  <div className="absolute right-3 top-3">
                    {fieldStatusIcon("message")}
                  </div>
                </div>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 rounded-2xl bg-teal-50 px-4 py-3 ring-1 ring-teal-100">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={handleChange}
                  onBlur={markTouched}
                  className="mt-1 h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="consent" className="text-sm text-teal-900">
                  I agree to the processing of my data in line with your privacy
                  policy.
                </label>
              </div>
              {errors.consent && (
                <p className="mt-1 -mb-2 text-sm text-red-600">
                  {errors.consent}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-80"
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
                  <a
                    className="text-teal-700 underline"
                    href="tel:+442038761531"
                  >
                    +44 0203 876 1531
                  </a>
                </p>
              </div>
            </form>
          </section>

          {/* --------------------------- Contact Card --------------------------- */}
          <aside className="grid gap-6 self-start" data-aos="fade-left">
            <motion.div
              whileHover={cardHover}
              className="rounded-3xl border border-teal-100 bg-white p-0 shadow-sm overflow-hidden"
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
                    className="flex items-start gap-3 rounded-2xl border border-teal-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 transition"
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
                    className="flex items-start gap-3 rounded-2xl border border-teal-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 transition"
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
                    className="flex items-start gap-3 rounded-2xl border border-teal-100 p-4 hover:border-teal-300 hover:bg-teal-50/50 transition"
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

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-teal-50 p-3 sm:p-4 text-teal-800 ring-1 ring-teal-100">
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
                    whileHover={{
                      y: -4,
                      boxShadow: "0 10px 24px rgba(13,148,136,0.16)",
                    }}
                    className="rounded-2xl border border-teal-100 bg-white p-3 sm:p-4 text-center text-xs sm:text-sm font-medium shadow-sm"
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

        {/* ------------------------------- FAQ ------------------------------- */}
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

        {/* ------------------------------- Map ------------------------------- */}
        <section className="mt-14 sm:mt-16" data-aos="fade-up">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Find us
          </h3>
          <p className="mt-1 text-gray-600 text-sm sm:text-base">
            120 Staffing, London, UK
          </p>
          <div className="mt-4 h-56 sm:h-72 md:h-80 w-full overflow-hidden rounded-2xl border border-teal-200 shadow-sm">
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

        {/* ------------------------------- CTA ------------------------------- */}
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
                  className="w-full sm:w-auto rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 text-center"
                >
                  Find a Job
                </a>
                <button
                  onClick={handlePostJob}
                  className="w-full sm:w-auto rounded-xl bg-teal-50 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-100 text-center ring-1 ring-teal-200"
                >
                  Hire Talent
                </button>
                <a
                  href="/signUp"
                  className="w-full sm:w-auto rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600 text-center"
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
