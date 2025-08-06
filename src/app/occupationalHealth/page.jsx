import React from 'react';
import Image from 'next/image';
import RequestInfoForm from '@/components/RequestInfoForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OccupationalHealthPage = () => {
    return (
        <div className="bg-white text-gray-800">
            <Navbar />
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-900 to-gray-700 relative text-white py-24 text-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Occupational Health Services
                    </h1>
                    <p className="text-lg mt-5">Protecting Employee Health and Ensuring Compliance with Workplace Safety Regulations</p>
                </div>
            </div>

            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comprehensive Occupational Health Services</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            At Demand Recruitment Services Ltd, we provide a full range of Occupational Health (OH) solutions to help organizations protect employee health, reduce absenteeism, and maintain compliance with workplace safety regulations. Our services support businesses across all industries, including healthcare, construction, offshore sectors, and safety-critical environments.
                        </p>
                    </div>
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/med1.jpg" alt="Occupational Health Services" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="relative rounded-md overflow-hidden shadow-md">
                        <Image src="/services/med2.jpg" alt="Our Occupational Health Services" width={500} height={350} className="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Occupational Health Services</h2>
                        <ul className="text-gray-700 list-disc ml-6 space-y-2">
                            <li>Pre-Employment Screening – Ensure a safe and healthy workforce by assessing employees before they start.</li>
                            <li>Absence Management – Support managers in making evidence-based decisions regarding employee absences.</li>
                            <li>Return to Work Assessments – Safely transition employees back to work while ensuring compliance with employment laws.</li>
                            <li>Health Surveillance (HSE Compliance) – Identify and mitigate workplace health risks while ensuring compliance with HSE legislation.</li>
                            <li>Flu & Workplace Vaccinations – Reduce absenteeism and increase productivity with flu vaccinations for employees.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">Specialist Occupational Health Services</h2>
                    <ul className="text-gray-700 list-disc ml-6 space-y-4">
                        <li className="text-lg">
                            <span className="font-semibold">Safety Critical Medicals</span> – Comprehensive assessments for roles where employee health is critical for safety, including:
                            <ul className="list-inside list-disc ml-8 space-y-2">
                                <li>Asbestos, Radiation, Lead & Silica Medicals</li>
                                <li>Hand and Arm Vibration Syndrome (HAVS) Level 1-4</li>
                                <li>Respiratory & Skin Assessments</li>
                                <li>Audiometry & Noise Assessments</li>
                            </ul>
                        </li>
                        <li className="text-lg">
                            <span className="font-semibold">Offshore Medicals (OGUK Certified)</span> – Fitness-to-work assessments for offshore workers, including:
                            <ul className="list-inside list-disc ml-8 space-y-2">
                                <li>Fit-to-Train in Water, Confined Spaces & Emergency Response Training (ERT)</li>
                                <li>Drug & Alcohol Testing, Noise & Respiratory Health Surveillance</li>
                                <li>Bi-Deltoid Shoulder Measurement & Work-Related Vaccinations</li>
                            </ul>
                        </li>
                        <li className="text-lg">
                            <span className="font-semibold">Tele-Occupational Health Services</span> – Remote consultations via video or phone, ensuring convenience and full compliance with OGUK guidelines.
                        </li>
                    </ul>
                </div>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <Image src="/meddd111.jpg" alt="Specialist Occupational Health Services" width={500} height={350} className="w-full h-auto object-cover rounded-lg" />
                </div>
            </section>


            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Flu & Workplace Vaccinations</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Provide Flu Vaccinations for Employees?</h3>
                            <ul className="text-gray-700 list-disc ml-6 space-y-2">
                                <li>15% of the workforce gets the flu annually, leading to significant absenteeism.</li>
                                <li>Preventing flu cases could save the UK economy up to £28.9 million in lost productivity.</li>
                                <li>Limited vaccine availability makes workplace flu jabs an essential preventive measure.</li>
                            </ul>
                        </div>
                        <div className="relative rounded-md overflow-hidden shadow-md">
                            <Image src="/services/med1.jpg" alt="Flu Vaccinations" width={500} height={350} className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Health Surveillance: Ensuring Workplace Safety & Compliance</h2>
                    <ul className="text-gray-700 list-disc ml-6 space-y-2">
                        <li>Identify & prevent workplace health risks before they impact employees.</li>
                        <li>Improve communication on health-related workplace concerns.</li>
                        <li>Ensure compliance with UK Health & Safety Executive (HSE) guidelines.</li>
                        <li>Implement corrective measures to reduce work-related illnesses and injuries.</li>
                    </ul>
                </div>
            </section>

            <section className="py-12 px-6 max-w-6xl mx-auto text-center">
                <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8">
                    Our Occupational Health services are designed to help organizations maintain a healthy, compliant workforce while reducing absenteeism and ensuring workplace safety. Get in touch today to learn more about how we can support your business.
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

export default OccupationalHealthPage;
