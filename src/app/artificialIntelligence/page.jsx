// app/artificial-intelligence/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// Import Lucide Icons
import { Brain, TrendingUp, MessageSquareText, Lightbulb } from 'lucide-react';
import StickyHeader from "@/components/StickyHeader";

const ArtificialIntelligencePage = () => {
    // Dummy data for demonstration
    const aiServices = [
        {
            id: 1,
            title: "AI-Powered Recruitment Solutions",
            summary: "Leverage cutting-edge AI algorithms to streamline candidate sourcing, screening, and matching, significantly reducing time-to-hire and improving quality of fit.",
            icon: Brain, // Using the Lucide Icon component directly
            link: "/services/ai-recruitment"
        },
        {
            id: 2,
            title: "Predictive Analytics for Workforce Planning",
            summary: "Utilize AI-driven predictive models to forecast workforce needs, identify skill gaps, and optimize talent acquisition strategies for future growth.",
            icon: TrendingUp, // Using the Lucide Icon component directly
            link: "/services/predictive-analytics"
        },
        {
            id: 3,
            title: "Automated Candidate Engagement",
            summary: "Enhance candidate experience with AI-powered chatbots and automated communication tools, providing instant support and personalized interactions.",
            icon: MessageSquareText, // Using the Lucide Icon component directly
            link: "/services/automated-engagement"
        },
        {
            id: 4,
            title: "AI Consulting & Implementation",
            summary: "Our experts provide tailored AI consulting services, helping your organization integrate AI solutions seamlessly into existing workflows for maximum impact.",
            icon: Lightbulb, // Using the Lucide Icon component directly
            link: "/services/ai-consulting"
        },
    ];

    const aiInsights = [
        {
            id: 1,
            title: "The Ethical Considerations of AI in HR",
            date: "May 15, 2025",
            summary: "Explore the crucial ethical implications and best practices for responsibly deploying AI in human resources.",
            link: "/blog/ai-ethics-hr"
        },
        {
            id: 2,
            title: "How AI is Revolutionizing Talent Acquisition",
            date: "April 28, 2025",
            summary: "A deep dive into the transformative impact of artificial intelligence on the entire talent acquisition lifecycle.",
            link: "/blog/ai-talent-acquisition"
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar /> {/* Include your Navbar component */}
            <StickyHeader></StickyHeader>

            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Artificial Intelligence</h1>

                {/* Hero Section */}
                <section className="text-center mb-16 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Unlocking the Power of AI for Your Business</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                        At Demand Recruitment, we harness the transformative potential of Artificial Intelligence to optimize your recruitment processes, enhance workforce planning, and drive strategic growth. Discover how our AI solutions can give you a competitive edge.
                    </p>
                    <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Discuss Your AI Needs
                    </Link>
                </section>

                {/* Our AI Services Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Our AI-Driven Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {aiServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                                {/* Render the Lucide Icon component */}
                                <service.icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.summary}</p>
                                <Link href={service.link} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                                    Learn More &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Insights & Resources Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">AI Insights & Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {aiInsights.map((insight) => (
                            <div key={insight.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{insight.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{insight.date}</p>
                                <p className="text-gray-600 mb-4">{insight.summary}</p>
                                <Link href={insight.link} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                                    Read Article &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/blog?tag=ai" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                            View All AI Resources
                        </Link>
                    </div>
                </section>

                {/* Why Choose Us for AI (Optional Section) */}
                <section className="text-center bg-orange-100 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Partner with Us for AI?</h2>
                    <ul className="list-disc list-inside text-gray-700 text-left max-w-2xl mx-auto mb-6 space-y-2">
                        <li>Deep expertise in AI and machine learning applications in recruitment.</li>
                        <li>Customizable solutions tailored to your unique business needs.</li>
                        <li>Commitment to ethical AI practices and data privacy.</li>
                        <li>Proven track record of delivering measurable results and ROI.</li>
                    </ul>
                    <Link href="/about" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Learn More About Our Expertise
                    </Link>
                </section>
            </main>

            <Footer /> {/* Include your Footer component */}
        </div>
    );
};

export default ArtificialIntelligencePage;