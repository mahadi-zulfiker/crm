// pages/workforce-consulting.js

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { FaChartLine, FaUsers, FaClipboardList, FaRegCalendarAlt, FaCogs, FaHandshake,FaFileAlt,FaPlayCircle } from 'react-icons/fa';

export default function WorkforceConsulting() {
    return (
        <>
            <Navbar />
            <Head>
                <title>Workforce Consulting – Smarter Staffing, Greater Efficiency | Litmus Solutions</title>
                <meta name="description" content="Optimise recruitment, e-rostering, and resource management to enhance efficiency and reduce staffing costs with Litmus Solutions' Workforce Consulting services." />
            </Head>

            <main className="text-gray-800">
                {/* Hero Section with Background Image */}
                <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                    {/* Content */}
                    <div className="relative max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold drop-shadow-lg">Workforce Consulting</h1>
                        <p className="mt-4 text-xl drop-shadow-md">Smarter Staffing, Greater Efficiency</p>
                    </div>
                </section>

                {/* Introduction */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Workforce Consulting?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                            <p>In a rapidly evolving healthcare landscape, efficient recruitment and resource utilization are crucial. We help you streamline these processes for better results and cost efficiency.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                            <p>Our consulting services are data-driven, ensuring that we deliver practical solutions to help you manage staffing costs, improve recruitment efficiency, and optimize workforce utilization.</p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Workforce Consulting Services</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[ 
                                { icon: FaRegCalendarAlt, title: 'e-Rostering Reviews', desc: 'Ensure optimal shift patterns and resource allocation to boost workforce productivity and reduce operational strain.' },
                                { icon: FaUsers, title: 'Recruitment Efficiency Programmes', desc: 'Streamline your hiring process, increase headcount, and reduce the time-to-fill for critical roles.' },
                                { icon: FaClipboardList, title: 'Resource Optimisation Plans', desc: 'Align staffing levels with demand, decreasing reliance on temporary staff and improving continuity of care.' },
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

                {/* Benefits */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Demand Recruitment Services Ltd?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[ 
                                { icon: FaChartLine, title: 'Practical, Data-Driven Solutions', desc: 'We map existing processes and assess financial data to enhance workforce sustainability and long-term growth.' },
                                { icon: FaCogs, title: 'Fast, Measurable Cost Benefits', desc: 'Receive actionable insights within 6-8 weeks and start seeing cost savings and operational improvements quickly.' },
                                { icon: FaHandshake, title: 'Stakeholder Engagement & Collaboration', desc: 'We work closely with your internal teams to ensure alignment, accuracy, and full engagement throughout the process.' },
                                { icon: FaUsers, title: 'End-to-End Implementation Support', desc: 'We don’t just offer recommendations; we partner with you to ensure long-term performance improvements.' },
                            ].map(({ icon: Icon, title, desc }, idx) => (
                                <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow-lg text-center space-y-4">
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
                        <h2 className="text-4xl font-bold mb-6">Learn More About Workforce Consulting</h2>
                        <p className="mb-10 text-lg text-gray-600">Find out how our workforce consulting services can help you optimise staffing, improve resource utilization, and reduce costs across your organization.</p>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            {[ 
                                { text: 'Request a Case Study', icon: FaFileAlt },
                                { text: 'Watch Our Webinar on Workforce Consulting', icon: FaPlayCircle }
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
                        <h2 className="text-3xl font-bold mb-4 text-center">Let’s Talk About Workforce Consulting!</h2>
                        <p className="text-center text-gray-600 mb-8">Request a call back and learn how we can transform your workforce management strategy with smarter staffing solutions.</p>
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
                            <p className="text-sm text-gray-600 text-center">Get in touch today and start transforming your workforce strategy!</p>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
