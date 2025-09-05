"use client";

import React from "react";
import { Star, Quote, Briefcase } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily R.",
    role: "HR Manager",
    company: "Future Innovations",
    testimonial:
      "Your platform has completely transformed our recruitment strategy. We've seen a 40% reduction in time-to-hire and a significant increase in candidate quality. The team's support is unparalleled!",
    rating: 5,
    userType: "recruiter",
    avatarSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=80&q=80",
  },
  {
    id: 2,
    name: "Michael B.",
    role: "Talent Acquisition",
    company: "Global Services",
    testimonial:
      "A true game-changer in staffing! The seamless experience and automated matching features have saved us countless hours and helped us find top-tier talent effortlessly.",
    rating: 5,
    userType: "recruiter",
    avatarSrc:
      "https://images.unsplash.com/photo-1549068106-b024baf5062d?fit=crop&w=80&q=80",
  },
  {
    id: 3,
    name: "Jessica P.",
    role: "CEO",
    company: "Pinnacle Health Group",
    testimonial:
      "We were looking for a reliable partner for our healthcare staffing needs, and we found it here. The service is fast, efficient, and the candidates are always a perfect fit for our culture.",
    rating: 5,
    userType: "recruiter",
    avatarSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=80&q=80",
  },
  {
    id: 4,
    name: "Alex F.",
    role: "Operations Director",
    company: "Swift Hospitality",
    testimonial:
      "The quality of the candidates we receive is consistently high. We are extremely impressed with the level of professionalism and the personalized service we receive. Highly recommended!",
    rating: 5,
    userType: "recruiter",
    avatarSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=80&q=80",
  },
];

const logos = [
  { src: "/clients/client1.png", alt: "Client A" },
  { src: "/clients/client2.png", alt: "Client B" },
  { src: "/clients/client3.png", alt: "Client C" },
  { src: "/clients/client4.png", alt: "Client D" },
  { src: "/clients/client1.png", alt: "Client E" },
  { src: "/clients/client2.png", alt: "Client F" },
];

const TrustpilotBadge = () => (
  <div className="flex flex-col items-center justify-center gap-2 mb-8">
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <img
        src="https://placehold.co/100x20/000/fff?text=Trustpilot"
        alt="Trustpilot"
        className="h-5"
      />
      <div className="flex gap-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current animate-pulse" />
        ))}
      </div>
    </div>
    <span className="text-sm font-medium text-gray-500">Excellent</span>
  </div>
);

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  const getUserTypeBadge = (userType) => {
    const badgeClasses =
      userType === "recruiter"
        ? "bg-teal-100 text-teal-800 border-teal-200"
        : "bg-gray-100 text-gray-800 border-gray-200";

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badgeClasses}`}
      >
        <Briefcase className="w-4 h-4 text-teal-500" />
        Recruiter
      </span>
    );
  };

  const TestimonialCard = ({ testimonial }) => (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 min-w-[300px] md:min-w-[390px] mx-3 hover:scale-105"
    >
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-8 h-8 text-teal-500" />
        {getUserTypeBadge(testimonial.userType)}
      </div>
      <div className="flex items-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>
      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
        &quot;{testimonial.testimonial}&quot;
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatarSrc}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover border-2 border-teal-500"
        />
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-600">
            {testimonial.role}
            {testimonial.company && (
              <span className="text-teal-600"> • {testimonial.company}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the businesses we've helped find the perfect talent.
          </p>
        </div>
        <div className="mb-12">
          <TrustpilotBadge />
        </div>
        <div className="relative mb-12">
          <div className="marquee-container overflow-hidden">
            <div className="marquee-content flex animate-marquee hover:pause-marquee">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-700 text-center mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            {logos.map((item, i) => (
              <a
                key={i}
                href="#"
                className="transform transition-all duration-300 hover:scale-110 hover:rotate-1"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-10 w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
        .marquee-container {
          mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
          -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 25s;
          }
        }
        @media (max-width: 480px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;