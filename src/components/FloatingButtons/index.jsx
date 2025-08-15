'use client';

import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowUpCircle } from 'lucide-react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scroll progress and show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      // Update visibility based on scroll position (lower threshold for mobile)
      const visibilityThreshold = isMobile ? 200 : 300;
      setIsVisible(scrolled > visibilityThreshold);

      // Calculate and update scroll progress with smooth transitions
      if (totalHeight > 0) {
        const newProgress = (scrolled / totalHeight) * 100;
        setScrollProgress(prev => {
          // Smooth transition for progress updates
          const diff = newProgress - prev;
          return prev + (diff * 0.1); // Smooth interpolation
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  // Responsive dimensions
  const buttonSize = isMobile ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16';
  const iconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-10 sm:h-10';
  const progressSize = isMobile ? 'w-8 h-8' : 'w-8 h-8 sm:w-10 sm:h-10';
  const arrowSize = isMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6';
  
  // Progress circle dimensions - larger for mobile
  const radius = isMobile ? 14 : 16;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = isMobile ? 1.5 : 2.5;

  return (
    <>
      {/* WhatsApp Button (Fixed on Right Side) */}
      <a
        href="https://wa.me/4402038761531"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center ${buttonSize} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group`}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className={`${iconSize} text-white group-hover:scale-110 transition-transform duration-300`} />
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
      </a>

      {/* Scroll to Top Button with Progress Indicator (Fixed on Left Side) */}
      <button
        onClick={scrollToTop}
        className={`fixed left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center ${buttonSize} bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 group ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <div className="relative">
          {/* SVG Progress Circle */}
          <svg className={`${progressSize} transform -rotate-90`}>
            {/* Background circle */}
            <circle
              className="text-gray-500/40"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={radius + 4}
              cy={radius + 4}
            />
            {/* Progress circle */}
            <circle
              className="text-teal-400 transition-all duration-300 ease-out drop-shadow-sm"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={radius + 4}
              cy={radius + 4}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference - (scrollProgress / 100) * circumference,
                strokeLinecap: 'round',
                filter: 'drop-shadow(0 0 2px rgba(20, 184, 166, 0.3))',
              }}
            />
          </svg>
          {/* Icon in the center */}
          <ArrowUpCircle className={`absolute inset-0 m-auto ${arrowSize} text-white group-hover:text-teal-400 transition-colors duration-300 drop-shadow-sm`} />
        </div>
        
        {/* Hover effect ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-teal-400/50 transition-all duration-300 scale-110 opacity-0 group-hover:opacity-100"></div>
      </button>

      {/* Mobile-specific positioning adjustments */}
      {isMobile && (
        <style jsx>{`
          @media (max-width: 768px) {
            .fixed {
              position: fixed !important;
            }
          }
        `}</style>
      )}
    </>
  );
};

export default FloatingButtons;