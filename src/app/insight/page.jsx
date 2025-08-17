"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

// ————————————————————————————
// Mock data (replace with CMS/api as needed)
// ————————————————————————————
const QUOTES = [
  "Empowering careers. Elevating businesses.",
  "Shaping the future of work.",
  "Insights that inspire growth.",
  "Great teams aren’t hired. They’re built.",
  "Data-led hiring. Human-first results.",
];

const TOPICS = [
  { id: "trends", label: "🌐 Workforce Trends" },
  { id: "tips", label: "💼 Candidate Tips" },
  { id: "employers", label: "🏢 Employer Insights" },
  { id: "reports", label: "📊 Market Reports" },
];

const ARTICLES = [
  {
    id: 1,
    title: "How AI is Shaping the Hiring Future",
    summary:
      "Discover how leading companies integrate AI into their recruitment pipelines—and what it means for hiring in 2025.",
    image: "/services/2.jpg",
    tags: ["trends", "reports", "2025"],
    featured: true,
    author: { name: "Amina Rahman", role: "Talent Strategist" },
    words: 1220,
    date: "2025-07-22",
    reads: 8423,
    slug: "#",
  },
  {
    id: 3,
    title: "Designing Candidate Journeys That Convert",
    summary:
      "From first touch to offer letter—crafting a candidate experience that boosts accept rates and brand love.",
    image: "/services/3.jpg",
    tags: ["tips", "employers"],
    author: { name: "Nabil Chowdhury", role: "UX Researcher" },
    words: 820,
    date: "2025-06-18",
    reads: 5231,
    slug: "#",
  },
  {
    id: 4,
    title: "The 7 Metrics Your TA Dashboard Must Track",
    summary:
      "Measure what matters—time-to-fill, quality-of-hire, pipeline health, and more.",
    image: "/services/4.jpg",
    tags: ["reports", "employers"],
    author: { name: "Team AMGoal", role: "Editorial" },
    words: 1050,
    date: "2025-05-30",
    reads: 6712,
    slug: "#",
  },
  {
    id: 5,
    title: "Hiring for Potential vs. Experience",
    summary:
      "Why skills-based hiring wins—and how to redesign your JD and interviews accordingly.",
    image: "/services/5.jpg",
    tags: ["trends", "employers"],
    author: { name: "Sadia Karim", role: "HR Advisor" },
    words: 760,
    date: "2025-07-05",
    reads: 712,
    slug: "#",
  },
  {
    id: 6,
    title: "Gen Z in the Workplace: 2025 Outlook",
    summary:
      "Expectations, tools, and culture—what new grads want from day one.",
    image: "/services/6.jpg",
    tags: ["trends"],
    author: { name: "Team AMGoal", role: "Editorial" },
    words: 640,
    date: "2025-07-28",
    reads: 1987,
    slug: "#",
  },
  {
    id: 7,
    title: "Manager Playbook: Coaching for Performance",
    summary:
      "Simple frameworks to turn 1:1s into growth engines.",
    image: "/services/7.jpg",
    tags: ["tips", "employers"],
    author: { name: "Rahim Uddin", role: "People Ops" },
    words: 980,
    date: "2025-04-10",
    reads: 3190,
    slug: "#",
  },
  {
    id: 8,
    title: "Quarterly Labor Market Pulse (Q2 2025)",
    summary:
      "Open roles, wage movement, and sector-by-sector heat map.",
    image: "/services/8.jpg",
    tags: ["reports"],
    author: { name: "AMGoal Research", role: "Analysts" },
    words: 1600,
    date: "2025-07-10",
    reads: 11021,
    slug: "#",
  },
];

// ————————————————————————————
// Helpers
// ————————————————————————————
const minutesToRead = (words) => Math.max(1, Math.round(words / 225));

function useRotatingIndex(length, delay = 4000) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return i;
}

// ————————————————————————————
// Components
// ————————————————————————————
function FeaturedBadge() {
  return (
    <div className="absolute left-4 top-4 z-20">
      <span className="inline-flex items-center gap-1 rounded-full bg-teal-600/95 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-teal-600/30 ring-1 ring-white/30">
        ★ Featured
      </span>
    </div>
  );
}

function AuthorChip({ name, role }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    [name]
  );
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-100 text-teal-800 font-bold ring-1 ring-teal-300">
        {initials}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}

