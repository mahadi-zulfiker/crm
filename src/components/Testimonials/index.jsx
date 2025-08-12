"use client";

import React, { useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

// Testimonial data remains the same
const testimonials = [
  {
    name: "Emily R.",
    position: "HR Manager, Future Innovations",
    testimonial:
      "Your platform has completely transformed our recruitment strategy. We've seen a 40% reduction in time-to-hire and a significant increase in candidate quality. The team's support is unparalleled!",
    rating: 5,
    logoSrc: "/clients/client1.png",
    avatarSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=80&q=80",
  },
  {
    name: "Michael B.",
    position: "Talent Acquisition, Global Services",
    testimonial:
      "A true game-changer in staffing! The seamless experience and automated matching features have saved us countless hours and helped us find top-tier talent effortlessly.",
    rating: 5,
    logoSrc: "/clients/client2.png",
    avatarSrc:
      "https://images.unsplash.com/photo-1549068106-b024baf5062d?fit=crop&w=80&q=80",
  },
  {
    name: "Jessica P.",
    position: "CEO, Pinnacle Health Group",
    testimonial:
      "We were looking for a reliable partner for our healthcare staffing needs, and we found it here. The service is fast, efficient, and the candidates are always a perfect fit for our culture.",
    rating: 5,
    logoSrc: "/clients/client3.png",
    avatarSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=80&q=80",
  },
  {
    name: "Alex F.",
    position: "Operations Director, Swift Hospitality",
    testimonial:
      "The quality of the candidates we receive is consistently high. We are extremely impressed with the level of professionalism and the personalized service we receive. Highly recommended!",
    rating: 5,
    logoSrc: "/clients/client4.png",
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
  // Ensured a centered, flexible container for alignment
  <div className="flex flex-col items-center justify-center gap-2 mb-4">
    <div className="flex items-center gap-2">
      <img
        src="https://placehold.co/100x20/000/fff?text=Trustpilot"
        alt="Trustpilot"
        className="h-5"
      />
      <div className="flex gap-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="animate-star" />
        ))}
      </div>
    </div>
    <span className="text-sm text-gray-500">Excellent</span>
  </div>
);

function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    // Base section with consistent vertical padding
    <div className="bg-gray-50 py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          What Our Clients Say
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Hear from the businesses we've helped find the perfect talent.
        </p>

        <div data-aos="fade-up" data-aos-delay="200" className="mb-12">
          <TrustpilotBadge />
        </div>

        {/* Swiper Testimonial Carousel */}
        <div data-aos="fade-up" data-aos-delay="300">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation
            grabCursor
            loop={true}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            // Added a small top margin to the swiper for better spacing from the badge
            className="mt-8 pb-12 py-4"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <div className="bg-white py-4 h-full p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col justify-between">
                    <div>
                      <FaQuoteLeft className="text-teal-500 text-5xl mb-6" />
                      <p className="text-md font-light italic text-gray-700 leading-relaxed mb-6">
                        “{item.testimonial}”
                      </p>
                    </div>
                    {/* The `mt-auto` class correctly pushes this block to the bottom */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={item.avatarSrc}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-teal-500"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-600">
                            {item.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 text-yellow-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* --- Logos Section --- */}
      <div className="mt-16">
        <h3
          data-aos="fade-up"
          className="text-2xl font-bold text-gray-700 text-center mb-8"
        >
          Trusted by Industry Leaders
        </h3>
        <div
          data-aos="fade-up"
          className="flex flex-wrap items-center justify-center gap-8 md:gap-10"
        >
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
      <style jsx>{`
        /* Swiper styles to align pagination bullets and navigation properly */
        :global(.swiper-pagination-bullet) {
          background: #d1d5db; /* gray-400 */
          opacity: 1;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #0d9488; /* teal-600 */
        }
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: #111827; /* gray-900 */
        }
      `}</style>
    </div>
  );
}

export default Testimonials;