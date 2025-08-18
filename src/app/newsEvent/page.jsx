'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyHeader from '@/components/StickyHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, MapPin, ArrowRight, Search, Quote, X, CalendarPlus } from 'lucide-react';
import Swal from 'sweetalert2';

const NewsEventsPage = () => {
  // --- DATA ------------------------------------------------------
  const recentNews = useMemo(
    () => [
      {
        id: 1,
        title: 'Demand Recruitment Hosts Annual Charity Drive',
        date: 'May 20, 2025',
        summary:
          'Our team successfully organized and executed its annual charity drive, raising significant funds for local community projects. This year’s event saw record participation and impactful contributions.',
        imageUrl: '/services/3.jpg',
        link: '#',
        tags: ['Community', 'CSR'],
        author: 'Jane Doe',
      },
      {
        id: 2,
        title: 'New Partnership Announcement: Expanding Our Reach',
        date: 'May 15, 2025',
        summary:
          'We are thrilled to announce a strategic partnership that will allow us to offer an even wider range of services to our clients. This collaboration marks a significant milestone for our growth.',
        imageUrl: '/services/4.jpg',
        link: '#',
        tags: ['Partnership', 'Growth'],
        author: 'John Smith',
      },
      {
        id: 3,
        title: 'Industry Insight: The Future of Remote Work',
        date: 'May 10, 2025',
        summary:
          'Our latest article delves into the evolving landscape of remote work and its implications for the modern workforce. Explore key trends and predictions shaping the future.',
        imageUrl: '/services/5.jpg',
        link: '#',
        tags: ['Insight', 'Remote Work'],
        author: 'Emily Carter',
      },
    ],
    []
  );

  const upcomingEvents = useMemo(
    () => [
      {
        id: 1,
        title: 'Webinar: Navigating the Green Economy',
        date: 'June 15, 2025',
        time: '10:00 AM GMT',
        location: 'Online',
        summary:
          'Join our experts for a discussion on sustainable practices and opportunities in the burgeoning green economy. Limited seats available!',
        link: '#',
        isLimited: true,
        speakerImage: '/speakers/expert1.jpg',
        calendarLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar:+Navigating+the+Green+Economy&dates=20250615T100000Z/20250615T120000Z&details=Join+our+experts+for+a+discussion+on+sustainable+practices+and+opportunities+in+the+burgeoning+green+economy.+Limited+seats+available!&location=Online',
      },
      {
        id: 2,
        title: 'Career Fair 2025: Meet Our Team',
        date: 'July 01, 2025',
        time: '09:00 AM - 05:00 PM',
        location: 'London Convention Centre',
        summary:
          'Discover exciting career opportunities and network with our recruitment specialists. Don’t miss this chance to connect!',
        link: '#',
        isLimited: false,
        speakerImage: '/speakers/team.jpg',
        calendarLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Career+Fair+2025:+Meet+Our+Team&dates=20250701T090000Z/20250701T170000Z&details=Discover+exciting+career+opportunities+and+network+with+our+recruitment+specialists.+Don’t+miss+this+chance+to+connect!&location=London+Convention+Centre',
      },
    ],
    []
  );

  // --- THEME / UI STATE ----------------------------------------
  const [query, setQuery] = useState('');
  const [eventsQuery, setEventsQuery] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "Great teams aren't found — they're built with care.",
      author: 'Demand Recruitment',
    },
    { text: 'Talent wins games; teams win championships.', author: 'Michael Jordan' },
    { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
    {
      text: "Opportunity is missed by most because it's dressed in overalls and looks like work.",
      author: 'Thomas Edison',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const filteredNews = useMemo(() => {
    if (!query.trim()) return recentNews;
    const q = query.toLowerCase();
    return recentNews.filter((n) =>
      [n.title, n.summary, n.author, ...(n.tags || [])].join(' ').toLowerCase().includes(q)
    );
  }, [query, recentNews]);

  // Filter upcoming events based on eventsQuery
  const filteredEvents = useMemo(() => {
    if (!eventsQuery.trim()) return upcomingEvents;
    const q = eventsQuery.toLowerCase();
    return upcomingEvents.filter((e) =>
      [e.title, e.summary, e.location, e.date, e.time].join(' ').toLowerCase().includes(q)
    );
  }, [eventsQuery, upcomingEvents]);

  // Pick one card with image as the banner hero background
  const featured = recentNews[0];

  // Clear search query for news
  const handleClearSearch = () => {
    setQuery('');
  };

  // Clear search query for events
  const handleClearEventsSearch = () => {
    setEventsQuery('');
  };

  // --- ANIMATION VARIANTS --------------------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-teal-50 [--ring:theme(colors.teal.500)]">
      <Navbar />
      <StickyHeader />

      {/* --- Decorative background pattern --- */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.teal.100)_0,transparent_40%),radial-gradient(ellipse_at_bottom,theme(colors.teal.100)_0,transparent_40%)]"
      />

      <main className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- HERO / BANNER ------------------------------------- */}
        <section className="relative mt-6 overflow-hidden rounded-3xl shadow-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[46vh] w-full"
          >
            {/* Banner Image */}
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover will-change-transform transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-teal-900/40 to-teal-700/30" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100 backdrop-blur-sm ring-1 ring-white/20">
                  <CalendarDays className="h-3.5 w-3.5" /> Updated • {featured.date}
                </span>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  News & Events
                </h1>
                <p className="mt-3 max-w-xl text-teal-50">
                  Highlights, insights, and upcoming happenings from Demand Recruitment.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  >
                    Read the feature <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="/contactUs"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  >
                    Explore updates
                  </a>
                </div>
              </motion.div>

              {/* Rotating inspiring quotes */}
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
                    <p className="flex items-start gap-2 text-sm sm:text-base">
                      <Quote className="mt-1 h-4 w-4 shrink-0" /> {quotes[quoteIndex].text}
                    </p>
                    <footer className="mt-1 text-xs opacity-80">— {quotes[quoteIndex].author}</footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- CONTROLS (News) ------------------------------------------ */}
        <section className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-semibold text-teal-800">What's New</h2>
          <div className="relative w-full max-w-md flex items-center">
            <div className="relative flex-grow">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 pl-10 text-sm text-teal-900 shadow-sm outline-none ring-0 placeholder:text-teal-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-300"
                placeholder="Search news, insights..."
                aria-label="Search news"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-400" />
            </div>
            {query && (
              <button
                onClick={handleClearSearch}
                className="ml-2 rounded-full p-2 text-teal-600 hover:text-teal-700 focus:outline-none"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* --- RECENT NEWS GRID ---------------------------------- */}
        <section id="recent" className="mt-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((newsItem) => (
              <motion.article key={newsItem.id} variants={fadeUp} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-teal-100 transition-colors duration-300 hover:ring-teal-300">
                <div className="relative">
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-teal-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
                    <CalendarDays className="inline-block h-3.5 w-3.5 mr-1" /> {newsItem.date}
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold text-teal-900">{newsItem.title}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-teal-700/80">{newsItem.summary}</p>
                  <p className="text-xs text-teal-600">By {newsItem.author}</p>
                  {newsItem.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {newsItem.tags.map((t) => (
                        <span key={t} className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 ring-1 ring-teal-100">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="pt-1">
                    <Link
                      href={newsItem.link}
                      className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity- downloaded from the web or a file system.100" style={{ boxShadow: '0 0 0 1px rgba(13,148,136,0.25), 0 20px 60px rgba(13,148,136,0.25)' }} />
              </motion.article>
            ))}
          </motion.div>
          {filteredNews.length === 0 && (
            <p className="mt-6 text-center text-sm text-teal-700">No results. Try another search.</p>
          )}
        </section>

        {/* --- CONTROLS (Events) ------------------------------------------ */}
        <section className="mt-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-semibold text-teal-800">Upcoming Events</h2>
          <div className="relative w-full max-w-md flex items-center">
            <div className="relative flex-grow">
              <input
                value={eventsQuery}
                onChange={(e) => setEventsQuery(e.target.value)}
                className="w-full rounded-2xl border border-teal-200 bg-white/80 px-4 py-2.5 pl-10 text-sm text-teal-900 shadow-sm outline-none ring-0 placeholder:text-teal-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-300"
                placeholder="Search events..."
                aria-label="Search events"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-400" />
            </div>
            {eventsQuery && (
              <button
                onClick={handleClearEventsSearch}
                className="ml-2 rounded-full p-2 text-teal-600 hover:text-teal-700 focus:outline-none"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* --- UPCOMING EVENTS ----------------------------------- */}
        <section className="mt-6">
          <div className="relative">
            {/* accent line */}
            <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-teal-300 to-teal-500 sm:block" />

            <div className="space-y-6">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="relative rounded-3xl bg-white p-6 shadow-lg ring-1 ring-teal-100 transition hover:ring-teal-300 sm:pl-14"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-1 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-teal-500 ring-4 ring-white sm:block" />

                  {/* Limited space ribbon */}
                  {event.isLimited && (
                    <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-3xl bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                      Limited Seats
                    </span>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-teal-900">{event.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-teal-700/80 line-clamp-3">{event.summary}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-teal-800/90">
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 ring-1 ring-teal-100">
                            <CalendarDays className="h-4 w-4" /> {event.date}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 ring-1 ring-teal-100">
                            <Clock className="h-4 w-4" /> {event.time}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 ring-1 ring-teal-100">
                            <MapPin className="h-4 w-4" /> {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                      <Link
                        href={event.link}
                        className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-transform hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={event.calendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-teal-600 shadow-sm border border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-300"
                      >
                        <CalendarPlus className="h-4 w-4" /> Add to Calendar
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredEvents.length === 0 && (
              <p className="mt-6 text-center text-sm text-teal-700">No events found. Try another search.</p>
            )}
          </div>
        </section>

        {/* --- CTA ------------------------------------------------ */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-500 p-8 text-white shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Stay Up‑to‑Date!</h3>
              <p className="mt-2 text-teal-50">
                Subscribe to receive the latest news, event invitations, and industry insights directly in your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    title: 'Success!',
                    text: 'Thanks for subscribing to our newsletter!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#0d9488',
                    background: '#fff',
                    customClass: {
                      popup: 'rounded-3xl',
                      title: 'text-teal-900 font-semibold',
                      content: 'text-teal-700',
                    },
                  });
                }}
                className="mt-5 flex w-full max-w-md items-center overflow-hidden rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/30"
              >
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-teal-100/70 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="h-full shrink-0 rounded-none bg-white px-5 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/30"
            >
              <p className="text-sm leading-relaxed text-teal-50">
                “We connect ambition with opportunity — thoughtfully, transparently, and at scale.”
              </p>
              <div className="mt-4 text-xs text-teal-100/90">— Demand Recruitment</div>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </motion.div>
          </div>
        </section>

        <div className="h-14" />
      </main>

      <Footer />
    </div>
  );
};

export default NewsEventsPage;