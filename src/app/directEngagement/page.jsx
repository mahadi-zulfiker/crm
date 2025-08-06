// pages/direct-engagement.js

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { FaPlayCircle, FaUserTie, FaChartLine, FaCogs, FaPhoneAlt, FaDatabase, FaUsers, FaHandshake, FaFileAlt } from 'react-icons/fa';

export default function DirectEngagement() {
    return (
        <>
            <Navbar />
            <Head>
                <title>Direct Engagement – Cut Temporary Staffing Costs Quickly & Effectively | Litmus Solutions</title>
                <meta name="description" content="Significantly reduce temporary staffing costs and engage directly with healthcare professionals with Litmus Solutions' Direct Engagement model." />
            </Head>

            <main className="text-gray-800">
                {/* Hero Section with Background Image */}
                <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                    {/* Content */}
                    <div className="relative max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold drop-shadow-lg">Direct Engagement</h1>
                        <p className="mt-4 text-xl drop-shadow-md">Cut Temporary Staffing Costs Quickly & Effectively</p>
                    </div>
                </section>

                {/* Introduction */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Direct Engagement?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                            <p>Direct Engagement allows healthcare providers to engage directly with temporary staff, cutting out third-party costs while maintaining full compliance with regulations.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                            <p>Our flexible and scalable approach ensures that you can reduce costs quickly and effectively while integrating seamlessly with your existing staffing strategy.</p>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Direct Engagement</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[ 
                                { icon: FaUsers, title: 'Cost Savings', desc: 'Reduce temporary staffing costs by up to 22%, without affecting operations or service delivery.' },
                                { icon: FaChartLine, title: 'Operational Efficiencies', desc: 'Streamline processes by outsourcing payroll and contract management, allowing your team to focus on priorities.' },
                                { icon: FaCogs, title: 'Rapid Implementation', desc: 'See cost savings within 8 weeks of implementation, with minimal disruption to your existing processes.' },
                                { icon: FaPhoneAlt, title: 'Seamless & Automated Process', desc: 'Automated vacancy release, contract management, compliance tracking, and timesheet submission—all in one platform.' },
                                { icon: FaDatabase, title: 'Enhanced Management & Reporting', desc: 'Gain real-time insights into bookings and a full audit trail with monthly MI analysis through our portal.' },
                                { icon: FaHandshake, title: 'Fully Compliant & Framework-Approved', desc: 'Our model is reviewed and available through various procurement frameworks to ensure full compliance.' },
                            ].map(({ icon: Icon, title, desc }, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
                                    <Icon className="text-3xl mx-auto text-gray-600" />
                                    <h3 className="font-semibold text-xl">{title}</h3>
                                    <p className="text-sm text-gray-600">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Explore Section */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Learn More About Direct Engagement</h2>
                        <p className="mb-10 text-lg text-gray-600">Find out how Direct Engagement can help your organization cut staffing costs and streamline your temporary workforce management.</p>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            {[ 
                                { text: 'Request a Case Study', icon: FaFileAlt },
                                { text: 'Watch Our Webinar on Direct Engagement', icon: FaPlayCircle }
                            ].map(({ text, icon: Icon }, idx) => (
                                <a key={idx} href="#" className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
                                    <Icon className="text-xl text-gray-700" />
                                    <span className="text-gray-800 font-medium">{text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="bg-gray-100 py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4 text-center">Let’s Talk About Direct Engagement!</h2>
                        <p className="text-center text-gray-600 mb-8">Request a call back and learn how Direct Engagement can reduce your temporary staffing costs and improve workforce efficiency.</p>
                        <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                            <div className="grid md:grid-cols-3 gap-4">
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded" />
                                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded" />
                            </div>
                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="text-sm">I consent to have Demand Recruitment Services Ltd store my submitted information for updates.</span>
                            </label>
                            <button type="submit" className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                                Request a Call Back
                            </button>
                            <p className="text-sm text-gray-600 text-center">Get in touch today and start saving on temporary staffing costs!</p>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
