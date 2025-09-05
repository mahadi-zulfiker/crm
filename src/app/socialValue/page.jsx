"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";
import {
  Leaf,
  Recycle,
  Users,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Globe,
  Lightbulb,
} from "lucide-react";

// Framer Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: { type: "spring", stiffness: 220 } },
};

const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "We do not inherit the earth from our ancestors; we borrow it from our children.",
    author: "Native Proverb",
  },
  {
    text: "Small acts, when multiplied by millions of people, can transform the world.",
    author: "Howard Zinn",
  },
  {
    text: "Diversity is being invited to the party; inclusion is being asked to dance.",
    author: "Vernā Myers",
  },
];

const QuoteTicker = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...quotes, ...quotes].map((q, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-teal-50/90"
          >
            <Sparkles className="w-4 h-4" />
            <span className="italic">“{q.text}”</span>
            <span className="opacity-70">— {q.author}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Stat = ({ value, label }) => (
  <motion.div
    variants={fadeUp}
    className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur border border-white/20"
  >
    <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-teal-400">
      {value}
    </div>
    <div className="text-teal-300 mt-1">{label}</div>
  </motion.div>
);

const Card = ({ icon: Icon, title, children, border, idx }) => (
  <motion.div
    variants={fadeUp}
    custom={idx}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    className={`group relative p-6 bg-white rounded-2xl shadow-lg border ${
      border || "border-teal-200"
    } overflow-hidden`}
    whileHover="hover"
    animate="rest"
  >
    {/* glow */}
    <div className="pointer-events-none absolute -inset-px bg-gradient-to-b from-teal-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <motion.div variants={hoverLift} className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-teal-50 ring-1 ring-teal-200 group-hover:ring-teal-300 transition-all">
          <Icon className="w-6 h-6 text-teal-700" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </motion.div>

    {/* hover border */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-teal-300/60 transition" />
  </motion.div>
);

const ImageCard = ({ title, children, idx }) => (
  <motion.div
    variants={fadeUp}
    custom={idx}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-200"
    whileHover="hover"
    animate="rest"
  >
    <div className="relative h-40 w-full overflow-hidden">
      <Image
        src="/hb2.jpg" // using the provided banner image for visual consistency
        alt="Community engagement"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
      <div className="absolute bottom-3 left-4 text-white font-semibold drop-shadow">
        {title}
      </div>
    </div>
    <motion.div variants={hoverLift} className="p-6">
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </motion.div>
    <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-teal-300/60 transition" />
  </motion.div>
);

export default function SocialValue() {
  return (
    <>
      <Navbar />
      <StickyHeader />

      {/* HERO / BANNER */}
      <section className="relative">
        <div className="relative h-[56vh] md:h-[70vh] w-full overflow-hidden">
          <Image
            src="/hb2.jpg" // banner image from public
            alt="Hero banner"
            fill
            className="object-cover"
            priority
          />
          {/* teal overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/70 to-emerald-900/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl"
              >
                Our Social Value
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-teal-50/90 mt-4 md:mt-6 text-lg md:text-xl max-w-2xl"
              >
                We are committed to creating a positive impact on society, the environment,
                and the communities we serve.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#get-involved"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-white text-teal-700 font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition"
                >
                  <HeartHandshake className="w-5 h-5" /> Get Involved
                </a>
                <a
                  href="#impact"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 border border-white/60 text-white font-semibold hover:bg-white/10 backdrop-blur transition"
                >
                  <Leaf className="w-5 h-5" /> Explore Our Impact
                </a>
              </motion.div>
            </div>
          </div>

          {/* quote ticker */}
          <div className="absolute bottom-0 left-0 right-0 bg-teal-900/50 backdrop-blur border-t border-white/10">
            <div className="container mx-auto px-6 py-3">
              <QuoteTicker />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            <Stat value="95%" label="Ethical suppliers" />
            <Stat value="1.2t" label="CO₂ saved / year" />
            <Stat value="3k+" label="Volunteer hours" />
            <Stat value="100%" label="Inclusive hiring" />
          </motion.div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section id="impact" className="container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Sustainability Efforts */}
          <Card idx={0} icon={Leaf} title="Sustainability Efforts">
            <p className="mb-4">
              We are committed to minimizing our environmental footprint. From sustainable
              sourcing to reducing waste, we’re working towards a greener future.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-1 text-teal-600"/>Zero Waste Packaging</li>
              <li className="flex items-start gap-2"><Recycle className="w-4 h-4 mt-1 text-teal-600"/>Carbon Footprint Reduction</li>
              <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-1 text-teal-600"/>Energy-Efficient Practices</li>
            </ul>
          </Card>

          {/* Community Engagement (Image Card) */}
          <ImageCard idx={1} title="Community Engagement">
            <p className="mb-4">
              We believe in empowering communities. Our initiatives support local programs,
              promote education, and foster social well‑being.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><Users className="w-4 h-4 mt-1 text-teal-600"/>Supporting Local Charities</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-1 text-teal-600"/>Educational Outreach Programs</li>
              <li className="flex items-start gap-2"><HeartHandshake className="w-4 h-4 mt-1 text-teal-600"/>Employee Volunteer Opportunities</li>
            </ul>
          </ImageCard>

          {/* Ethical Sourcing */}
          <Card idx={2} icon={ShieldCheck} title="Ethical Sourcing">
            <p className="mb-4">
              We work with suppliers who share our values and prioritize fairness, transparency,
              and sustainability.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-1 text-teal-600"/>Fair Trade Certified Partners</li>
              <li className="flex items-start gap-2"><Globe className="w-4 h-4 mt-1 text-teal-600"/>Transparent Supply Chains</li>
              <li className="flex items-start gap-2"><Leaf className="w-4 h-4 mt-1 text-teal-600"/>Supporting Small Producers</li>
            </ul>
          </Card>

          {/* Health & Wellness Initiatives */}
          <Card idx={3} icon={HeartHandshake} title="Health & Wellness Initiatives">
            <p className="mb-4">
              Our focus extends to the well‑being of our employees and the broader community.
              We’re dedicated to promoting healthy living and mental health support.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><Users className="w-4 h-4 mt-1 text-teal-600"/>Workplace Wellness Programs</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-1 text-teal-600"/>Mental Health Support</li>
              <li className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-1 text-teal-600"/>Healthy Lifestyle Resources</li>
            </ul>
          </Card>

          {/* Diversity & Inclusion */}
          <Card idx={4} icon={Users} title="Diversity & Inclusion">
            <p className="mb-4">
              We foster a diverse and inclusive environment where everyone feels valued and respected.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-1 text-teal-600"/>Equal Opportunities for All</li>
              <li className="flex items-start gap-2"><Users className="w-4 h-4 mt-1 text-teal-600"/>Inclusive Hiring Practices</li>
              <li className="flex items-start gap-2"><HeartHandshake className="w-4 h-4 mt-1 text-teal-600"/>Employee Resource Groups</li>
            </ul>
          </Card>

          {/* Social Innovation */}
          <Card idx={5} icon={Lightbulb} title="Social Innovation">
            <p className="mb-4">
              We develop and support innovative solutions that address global challenges—from
              technology to community‑driven initiatives.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-1 text-teal-600"/>Tech for Good Projects</li>
              <li className="flex items-start gap-2"><HeartHandshake className="w-4 h-4 mt-1 text-teal-600"/>Collaboration with Nonprofits</li>
              <li className="flex items-start gap-2"><Globe className="w-4 h-4 mt-1 text-teal-600"/>Innovative Sustainability Solutions</li>
            </ul>
          </Card>
        </motion.div>
      </section>

      {/* CALL TO ACTION */}
      <section id="get-involved" className="relative py-16 md:py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-3xl bg-teal-700 text-white p-8 md:p-12 shadow-xl overflow-hidden relative"
          >
            <div className="absolute -top-20 -right-24 w-72 h-72 rounded-full bg-teal-400/30 blur-2xl" />
            <div className="absolute -bottom-20 -left-24 w-72 h-72 rounded-full bg-emerald-400/20 blur-2xl" />

            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
              Join Us in Making a Difference
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-teal-50/90 text-lg max-w-3xl">
              Together, we can create lasting change. Learn more about how you can contribute
              to our mission of making the world a better place.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-white text-teal-700 font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <HeartHandshake className="w-5 h-5" /> Become a Volunteer
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 border border-white/70 text-white font-semibold hover:bg-white/10 backdrop-blur transition"
              >
                <Leaf className="w-5 h-5" /> Read Our Report
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
