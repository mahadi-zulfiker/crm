// app/governance/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// Import Lucide Icons relevant to governance, ethics, compliance
import {
    Scale,           // Justice, balance, fairness, law
    ShieldCheck,     // Security, compliance, integrity
    ClipboardCheck,  // Policy, audit, checklist
    Users,           // Stakeholders, leadership, board
    Briefcase,       // Corporate, business
    Lock,            // Security, data protection
    FileText,        // Documentation, reports
    BellRing         // Whistleblower, alerts, ethics hotline
} from 'lucide-react';

const GovernancePage = () => {
    // Dummy data for demonstration
    const governancePillars = [
        {
            id: 1,
            title: "Ethical Conduct & Integrity",
            summary: "Upholding the highest standards of ethics and integrity in all business dealings and decision-making.",
            icon: ShieldCheck, // Icon for integrity/ethics
        },
        {
            id: 2,
            title: "Transparency & Accountability",
            summary: "Committing to open communication and taking responsibility for our actions and their impact.",
            icon: FileText, // Icon for transparency/reporting
        },
        {
            id: 3,
            title: "Regulatory Compliance",
            summary: "Ensuring strict adherence to all applicable laws, regulations, and industry standards.",
            icon: ClipboardCheck, // Icon for compliance/rules
        },
        {
            id: 4,
            title: "Risk Management",
            summary: "Proactively identifying, assessing, and mitigating risks to protect our stakeholders and assets.",
            icon: Lock, // Icon for security/risk management
        },
        {
            id: 5,
            title: "Stakeholder Engagement",
            summary: "Fostering strong relationships and open dialogue with all stakeholders, including employees, clients, and investors.",
            icon: Users, // Icon for stakeholders
        },
    ];

    const governanceResources = [
        {
            id: 1,
            title: "Code of Conduct",
            description: "Our guiding principles for ethical behavior and professional standards.",
            link: "/governance/code-of-conduct.pdf", // Placeholder PDF link
        },
        {
            id: 2,
            title: "Anti-Bribery & Corruption Policy",
            description: "Our firm stance against bribery and corruption in all its forms.",
            link: "/governance/anti-bribery-policy.pdf", // Placeholder PDF link
        },
        {
            id: 3,
            title: "Data Privacy Policy",
            description: "Details on how we collect, use, and protect personal data.",
            link: "/privacy-policy",
        },
        {
            id: 4,
            title: "Whistleblower Policy",
            description: "Our commitment to a safe environment for reporting concerns without fear of retaliation.",
            link: "/governance/whistleblower-policy",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar /> {/* Include your Navbar component */}

            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Corporate Governance</h1>

                {/* Hero Section */}
                <section className="text-center mb-16 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Building Trust Through Responsible Leadership</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                        At Demand Recruitment, robust corporate governance is fundamental to our success and reputation. We are committed to maintaining the highest standards of integrity, transparency, and accountability across all aspects of our operations, ensuring long-term value creation for our stakeholders.
                    </p>
                    <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        Learn More About Our Values
                    </Link>
                </section>

                {/* Our Governance Pillars Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Our Core Governance Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {governancePillars.map((pillar) => (
                            <div key={pillar.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                                <pillar.icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pillar.title}</h3>
                                <p className="text-gray-600">{pillar.summary}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Key Policies & Resources Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Key Policies & Governance Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {governanceResources.map((resource) => (
                            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                                <p className="text-gray-600 mb-4">{resource.description}</p>
                                <a
                                    href={resource.link}
                                    target={resource.link.endsWith(".pdf") ? "_blank" : "_self"} // Open PDFs in new tab
                                    rel={resource.link.endsWith(".pdf") ? "noopener noreferrer" : ""}
                                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                                >
                                    {resource.link.endsWith(".pdf") ? "Download Policy" : "View Policy"} &rarr;
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Report a Concern / Ethics Hotline Section */}
                <section className="text-center bg-gray-200 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Report a Concern</h2>
                    <p className="text-gray-600 mb-6">
                        We encourage stakeholders to report any concerns regarding ethical conduct or compliance. Our whistleblower policy ensures a safe and confidential reporting mechanism.
                    </p>
                    <Link href="/governance/report-concern" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
                        <span className="flex items-center justify-center">
                            <BellRing className="w-5 h-5 mr-2" /> Report a Concern
                        </span>
                    </Link>
                </section>
            </main>

            <Footer /> {/* Include your Footer component */}
        </div>
    );
};

export default GovernancePage;