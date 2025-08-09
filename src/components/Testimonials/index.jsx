"use client"
import React, { useEffect } from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

const logos = [
  { src: "/clients/client1.png", alt: "Client A" },
  { src: "/clients/client2.png", alt: "Client B" },
  { src: "/clients/client3.png", alt: "Client C" },
  { src: "/clients/client4.png", alt: "Client D" },
  { src: "/clients/client1.png", alt: "Client E" },
  { src: "/clients/client2.png", alt: "Client F" },
];

const testimonials = [
  {
    name: "Emily R., HR Manager",
    position: "Future Innovations Ltd",
    testimonial:
      "Your platform has completely transformed our recruitment strategy. We've seen a 40% reduction in time-to-hire and a significant increase in candidate quality. The team's support is unparalleled!",
    rating: 5,
  },
  {
    name: "Michael B., Talent Acquisition",
    position: "Global Connect Services",
    testimonial:
      "A true game-changer in staffing! The seamless experience and automated matching features have saved us countless hours and helped us find top-tier talent effortlessly.",
    rating: 5,
  },
  {
    name: "Jessica P., CEO",
    position: "Pinnacle Health Group",
    testimonial:
      "We were looking for a reliable partner for our healthcare staffing needs, and we found it here. The service is fast, efficient, and the candidates are always a perfect fit for our culture.",
    rating: 5,
  },
  {
    name: "Alex F., Operations Director",
    position: "Swift Hospitality Group",
    testimonial:
      "The quality of the candidates we receive is consistently high. We are extremely impressed with the level of professionalism and the personalized service we receive. Highly recommended!",
    rating: 5,
  },
];

const TrustpilotBadge = () => (
  <div className="flex items-center justify-center gap-2 mb-4">
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
    <span className="text-sm text-gray-500">Excellent</span>
  </div>
);

function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="bg-gray-50 py-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-5xl font-extrabold text-gray-800 mb-4"
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
          <p className="text-lg text-gray-700">
            Trusted by thousands of clients worldwide.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation
          grabCursor
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                data-aos="zoom-in"
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center max-w-3xl mx-auto"
              >
                <FaQuoteLeft className="text-teal-600 text-6xl mb-6 animate-quote" />
                <p className="text-xl font-light italic text-gray-700 mb-6 leading-relaxed">
                  “{item.testimonial}”
                </p>
                <div className="flex gap-1 mb-6 text-yellow-500 text-xl">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="animate-star" />
                  ))}
                </div>
                <FaUserCircle className="text-gray-400 text-7xl mb-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-teal-600 font-medium">{item.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Logos */}
        <div className="mt-16">
          <h3
            data-aos="fade-up"
            className="text-2xl font-bold text-gray-700 mb-8"
          >
            Trusted by Industry Leaders
          </h3>
          <div
            data-aos="fade-up"
            className="flex flex-wrap justify-center gap-10"
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
                  className="h-12 w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-quote {
          animation: pulseQuote 3s ease-in-out infinite;
        }
        @keyframes pulseQuote {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-star {
          animation: starGlow 2s ease-in-out infinite;
        }
        @keyframes starGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 1px #eab308);
          }
          50% {
            filter: drop-shadow(0 0 5px #facc15);
          }
        }
      `}</style>
    </div>
  );
}

export default Testimonials;
