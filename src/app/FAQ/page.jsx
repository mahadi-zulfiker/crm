"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQImage from "../../../public/FAQ.jpg";
import Chat from "@/components/Chat";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "About our profile?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "News and topics?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How to use?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      question: "What services do we offer?",
      answer:
        "We provide a range of web development and design solutions tailored to your needs.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach out to our support team via the contact form on our website or email us at support@example.com.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, PayPal, and other common payment methods.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
    <Navbar />

    {/* Search at Top */}
    <div className="bg-white py-6 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Text Section */}
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to the most common questions below.</p>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow transition-all"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left text-gray-800 font-medium hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-5 text-gray-600 bg-gray-50 transition-opacity duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block">
        <Image
          src={FAQImage}
          alt="FAQ Illustration"
          className="rounded-xl shadow-lg"
          priority
        />
      </div>
    </div>

    {/* Contact Banner */}
    <div className="bg-teal-600 text-white py-10 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Still need help? Contact our team</h2>
      <p className="mb-6">We're here to assist you with any questions or concerns.</p>
      <a
        href="/contactUs"
        className="inline-block bg-white text-teal-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
      >
        Contact Us
      </a>
    </div>

    <Chat />
    <Footer />
  </div>
);

}

export default FAQ;
