// app/net-zero-navigator-2025/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// Import Lucide Icons relevant to net-zero, environment, and progress
import {
    Globe,        // Global impact, environment
    Target,       // Goals, objectives
    Leaf,         // Sustainability, green
    BarChart2,    // Data, progress, analytics
    Rocket,       // Acceleration, launch
    CheckCircle,  // Success, verification
    Zap,          // Efficiency, energy
    Scale         // Balance, measurement, standards
} from 'lucide-react';

const NetZeroNavigator2025Page = () => {
    // Dummy data for demonstration
    const navigatorFeatures = [
        {
            id: 1,
            title: "Baseline Carbon Assessment",
            summary: "Comprehensive analysis of your current emissions across all scopes (1, 2, & 3) to establish your starting point.",
            icon: BarChart2, // Icon for data/assessment
            link: "/net-zero-navigator/baseline-assessment"
        },
        {
            id: 2,
            title: "Tailored Decarbonization Roadmaps",
            summary: "Custom-built strategies with actionable steps and timelines to achieve your net-zero targets by 2025.",
            icon: Target, // Icon for goals/roadmap
            link: "/net-zero-navigator/roadmaps"
        },
        {
            id: 3,
            title: "Renewable Energy Integration",
            summary: "Guidance and support for transitioning to 100% renewable energy sources, including solar, wind, and green power purchasing.",
            icon: Zap, // Icon for energy/efficiency
            link: "/net-zero-navigator/renewable-energy"
        },
        {
            id: 4,
            title: "Supply Chain Engagement",
            summary: "Tools and methodologies to work with your suppliers and reduce Scope 3 emissions across your entire value chain.",
            icon: Globe, // Icon for global/supply chain
            link: "/net-zero-navigator/supply-chain"
        },
        {
            id: 5,
            title: "Offsetting & Carbon Removal Strategies",
            summary: "Expert advice on selecting credible carbon offsetting projects and implementing carbon removal technologies for residual emissions.",
            icon: Leaf, // Icon for sustainability/offsets
            link: "/net-zero-navigator/offsetting"
        },
        {
            id: 6,
            title: "Compliance & Reporting Frameworks",
            summary: "Ensuring adherence to international standards and providing robust reporting for transparency and stakeholder trust.",
            icon: Scale, // Icon for compliance/standards
            link: "/net-zero-navigator/reporting"
        },
    ];

    const programBenefits = [
        {
            id: 1,
            title: "Accelerated Net-Zero Achievement",
            description: "Direct path to hit 2025 net-zero targets with proven methodologies.",
            icon: Rocket,
        },
        {
            id: 2,
            title: "Enhanced Brand Reputation",
            description: "Demonstrate genuine commitment to sustainability and attract conscious customers and talent.",
            icon: CheckCircle,
        },
        {
            id: 3,
            title: "Operational Cost Savings",
            description: "Identify efficiencies in energy consumption and waste reduction.",
            icon: Zap,
        },
        {
            id: 4,
            title: "Future-Proofed Business",
            description: "Navigate evolving regulations and investor demands with confidence.",
            icon: Globe,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar /> {/* Include your Navbar component */}

            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Net Zero Navigator 2025</h1>

                {/* Hero Section */}
                <section className="text-center mb-16 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Your Accelerated Path to a Sustainable Future</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                        The **Net Zero Navigator 2025** is our comprehensive program designed to guide organizations like yours in achieving ambitious net-zero emissions targets by the year 2025. With a focus on practical strategies and measurable outcomes, we help you transform your environmental impact into a competitive advantage.
                    </p>
                    <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Enroll in Net Zero Navigator 2025
                    </Link>
                </section>

                {/* Key Features/Modules Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Program Features & Modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {navigatorFeatures.map((feature) => (
                            <div key={feature.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                                <feature.icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 mb-4">{feature.summary}</p>
                                <Link href={feature.link} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                                    Learn More &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Net Zero Navigator 2025? Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Why Choose Net Zero Navigator 2025?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programBenefits.map((benefit) => (
                            <div key={benefit.id} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                                <benefit.icon className="w-10 h-10 text-orange-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action/Get Started */}
                <section className="text-center bg-gray-200 p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Join the Race to Net Zero!</h2>
                    <p className="text-gray-600 mb-6">
                        The clock is ticking. Act now to secure your organization's sustainable future and lead the way in environmental stewardship.
                    </p>
                    <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Get Started Today
                    </Link>
                </section>
            </main>

            <Footer /> {/* Include your Footer component */}
        </div>
    );
};

export default NetZeroNavigator2025Page;