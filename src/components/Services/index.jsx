"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "animate.css";
import img1 from "../../../public/about-us-wte/1.jpg";
import img2 from "../../../public/about-us-wte/2.jpg";
import img3 from "../../../public/about-us-wte/3.jpg";
import img4 from "../../../public/about-us-wte/4.jpg";
import img5 from "../../../public/services/1.jpg";
import img6 from "../../../public/services/2.jpg";

// Optional: Expand image list if you want more unique backgrounds
const images = [img1, img2, img3, img4, img5, img6];

const services = [
  {
    title: "Staff Bank Solution",
    description:
      "Demand Recruitment Services Ltd – Your Partner in Smarter Healthcare Staffing",
    link: "/staffBankSolution",
  },
  {
    title: "Managed Services",
    description: "Smarter Staffing, Better Care",
    link: "/managedService",
  },
  {
    title: "Recruitment Process Outsourcing",
    description: "Smarter, Faster, Cost-Effective Hiring",
    link: "/rpo",
  },
  {
    title: "Direct Engagement",
    description: "Cut Temporary Staffing Costs Quickly & Effectively",
    link: "/directEngagement",
  },
  {
    title: "Workforce Consulting",
    description: "Smarter Staffing, Greater Efficiency",
    link: "/workforceConsulting",
  },
  {
    title: "Vendor Management",
    description: "Take Control of Temporary Staffing",
    link: "/vendorManagement",
  },
];

export default function ServicesComponent() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2
          ref={(el) => sectionsRef.current.push(el)}
          className="text-4xl font-bold text-center text-gray-900"
        >
          Our Services
        </h2>
        <p
          ref={(el) => sectionsRef.current.push(el)}
          className="mt-4 text-center text-orange-500 max-w-2xl mx-auto font-semibold"
        >
          At Demand Recruitment Services Ltd, we offer a comprehensive range of
          staffing and workforce management services to meet the demands of
          various industries.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              ref={(el) => sectionsRef.current.push(el)}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={images[index % images.length]}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-60 transition duration-300" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-200">{service.description}</p>
                <span className="mt-4 inline-block text-sm text-orange-300 font-medium group-hover:underline">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
