'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaChevronDown } from 'react-icons/fa';

// Expanded FAQ list with keyword-rich questions
const faqs = [
  {
    question: "What industries do you specialize in for recruitment services?",
    answer: "We specialize in staffing for a wide range of industries including healthcare, hospitality, facilities management, construction, and corporate services. Our expertise allows us to find the perfect fit for both candidates and employers.",
  },
  {
    question: "How can I apply for jobs through your recruitment agency?",
    answer: "You can easily apply for jobs directly on our website. Visit our 'Jobs' page to browse current openings and submit your application. You can also send us your CV through the contact form, and we'll match you with suitable opportunities.",
  },
  {
    question: "Do you offer temporary, permanent, or contract placements?",
    answer: "Yes, we provide a variety of placement options to meet different needs. Whether you're looking for temporary staffing to fill a short-term need, a permanent position for long-term career growth, or specialized contract-based work, we can assist you.",
  },
  {
    question: "What is your process for candidate screening and matching?",
    answer: "Our rigorous candidate screening process includes a detailed review of resumes, skill assessments, and personal interviews. We focus on understanding a candidate's experience, career goals, and cultural fit to ensure a successful and lasting match for our clients.",
  },
  {
    question: "Can I receive career advice or resume tips from your team?",
    answer: "Absolutely. Our experienced recruitment consultants offer personalized career advice, resume writing tips, and interview preparation support to help you stand out in the competitive job market. Feel free to get in touch to schedule a consultation.",
  },
  {
    question: "What are the benefits of using a recruitment agency for job seekers?",
    answer: "Using a recruitment agency provides you with exclusive access to unadvertised jobs, professional guidance, and a direct line to hiring managers. We act as your advocate, saving you time and effort in your job search.",
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

    // Here you would typically send form data to an API
    console.log("Form submitted:", formData);

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: "We’ll be in touch within 24 hours!",
      confirmButtonColor: '#0d9488', // teal-700
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
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      <section className="py-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 data-aos="fade-up" className="text-4xl font-extrabold text-center text-teal-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Find answers to the most common questions about our recruitment and staffing services.
          </p>
          <div data-aos="fade-up" data-aos-delay="200" className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 hover:bg-teal-50 transition rounded-xl"
                >
                  <span>{faq.question}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-teal-600' : 'text-gray-500'
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info and Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-6">Get in Touch</h3>
            <p className="text-gray-600 mb-8 max-w-md">
              We're here to help you with your recruitment and staffing needs. Fill out the form or use one of the options below to connect with us.
            </p>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-teal-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Office Address</h4>
                  <p className="text-gray-600">120 Staffing, London, UK</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaPhone className="text-teal-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <a href="tel:+442038761531" className="text-gray-600 hover:text-teal-600 transition">+44 0203 876 1531</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaEnvelope className="text-teal-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <a href="mailto:info@demandrecruitmentservices.co.uk" className="text-gray-600 hover:text-teal-600 transition">info@demandrecruitmentservices.co.uk</a>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div data-aos="zoom-in" data-aos-delay="200" className="pt-4">
                <a
                  href="https://wa.me/442038761531?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <FaWhatsapp className="text-xl animate-pulse" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              />
              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold px-6 py-4 rounded-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactSection;