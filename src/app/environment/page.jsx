// app/environment/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// Import Lucide Icons relevant to environment, sustainability, and green practices
import {
    Leaf,            // Core symbol for environment, sustainability
    Globe,           // Global impact, planet
    Recycle,         // Circular economy, waste reduction
    Cloud,           // Clean air, climate
    Factory,         // Industry impact, green manufacturing
    ShieldCheck,     // Compliance, responsibility, safety
    HandHelping,     // Collaboration, support for clients
    TreeDeciduous    // Nature, biodiversity
} from 'lucide-react';

const EnvironmentPage = () => {
    // Dummy data for demonstration
    const environmentalCommitments = [
        {
            id: 1,
            title: "Sustainable Operations",
            summary: "Implementing eco-friendly practices across our own operations, from energy consumption to waste management.",
            icon: Factory, // Icon for operations/industry
        },
        {
            id: 2,
            title: "Carbon Footprint Reduction",
            summary: "Actively working to minimize our carbon emissions and supporting clients in their decarbonization journeys.",
            icon: Cloud, // Icon for carbon/atmosphere
        },
        {
            id: 3,
            title: "Resource Efficiency",
            summary: "Focusing on reducing water usage, promoting recycling, and optimizing resource consumption.",
            icon: Recycle, // Icon for recycling/efficiency
        },
        {
            id: 4,
            title: "Green Partnerships",
            summary: "Collaborating with eco-conscious suppliers and partners who share our vision for a sustainable future.",
            icon: HandHelping, // Icon for partnership/support
        },
    ];

    const environmentalServices = [
        {
            id: 1,
            title: "Environmental Impact Assessments",
            description: "Conducting thorough evaluations to understand and mitigate ecological footprints.",
            link: "/services/eia",
        },
        {
            id: 2,
            title: "Sustainability Consulting",
            description: "Advising businesses on integrating sustainable practices into their core strategies.",
            link: "/services/sustainability-consulting",
        },
        {
            id: 3,
            title: "Waste Management Optimization",
            description: "Developing efficient waste reduction, reuse, and recycling programs.",
            link: "/services/waste-management",
        },
        {
            id: 4,
            title: "Renewable Energy Transition Support",
            description: "Assisting organizations in adopting cleaner energy sources for their operations.",
            link: "/services/renewable-energy-transition",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar /> {/* Include your Navbar component */}

            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Commitment to the Environment</h1>

                {/* Hero Section */}
                <section className="text-center mb-16 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Pioneering a Sustainable Future</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                        At Demand Recruitment, we believe that environmental responsibility is not just a corporate duty, but a fundamental pillar for long-term success and a healthier planet. Our commitment extends beyond our operations, influencing how we advise our clients and contribute to a greener economy.
                    </p>
                    <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Partner for a Greener Tomorrow
                    </Link>
                </section>

                {/* Our Environmental Pillars Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Our Core Environmental Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {environmentalCommitments.map((commitment) => (
                            <div key={commitment.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                                <commitment.icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{commitment.title}</h3>
                                <p className="text-gray-600">{commitment.summary}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How We Help Clients (Environmental Services) Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">How We Support Environmental Stewardship for Our Clients</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {environmentalServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <Link href={service.link} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                                    Learn More &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits of Being Green (Optional) */}
                <section className="text-center bg-orange-100 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">The Advantages of Embracing Green Initiatives</h2>
                    <ul className="list-disc list-inside text-gray-700 text-left max-w-2xl mx-auto mb-6 space-y-2">
                        <li>Enhanced brand reputation and customer loyalty.</li>
                        <li>Reduced operational costs through efficiency gains.</li>
                        <li>Attraction and retention of top talent who value sustainability.</li>
                        <li>Compliance with evolving environmental regulations.</li>
                        <li>Contribution to a healthier planet for future generations.</li>
                    </ul>
                    <Link href="/reports/sustainability" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        View Our Latest Sustainability Report
                    </Link>
                </section>
            </main>

            <Footer /> {/* Include your Footer component */}
        </div>
    );
};

export default EnvironmentPage;