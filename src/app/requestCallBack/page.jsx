"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUsersCog, FaHandshake, FaNetworkWired, FaCheckCircle } from "react-icons/fa";

export default function RequestCallbackPage() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <StickyHeader />

      {/* HERO / BANNER */}
      <section className="relative h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hb2.jpg"
          alt="Professional team collaborating"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />

        {/* Gradient + Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/50 to-gray-900/60" />
        <div className="absolute inset-0 backdrop-blur-[4px]" />

        {/* Subtle floating shapes for depth */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 -right-16 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-sm">
            Request a Callback
          </h1>
          <p className="mt-4 text-lg md:text-xl/relaxed opacity-95">
            Looking to hire? Submit a job spec or request a callback to speak with our specialist consultants.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/20 ring-1 ring-white/10 transition-colors hover:bg-teal-500"
            >
              Request a Callback
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-md shadow-lg ring-1 ring-white/30 transition-colors hover:bg-white/30"
            >
              Submit a Job Spec
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* INSPIRING QUOTES (Glass cards) */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {[
            {
              text: "Great vision without great people is irrelevant.",
              author: "— Jim Collins",
            },
            {
              text: "Talent wins games, but teamwork and intelligence win championships.",
              author: "— Michael Jordan",
            },
            {
              text: "The secret of my success is that we have gone to exceptional lengths to hire the best people.",
              author: "— Steve Jobs",
            },
          ].map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-xl transition-all hover:border-teal-200 hover:bg-white/70"
            >
              <div className="text-teal-600 text-4xl leading-none">“</div>
              <p className="mt-3 text-gray-700 italic">{q.text}</p>
              <p className="mt-2 text-sm font-medium text-gray-600">{q.author}</p>
              <div className="mt-4 h-1 w-16 rounded-full bg-teal-500/70 transition-all group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="relative py-20">
        {/* soft bg accents */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-40 max-w-5xl rounded-full bg-teal-100/60 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 max-w-5xl rounded-full bg-teal-50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-teal-100 bg-white/70 p-8 shadow-2xl backdrop-blur-xl md:p-10"
          >
            <h2 className="text-3xl font-bold text-gray-900">Request Callback</h2>
            <p className="mt-2 text-gray-600">
              Tell us a little about your hiring needs and we’ll be in touch.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                { placeholder: "First Name", type: "text" },
                { placeholder: "Last Name", type: "text" },
                { placeholder: "Email", type: "email" },
                { placeholder: "Company", type: "text" },
                { placeholder: "Telephone", type: "text" },
                { placeholder: "Job Title", type: "text" },
              ].map((f, i) => (
                <input
                  key={i}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="rounded-xl border border-gray-300/80 bg-white/70 p-3 outline-none transition-all placeholder:text-gray-500 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/60"
                />
              ))}

              <select
                className="rounded-xl border border-gray-300/80 bg-white/70 p-3 outline-none transition-all focus:border-teal-400 focus:ring-4 focus:ring-teal-200/60"
                defaultValue=""
              >
                <option value="" disabled>
                  Nearest Office Location
                </option>
                <option>London</option>
                <option>Manchester</option>
                <option>Edinburgh</option>
                <option>Remote</option>
              </select>

              <select
                className="rounded-xl border border-gray-300/80 bg-white/70 p-3 outline-none transition-all focus:border-teal-400 focus:ring-4 focus:ring-teal-200/60"
                defaultValue=""
              >
                <option value="" disabled>
                  Your Sector
                </option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Engineering</option>
              </select>

              <textarea
                placeholder="How can we help you?"
                className="md:col-span-2 rounded-xl border border-gray-300/80 bg-white/70 p-3 outline-none transition-all placeholder:text-gray-500 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/60"
                rows={5}
              />

              <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <label className="flex items-center gap-3 text-sm text-gray-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                  I agree to be contacted about my request.
                </label>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/20 ring-1 ring-teal-700/50 transition-colors hover:bg-teal-500"
                >
                  <FaCheckCircle className="text-white/90" />
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-white to-teal-50 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            We partner with businesses across industries to find top talent and deliver customized recruitment solutions.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Specialist Consultants",
                desc: "Experienced experts in your sector who understand your needs.",
                Icon: FaUsersCog,
              },
              {
                title: "Tailored Approach",
                desc: "Flexible hiring options for permanent, contract, or temporary roles.",
                Icon: FaHandshake,
              },
              {
                title: "Extensive Network",
                desc: "Access a broad network of qualified professionals ready to make impact.",
                Icon: FaNetworkWired,
              },
            ].map(({ title, desc, Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-teal-100 bg-white/70 p-8 text-left shadow-xl backdrop-blur-md transition-all hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                <p className="mt-3 text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE LOCATIONS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Office Locations</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-3">
            {[
              { city: "London", address: "123 Recruitment St, London, UK" },
              { city: "Manchester", address: "456 Hiring Rd, Manchester, UK" },
              { city: "Edinburgh", address: "789 Talent Ln, Edinburgh, UK" },
            ].map(({ city, address }) => (
              <motion.div
                key={city}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-md backdrop-blur-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">{city}</h3>
                <p className="mt-1 text-gray-600">{address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
