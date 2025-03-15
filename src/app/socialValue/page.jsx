import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const SocialValue = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Our Social Value
                    </h1>
                    <p className="text-lg text-white mt-5">
                        We are committed to creating a positive impact on society, the environment, and the communities we serve.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-6 py-16 animate__animated animate__fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Sustainability Efforts */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-green-600"
                        data-aos="fade-up"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sustainability Efforts</h2>
                        <p className="text-gray-600 mb-4">
                            We are committed to minimizing our environmental footprint. From sustainable sourcing to reducing waste, we’re working towards a greener future.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Zero Waste Packaging</li>
                            <li>Carbon Footprint Reduction</li>
                            <li>Energy-Efficient Practices</li>
                        </ul>
                    </div>

                    {/* Community Engagement */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-blue-600"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community Engagement</h2>
                        <p className="text-gray-600 mb-4">
                            We believe in empowering communities. Our initiatives are designed to support local programs, promote education, and foster social well-being.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Supporting Local Charities</li>
                            <li>Educational Outreach Programs</li>
                            <li>Employee Volunteer Opportunities</li>
                        </ul>
                    </div>

                    {/* Ethical Sourcing */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-yellow-600"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ethical Sourcing</h2>
                        <p className="text-gray-600 mb-4">
                            We are committed to sourcing materials ethically. We work with suppliers who share our values and prioritize fairness, transparency, and sustainability.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Fair Trade Certified Partners</li>
                            <li>Transparency in Supply Chains</li>
                            <li>Supporting Small Producers</li>
                        </ul>
                    </div>
                </div>

                {/* Additional Social Impact Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {/* Health & Wellness Initiatives */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-pink-600"
                        data-aos="fade-up"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health & Wellness Initiatives</h2>
                        <p className="text-gray-600 mb-4">
                            Our focus extends to the well-being of our employees and the broader community. We’re dedicated to promoting healthy living and mental health support.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Workplace Wellness Programs</li>
                            <li>Mental Health Support</li>
                            <li>Healthy Lifestyle Resources</li>
                        </ul>
                    </div>

                    {/* Diversity & Inclusion */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-purple-600"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Diversity & Inclusion</h2>
                        <p className="text-gray-600 mb-4">
                            We are committed to fostering a diverse and inclusive environment. Our focus is on creating a workplace where everyone feels valued and respected.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Equal Opportunities for All</li>
                            <li>Inclusive Hiring Practices</li>
                            <li>Employee Resource Groups</li>
                        </ul>
                    </div>

                    {/* Social Innovation */}
                    <div
                        className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-teal-600"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Social Innovation</h2>
                        <p className="text-gray-600 mb-4">
                            We’re dedicated to developing innovative solutions that address global challenges. From technology to community-driven solutions, we strive for impactful change.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Supporting Tech for Good Projects</li>
                            <li>Collaborating with Nonprofits</li>
                            <li>Innovative Solutions for Sustainability</li>
                        </ul>
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div
                    className="bg-gray-100 p-12 mt-16 rounded-xl"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Join Us in Making a Difference</h2>
                    <p className="text-center text-lg text-gray-600 mb-6">
                        Together, we can create lasting change. Learn more about how you can contribute to our mission of making the world a better place.
                    </p>
                    <div className="text-center">
                        <a
                            href="#"
                            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
                        >
                            Get Involved
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SocialValue;
