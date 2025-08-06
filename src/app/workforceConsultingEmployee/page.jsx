import React from 'react';
import Image from 'next/image';
import RequestInfoForm from '@/components/RequestInfoForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WorkforceConsultingPage = () => {
    return (
        <div className="bg-white text-gray-800">
            <Navbar />
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Workforce Consulting Services
                    </h1>
                    <p className="text-lg mt-5">Optimize Recruitment, Reduce Staffing Costs, and Improve Operational Efficiency</p>
                </div>
            </div>

            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expert Workforce Consulting</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            At Demand Recruitment Services Ltd, we provide expert Workforce Consulting to help organizations optimize recruitment, reduce staffing costs, and improve operational efficiency. Our team conducts in-depth workforce reviews, delivering actionable insights to enhance productivity, resource utilization, and recruitment strategies.
                        </p>
                    </div>
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/32.jpg" alt="Workforce Consulting" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/31.jpg" alt="Workforce Optimization" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Benefits of Workforce Consulting</h2>
                        <ul className="text-gray-700 list-disc ml-6 space-y-2">
                            <li>Reduce Staffing Costs – Control agency reliance and achieve up to 10% savings on overall staffing expenses.</li>
                            <li>Enhance Recruitment Efficiency – Streamline applicant tracking and onboarding, reducing time-to-hire.</li>
                            <li>Optimize e-Rostering – Improve shift allocation, standardize booking policies, and match workforce demand to activity levels.</li>
                            <li>Improve Workforce Productivity – Implement sustainable work patterns, ensuring high-quality service delivery.</li>
                            <li>Rapid Implementation – Immediate support for quick wins alongside long-term strategic workforce improvements.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Deliver Impact</h2>
                    <ul className="text-gray-700 list-disc ml-6 space-y-2">
                        <li>📊 Comprehensive Workforce Review – Detailed staffing analysis, identifying inefficiencies and cost-saving opportunities.</li>
                        <li>🔄 Process Optimization – Improved workflows, reducing recruitment bottlenecks and enhancing service quality.</li>
                        <li>💡 Strategic Implementation – Hands-on support to embed changes and drive long-term operational success.</li>
                    </ul>
                </div>
                <div className="relative rounded-md overflow-hidden shadow-md">
                    <Image src="/services/33.jpg" alt="Consulting in Action" width={500} height={350} className="w-full h-auto object-cover" />
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Workforce Consulting in Action</h2>
                    <p className="text-gray-700 mb-4 text-center">
                        A leading UK social care charity, employing 5,500+ staff, partnered with our team to redefine their recruitment strategy. Through process improvements, they achieved:
                    </p>
                    <ul className="text-gray-700 list-disc ml-6 space-y-2">
                        <li>✔ Faster Hiring – Reduced time-to-hire for support workers.</li>
                        <li>✔ Cost Savings – Lowered recruitment expenses through smarter workforce planning.</li>
                        <li>✔ Sustainable Growth – Established a scalable hiring model to maintain quality care delivery.</li>
                    </ul>
                </div>
            </section>

            <section className="bg-white py-12 px-6">
                <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-10 md:p-12 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
                    <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8 text-center">
                        Looking to optimize your workforce strategy? Contact Demand Recruitment Services Ltd today for a tailored workforce consulting solution that drives efficiency and cost savings.
                    </p>
                    <RequestInfoForm />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WorkforceConsultingPage;
