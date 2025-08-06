// app/case-studies/page.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const CaseStudiesPage = () => {
    // Dummy case studies
    const caseStudies = [
        {
            id: 1,
            title: "Streamlining Recruitment for a Leading Tech Firm",
            industry: "Technology",
            challenge: "High volume hiring with strict technical requirements.",
            solution: "Implemented a custom applicant tracking system and specialized technical assessments.",
            result: "Reduced time-to-hire by 30% and improved candidate quality by 25%.",
            imageUrl: "/services/56.jpg",
            link: "/case-studies/tech-firm-recruitment"
        },
        {
            id: 2,
            title: "Optimizing Staffing for Healthcare Facilities",
            industry: "Healthcare",
            challenge: "Addressing critical staffing shortages and fluctuating demand.",
            solution: "Developed a flexible staffing model and rapid deployment protocols for medical professionals.",
            result: "Ensured 95% staffing coverage and enhanced patient care continuity.",
            imageUrl: "/services/med1.jpg",
            link: "/case-studies/healthcare-staffing"
        },
        {
            id: 3,
            title: "Enhancing Community Engagement Through Volunteer Programs",
            industry: "Non-Profit",
            challenge: "Recruiting and managing a diverse volunteer base for various community initiatives.",
            solution: "Launched a targeted volunteer recruitment campaign and implemented a robust volunteer management platform.",
            result: "Increased volunteer participation by 40% and expanded program reach within the community.",
            imageUrl: "/services/58.jpg",
            link: "/case-studies/community-volunteer-program"
        },
        {
            id: 4,
            title: "Facility Management Efficiency for Retail Chains",
            industry: "Retail",
            challenge: "Maintaining consistent facility standards across multiple retail locations.",
            solution: "Integrated smart facility management solutions and proactive maintenance schedules.",
            result: "Reduced operational costs by 15% and improved store uptime.",
            imageUrl: "/services/60.jpg",
            link: "/case-studies/retail-facility-management"
        },
    ];

    const logos = [
        "/clients/client1.png",
        "/clients/client2.png",
        "/clients/client3.png",
        "/clients/client4.png",
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Case Studies</h1>

                <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10">
                    Discover how Demand Recruitment Services has helped various organizations overcome their challenges and achieve success.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {caseStudies.map((study) => (
                        <div key={study.id} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col md:flex-row h-full">
                            <div className="md:w-1/3 w-full h-[260px] md:h-auto">
                                <img
                                    src={study.imageUrl}
                                    alt={study.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-between md:w-2/3">
                                <div>
                                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">{study.industry}</span>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{study.title}</h3>
                                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                        <li><strong className="text-teal-600">Challenge:</strong> {study.challenge}</li>
                                        <li><strong className="text-teal-600">Solution:</strong> {study.solution}</li>
                                        <li><strong className="text-teal-600">Outcome:</strong> {study.result}</li>
                                    </ul>
                                </div>

                                {/* Download Case Study Button */}
                                <div className="mt-4">
                                    <a
                                        href={`/downloads/case-study-${study.id}.pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-white bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-md text-sm font-medium transition"
                                    >
                                        📄 Download Case Study
                                    </a>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>

                {/* Client Logos */}
                <section className="bg-white py-10 rounded-xl shadow mb-16">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Trusted by Industry Leaders</h2>
                    <div className="flex flex-wrap justify-center items-center gap-6 px-4">
                        {logos.map((logo, index) => (
                            <Image key={index} src={logo} alt={`Client ${index + 1}`} width={100} height={50} className="object-contain grayscale hover:grayscale-0 transition duration-300" />
                        ))}
                    </div>
                </section>

                {/* CTA to Request Full Pack */}
                <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white text-center py-12 px-4 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Want to See More Success Stories?</h2>
                    <p className="mb-6 max-w-xl mx-auto">Request our full case study pack and explore how we’ve helped businesses across industries.</p>
                    <Link href="/contactUs">
                        <button className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                            Request Case Study Pack
                        </button>
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CaseStudiesPage;
