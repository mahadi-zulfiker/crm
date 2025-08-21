"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";
import bannerImg from "../../../public/about-us/about-1.jpg";
import {
  Leaf,
  Globe,
  Recycle,
  Cloud,
  Factory,
  ShieldCheck,
  HandHelping,
  TreeDeciduous,
} from "lucide-react";
import { motion } from "framer-motion";

const EnvironmentPage = () => {
  const environmentalCommitments = [
    {
      id: 1,
      title: "Sustainable Operations",
      summary:
        "Implementing eco-friendly practices across our operations, from energy consumption to waste management.",
      icon: Factory,
    },
    {
      id: 2,
      title: "Carbon Footprint Reduction",
      summary:
        "Minimizing carbon emissions while supporting clients in their decarbonization journeys.",
      icon: Cloud,
    },
    {
      id: 3,
      title: "Resource Efficiency",
      summary:
        "Reducing water usage, promoting recycling, and optimizing resource consumption.",
      icon: Recycle,
    },
    {
      id: 4,
      title: "Green Partnerships",
      summary:
        "Collaborating with eco-conscious suppliers and partners for a sustainable future.",
      icon: HandHelping,
    },
  ];

  const environmentalServices = [
    {
      id: 1,
      title: "Environmental Impact Assessments",
      description:
        "Thorough evaluations to understand and mitigate ecological footprints.",
      link: "/services",
      img: bannerImg, // Using banner image as background for one card
    },
    {
      id: 2,
      title: "Sustainability Consulting",
      description:
        "Advising businesses on integrating sustainability into their strategies.",
      link: "/services",
    },
    {
      id: 3,
      title: "Waste Management Optimization",
      description:
        "Efficient programs for waste reduction, reuse, and recycling.",
      link: "/services",
    },
    {
      id: 4,
      title: "Renewable Energy Transition Support",
      description:
        "Helping organizations adopt clean and renewable energy sources.",
      link: "/services",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />
      <StickyHeader />

      {/* Banner Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={bannerImg}
            alt="Sustainability Banner"
            fill
            className="object-cover brightness-75"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 to-black/60" />
        <motion.div
          className="relative text-center text-white px-6 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Building a Greener Tomorrow
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl mb-8 font-light italic">
            "We do not inherit the Earth from our ancestors, we borrow it from
            our children."
          </p>
          <Link
            href="/contactUs"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-transform transform hover:scale-110"
          >
            Partner With Us
          </Link>
        </motion.div>
      </section>

      <main className="flex-grow container mx-auto px-6 py-20">
        {/* Environmental Pillars */}
        <section className="mb-28">
          <motion.h2
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Core Environmental Pillars
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {environmentalCommitments.map((commitment) => (
              <motion.div
                key={commitment.id}
                className="bg-white rounded-3xl shadow-lg p-10 text-center cursor-pointer relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <commitment.icon className="w-16 h-16 mx-auto mb-6 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {commitment.title}
                </h3>
                <p className="text-gray-600">{commitment.summary}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Client Support Services */}
        <section className="mb-28">
          <motion.h2
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            How We Support Our Clients
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {environmentalServices.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ y: -6 }}
              >
                {service.img && (
                  <Image
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                )}
                <div className="relative p-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    href={service.link}
                    className="inline-block text-teal-500 hover:text-teal-700 font-semibold transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits of Going Green */}
        <section className="relative text-center bg-gradient-to-r from-teal-100 to-teal-200 py-20 px-6 rounded-3xl shadow-xl overflow-hidden">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-[url('/about-us/about-1.jpg')] opacity-10 bg-cover bg-center" />

          <motion.h2
            className="text-4xl font-extrabold text-gray-900 mb-14 relative z-10"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            The Benefits of Green Initiatives
          </motion.h2>

          {/* Benefits Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                text: "Enhanced brand reputation and customer loyalty.",
                icon: "🌱",
              },
              {
                text: "Reduced operational costs through efficiency gains.",
                icon: "💡",
              },
              {
                text: "Attraction and retention of top talent who value sustainability.",
                icon: "🤝",
              },
              {
                text: "Compliance with evolving environmental regulations.",
                icon: "📜",
              },
              {
                text: "Contribution to a healthier planet for future generations.",
                icon: "🌍",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/reports/sustainability"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all transform hover:scale-110 hover:shadow-2xl"
            >
              View Our Sustainability Report
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnvironmentPage;
