// app/net-zero-navigator-2025/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";

// Import Lucide Icons
import {
  Globe,
  Target,
  Leaf,
  BarChart2,
  Rocket,
  CheckCircle,
  Zap,
  Scale,
} from "lucide-react";

const NetZeroNavigator2025Page = () => {
  const navigatorFeatures = [
    {
      id: 1,
      title: "Baseline Carbon Assessment",
      summary:
        "Comprehensive analysis of your current emissions across all scopes (1, 2, & 3) to establish your starting point.",
      icon: BarChart2,
      link: "/net-zero-navigator/baseline-assessment",
    },
    {
      id: 2,
      title: "Tailored Decarbonization Roadmaps",
      summary:
        "Custom-built strategies with actionable steps and timelines to achieve your net-zero targets by 2025.",
      icon: Target,
      link: "/net-zero-navigator/roadmaps",
    },
    {
      id: 3,
      title: "Renewable Energy Integration",
      summary:
        "Guidance and support for transitioning to 100% renewable energy sources, including solar, wind, and green power purchasing.",
      icon: Zap,
      link: "/net-zero-navigator/renewable-energy",
    },
    {
      id: 4,
      title: "Supply Chain Engagement",
      summary:
        "Tools and methodologies to work with your suppliers and reduce Scope 3 emissions across your entire value chain.",
      icon: Globe,
      link: "/net-zero-navigator/supply-chain",
    },
    {
      id: 5,
      title: "Offsetting & Carbon Removal Strategies",
      summary:
        "Expert advice on selecting credible carbon offsetting projects and implementing carbon removal technologies for residual emissions.",
      icon: Leaf,
      link: "/net-zero-navigator/offsetting",
    },
    {
      id: 6,
      title: "Compliance & Reporting Frameworks",
      summary:
        "Ensuring adherence to international standards and providing robust reporting for transparency and stakeholder trust.",
      icon: Scale,
      link: "/net-zero-navigator/reporting",
    },
  ];

  const programBenefits = [
    {
      id: 1,
      title: "Accelerated Net-Zero Achievement",
      description:
        "Direct path to hit 2025 net-zero targets with proven methodologies.",
      icon: Rocket,
    },
    {
      id: 2,
      title: "Enhanced Brand Reputation",
      description:
        "Demonstrate genuine commitment to sustainability and attract conscious customers and talent.",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Operational Cost Savings",
      description:
        "Identify efficiencies in energy consumption and waste reduction.",
      icon: Zap,
    },
    {
      id: 4,
      title: "Future-Proofed Business",
      description:
        "Navigate evolving regulations and investor demands with confidence.",
      icon: Globe,
    },
  ];

  const quotes = [
    "“Sustainability is no longer about doing less harm. It’s about doing more good.”",
    "“The future will be green, or not at all.”",
    "“Net Zero is not a goal — it’s a journey we must accelerate.”",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <StickyHeader />

      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <img
          src="/singleJob.jpg"
          alt="Net Zero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-900/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl px-6"
        >
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Net Zero Navigator 2025
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Guiding organizations to achieve ambitious net-zero targets with
            clarity, confidence, and measurable results.
          </p>
          <p className="italic text-teal-100 font-medium">
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </p>
        </motion.div>
      </section>

      <main className="flex-grow container mx-auto px-6 py-16">
        {/* Features */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Program Features & Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {navigatorFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <feature.icon className="w-16 h-16 mx-auto mb-6 text-teal-600" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.summary}</p>
                <Link
                  href={feature.link}
                  className="text-teal-600 font-medium hover:underline"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Net Zero Navigator 2025?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {programBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-8 flex items-start space-x-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <benefit.icon className="w-12 h-12 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-teal-600 to-teal-800 text-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join the Race to Net Zero!</h2>
          <p className="text-lg mb-6 opacity-90">
            The clock is ticking. Act now to secure your organization's
            sustainable future and lead the way in environmental stewardship.
          </p>
          <Link
            href="/contact"
            className="bg-white text-teal-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-teal-50 transition-all duration-300"
          >
            Get Started Today
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NetZeroNavigator2025Page;
