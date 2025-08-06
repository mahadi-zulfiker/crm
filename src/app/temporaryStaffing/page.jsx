import React from 'react';
import Image from 'next/image';
import RequestInfoForm from '@/components/RequestInfoForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TemporaryStaffingPage = () => {
    return (
        <div className="bg-white text-gray-800">
            <Navbar />
            {/* Your Original Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Temporary Staffing
                    </h1>
                    <p className="text-lg mt-5">Quality healthcare professionals with 24/7 support</p>
                </div>
            </div>

            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Temporary Staffing Solutions</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            As a trusted provider of temporary staffing solutions, Demand Recruitment Services Ltd delivers a consistent supply of high-quality healthcare professionals to meet the evolving needs of our clients.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We support NHS Trusts, Health Boards, and private sector health and social care providers, ensuring seamless workforce solutions through our extensive recruitment network.
                        </p>
                    </div>
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/1.jpg" alt="Temporary Staffing" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/2.jpg" alt="Clinical Governance" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Independent Clinical Governance</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our independent Clinical Governance service ensures that all safeguarding concerns and compliance matters related to our staff placements are effectively managed and communicated.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We offer free CPD-accredited courses in partnership with leading healthcare organizations to ensure our professionals remain at the forefront of industry standards.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Capacity Solutions</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        To assist with seasonal demand fluctuations, our recruitment teams source professionals for specialized capacity projects.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        These offer a cost-effective solution for increasing workforce levels without off-framework agency staff, maintaining continuity of care and budget efficiency.
                    </p>
                </div>
                <div className="relative rounded-md overflow-hidden shadow-md">
                    <Image src="/services/3.jpg" alt="Capacity Solutions" width={500} height={350} className="w-full h-auto object-cover" />
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">At a Glance – Workforce Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Doctors</h3>
                            <p className="text-gray-700 leading-relaxed">A vast network of locum doctors across all specialties and grades.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nurses</h3>
                            <p className="text-gray-700 leading-relaxed">Specialists in critical care, emergency medicine, and community health.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Allied Health Professionals (AHPs)</h3>
                            <p className="text-gray-700 leading-relaxed">Physiotherapists, radiographers, and more.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Social Care Staff</h3>
                            <p className="text-gray-700 leading-relaxed">Care assistants, support workers, and social care professionals.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Specialist Mental Health Staff</h3>
                            <p className="text-gray-700 leading-relaxed">Mental health nurses, support workers, and therapists.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 max-w-6xl mx-auto text-center">
                <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8">
                    At Demand Recruitment Services Ltd, we are committed to providing flexible, reliable, and fully compliant workforce solutions that help healthcare organizations maintain high standards of care, even in times of peak demand.
                </p>
            </section>

            <section className="bg-white py-12 px-6">
                <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg p-10 md:p-12 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Request More Information</h2>
                    <RequestInfoForm />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TemporaryStaffingPage;