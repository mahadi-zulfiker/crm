'use client';

import Link from 'next/link';
import {
    Clock,
    Globe,
    Users,
    Stethoscope,
    UserSearch,
    UserPlus,
    ShieldCheck,
    Handshake,
} from 'lucide-react';

const services = [
    { title: 'Temporary Staffing', icon: Clock, href: '/temporaryStaffing' },
    { title: 'International Recruitment', icon: Globe, href: '/InternationalRecruitment' },
    { title: 'Managed Service Programmes', icon: Users, href: '/managedServiceProgramme' },
    { title: 'Clinical Insourcing', icon: Stethoscope, href: '/clinicalInsourcing' },
    { title: 'Staff Bank', icon: UserSearch, href: '/staffBank' },
    { title: 'Recruitment Process Outsourcing', icon: UserPlus, href: '/recruitmentProcessOut' },
    { title: 'Occupational Health Services', icon: ShieldCheck, href: '/occupationalHealth' },
    { title: 'Workforce Consulting', icon: Handshake, href: '/workforceConsultingEmployee' },
];

const ServiceGrid = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-center text-gray-800 font-semibold mb-10">Explore Our Expertise</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {services.map(({ title, icon: Icon, href }) => (
                        <Link
                            key={title}
                            href={href}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center justify-center p-8">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-medium text-gray-700 text-center">{title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;