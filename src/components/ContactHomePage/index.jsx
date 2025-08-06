'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What industries do you recruit for?",
    answer: "We specialize in healthcare, hospitality, facilities management, and more."
  },
  {
    question: "Can I apply for jobs directly from the website?",
    answer: "Yes, you can explore available positions and apply directly through our Jobs page."
  },
  {
    question: "Do you offer temporary or permanent placements?",
    answer: "We offer temporary, permanent, contract-based, and consultancy placements based on your needs."
  },
];

const ContactSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Contact Form */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h3>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info & FAQs */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Info</h3>

          <div className="space-y-5 text-gray-700 mb-8">
            <p className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-teal-600 mt-1" />
              <span>
                <strong>Office Address:</strong><br />
                120 Staffing, London, UK
              </span>
            </p>

            <p className="flex items-start gap-3">
              <FaPhone className="text-teal-600 mt-1" />
              <span>
                <strong>Phone:</strong><br />
                +44 0203 876 1531
              </span>
            </p>

            <p className="flex items-start gap-3">
              <FaEnvelope className="text-teal-600 mt-1" />
              <span>
                <strong>Email:</strong><br />
                info@demandrecruitmentservices.co.uk
              </span>
            </p>
          </div>

          {/* Accordion FAQ */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Frequently Asked Questions</h4>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`transition-transform duration-200 ${
                        openIndex === index ? "rotate-180 text-teal-600" : "text-gray-500"
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
