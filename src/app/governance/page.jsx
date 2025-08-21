// app/governance/page.jsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import recruitmentImg from "../../../public/recruitment.jpg";
import {
  Scale,
  ShieldCheck,
  ClipboardCheck,
  Users,
  Lock,
  FileText,
  BellRing,
} from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";

const GovernancePage = () => {
  // Governance pillars with images (one card enhanced with an image)
  const governancePillars = [
    {
      id: 1,
      title: "Ethical Conduct & Integrity",
      summary:
        "Upholding the highest standards of ethics and integrity in all business dealings and decision-making.",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Transparency & Accountability",
      summary:
        "Committing to open communication and taking responsibility for our actions and their impact.",
      icon: FileText,
    },
    {
      id: 3,
      title: "Regulatory Compliance",
      summary:
        "Ensuring strict adherence to all applicable laws, regulations, and industry standards.",
      icon: ClipboardCheck,
    },
    {
      id: 4,
      title: "Risk Management",
      summary:
        "Proactively identifying, assessing, and mitigating risks to protect our stakeholders and assets.",
      icon: Lock,
    },
    {
      id: 5,
      title: "Stakeholder Engagement",
      summary:
        "Fostering strong relationships and open dialogue with all stakeholders, including employees, clients, and investors.",
      icon: Users,
      image: recruitmentImg, // Banner image used as card inspiration
    },
  ];

  const governanceResources = [
    {
      id: 1,
      title: "Code of Conduct",
      description:
        "Our guiding principles for ethical behavior and professional standards.",
      link: "/governance",
    },
    {
      id: 2,
      title: "Anti-Bribery & Corruption Policy",
      description:
        "Our firm stance against bribery and corruption in all its forms.",
      link: "/governance",
    },
    {
      id: 3,
      title: "Data Privacy Policy",
      description: "Details on how we collect, use, and protect personal data.",
      link: "#privacy-policy",
    },
    {
      id: 4,
      title: "Whistleblower Policy",
      description:
        "Our commitment to a safe environment for reporting concerns without fear of retaliation.",
      link: "/governance",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <StickyHeader />

      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={recruitmentImg}
          alt="Corporate Governance"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 via-teal-800/60 to-transparent flex items-center">
          <motion.div
            className="px-6 md:px-16 text-white max-w-2xl"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Corporate Governance
            </h1>
            <p className="text-lg md:text-xl mb-6">
              “Good governance is the foundation of trust and sustainable
              success.”
            </p>
            <Link
              href="/contactUs"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Hero Section with Inspiring Quote */}
        <motion.section
          className="text-center mb-16 bg-white p-10 rounded-3xl shadow-lg relative overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <blockquote className="italic text-teal-700 text-2xl mb-6 font-medium">
            “Integrity, transparency, and accountability are not optional — they
            are the pillars of trust.”
          </blockquote>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            At Demand Recruitment, robust corporate governance is fundamental to
            our success and reputation. We are committed to maintaining the
            highest standards of integrity, transparency, and accountability
            across all aspects of our operations, ensuring long-term value
            creation for our stakeholders.
          </p>
        </motion.section>

        {/* Governance Pillars Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Our Core Governance Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {governancePillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {pillar.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-teal-900/50 flex items-center justify-center">
                      <pillar.icon className="w-14 h-14 text-white" />
                    </div>
                  </div>
                )}
                {!pillar.image && (
                  <div className="flex items-center justify-center py-8 bg-teal-50">
                    <pillar.icon className="w-16 h-16 text-teal-500" />
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600">{pillar.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Governance Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Key Policies & Governance Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {governanceResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  target={resource.link.endsWith(".pdf") ? "_blank" : "_self"}
                  rel={
                    resource.link.endsWith(".pdf") ? "noopener noreferrer" : ""
                  }
                  className="text-teal-500 hover:text-teal-600 font-medium transition-colors"
                >
                  {resource.link.endsWith(".pdf")
                    ? "Download Policy"
                    : "View Policy"}{" "}
                  &rarr;
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Report a Concern */}
        <motion.section
          className="text-center bg-gradient-to-r from-teal-100 to-teal-200 p-10 rounded-3xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Report a Concern
          </h2>
          <p className="text-gray-700 mb-6">
            We encourage stakeholders to report any concerns regarding ethical
            conduct or compliance. Our whistleblower policy ensures a safe and
            confidential reporting mechanism.
          </p>
          <Link
            href="/contactUs"
            className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            <BellRing className="w-5 h-5 mr-2" /> Report a Concern
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default GovernancePage;
