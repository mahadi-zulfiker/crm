// app/artificial-intelligence/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  TrendingUp,
  MessageSquareText,
  Lightbulb,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LineChart,
  Zap,
  BarChart2,
  Users,
  FileDown,
  PlayCircle,
} from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const quotes = [
  {
    text: "AI won’t replace recruiters—recruiters who use AI will replace recruiters who don’t.",
    author: "— Augmented Hiring Principle",
  },
  {
    text: "The future of talent is data-driven, human-led, and AI-accelerated.",
    author: "— Demand Recruitment",
  },
  {
    text: "Electricity transformed industry. AI is transforming decisions.",
    author: "— Inspired by Andrew Ng",
  },
  {
    text: "Ethical AI isn’t optional—it’s the competitive advantage.",
    author: "— Responsible AI Manifesto",
  },
];

const aiServices = [
  {
    id: 1,
    title: "AI‑Powered Recruitment",
    summary:
      "Automate sourcing and screening to boost speed‑to‑hire and quality of fit.",
    icon: Brain,
    link: "#services/ai-recruitment",
    outcomes: [
      { label: "↓ 60%", sub: "time‑to‑shortlist" },
      { label: "↑ 35%", sub: "quality of hire" },
    ],
    useCase:
      "Match resumes to roles using embeddings + RAG; nudge passive talent with intent signals.",
  },
  {
    id: 2,
    title: "Predictive Workforce Analytics",
    summary:
      "Forecast talent demand, identify skill gaps, and plan hiring with confidence.",
    icon: TrendingUp,
    link: "#services/predictive-analytics",
    outcomes: [
      { label: "↑ 25%", sub: "forecast accuracy" },
      { label: "↓ 18%", sub: "attrition risk" },
    ],
    useCase:
      "Time‑series + causal signals predict attrition and capacity needs by role/region.",
  },
  {
    id: 3,
    title: "Automated Candidate Engagement",
    summary:
      "24/7 AI assistants for FAQs, scheduling, and personalized nudges.",
    icon: MessageSquareText,
    link: "#services/automated-engagement",
    outcomes: [
      { label: "↑ 2.4×", sub: "reply rate" },
      { label: "↓ 70%", sub: "manual back‑and‑forth" },
    ],
    useCase:
      "Multilingual chat + email cadences with guardrails and human‑in‑the‑loop.",
  },
  {
    id: 4,
    title: "AI Consulting & Implementation",
    summary:
      "From opportunity mapping to model selection, MLOps, and change enablement.",
    icon: Lightbulb,
    link: "#services/ai-consulting",
    outcomes: [
      { label: "< 90d", sub: "to first value" },
      { label: "SOC2", sub: "security posture" },
    ],
    useCase:
      "Pilot fast with sandboxed data; scale with governance, monitoring, and KPIs.",
  },
];

const insights = [
  {
    id: 1,
    title: "Ethical AI in HR: From Policy to Practice",
    date: "May 15, 2025",
    tags: ["ethics", "policy", "governance"],
    summary:
      "A pragmatic framework for bias audits, consent, and model monitoring in HR stacks.",
    link: "#/blog/ai-ethics-hr",
  },
  {
    id: 2,
    title: "How AI is Reshaping Talent Acquisition",
    date: "April 28, 2025",
    tags: ["sourcing", "screening", "automation"],
    summary:
      "From resume parsing to intent‑driven outreach—what’s working in 2025.",
    link: "#/blog/ai-talent-acquisition",
  },
  {
    id: 3,
    title: "Predictive Hiring: Forecasting Demand Like a Pro",
    date: "March 12, 2025",
    tags: ["forecasting", "analytics"],
    summary:
      "Techniques and pitfalls when forecasting req volume and skill demand.",
    link: "#/blog/predictive-hiring",
  },
];

