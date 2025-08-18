"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaChevronDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

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

const ContactSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "We’ll be in touch within 24 hours!",
      confirmButtonColor: "#0f766e",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 font-sans text-gray-800">
      <section className="py-20 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-20">
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

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            data-aos="fade-right"
            className="space-y-8 text-gray-700"
          >
            <h3 className="text-4xl font-extrabold text-gray-800">
              Get in Touch
            </h3>
            <p className="text-gray-600 max-w-md">
              We're here to help you with your recruitment and staffing needs.
              Fill out the form or use one of the options below to connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:translate-x-2 transition">
                <FaMapMarkerAlt className="text-teal-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Office Address</h4>
                  <p>120 Staffing, London, UK</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:translate-x-2 transition">
                <FaPhone className="text-teal-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <a
                    href="tel:+442038761531"
                    className="hover:text-teal-600 transition"
                  >
                    +44 0203 876 1531
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:translate-x-2 transition">
                <FaEnvelope className="text-teal-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <a
                    href="mailto:info@demandrecruitmentservices.co.uk"
                    className="hover:text-teal-600 transition"
                  >
                    info@demandrecruitmentservices.co.uk
                  </a>
                </div>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://wa.me/442038761531?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
              >
                <FaWhatsapp className="text-xl animate-pulse" />
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            data-aos="fade-left"
            onSubmit={handleSubmit}
            className="space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-teal-100"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none transition"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
