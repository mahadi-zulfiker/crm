'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleUp, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Button (Fixed on Right Side) */}
      <a
        href="https://wa.me/4402038761531"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl animate-pulse-slow"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-xl animate-pulse w-10 h-10" />
      </a>

      {/* Scroll to Top Button (Fixed on Left Side) */}
      <button
        onClick={scrollToTop}
        className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-14 h-14 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-10'} transition-opacity duration-300`}
        aria-label="Scroll to top"
      >
        <FaArrowAltCircleUp className="text-2xl" />
      </button>
    </>
  );
};

export default FloatingButtons;

// Inline CSS for animations
<style jsx>{`
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 2s infinite ease-in-out;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce {
    animation: bounce 1.5s infinite;
  }
`}</style>