const clientLogos = [
  { src: "/clients/client1.png", alt: "Client 1" },
  { src: "/clients/client2.png", alt: "Client 2" },
  { src: "/clients/client3.png", alt: "Client 3" },
  { src: "/clients/client4.png", alt: "Client 4" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ArtificialIntelligencePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [topicFilter, setTopicFilter] = useState("all");
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [wpSubmitted, setWpSubmitted] = useState(false);

  useEffect(() => {
    const i = setInterval(
      () => setQuoteIndex((q) => (q + 1) % quotes.length),
      4500
    );
    return () => clearInterval(i);
  }, []);

  const filteredInsights = useMemo(() => {
    if (topicFilter === "all") return insights;
    return insights.filter((i) => i.tags.includes(topicFilter));
  }, [topicFilter]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <Navbar />
      <StickyHeader />

      {/* --- AI HERO BANNER ------------------------------------- */}
      <section className="relative overflow-hidden rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[70vh] w-full"
        >
          {/* Background Image */}
          <motion.img
            src="/meddd111.jpg"
            alt="AI Recruitment Hero"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform transition-transform duration-700 ease-out hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-teal-900/40 to-teal-700/30" />
          {/* Decorative blobs (subtle like your original) */}
          <div className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full bg-teal-400/30 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100 backdrop-blur-sm ring-1 ring-white/20">
                <Sparkles className="h-3.5 w-3.5" />
                AI for Recruitment
              </span>

              {/* Rotating Quotes */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
                >
                  {quotes[quoteIndex].text}
                </motion.h1>
              </AnimatePresence>
              <p className="mt-3 text-teal-100">
                — {quotes[quoteIndex].author}
              </p>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contactUs"
                  className="group inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                >
                  Book Free AI Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#services/ai-recruitment"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-teal-300"
                >
                  See AI in Action
                  <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              </div>
            </motion.div>

            {/* Quick stat badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: LineChart, label: "35% higher quality of hire" },
                { icon: Zap, label: "60% faster shortlisting" },
                { icon: Users, label: "2.4× candidate reply rate" },
                { icon: ShieldCheck, label: "Ethical & privacy-first" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md"
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <main className="container mx-auto w-full max-w-7xl flex-1 px-6 py-16">
        {/* Client logos / social proof */}
        <section className="mb-16">
          <div className="mb-6 text-center text-sm text-teal-800/70">
            Trusted by teams who scale hiring with confidence
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white/60 p-4 shadow-sm">
            <div className="animate-[marquee_18s_linear_infinite] flex items-center gap-10 opacity-80 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              {clientLogos.concat(clientLogos).map((logo, i) => (
                <div key={i} className="shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="opacity-70 transition hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
          <style jsx global>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </section>

        {/* Services */}
        <section className="mb-20">
          <h2 className="mb-3 text-center text-3xl font-semibold text-teal-900">
            AI‑Driven Solutions
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-teal-800/80">
            Micro‑interactions, concrete outcomes, and real use‑cases—built for
            recruiting teams.
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aiServices.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* top icon */}
                <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-3 ring-1 ring-teal-100 transition group-hover:bg-teal-100">
                  <s.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-teal-900">
                  {s.title}
                </h3>
                <p className="mb-4 text-teal-800/80">{s.summary}</p>

                {/* outcomes chips */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {s.outcomes.map((o, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs text-teal-800"
                    >
                      <BarChart2 className="h-3.5 w-3.5" /> {o.label}
                      <span className="text-teal-700/70">{` ${o.sub}`}</span>
                    </span>
                  ))}
                </div>

                {/* use case */}
                <div className="mb-5 rounded-xl bg-teal-50/70 p-3 text-sm text-teal-900 ring-1 ring-teal-100">
                  <span className="font-medium">Use‑case: </span>
                  {s.useCase}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href={s.link}
                    className="group/link inline-flex items-center gap-1 font-medium text-teal-700 transition hover:text-teal-900"
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>

                  <button
                    onClick={() => setShowWhitepaper(true)}
                    className="rounded-full border border-teal-200 px-3 py-1 text-sm text-teal-800 transition hover:bg-teal-100"
                  >
                    Playbook
                  </button>
                </div>

                {/* hover gradient */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(800px 200px at 0% 0%, rgba(13,148,136,0.08), transparent 40%)",
                  }}
                />
              </motion.article>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="mb-20">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-3xl font-semibold text-teal-900">
              AI Insights & Resources
            </h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-teal-800/80">
                Filter by topic
              </label>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="rounded-xl border border-teal-200 bg-white px-3 py-2 text-sm text-teal-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All</option>
                <option value="ethics">Ethics</option>
                <option value="policy">Policy</option>
                <option value="governance">Governance</option>
                <option value="sourcing">Sourcing</option>
                <option value="screening">Screening</option>
                <option value="automation">Automation</option>
                <option value="forecasting">Forecasting</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>

          {/* Highlight stat badge */}
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm text-teal-900">
              <Sparkles className="h-4 w-4" /> Key stat: Teams adopting AI
              report a<span className="font-semibold"> 35% uplift</span> in hire
              quality within 90 days.
            </div>
          </div>

          {/* Carousel (scrollable cards) */}
          <div className="no-scrollbar -mx-2 flex snap-x gap-6 overflow-x-auto px-2 pb-2">
            {filteredInsights.map((ins, i) => (
              <motion.div
                key={ins.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="snap-start shrink-0 basis-[90%] rounded-2xl border border-teal-100 bg-white p-6 shadow-sm sm:basis-[45%] md:basis-[30%]"
              >
                <div className="mb-2 text-xs text-teal-700/70">{ins.date}</div>
                <h3 className="mb-2 text-lg font-semibold text-teal-900">
                  {ins.title}
                </h3>
                <p className="mb-4 text-teal-800/80">{ins.summary}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {ins.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs text-teal-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={ins.link}
                  className="group inline-flex items-center gap-1 font-medium text-teal-700 hover:text-teal-900"
                >
                  Read article
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#blog?tag=ai"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-teal-700/30"
            >
              View All AI Resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Value Proposition */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-24 rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-10 shadow-md"
        >
          <h2 className="mb-4 text-center text-2xl font-semibold text-teal-900">
            Why Partner with Us for AI?
          </h2>
          <ul className="mx-auto mb-8 max-w-3xl list-disc space-y-3 text-teal-900/90 marker:text-teal-500">
            <li>
              Deep expertise in ML applications for recruiting and workforce
              planning.
            </li>
            <li>
              Customizable solutions mapped to your operating model and metrics.
            </li>
            <li>
              Commitment to ethical AI, privacy by design, and explainability.
            </li>
            <li>
              Proven playbooks that deliver measurable outcomes within 90 days.
            </li>
          </ul>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/aboutUs"
              className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-2.5 font-medium text-teal-800 hover:bg-teal-50"
            >
              Learn more <ChevronRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setShowWhitepaper(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-teal-700/30"
            >
              Download AI in Hiring Whitepaper <FileDown className="h-4 w-4" />
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Gated whitepaper modal */}
      <AnimatePresence>
        {showWhitepaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4"
            onClick={() => setShowWhitepaper(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-teal-200 bg-white p-6 shadow-xl"
            >
              {wpSubmitted ? (
                <div className="text-center">
                  <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                    <ShieldCheck className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-teal-900">
                    You're all set!
                  </h3>
                  <p className="mb-4 text-sm text-teal-800/80">
                    We’ve sent a secure download link to your email.
                  </p>
                  <Link
                    href="/contactUs"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 font-semibold text-white"
                  >
                    Book a free consult <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-teal-900">
                    Get the "AI in Hiring" Whitepaper
                  </h3>
                  <p className="mb-4 text-sm text-teal-800/80">
                    Enter your details to receive the download link.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setWpSubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="mb-1 block text-sm text-teal-900">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Alex Smith"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-teal-900">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="alex@company.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-teal-900">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Company Inc."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-teal-700/30"
                    >
                      Send me the whitepaper <FileDown className="h-4 w-4" />
                    </button>
                    <p className="text-center text-xs text-teal-700/70">
                      We never spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
