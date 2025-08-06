// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import logo from "../../../public/drWhiteLogo.png";
import Link from "next/link";

const Navbar = ({ setHeaderHeight }) => { // Accept setHeaderHeight prop
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const userType = session?.user?.userType?.toLowerCase();
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isWhyDemandRecruitmentMenuOpen, setIsWhyDemandRecruitmentMenuOpen] = useState(false);
    const [isGetStartedOpen, setisGetStartedOpen] = useState(false);

    let dropdownTimeout;

    const handleMouseEnter = (menu) => {
        clearTimeout(dropdownTimeout);
        if (menu === "services") {
            setIsServicesMenuOpen(true);
            setIsWhyDemandRecruitmentMenuOpen(false);
        } else if (menu === "whyDemandRecruitment") {
            setIsWhyDemandRecruitmentMenuOpen(true);
            setIsServicesMenuOpen(false);
        } else if (menu === "getStarted") {
            setisGetStartedOpen(true);
        }
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsServicesMenuOpen(false);
            setIsWhyDemandRecruitmentMenuOpen(false);
            setisGetStartedOpen(false);
        }, 200);
    };

    const dashboardRoutes = {
        admin: "/dashboard/admin",
        vendor: "/dashboard/vendor",
        client: "/dashboard/client",
        employee: "/dashboard/employee",
    };

    const dashboardLink = userType ? dashboardRoutes[userType] || "/dashboard" : "/dashboard";

    useEffect(() => {
        console.log("User Type:", userType);
        console.log("Redirecting to:", dashboardLink);

        // Measure height of the entire Navbar after render
        const fullNavbar = document.getElementById('full-navbar');
        if (fullNavbar && setHeaderHeight) {
            setHeaderHeight(fullNavbar.offsetHeight);
        }

    }, [userType, setHeaderHeight]); // Depend on setHeaderHeight to re-measure if it changes

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const goToDashboard = () => {
        if (userType) {
            router.push(dashboardLink);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div id="full-navbar"> {/* Add ID for easy height measurement */}
            {/* Top Navbar */}
            <div className="bg-gray-700 text-white text-sm py-3 px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <div className="flex items-center space-x-1">
                        <FaEnvelope className="text-teal-500" />
                        <a
                            href="mailto:info@demandrecruitmentservices.co.uk"
                            className="text-white hover:text-teal-600"
                        >
                            info@demandrecruitmentservices.co.uk
                        </a>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaPhoneAlt className="text-teal-500" />
                        <a
                            href="tel:+442038761531"
                            className="text-white hover:text-teal-600"
                        >
                            +44 0203 876 1531
                        </a>
                    </div>
                </div>

                <div className="flex space-x-6">
                    {status === "authenticated" ? (
                        <>
                            <button onClick={goToDashboard} className="hover:text-yellow-400 transition">
                                Dashboard
                            </button>
                            <button onClick={handleSignOut} className="hover:text-yellow-400 transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signIn" className="hover:text-yellow-400 transition">
                                🔒 Login
                            </Link>
                            <Link href="/signUp" className="hover:text-yellow-400 transition">
                                📝 Sign Up
                            </Link>
                            <Link href="/requestEmployee" className="hover:text-yellow-400 transition">
                                Request Staff
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Main Navbar - with Logo, Employers, Employee, Environment, Social Value, Governance */}
            <nav className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/">
                        <Image src={logo} alt="LOGO" width={80} height={60} className="opacity-70" />
                    </Link>

                    {/* Desktop Navigation - New Menus & Employers/Employee */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/ourSupport" className="hover:text-teal-500 transition">Our Support</Link>
                        <Link href="/environment" className="hover:text-teal-500 transition">Environment</Link>
                        <Link href="/socialValue" className="hover:text-teal-500 transition">Social Value</Link>
                        <Link href="/governance" className="hover:text-teal-500 transition">Governance</Link>
                        <Link href="/employer" className="border-2 border-teal-600 bg-transparent hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition">Employers</Link>
                        <Link href="/employees" className="border-2 border-teal-600 bg-teal-600 hover:bg-teal-700 hover:border-teal-700 text-white px-6 py-2 rounded-lg transition">Employee</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button type="button" onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-2xl focus:outline-none">
                        <FaBars />
                    </button>
                </div>
            </nav>

            {/* Secondary Navbar - Moved Existing Menus */}
            <nav className="bg-gray-900 text-white py-3 border-t border-gray-600 shadow-lg">
                <div className="container mx-auto px-6 hidden lg:flex items-center space-x-4">
                    <Link href="/" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">Home</Link>

                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("services")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/services">
                            <button className="px-3 py-2 rounded-md hover:text-teal-600 transition flex items-center font-semibold">
                                <span>Our Services</span> <span className="ml-1 text-xs">▼</span>
                            </button>
                        </Link>
                        {isServicesMenuOpen && (
                            <div className="absolute bg-white text-gray-800 shadow-xl w-52 mt-2 p-4 rounded-lg z-[10000000] border border-gray-200">
                                <Link href="/recruitment" className="block py-2 hover:text-teal-600 transition">Recruitment Services</Link>
                                <Link href="/communityService" className="block py-2 hover:text-teal-600 transition">Community Services</Link>
                                <Link href="/facilityService" className="block py-2 hover:text-teal-600 transition">Facility Management</Link>
                            </div>
                        )}
                    </div>

                    {/* Why Demand Recruitment Mega Menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("whyDemandRecruitment")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p>
                            <button className="px-3 py-2 rounded-md hover:text-teal-600 transition flex items-center font-semibold">
                                <span>Why Demand Recruitment</span> <span className="ml-1 text-xs">▼</span>
                            </button>
                        </p>
                        {isWhyDemandRecruitmentMenuOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-6 rounded-lg z-[10000000] w-[600px] grid grid-cols-2 gap-6 border border-gray-200">
                                {/* Column 1 */}
                                <div>
                                    <h3 className="font-bold text-lg mb-3 text-gray-700">INSIGHTS & NEWS</h3>
                                    <Link href="/newsEvent" className="block py-1 hover:text-teal-600 transition">News & events</Link>
                                    <Link href="/caseStudies" className="block py-1 hover:text-teal-600 transition">Case studies</Link>
                                    <Link href="/insight" className="block py-1 hover:text-teal-600 transition">Insights & white papers</Link>
                                    <Link href="/podcastVideo" className="block py-1 hover:text-teal-600 transition">Podcasts & video</Link>
                                </div>
                                {/* Column 2 */}
                                <div>
                                    <h3 className="font-bold text-lg mb-3 text-gray-700">TECHNOLOGY & INNOVATION</h3>
                                    <Link href="/artificialIntelligence" className="block py-1 hover:text-teal-600 transition">Artificial Intelligence</Link>
                                    <Link href="/facilitiesTransformation" className="block py-1 hover:text-teal-600 transition">Facilities Transformation</Link>
                                    <Link href="/zeroNavigator" className="block py-1 hover:text-teal-600 transition">Net Zero Navigator 2025</Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/insight" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">Insights</Link>
                    <Link href="/allJobs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">Find a Job</Link>
                    <Link href="/contactUs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">Contact Us</Link>
                    <Link href="/aboutUs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">About Us</Link>
                    <Link href="/referAFriend" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold">Refer</Link>
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("getStarted")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p>
                            <button className="px-3 py-2 rounded-md hover:text-teal-600 transition flex items-center font-semibold">
                                <span>Get Started</span> <span className="ml-1 text-xs">▼</span>
                            </button>
                        </p>
                        {isGetStartedOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-6 rounded-lg z-[10000000] w-[200px] grid grid-cols-1 gap-6 border border-gray-200">
                                {/* Column 1 */}
                                <div>
                                    <Link href="/requestEmployee" className="block py-1 hover:text-teal-600 transition">Request Services</Link>
                                    <Link href="/signUp" className="block py-1 hover:text-teal-600 transition">Join Our Team</Link>
                                    <Link href="/contactUs" className="block py-1 hover:text-teal-600 transition">Subscribe</Link>
                                    <Link href="/insight" className="block py-1 hover:text-teal-600 transition">Login</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar (remains unchanged) */}
            {isSidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsSidebarOpen(false)} />
                    <div className="fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-40">
                        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold">Menu</h2>
                            <button type="button" onClick={() => setIsSidebarOpen(false)} className="text-2xl focus:outline-none">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-6 my-6 px-4">
                            {/* New Menus for Mobile (top section) */}
                            <Link href="/ourSupport" className="text-lg hover:text-teal-600 transition">Our Support</Link>
                            <Link href="/environment" className="text-lg hover:text-teal-600 transition">Environment</Link>
                            <Link href="/socialValue" className="text-lg hover:text-teal-600 transition">Social Value</Link>
                            <Link href="/governance" className="text-lg hover:text-teal-600 transition">Governance</Link>
                            <Link href="/employer" className="bg-teal-600 hover:bg-teal-600 text-white text-center px-6 py-2 rounded-lg transition">Employers</Link>
                            <Link href="/employees" className="bg-teal-600 hover:bg-teal-600 text-white text-center px-6 py-2 rounded-lg transition">Employee</Link>

                            <div className="border-t border-gray-700 w-full my-4"></div> {/* Divider */}


                            {/* Original Menus for Mobile (moved to secondary section) */}
                            <Link href="/" className="text-lg hover:text-teal-600 transition">Home</Link>

                            {/* Services Dropdown for Mobile */}
                            <div className="relative">
                                <button className="text-lg hover:text-teal-600 transition flex items-center">
                                    <span>Our Services</span> <span className="ml-1 text-xs">▼</span>
                                </button>
                                <div className="ml-4 mt-2 space-y-2">
                                    <Link href="/recruitment" className="block text-gray-300 hover:text-[#EA580C]">Recruitment Service</Link>
                                    <Link href="/communityService" className="block text-gray-300 hover:text-[#EA580C]">Community Services</Link>
                                    <Link href="/facilityService" className="block text-gray-300 hover:text-[#EA580C]">Facility Management</Link>
                                </div>
                            </div>

                            {/* Why Demand Recruitment Menu for Mobile (simplified for mobile) */}
                            <div className="relative">
                                <button className="text-lg hover:text-orange-400 transition flex items-center">
                                    <span>Why Demand Recruitment</span> <span className="ml-1 text-xs">▼</span>
                                </button>
                                <div className="ml-4 mt-2 space-y-2">
                                    <h4 className="font-semibold text-gray-400">INSIGHTS & NEWS</h4>
                                    <Link href="/newsEvent" className="block text-gray-300 hover:text-[#EA580C]">News & events</Link>
                                    <Link href="/caseStudies" className="block text-gray-300 hover:text-[#EA580C]">Case studies</Link>
                                    <Link href="/insight" className="block text-gray-300 hover:text-[#EA580C]">Insights & white papers</Link>
                                    <Link href="/podcastVideo" className="block text-gray-300 hover:text-[#EA580C]">Podcasts & video</Link>
                                    <h4 className="font-semibold text-gray-400 mt-4">TECHNOLOGY & INNOVATION</h4>
                                    <Link href="/artificialIntelligence" className="block text-gray-300 hover:text-[#EA580C]">Artificial Intelligence</Link>
                                    <Link href="/facilitiesTransformation" className="block text-gray-300 hover:text-[#EA580C]">Facilities Transformation</Link>
                                    <Link href="/zeroNavigator" className="block text-gray-300 hover:text-[#EA580C]">Net Zero Navigator 2025</Link>
                                </div>
                            </div>

                            <Link href="/allJobs" className="text-lg hover:text-orange-400 transition">Job Search</Link>
                            <Link href="/aboutUs" className="text-lg hover:text-orange-400 transition">About Us</Link>
                            <Link href="/contactUs" className="text-lg hover:text-orange-400 transition">Contact Us</Link>
                            <Link href="/referAFriend" className="text-lg hover:text-orange-400 transition">Refer</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;