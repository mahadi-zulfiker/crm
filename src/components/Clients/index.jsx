"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const testimonials = [
  {
    clientName: "Client A",
    title: "Revolutionizing Our Workflow",
    text: "Working with this team has completely transformed our operations. Their solutions are not only innovative but also incredibly reliable.",
    author: "Jane Doe",
    position: "CEO of TechCorp",
    image: "/clients/client1.png",
  },
  {
    clientName: "Client B",
    title: "Exceptional Service and Results",
    text: "They took the time to understand our unique challenges and delivered a custom solution that exceeded expectations.",
    author: "John Smith",
    position: "CTO of Innovate Inc.",
    image: "/clients/client2.png",
  },
  {
    clientName: "Client C",
    title: "Seamless Integration and Support",
    text: "From consultation to deployment, the process was smooth. Support is always there when we need it.",
    author: "Sarah Chen",
    position: "Founder of Global Solutions",
    image: "/clients/client3.png",
  },
  {
    clientName: "Client D",
    title: "A True Game Changer",
    text: "Their expertise and dedication are second to none. Our productivity has skyrocketed.",
    author: "Michael B.",
    position: "Operations Director at Future Labs",
    image: "/clients/client4.png",
  },
];

const logos = [
  { src: "/clients/client1.png", alt: "Client A" },
  { src: "/clients/client2.png", alt: "Client B" },
  { src: "/clients/client3.png", alt: "Client C" },
  { src: "/clients/client4.png", alt: "Client D" },
];

export default function Clients() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const stats = [
    { number: 500, label: "Clients Served", prefix: "+", suffix: "" },
    { number: 95, label: "Satisfaction Rate", prefix: "", suffix: "%" },
    { number: 24, label: "Customer Support", prefix: "", suffix: "/7" },
    { number: 10, label: "Years of Experience", prefix: "", suffix: "+" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const displayedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-8 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Our commitment to excellence has earned the trust of companies
            worldwide.
          </p>
        </motion.div>

        {/* Logo Marquee */}
        <div
          className="relative overflow-hidden py-8 border-y border-gray-200"
          data-aos="fade-up"
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {displayedLogos.map((logo, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedTestimonial(
                    testimonials.find((t) => t.clientName === logo.alt)
                  )
                }
                className="mx-8 flex-shrink-0 transition-transform"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition duration-300 drop-shadow-md"
                />
              </motion.button>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto mt-20"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.08,
                rotate: [-1, 1, 0],
                boxShadow:
                  "0px 10px 30px rgba(0, 200, 200, 0.3), 0px 0px 15px rgba(0, 200, 200, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:border-teal-400"
            >
              <div className="text-5xl font-extrabold text-teal-600 mb-2">
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
              <p className="text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Dialog */}
      {selectedTestimonial && (
        <Dialog
          open={!!selectedTestimonial}
          onOpenChange={() => setSelectedTestimonial(null)}
        >
          <DialogContent className="sm:max-w-[500px] rounded-xl bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200">
            <DialogHeader className="flex flex-col items-center text-center">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={selectedTestimonial.image}
                alt={selectedTestimonial.clientName}
                className="h-20 w-20 object-contain mb-4 rounded-full border border-gray-200 shadow-md"
              />
              <DialogTitle className="text-xl font-bold text-gray-800">
                “{selectedTestimonial.title}”
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2 leading-relaxed">
                {selectedTestimonial.text}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-800">
                - {selectedTestimonial.author}
              </p>
              <p className="text-sm text-gray-500">
                {selectedTestimonial.position}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