function SortControls({ sortBy, setSortBy }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {[
        { id: "newest", label: "Newest" },
        { id: "most-read", label: "Most Read" },
        { id: "editors", label: "Editor's Picks" },
      ].map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSortBy(opt.id)}
          className={`rounded-full border px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            sortBy === opt.id
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-teal-400"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ActiveFilters({ filters, clear, remove }) {
  if (!filters.length) return null;
  const map = Object.fromEntries(TOPICS.map((t) => [t.id, t.label]));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-600">Currently viewing:</span>
      {filters.map((id) => (
        <span
          key={id}
          className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200"
        >
          {map[id] || id}
          <button
            onClick={() => remove(id)}
            className="ml-1 rounded-full p-0.5 text-teal-700/80 hover:bg-teal-100"
            aria-label={`Remove ${map[id]}`}
          >
            ✕
          </button>
        </span>
      ))}
      <button onClick={clear} className="text-sm text-teal-700 underline underline-offset-2">
        Clear all
      </button>
    </div>
  );
}

function InsightCard({ a }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow transition hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        {a.featured && <FeaturedBadge />}
        <img
          src={a.image}
          alt={a.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          {a.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-teal-50 px-2 py-1 font-semibold text-teal-700 ring-1 ring-teal-200">
              #{t}
            </span>
          ))}
        </div>
        <h4 className="mb-1 text-lg font-semibold text-gray-800">{a.title}</h4>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 flex-grow">{a.summary}</p>
        <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
          <span>{new Date(a.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{minutesToRead(a.words)} min read</span>
          <span>•</span>
          <span>{a.reads.toLocaleString()} reads</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <AuthorChip name={a.author.name} role={a.author.role} />
          <Link
            href={`/${a.slug}`}
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Read
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function InsightsPage() {
  // Quote rotation & subtle parallax on hero
  const qIndex = useRotatingIndex(QUOTES.length, 3800);
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const translateX = useTransform(mouseX, [0, 1], [-6, 6]);
  const translateY = useTransform(mouseY, [0, 1], [-6, 6]);

  const [active, setActive] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    let list = [...ARTICLES];
    if (active.length) {
      list = list.filter((a) => active.every((f) => a.tags.includes(f)));
    }
    if (sortBy === "newest") list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sortBy === "most-read") list.sort((a, b) => b.reads - a.reads);
    if (sortBy === "editors") list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [active, sortBy]);

  const featured = filtered.find((a) => a.featured) || ARTICLES[0]; // Fallback to first article if no featured
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <>
      <Navbar />
      <StickyHeader />

      {/* ———————————————————————————— Hero Banner ———————————————————————————— */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseX.set((e.clientX - rect.left) / rect.width);
          mouseY.set((e.clientY - rect.top) / rect.height);
        }}
        className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden"
      >
        {/* Pick one of the existing card images for the banner */}
        <motion.img
          src="/services/2.jpg"
          alt="Insights banner"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
          style={{ translateX, translateY }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Teal gradient veil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-900/60 via-teal-800/40 to-transparent" />

        <div className="relative z-10 px-6 text-center text-white">
          <AnimatePresence mode="wait">
            <motion.h1
              key={qIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold drop-shadow md:text-5xl lg:text-6xl"
            >
              {QUOTES[qIndex]}
            </motion.h1>
          </AnimatePresence>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            Welcome to our Insights hub — expert analysis, market intelligence, and future-focused perspectives on recruitment and talent management.
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {TOPICS.map((t) => {
              const activeState = active.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() =>
                    setActive((prev) =>
                      prev.includes(t.id) ? prev.filter((x) => x !== t.id) : [...prev, t.id]
                    )
                  }
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                    activeState
                      ? "bg-white text-teal-700 shadow ring-1 ring-teal-200"
                      : "bg-teal-600/30 text-white ring-1 ring-white/30 hover:bg-teal-600/50"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ———————————————————————————— Toolbar ———————————————————————————— */}
      <div className="sticky top-14 z-20 w-full border-b border-teal-100/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <ActiveFilters
            filters={active}
            clear={() => setActive([])}
            remove={(id) => setActive((f) => f.filter((x) => x !== id))}
          />
          <SortControls sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* ———————————————————————————— Content ———————————————————————————— */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Column */}
        <div className="space-y-12 lg:col-span-3">
          {/* Featured */}
          <motion.section
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-lg"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/2">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-64 w-full object-cover transition duration-500 hover:scale-105 md:h-full"
                />
                <FeaturedBadge />
              </div>
              <div className="flex flex-col justify-center p-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">{featured.title}</h2>
                <p className="mb-4 text-gray-600">{featured.summary}</p>
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>{new Date(featured.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{minutesToRead(featured.words)} min read</span>
                  <span>•</span>
                  <span>{featured.reads.toLocaleString()} reads</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <AuthorChip name={featured.author.name} role={featured.author.role} />
                  <Link
                    href={`/${featured.slug}`}
                    className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Grid */}
          <section>
            <h3 className="mb-6 text-xl font-bold text-gray-900">Latest Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a) => (
                <InsightCard key={a.id} a={a} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 sticky top-28 self-start">
          {/* Filter card */}
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">Filter by Topic</h4>
            <ul className="space-y-3 text-sm">
              {TOPICS.map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() =>
                      setActive((prev) =>
                        prev.includes(topic.id)
                          ? prev.filter((x) => x !== topic.id)
                          : [...prev, topic.id]
                      )
                    }
                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                      active.includes(topic.id)
                        ? "border-teal-300 bg-teal-50 text-teal-800"
                        : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/60"
                    }`}
                  >
                    {topic.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 p-6 text-center shadow-sm ring-1 ring-teal-100">
            <h4 className="mb-2 text-lg font-semibold text-teal-900">Join Our Newsletter</h4>
            <p className="mb-4 text-sm text-gray-700">
              Get exclusive hiring insights and career tips straight to your inbox.
            </p>
            <div className="space-y-3">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={() => {
                  const emailInput = document.getElementById("newsletter-email");
                  const email = emailInput.value;
                  if (email) {
                    alert(`Thanks! We'll keep you posted at ${email}.`);
                    emailInput.value = "";
                  }
                }}
                className="w-full rounded-md bg-teal-600 py-2 font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* About / Credibility */}
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">Our Contributors</h4>
            <p className="mb-4 text-sm text-gray-600">
              Written by practitioners and analysts across talent, product, and operations.
            </p>
            <div className="space-y-4">
              {[
                { name: "Amina Rahman", role: "Talent Strategist" },
                { name: "Nabil Chowdhury", role: "UX Researcher" },
                { name: "AMGoal Research", role: "Analysts" },
              ].map((p) => (
                <AuthorChip key={p.name} name={p.name} role={p.role} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}