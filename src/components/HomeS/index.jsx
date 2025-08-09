'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Briefcase,
  Users,
  Target,
  Globe,
  Folder,
  Hospital,
} from 'lucide-react';

const WhatWeOfferSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      icon: Users,
      label: 'Staff Bank Solutions',
      href: '/staffBankSolution',
      description: 'Flexible staffing with improved efficiency.',
    },
    {
      icon: Briefcase,
      label: 'Managed Services',
      href: '/managedServices',
      description: 'End-to-end workforce management.',
    },
    {
      icon: Target,
      label: 'RPO',
      href: '/rpo',
      description: 'Recruitment process outsourcing at scale.',
    },
    {
      icon: Globe,
      label: 'International Recruitment',
      href: '/InternationalRecruitment',
      description: 'Hire qualified talent across borders.',
    },
    {
      icon: Folder,
      label: 'Workforce Consulting',
      href: '/workforceConsulting',
      description: 'Strategic insights for workforce planning.',
    },
    {
      icon: Hospital,
      label: 'Occupational Health',
      href: '/occupationalHealth',
      description: 'Support employee wellness and safety.',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white text-gray-800 py-20 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-4xl md:text-5xl font-extrabold mb-16" data-aos="fade-up">
          What We Offer
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map(({ icon: Icon, label, href, description }, index) => (
            <Link
              key={index}
              href={href}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:border-teal-400 hover:scale-105 h-full flex flex-col items-center justify-center">
                <div className="bg-teal-50 p-5 rounded-full mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                  <Icon size={40} className="text-teal-600 transition-colors duration-300" />
                </div>
                <p className="font-bold text-2xl text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                  {label}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <blockquote
          className="text-2xl italic text-gray-700 max-w-2xl mx-auto border-l-4 border-teal-500 pl-6 py-2"
          data-aos="fade-up"
        >
          “Demand Recruitment Services helped us reduce costs and improve staff fill rates dramatically.”
        </blockquote>
        <p
          className="mt-4 text-md font-medium text-gray-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          – Senior Workforce Manager, NHS Trust
        </p>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;