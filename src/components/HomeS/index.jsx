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
    AOS.init({ duration: 800 });
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
    <section className="bg-gray-100 text-gray-800 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-12" data-aos="fade-up">
          What We Offer
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {services.map(({ icon: Icon, label, href, description }, index) => (
            <Link
              key={index}
              href={href}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              title={description} // Tooltip on hover
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group-hover:scale-105">
                <div className="flex justify-center mb-4 text-teal-700 hover:animate-pulse transition-all">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <p className="font-bold text-lg group-hover:text-teal-700 transition">
                  {label}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <Link href={href} className="hover:underline">
                    {description}
                  </Link>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <blockquote
          className="text-lg italic text-gray-700 max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          “Demand Recruitment Services helped us reduce costs and improve staff
          fill rates dramatically.”
        </blockquote>
        <p
          className="mt-2 text-sm text-gray-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Senior Workforce Manager, NHS Trust
        </p>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
