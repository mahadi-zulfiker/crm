'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What industries do you recruit for?",
    answer: "We specialize in healthcare, hospitality, facilities management, and more.",
  },
  {
    question: "Can I apply for jobs directly from the website?",
    answer: "Yes, you can explore available positions and apply directly through our Jobs page.",
  },
  {
    question: "Do you offer temporary or permanent placements?",
    answer: "We offer temporary, permanent, contract-based, and consultancy placements based on your needs.",
  },
];

const ContactSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Form state to clear fields after submission
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
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

    // Here you can do form validation or sending data to API

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: "We’ll be in touch within 24 hours!",
      confirmButtonColor: '#14b8a6', // teal-600
    });

    // Clear form fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div data-aos="fade-up">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
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
                <div key={index} className="bg-white border border-gray-300 rounded-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180 text-teal-600' : 'text-gray-500'
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
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
