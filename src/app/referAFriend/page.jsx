"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Gift,
  Phone,
  Mail,
  User,
  FileUp,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Stars,
} from "lucide-react";

export default function ReferAFriendPage() {
  const [form, setForm] = useState({
    yourName: "",
    yourEmail: "",
    yourPhone: "",
    friendName: "",
    friendPhone: "",
    comments: "",
    consent: false,
    cvFile: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null); // Added for file input reset

  const quotes = useMemo(
    () => [
      "“Great teams are built one referral at a time.”",
      "“Talent recognizes talent — refer someone brilliant.”",
      "“A referral is a compliment to both your friend and us.”",
      "“When you grow, we all grow. Refer & rise.”",
    ],
    []
  );

  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((q) => (q + 1) % quotes.length);
    }, 3500);
    return () => clearInterval(id);
  }, [quotes.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    // Real-time validation
    validateField(name, type === "checkbox" ? checked : value);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type and size
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((e) => ({
          ...e,
          cvFile: "Please upload a PDF or DOC file.",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((e) => ({
          ...e,
          cvFile: "File size must be less than 5MB.",
        }));
        return;
      }
    }
    setForm((f) => ({ ...f, cvFile: file }));
    setErrors((e) => ({ ...e, cvFile: undefined }));
  };

  const validateField = (name, value) => {
    const next = { ...errors };
    if (name === "yourName" && !value.trim()) {
      next.yourName = "Your name is required.";
    } else {
      delete next.yourName;
    }
    if (name === "yourEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      next.yourEmail = "Please enter a valid email.";
    } else {
      delete next.yourEmail;
    }
    if (name === "yourPhone" && !/^[0-9+\-()\s]{7,20}$/.test(value)) {
      next.yourPhone = "Please enter a valid phone number.";
    } else {
      delete next.yourPhone;
    }
    if (name === "friendName" && !value.trim()) {
      next.friendName = "Friend's name is required.";
    } else {
      delete next.friendName;
    }
    if (name === "friendPhone" && !/^[0-9+\-()\s]{7,20}$/.test(value)) {
      next.friendPhone = "Please enter your friend's valid phone number.";
    } else {
      delete next.friendPhone;
    }
    if (name === "consent" && !value) {
      next.consent = "Consent is required to submit.";
    } else {
      delete next.consent;
    }
    setErrors(next);
  };

  const validate = () => {
    const next = {};
    if (!form.yourName.trim()) next.yourName = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.yourEmail))
      next.yourEmail = "Please enter a valid email.";
    if (!/^[0-9+\-()\s]{7,20}$/.test(form.yourPhone))
      next.yourPhone = "Please enter a valid phone number.";
    if (!form.friendName.trim()) next.friendName = "Friend's name is required.";
    if (!/^[0-9+\-()\s]{7,20}$/.test(form.friendPhone))
      next.friendPhone = "Please enter your friend's valid phone number.";
    if (!form.consent) next.consent = "Consent is required to submit.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Placeholder: integrate with your API route here
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      setForm({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        friendName: "",
        friendPhone: "",
        comments: "",
        consent: false,
        cvFile: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-teal-200 bg-white/80 p-3 outline-none transition focus:ring-4 focus:ring-teal-200 focus:border-teal-400 placeholder:text-gray-400";
  const labelClass = "mb-1 block font-medium text-gray-800";

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <StickyHeader />

      {/* Hero / Banner */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="/recruitment.jpg"
            alt="Refer great people banner"
            className="h-[60vh] w-full object-cover sm:h-[65vh] md:h-[70vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/70 to-teal-700/60" />
          <div className="absolute inset-0 bg-[radial-gradient(55rem_30rem_at_top_right,rgba(255,255,255,0.12),transparent)]" />
        </div>

        {/* Text content */}
        <div className="mx-auto flex h-[60vh] sm:h-[65vh] md:h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold sm:text-5xl md:text-6xl"
          >
            Refer a Friend
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 max-w-2xl text-base sm:text-lg text-teal-50"
          >
            We’re always looking for good people. Help us meet them — and earn
            rewards.
          </motion.p>

          {/* Rotating Quote */}
          <div className="mt-6 sm:mt-8 h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur"
              >
                <Stars className="h-4 w-4" />
                {quotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-10 sm:-bottom-16 mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-center gap-4 px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="pointer-events-auto group w-full sm:max-w-md flex-1 rounded-2xl border border-teal-200 bg-white p-5 shadow-lg backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100 transition group-hover:scale-105">
                <Gift className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  Reward Highlight
                </p>
                <p className="mt-1 text-gray-700">
                  Earn <span className="font-semibold text-teal-700">£50</span>{" "}
                  for every successful referral — no limits.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            viewport={{ once: true }}
            className="pointer-events-auto group w-full sm:max-w-md flex-1 rounded-2xl border border-teal-200 bg-white p-5 shadow-lg backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100 transition group-hover:scale-105">
                <ShieldCheck className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  Data Protected
                </p>
                <p className="mt-1 text-gray-700">
                  Fully GDPR-compliant process with explicit consent.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="mt-28 px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Know someone amazing?
            </h2>
            <p className="mt-4 text-gray-600">
              Some of our best hires come from referrals. If you know someone
              who would be a good fit, we’d love to talk to them. You could earn
              a reward for every successful referral.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600" />
                Unlimited payouts for successful placements
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600" />
                Quick, friendly follow‑up with your referral
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600" />
                Transparent status updates along the way
              </li>
            </ul>
          </div>

          {/* Impact / Badge Card (uses existing banner image for consistency) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-teal-200 shadow-xl"
          >
            <img
              src="/recruitment.jpg"
              alt="Top referrers"
              className="h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/10" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-2xl bg-white/90 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Community highlight
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  Top Referrer This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Ayesha K. — 6 referrals
                </p>
                <p className="text-xs text-gray-500">
                  Join the leaderboard and earn more.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section id="referral-form" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-3xl border border-teal-200 bg-white p-6 shadow-xl">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                  Referral Form
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Fields marked * are required
                </p>

                <form
                  onSubmit={onSubmit}
                  className="mt-6 grid grid-cols-1 gap-5"
                  noValidate
                >
                  <div>
                    <label htmlFor="yourName" className={labelClass}>
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500" />
                      <input
                        id="yourName"
                        name="yourName"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        className={`${fieldClass} pl-10`}
                        value={form.yourName}
                        onChange={handleChange}
                        aria-invalid={!!errors.yourName}
                        aria-describedby="yourName-error"
                        required
                      />
                    </div>
                    <p
                      id="yourName-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.yourName}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="yourEmail" className={labelClass}>
                      Your Email *
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500" />
                      <input
                        id="yourEmail"
                        name="yourEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className={`${fieldClass} pl-10`}
                        value={form.yourEmail}
                        onChange={handleChange}
                        aria-invalid={!!errors.yourEmail}
                        aria-describedby="yourEmail-error"
                        required
                      />
                    </div>
                    <p
                      id="yourEmail-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.yourEmail}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="yourPhone" className={labelClass}>
                      Your Phone *
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500" />
                      <input
                        id="yourPhone"
                        name="yourPhone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Enter your phone number"
                        className={`${fieldClass} pl-10`}
                        value={form.yourPhone}
                        onChange={handleChange}
                        aria-invalid={!!errors.yourPhone}
                        aria-describedby="yourPhone-error"
                        required
                      />
                    </div>
                    <p
                      id="yourPhone-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.yourPhone}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="friendName" className={labelClass}>
                        Friend's Name *
                      </label>
                      <input
                        id="friendName"
                        name="friendName"
                        type="text"
                        placeholder="Enter your friend's full name"
                        className={fieldClass}
                        value={form.friendName}
                        onChange={handleChange}
                        aria-invalid={!!errors.friendName}
                        aria-describedby="friendName-error"
                        required
                      />
                      <p
                        id="friendName-error"
                        className="mt-1 text-sm text-red-600"
                        aria-live="polite"
                      >
                        {errors.friendName}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="friendPhone" className={labelClass}>
                        Friend's Phone *
                      </label>
                      <input
                        id="friendPhone"
                        name="friendPhone"
                        type="tel"
                        placeholder="Enter your friend's phone number"
                        className={fieldClass}
                        value={form.friendPhone}
                        onChange={handleChange}
                        aria-invalid={!!errors.friendPhone}
                        aria-describedby="friendPhone-error"
                        required
                      />
                      <p
                        id="friendPhone-error"
                        className="mt-1 text-sm text-red-600"
                        aria-live="polite"
                      >
                        {errors.friendPhone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comments" className={labelClass}>
                      Questions / Comments
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      placeholder="Any additional info you'd like to share"
                      rows={5}
                      className={`${fieldClass} resize-y`}
                      value={form.comments}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="cvFile" className={labelClass}>
                      Upload CV / Resume (optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-teal-300 px-4 py-2 text-sm text-teal-700 transition hover:bg-teal-50">
                        <FileUp className="h-4 w-4" />
                        <span>Choose file</span>
                        <input
                          id="cvFile"
                          name="cvFile"
                          onChange={handleFile}
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          aria-describedby="cvFile-description cvFile-error"
                        />
                      </label>
                      <span
                        id="cvFile-description"
                        className="text-sm text-gray-600"
                      >
                        {form.cvFile ? form.cvFile.name : "PDF or DOC, max 5MB"}
                      </span>
                    </div>
                    <p
                      id="cvFile-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.cvFile}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 rounded-md border-teal-300 text-teal-600 focus:ring-teal-400"
                      required
                      aria-invalid={!!errors.consent}
                      aria-describedby="consent-error"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      I confirm I have permission to share my friend’s details
                      and agree to be contacted regarding this referral.
                    </label>
                  </div>
                  <p
                    id="consent-error"
                    className="-mt-2 text-sm text-red-600"
                    aria-live="polite"
                  >
                    {errors.consent}
                  </p>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Sparkles className="h-5 w-5 transition group-hover:rotate-12" />
                      {submitting ? "Submitting…" : "Submit Referral"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-center text-green-800"
                        role="status"
                        aria-live="polite"
                      >
                        Thank you! We’ll contact your referral shortly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>

            {/* FAQ / Info */}
            <div className="md:col-span-2">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
                  <h3 className="text-lg font-semibold text-teal-900">
                    How it works
                  </h3>
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-teal-900/90">
                    <li>Submit your referral using this form.</li>
                    <li>We reach out, assess fit, and keep you updated.</li>
                    <li>You earn when your referral is successfully placed.</li>
                  </ol>
                </div>

                <Accordion
                  items={[
                    {
                      q: "Who qualifies for the reward?",
                      a: "Any referral who gets successfully placed and completes the qualifying period (if applicable) qualifies for the payout.",
                    },
                    {
                      q: "Is there a limit to referrals?",
                      a: "No limits — refer as many people as you like. Rewards are uncapped.",
                    },
                    {
                      q: "How will I be notified?",
                      a: "We will email or text you with status updates after you submit a referral.",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-teal-100 bg-white p-6 text-center text-sm text-gray-600 shadow">
          By providing your phone number, you agree to receive text messages for
          updates, promotions and important information. Message and data rates
          may apply. You can opt out at any time by replying ‘STOP’. For more
          information, please refer to our Privacy Policy.
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Accordion Component ----------------------------------------------------
function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-teal-100 overflow-hidden rounded-2xl border border-teal-200 bg-white">
      {items.map((it, i) => (
        <div key={i} className="group">
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-teal-50"
            onClick={() => setOpen((o) => (o === i ? null : i))}
            aria-expanded={open === i}
            aria-controls={`acc-panel-${i}`}
          >
            <span className="font-medium text-gray-900">{it.q}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`acc-panel-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-4 text-sm text-gray-600">{it.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
