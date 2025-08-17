// app/podcasts-videos/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";

const PodcastsVideosPage = () => {
  // -------------------- Data (you can replace later) --------------------
  const recentPodcasts = [
    {
      id: 1,
      title: "The Future of AI in Recruitment",
      date: "May 28, 2025",
      summary:
        "Tune in as we discuss how artificial intelligence is reshaping the recruitment landscape and what it means for your career.",
      imageUrl: "/services/26.jpg",
      link: "#podcasts/ai-recruitment",
      topics: ["AI", "Trends"],
    },
    {
      id: 2,
      title: "Navigating Career Transitions with Confidence",
      date: "May 20, 2025",
      summary:
        "Our experts share invaluable tips and strategies for successfully managing career changes and finding your next opportunity.",
      imageUrl: "/services/27.jpg",
      link: "#podcasts/career-transitions",
      topics: ["Career", "Guides"],
    },
    {
      id: 3,
      title: "Employer Branding: Attracting Top Talent",
      date: "May 12, 2025",
      summary:
        "Learn why employer branding is crucial in today's competitive market and how to build a strong brand to attract the best talent.",
      imageUrl: "/services/28.jpg",
      link: "#podcasts/employer-branding",
      topics: ["Branding", "Hiring"],
    },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "Interview Skills Workshop: Mastering the Art of Conversation",
      date: "April 10, 2025",
      summary:
        "Watch our comprehensive workshop on refining your interview skills to make a lasting impression.",
      thumbnailUrl: "https://youtu.be/ppf9j8x0LA8?si=ps5GWsWCZ1DHwRiX",
      videoUrl: "https://www.youtube.com/embed/ppf9j8x0LA8?si=ps5GWsWCZ1DHwRiX",
      topics: ["Interviews", "Skills"],
    },
    {
      id: 2,
      title: "Decoding the Modern Resume: Tips from Recruiters",
      date: "March 25, 2025",
      summary:
        "Get an inside look at what recruiters really look for in a resume and how to make yours stand out.",
      thumbnailUrl: "https://youtu.be/R3abknwWX7k?si=oZs801lucj_nHHVR",
      videoUrl: "https://www.youtube.com/embed/R3abknwWX7k?si=oZs801lucj_nHHVR",
      topics: ["Resume", "Guides"],
    },
  ];

  const quotes = [
    { text: "Great careers are crafted, not found.", author: "Demand Recruitment" },
    { text: "Learn loudly. Grow boldly. Share generously.", author: "Community Wisdom" },
    { text: "Clarity comes from consistent action.", author: "Anon" },
    { text: "Talent thrives where curiosity leads.", author: "Anon" },
  ];

  // -------------------- State --------------------
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const allTopics = useMemo(() => {
    const s = new Set();
    recentPodcasts.forEach((p) => p.topics?.forEach((t) => s.add(t)));
    featuredVideos.forEach((v) => v.topics?.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);

  // unified search/filter helpers
  const matchSearch = (item) =>
    !query.trim() ||
    [item.title, item.summary, item.date, (item.topics || []).join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase());

  const matchTopic = (item) => topic === "All" || (item.topics || []).includes(topic);

  const visiblePodcasts = recentPodcasts.filter((p) => matchSearch(p) && matchTopic(p));
  const visibleVideos = featuredVideos.filter((v) => matchSearch(v) && matchTopic(v));

  // -------------------- UI helpers --------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  // banner image from one of the existing cards
  const banner = recentPodcasts[0];

  return (
    <div className="flex min-h-screen flex-col bg-teal-50">
      <Navbar />
      <StickyHeader />

      {/* subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.teal.100)_0,transparent_40%),radial-gradient(ellipse_at_bottom,theme(colors.teal.100)_0,transparent_40%)]"
      />

      <main className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* -------------------- Hero / Banner -------------------- */}
        <section className="relative mt-6 overflow-hidden rounded-3xl shadow-xl">
          <div className="relative h-[46vh] w-full">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-teal-900/40 to-teal-700/30" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="max-w-2xl"
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-100 backdrop-blur-sm ring-1 ring-white/20">
                  Podcasts & Videos
                </span>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Learn Loudly. Grow Boldly.
                </h1>
                <p className="mt-3 max-w-xl text-teal-50">
                  Bite-size conversations and deep-dive workshops on careers, hiring, and the future of work.
                </p>
              </motion.div>

              {/* Rotating quote */}
              <div className="mt-6 max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl bg-white/10 p-4 text-teal-50 backdrop-blur-xl ring-1 ring-white/20"
                  >
                    <p className="text-sm sm:text-base">“{quotes[quoteIndex].text}”</p>
                    <footer className="mt-1 text-xs opacity-80">— {quotes[quoteIndex].author}</footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- Controls -------------------- */}
        <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-teal-800">Fresh & Featured</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 text-sm text-teal-900 shadow-sm outline-none placeholder:text-teal-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-300"
                placeholder="Search podcasts & videos…"
                aria-label="Search podcasts and videos"
              />
            </div>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 text-sm text-teal-900 shadow-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 sm:w-56"
              aria-label="Filter by topic"
            >
              {allTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* -------------------- Recent Podcasts -------------------- */}
        <section className="mt-10">
          <h3 className="text-xl font-bold text-teal-800 mb-6">Recent Podcasts</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePodcasts.map((podcast, idx) => (
              <motion.article
                key={podcast.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-teal-100 transition-colors hover:shadow-xl hover:ring-teal-300"
              >
                <div className="relative">
                  <img
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Play badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-teal-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
                    Listen
                  </span>
                </div>

                <div className="space-y-3 p-6">
                  <h4 className="text-lg font-semibold text-teal-900 group-hover:text-teal-700">
                    {podcast.title}
                  </h4>
                  <p className="text-xs text-teal-700/70">{podcast.date}</p>
                  <p className="text-sm leading-relaxed text-teal-900/80">{podcast.summary}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {(podcast.topics || []).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 ring-1 ring-teal-100"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={podcast.link}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  >
                    Listen Now →
                  </Link>
                </div>

                {/* hover glow */}
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

          {visiblePodcasts.length === 0 && (
            <p className="mt-4 text-sm text-teal-700">No podcasts match your search/filter.</p>
          )}
        </section>

        {/* -------------------- Featured Videos -------------------- */}
        <section className="mt-14">
          <h3 className="text-xl font-bold text-teal-800 mb-6">Featured Videos</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {visibleVideos.map((video, idx) => (
              <motion.article
                key={video.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-3xl bg-white p-6 shadow-md ring-1 ring-teal-100 transition-colors hover:shadow-xl hover:ring-teal-300"
              >
                <h4 className="text-lg font-semibold text-teal-900">{video.title}</h4>
                <p className="mt-1 text-xs text-teal-700/70">{video.date}</p>

                <div className="mt-4 overflow-hidden rounded-xl">
                  {/* Responsive embed: Tailwind's aspect-video utility */}
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full rounded-xl"
                      src={video.videoUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-teal-900/80">{video.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(video.topics || []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 ring-1 ring-teal-100"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-50"
                >
                  Watch on YouTube ↗
                </a>
              </motion.article>
            ))}
          </div>

          {visibleVideos.length === 0 && (
            <p className="mt-4 text-sm text-teal-700">No videos match your search/filter.</p>
          )}
        </section>

        {/* -------------------- CTA -------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-8 text-white shadow-xl"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Got a Topic You Want Us to Cover?</h3>
              <p className="mt-2 text-teal-50">
                Suggest a topic for our next podcast or video and we’ll dive in.
              </p>
              <Link href="/contact" className="mt-5 inline-block">
                <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50">
                  Suggest a Topic
                </span>
              </Link>
            </div>

            <div className="relative rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/30">
              <p className="text-sm leading-relaxed text-teal-50">
                “We believe learning is a habit. Our goal is to make it enjoyable, practical, and
                accessible — for everyone.”
              </p>
              <div className="mt-3 text-xs text-teal-100/90">— Demand Recruitment</div>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </div>
          </div>
        </motion.section>

        <div className="h-14" />
      </main>

      <Footer />
    </div>
  );
};

export default PodcastsVideosPage;
