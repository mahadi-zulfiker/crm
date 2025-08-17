"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StickyHeader from "@/components/StickyHeader";

const quotes = [
  "Empowering Careers. Elevating Businesses.",
  "Shaping the Future of Work.",
  "Insights that Inspire Growth.",
];

const InsightsPage = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <StickyHeader />

      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/services/1.jpg" // 👈 pick one card image
          alt="Inspiring Banner"
          className="absolute w-full h-full object-cover brightness-50 hover:scale-105 transition-transform duration-700"
        />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg"
          >
            {quotes[currentQuote]}
          </motion.h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-teal-100">
            Welcome to our Insights hub — expert analysis, market intelligence,
            and future-focused perspectives on recruitment and talent management.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-16">
          {/* Featured Article */}
          <motion.section
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row"
          >
            <img
              src="/services/2.jpg"
              alt="Featured Insight"
              className="w-full md:w-1/2 h-64 object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Featured: How AI is Shaping the Hiring Future
              </h2>
              <p className="text-gray-600 mb-4">
                Discover how leading companies are integrating AI into their
                recruitment pipelines—and what it means for hiring in 2025.
              </p>
              <Link
                href="#insights/ai-hiring-future"
                className="text-teal-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.section>

          {/* Masonry-style Article Grid */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Latest Insights
            </h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition break-inside-avoid overflow-hidden"
                >
                  <img
                    src={`/services/${i}.jpg`}
                    alt={`Insight ${i}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Article Title {i}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm">
                      A short summary of the article goes here. It should give a
                      quick glimpse of the content...
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                      <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                        #Trends
                      </span>
                      <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                        #2025Hiring
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="text-teal-600 hover:underline text-sm font-medium"
                    >
                      Continue Reading →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Filter */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Filter by Topic
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "🌐 Workforce Trends",
                "💼 Candidate Tips",
                "🏢 Employer Insights",
                "📊 Market Reports",
              ].map((topic, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-teal-600 transition"
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 shadow text-center">
            <h4 className="text-lg font-semibold text-teal-800 mb-3">
              Join Our Newsletter
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Get exclusive hiring insights and career tips straight to your
              inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default InsightsPage;
