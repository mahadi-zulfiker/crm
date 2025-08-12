'use client';

import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'; // Adjust path as needed

// A separate file for your testimonials data for better organization
const testimonials = [
  {
    clientName: 'Client A',
    title: 'Revolutionizing Our Workflow',
    text: "Working with this team has completely transformed our operations. Their solutions are not only innovative but also incredibly reliable. We've seen a significant increase in efficiency and a decrease in operational costs since implementation.",
    author: 'Jane Doe',
    position: 'CEO of TechCorp',
    image: '/clients/client1.png',
  },
  {
    clientName: 'Client B',
    title: 'Exceptional Service and Results',
    text: "The level of support and expertise we received was outstanding. They took the time to understand our unique challenges and delivered a custom solution that exceeded all our expectations. We highly recommend them!",
    author: 'John Smith',
    position: 'CTO of Innovate Inc.',
    image: '/clients/client2.png',
  },
  {
    clientName: 'Client C',
    title: 'Seamless Integration and Support',
    text: "Their team made the entire process seamless, from initial consultation to final deployment. The ongoing support has been fantastic, and they're always there to help. Truly a partner we can count on.",
    author: 'Sarah Chen',
    position: 'Founder of Global Solutions',
    image: '/clients/client3.png',
  },
  {
    clientName: 'Client D',
    title: 'A True Game Changer',
    text: 'We were looking for a partner to help us scale, and we found the perfect fit. Their expertise and dedication are second to none. Our productivity has skyrocketed, and we are now able to focus on what matters most.',
    author: 'Michael B.',
    position: 'Operations Director at Future Labs',
    image: '/clients/client4.png',
  },
];

// Client logos with a link to their testimonials
const logos = [
  { src: '/clients/client1.png', alt: 'Client A' },
  { src: '/clients/client2.png', alt: 'Client B' },
  { src: '/clients/client3.png', alt: 'Client C' },
  { src: '/clients/client4.png', alt: 'Client D' },
];

const Clients = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef(null);

  // State for testimonials dialog
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // Stats data
  const stats = [
    { number: 500, label: 'Clients Served', prefix: '+', suffix: '' },
    { number: 95, label: 'Satisfaction Rate', prefix: '', suffix: '%' },
    { number: 24, label: 'Customer Support', prefix: '', suffix: '/7' },
    { number: 10, label: 'Years of Experience', prefix: '', suffix: '+' },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Function to handle opening the dialog
  const handleOpenDialog = (clientName) => {
    const testimonial = testimonials.find(
      (t) => t.clientName === clientName
    );
    setSelectedTestimonial(testimonial);
  };

  // Duplicate logos for seamless scrolling
  const displayedLogos = [...logos, ...logos];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
            data-aos="fade-up"
          >
            Trusted by Industry Leaders
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our commitment to excellence has earned the trust of companies
            worldwide.
          </p>
        </div>

        {/* Client Logos Slider */}
        <div
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            ref={scrollerRef}
            className={`flex space-x-12 animate-scroll ${isPaused ? 'animate-none' : ''}`}
          >
            {displayedLogos.map((logo, index) => (
              <a
                key={index}
                onClick={() => handleOpenDialog(logo.alt)}
                className="flex-shrink-0 cursor-pointer transition-transform duration-300 transform"
                title={`View testimonial from ${logo.alt}`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={70}
                  className="transition duration-300 opacity-80 hover:opacity-100"
                />
              </a>
            ))}
          </div>
          {/* Gradient overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Animated Stats Cards */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto mt-20"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-400 hover:scale-[1.03] space-y-3 flex flex-col justify-center items-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-teal-50 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
              <div className="relative z-10 text-5xl font-extrabold text-teal-600 drop-shadow-md transition-colors duration-300 group-hover:text-gray-800">
                {hasAnimated ? (
                  <CountUp
                    start={0}
                    end={item.number}
                    duration={2.5}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                ) : (
                  `${item.prefix}${item.number}${item.suffix}`
                )}
              </div>
              <div className="relative z-10 text-md md:text-lg font-medium text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Dialog */}
      {selectedTestimonial && (
        <Dialog
          open={!!selectedTestimonial}
          onOpenChange={() => setSelectedTestimonial(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="flex flex-col items-center text-center">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.clientName}
                className="h-20 w-20 object-contain mb-4"
              />
              <DialogTitle className="text-xl font-bold">
                "{selectedTestimonial.title}"
              </DialogTitle>
              <DialogDescription className="text-gray-500 mt-2">
                {selectedTestimonial.text}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-800">
                - {selectedTestimonial.author}
              </p>
              <p className="text-sm text-gray-600">
                {selectedTestimonial.position}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Inline CSS for the scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-none {
          animation: none;
        }
      `}</style>
    </section>
  );
};

export default Clients;