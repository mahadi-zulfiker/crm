// app/case-studies/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const CaseStudiesPage = () => {
  // Data ----------------------------------------------------------------------
  const caseStudies = [
    {
      id: 1,
      title: "Streamlining Recruitment for a Leading Tech Firm",
      industry: "Technology",
      challenge: "High volume hiring with strict technical requirements.",
      solution:
        "Implemented a custom applicant tracking system and specialized technical assessments.",
      result:
        "Reduced time-to-hire by 30% and improved candidate quality by 25%.",
      imageUrl: "/services/56.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Optimizing Staffing for Healthcare Facilities",
      industry: "Healthcare",
      challenge: "Addressing critical staffing shortages and fluctuating demand.",
      solution:
        "Developed a flexible staffing model and rapid deployment protocols for medical professionals.",
      result:
        "Ensured 95% staffing coverage and enhanced patient care continuity.",
      imageUrl: "/services/med1.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Enhancing Community Engagement Through Volunteer Programs",
      industry: "Non-Profit",
      challenge:
        "Recruiting and managing a diverse volunteer base for various community initiatives.",
      solution:
        "Launched a targeted volunteer recruitment campaign and implemented a robust volunteer management platform.",
      result:
        "Increased volunteer participation by 40% and expanded program reach within the community.",
      imageUrl: "/services/58.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Facility Management Efficiency for Retail Chains",
      industry: "Retail",
      challenge:
        "Maintaining consistent facility standards across multiple retail locations.",
      solution:
        "Integrated smart facility management solutions and proactive maintenance schedules.",
      result: "Reduced operational costs by 15% and improved store uptime.",
      imageUrl: "/services/60.jpg",
      link: "#",
    },
  ];

  const logos = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
  ];

  const quotes = [
    { text: "Great teams aren’t found — they’re built with care.", author: "Demand Recruitment" },
    { text: "Talent wins games; teams win championships.", author: "Michael Jordan" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Excellence is a habit, not a goal.", author: "Aristotle (attributed)" },
  ];

  // UI State ------------------------------------------------------------------
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const industries = useMemo(() => {
    const set = new Set(caseStudies.map((c) => c.industry));
    return ["All", ...Array.from(set)];
  }, [caseStudies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseStudies.filter((c) => {
      const matchesQuery =
        !q ||
        [c.title, c.challenge, c.solution, c.result, c.industry]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesFilter = filter === "All" || c.industry === filter;
      return matchesQuery && matchesFilter;
    });
  }, [caseStudies, query, filter]);

  // Pick one existing image for banner
  const featured = caseStudies[0];

  // Animations ---------------------------------------------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-teal-50">
      <Navbar />
      <StickyHeader />

      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.teal.100)_0,transparent_45%),radial-gradient(ellipse_at_bottom,theme(colors.teal.100)_0,transparent_45%)]"
      />

      <main className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero / Banner ----------------------------------------------------- */}
        <section className="relative mt-6 overflow-hidden rounded-3xl shadow-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[46vh] w-full"
          >
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-teal-900/40 to-teal-700/30" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100 backdrop-blur-sm ring-1 ring-white/20">
                  Case Studies
                </span>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Results that speak for themselves
                </h1>
                <p className="mt-3 max-w-xl text-teal-50">
                  Real-world challenges solved with thoughtful recruitment strategy and execution.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#grid"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  >
                    Explore case studies →
                  </a>
                  <Link
                    href="/contactUs"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  >
                    Start your project
                  </Link>
                </div>
              </motion.div>

              {/* Rotating quote */}
              <div className="mt-6 max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl bg-white/10 p-4 text-teal-50 backdrop-blur-xl ring-1 ring-white/20"
                  >
                    <p className="text-sm sm:text-base">“{quotes[quoteIndex].text}”</p>
                    <footer className="mt-1 text-xs opacity-80">— {quotes[quoteIndex].author}</footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Controls ----------------------------------------------------------- */}
        <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-teal-800">Our Case Studies</h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 text-sm text-teal-900 shadow-sm outline-none placeholder:text-teal-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-300"
                placeholder="Search by title, challenge, result…"
                aria-label="Search case studies"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 text-sm text-teal-900 shadow-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 sm:w-56"
              aria-label="Filter by industry"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Grid --------------------------------------------------------------- */}
        <section id="grid" className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((study, idx) => (
              <motion.article
                key={study.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-teal-100 transition-colors duration-300 hover:ring-teal-300"
              >
                <div className="relative">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="h-60 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-teal-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
                    {study.industry}
                  </span>
                </div>

                <div className="space-y-3 p-6">
                  <h3 className="text-lg font-semibold text-teal-900 group-hover:text-teal-700">
                    {study.title}
                  </h3>
                  <ul className="text-sm leading-relaxed text-teal-800/80 space-y-1">
                    <li>
                      <span className="font-semibold text-teal-700">Challenge:</span> {study.challenge}
                    </li>
                    <li>
                      <span className="font-semibold text-teal-700">Solution:</span> {study.solution}
                    </li>
                    <li>
                      <span className="font-semibold text-teal-700">Outcome:</span> {study.result}
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      // href={study.link}
                      href="#"
                      className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                    >
                      Coming Soon
                    </Link>

                    {/* Fixed: correct template string for the download link */}
                    <a
                      href={`/downloads/case-study-${study.id}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-50"
                    >
                      📄 Download PDF
                    </a>
                  </div>
                </div>

                {/* Subtle hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(13,148,136,0.25), 0 20px 60px rgba(13,148,136,0.25)",
                  }}
                />
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-teal-700">
              No results. Try a different search or filter.
            </p>
          )}
        </section>

        {/* Client Logos ------------------------------------------------------- */}
        <section className="mt-14 bg-white py-10 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-center text-teal-800 mb-6">
            Trusted by Industry Leaders
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 px-4">
            {logos.map((logo, index) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 240, damping: 14 }}
                className="p-3 rounded-xl ring-1 ring-teal-100 bg-white"
              >
                <Image
                  src={logo}
                  alt={`Client ${index + 1}`} // Fixed: proper alt text
                  width={120}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA ---------------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-8 text-white shadow-xl"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Want to See More Success Stories?</h3>
              <p className="mt-2 text-teal-50">
                Request our full case study pack and explore how we’ve helped
                businesses across industries.
              </p>
              <Link href="/contactUs" className="inline-block mt-5">
                <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50">
                  Request Case Study Pack
                </span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/30"
            >
              <p className="text-sm leading-relaxed text-teal-50">
                “We connect ambition with opportunity — thoughtfully, transparently, and at scale.”
              </p>
              <div className="mt-3 text-xs text-teal-100/90">— Demand Recruitment</div>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </motion.div>
          </div>
        </motion.section>

        <div className="h-14" />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
