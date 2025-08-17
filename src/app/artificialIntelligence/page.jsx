// app/artificial-intelligence/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Brain, TrendingUp, MessageSquareText, Lightbulb } from "lucide-react";
import StickyHeader from "@/components/StickyHeader";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ArtificialIntelligencePage = () => {
  // Dummy data
  const aiServices = [
    {
      id: 1,
      title: "AI-Powered Recruitment Solutions",
      summary:
        "Leverage cutting-edge AI algorithms to streamline candidate sourcing, screening, and matching, significantly reducing time-to-hire and improving quality of fit.",
      icon: Brain,
      link: "/services/ai-recruitment",
    },
    {
      id: 2,
      title: "Predictive Analytics for Workforce Planning",
      summary:
        "Utilize AI-driven predictive models to forecast workforce needs, identify skill gaps, and optimize talent acquisition strategies for future growth.",
      icon: TrendingUp,
      link: "/services/predictive-analytics",
    },
    {
      id: 3,
      title: "Automated Candidate Engagement",
      summary:
        "Enhance candidate experience with AI-powered chatbots and automated communication tools, providing instant support and personalized interactions.",
      icon: MessageSquareText,
      link: "/services/automated-engagement",
    },
    {
      id: 4,
      title: "AI Consulting & Implementation",
      summary:
        "Our experts provide tailored AI consulting services, helping your organization integrate AI solutions seamlessly into existing workflows for maximum impact.",
      icon: Lightbulb,
      link: "/services/ai-consulting",
    },
  ];

  const aiInsights = [
    {
      id: 1,
      title: "The Ethical Considerations of AI in HR",
      date: "May 15, 2025",
      summary:
        "Explore the crucial ethical implications and best practices for responsibly deploying AI in human resources.",
      link: "/blog/ai-ethics-hr",
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Talent Acquisition",
      date: "April 28, 2025",
      summary:
        "A deep dive into the transformative impact of artificial intelligence on the entire talent acquisition lifecycle.",
      link: "/blog/ai-talent-acquisition",
    },
  ];

  const quotes = [
    "“AI will transform recruitment the way electricity transformed industries.”",
    "“The future belongs to those who harness AI ethically and intelligently.”",
    "“AI doesn’t replace people, it empowers them.”",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentQuote((prev) => (prev + 1) % quotes.length),
      4000
    );
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <StickyHeader />

      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden rounded-b-3xl shadow-lg">
        <motion.img
          src="/meddd111.jpg"
          alt="Artificial Intelligence Banner"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-900/60" />
        <motion.h1
          key={currentQuote}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-white text-3xl md:text-5xl font-bold text-center px-4 max-w-4xl"
        >
          {quotes[currentQuote]}
        </motion.h1>
      </section>

      <main className="flex-grow container mx-auto px-6 py-16">
        {/* Hero Text */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Unlocking the Power of AI for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            At Demand Recruitment, we harness the transformative potential of
            Artificial Intelligence to optimize your recruitment processes,
            enhance workforce planning, and drive strategic growth.
          </p>
          <Link
            href="/contact"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Discuss Your AI Needs
          </Link>
        </motion.section>

        {/* Services Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
            Our AI-Driven Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {aiServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <service.icon className="w-16 h-16 mx-auto mb-6 text-teal-500" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.summary}</p>
                <Link
                  href={service.link}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Insights Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
            AI Insights & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{insight.date}</p>
                <p className="text-gray-600 mb-6">{insight.summary}</p>
                <Link
                  href={insight.link}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Read Article →
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/blog?tag=ai"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg transition-all duration-300"
            >
              View All AI Resources
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center bg-teal-50 border border-teal-100 p-12 rounded-3xl shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Why Partner with Us for AI?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-left max-w-2xl mx-auto mb-8 space-y-3">
            <li>Deep expertise in AI and machine learning applications.</li>
            <li>Customizable solutions tailored to your unique business needs.</li>
            <li>Commitment to ethical AI practices and data privacy.</li>
            <li>Proven track record of delivering measurable results.</li>
          </ul>
          <Link
            href="/about"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Learn More About Our Expertise
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default ArtificialIntelligencePage;
