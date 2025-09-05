// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt, FaDashcube } from "react-icons/fa";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import Swal from "sweetalert2";
import logo from "../../../public/drWhiteLogo.png";
import Link from "next/link";

const Navbar = ({ setHeaderHeight }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isWhyDemandRecruitmentMenuOpen, setIsWhyDemandRecruitmentMenuOpen] = useState(false);
    const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const router = useRouter();
    const { data: session, status } = useSession();
    const { show: showLoading, hide: hideLoading } = useLoading();
    const [justLoggedOut, setJustLoggedOut] = useState(false);
    const userType = session?.user?.userType?.toLowerCase();

    let dropdownTimeout;

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = isMobile ? 10 : 20;
            setIsScrolled(window.scrollY > scrollThreshold);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Handle navbar height measurement
    useEffect(() => {
        const fullNavbar = document.getElementById('full-navbar');
        if (fullNavbar && setHeaderHeight) {
            setHeaderHeight(fullNavbar.offsetHeight);
        }
    }, [setHeaderHeight, isScrolled]);

    // Ensure UI responds instantly on logout and resets appropriately
    useEffect(() => {
        if (status !== "authenticated") {
            setJustLoggedOut(false);
        }
    }, [status]);

    const handleMouseEnter = (menu) => {
        clearTimeout(dropdownTimeout);
        if (menu === "services") {
            setIsServicesMenuOpen(true);
            setIsWhyDemandRecruitmentMenuOpen(false);
            setIsGetStartedOpen(false);
        } else if (menu === "whyDemandRecruitment") {
            setIsWhyDemandRecruitmentMenuOpen(true);
            setIsServicesMenuOpen(false);
            setIsGetStartedOpen(false);
        } else if (menu === "getStarted") {
            setIsGetStartedOpen(true);
            setIsServicesMenuOpen(false);
            setIsWhyDemandRecruitmentMenuOpen(false);
        }
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsServicesMenuOpen(false);
            setIsWhyDemandRecruitmentMenuOpen(false);
            setIsGetStartedOpen(false);
        }, 150);
    };

    const dashboardRoutes = {
        admin: "/dashboard/admin",
        vendor: "/dashboard/vendor",
        client: "/dashboard/client",
        employee: "/dashboard/employee",
    };

    const dashboardLink = userType ? dashboardRoutes[userType] || "/dashboard" : "/dashboard";
    const isAuthenticated = status === "authenticated" && !justLoggedOut;

    const handleSignOut = async () => {
        const content = `
            <div class=\"flex items-center gap-3\">
                <div class=\"flex h-10 w-10 items-center justify-center rounded-full bg-teal-100\">
                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"h-6 w-6 text-teal-700\">
                        <path fill-rule=\"evenodd\" d=\"M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.761 9.761 0 0 0 12 2.25ZM10.28 9.22a.75.75 0 0 1 1.06 0L12 9.879l.66-.659a.75.75 0 1 1 1.06 1.06l-.659.66.659.66a.75.75 0 1 1-1.06 1.06L12 12.001l-.66.659a.75.75 0 1 1-1.06-1.06l.659-.66-.659-.66a.75.75 0 0 1 0-1.06Z\" clip-rule=\"evenodd\" />
                    </svg>
                </div>
                <div class=\"text-left\">
                    <div class=\"text-base md:text-lg font-semibold text-gray-800\">Logout?</div>
                    <div class=\"text-xs md:text-sm text-gray-500\">Are you sure you want to log out?</div>
                </div>
            </div>
        `;

        const result = await Swal.fire({
            html: content,
            backdrop: true,
            showCancelButton: true,
            focusConfirm: false,
            buttonsStyling: false,
            reverseButtons: true,
            allowOutsideClick: true,
            customClass: {
                popup: "rounded-2xl shadow-2xl border border-gray-200 w-[92%] max-w-sm md:max-w-md",
                actions: "flex gap-3 px-6 pb-6 pt-2",
                htmlContainer: "px-6 pt-6",
                confirmButton: "bg-gradient-to-r from-teal-600 to-teal-500 text-white px-5 py-2 rounded-lg hover:from-teal-700 hover:to-teal-600 text-sm md:text-base",
                cancelButton: "bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base",
            },
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
        });
        if (!result.isConfirmed) return;
        try {
            setJustLoggedOut(true); // instant UI update
            closeMobileMenu();
            showLoading();
            await signOut({ redirect: false });
            hideLoading();
            router.replace("/signIn");
        } catch (error) {
            console.error("Logout failed", error);
            hideLoading();
        }
    };

    const goToDashboard = () => {
        if (userType) {
            router.push(dashboardLink);
        } else {
            router.push("/dashboard");
        }
    };

    const closeMobileMenu = () => {
        setIsSidebarOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <div id="full-navbar" className={`relative z-50 ${isMobile ? 'sticky top-0' : ''}`}>
            {/* Top Contact Bar */}
            <div className={`bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white text-sm py-2 px-4 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'} ${isMobile && isScrolled ? 'hidden' : ''}`}>
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div className="flex items-center space-x-2 group cursor-pointer">
                            <FaEnvelope className="text-teal-400 group-hover:text-teal-300 transition-all duration-300 group-hover:scale-110" />
                            <a
                                href="mailto:info@demandrecruitmentservices.co.uk"
                                className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-xs sm:text-sm group-hover:underline"
                            >
                                info@demandrecruitmentservices.co.uk
                            </a>
                        </div>
                        <div className="flex items-center space-x-2 group cursor-pointer">
                            <FaPhoneAlt className="text-teal-400 group-hover:text-teal-300 transition-all duration-300 group-hover:scale-110" />
                            <a
                                href="tel:+442038761531"
                                className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-xs sm:text-sm group-hover:underline"
                            >
                                +44 0203 876 1531
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button 
                                    onClick={goToDashboard} 
                                    className="flex items-center space-x-1 text-gray-200 hover:text-teal-300 transition-all duration-300 group bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md hover:shadow-lg"
                                >
                                    <FaDashcube className="text-xs group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-xs sm:text-sm font-medium">Dashboard</span>
                                </button>
                                <button 
                                    onClick={handleSignOut} 
                                    className="flex items-center space-x-1 text-gray-200 hover:text-red-400 transition-all duration-300 group bg-gray-700 hover:bg-red-600 px-3 py-1 rounded-md hover:shadow-lg"
                                >
                                    <FaSignOutAlt className="text-xs group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-xs sm:text-sm font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/signIn" className="flex items-center space-x-1 text-gray-200 hover:text-teal-300 transition-all duration-300 group bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md hover:shadow-lg">
                                    <FaUser className="text-xs group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-xs sm:text-sm font-medium">Login</span>
                                </Link>
                                <Link href="/signUp" className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-4 py-1 rounded-md text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium">
                                    Sign Up
                                </Link>
                                <Link href="/requestEmployee" className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-xs sm:text-sm font-medium hover:underline">
                                    Request Staff
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className={`bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-lg'} ${isMobile ? 'sticky top-0 z-50' : ''}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <Image 
                                src={logo} 
                                alt="Demand Recruitment Services" 
                                width={isScrolled ? 70 : 80} 
                                height={isScrolled ? 50 : 60} 
                                className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg" 
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link href="/ourSupport" className="relative text-gray-200 hover:text-teal-400 transition-all duration-300 font-medium group">
                                Our Support
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="/environment" className="relative text-gray-200 hover:text-teal-400 transition-all duration-300 font-medium group">
                                Environment
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="/socialValue" className="relative text-gray-200 hover:text-teal-400 transition-all duration-300 font-medium group">
                                Social Value
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="/governance" className="relative text-gray-200 hover:text-teal-400 transition-all duration-300 font-medium group">
                                Governance
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            
                            <div className="flex items-center space-x-3">
                                <Link href="/employer" className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 px-6 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 transform">
                                    Employers
                                </Link>
                                <Link href="/employees" className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-gray-900 px-6 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 transform">
                                    Employee
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            type="button" 
                            onClick={() => setIsSidebarOpen(true)} 
                            className="lg:hidden p-2 rounded-md text-gray-200 hover:text-teal-400 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                        >
                            <FaBars className="text-xl" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation Bar - Hidden on Mobile */}
            <nav className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg ${isMobile ? 'hidden' : ''}`}>
                <div className="container mx-auto px-4">
                    <div className="hidden lg:flex items-center justify-center space-x-8 py-3">
                        <Link href="/" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">Home</Link>

                        {/* Services Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter("services")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform">
                                <Link href="/services" className="flex items-center space-x-1">
                                    <span>Our Services</span>
                                    <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                                </Link>
                            </button>
                            {isServicesMenuOpen && (
                                <div className="absolute top-full left-0 bg-white text-gray-800 shadow-2xl w-64 mt-2 p-4 rounded-lg z-50 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                                    <div className="space-y-2">
                                        <Link href="/recruitment" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Recruitment Services</div>
                                            <div className="text-xs text-gray-500">Find the perfect talent</div>
                                        </Link>
                                        <Link href="/communityService" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Community Services</div>
                                            <div className="text-xs text-gray-500">Supporting local communities</div>
                                        </Link>
                                        <Link href="/facilityService" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Facility Management</div>
                                            <div className="text-xs text-gray-500">Comprehensive facility solutions</div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Why Demand Recruitment Mega Menu */}
                        <div
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter("whyDemandRecruitment")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/whyDemand" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform">
                                <span>Why Demand Recruitment</span>
                                <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                            </Link>
                            {isWhyDemandRecruitmentMenuOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-8 rounded-lg z-50 w-[700px] grid grid-cols-2 gap-8 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-gray-700 border-b border-gray-200 pb-2">INSIGHTS & NEWS</h3>
                                        <div className="space-y-3">
                                            <Link href="/newsEvent" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">News & Events</Link>
                                            <Link href="/caseStudies" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Case Studies</Link>
                                            <Link href="/insight" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Insights & White Papers</Link>
                                            <Link href="/podcastVideo" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Podcasts & Video</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-gray-700 border-b border-gray-200 pb-2">TECHNOLOGY & INNOVATION</h3>
                                        <div className="space-y-3">
                                            <Link href="/artificialIntelligence" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Artificial Intelligence</Link>
                                            <Link href="/facilitiesTransformation" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Facilities Transformation</Link>
                                            <Link href="/zeroNavigator" className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Net Zero Navigator 2025</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/insight" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">Insights</Link>
                        <Link href="/allJobs" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">Find a Job</Link>
                        <Link href="/contactUs" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">Contact Us</Link>
                        <Link href="/aboutUs" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">About Us</Link>
                        <Link href="/referAFriend" className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium hover:scale-105 transform">Refer</Link>

                        {/* Get Started Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter("getStarted")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="px-3 py-2 rounded-md hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform">
                                <span>Get Started</span>
                                <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                            </button>
                            {isGetStartedOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-4 rounded-lg z-50 w-48 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                                    <div className="space-y-2">
                                        <Link href="/requestEmployee" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Request Services</div>
                                        </Link>
                                        <Link href="/signUp" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Join Our Team</div>
                                        </Link>
                                        <Link href="/contactUs" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Subscribe</div>
                                        </Link>
                                        <Link href="/insight" className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform">
                                            <div className="font-semibold text-gray-800">Login</div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300" 
                        onClick={closeMobileMenu} 
                    />
                    <div className="fixed top-0 left-0 h-full w-80 bg-white text-gray-800 transform transition-transform duration-300 z-50 shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                            <div className="flex items-center space-x-3">
                                <Image src={logo} alt="Logo" width={40} height={30} className="transition-all duration-300 hover:scale-110" />
                                <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                            </div>
                            <button 
                                type="button" 
                                onClick={closeMobileMenu} 
                                className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                            >
                                <FaTimes className="text-xl text-gray-600" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto py-6 px-6">
                                <div className="space-y-6">
                                    {/* Primary Navigation */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Main Navigation</h3>
                                        <Link href="/ourSupport" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Our Support</Link>
                                        <Link href="/environment" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Environment</Link>
                                        <Link href="/socialValue" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Social Value</Link>
                                        <Link href="/governance" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Governance</Link>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</h3>
                                        <Link href="/employer" className="block w-full text-center text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 hover:scale-105 transform hover:shadow-lg">
                                            Employers
                                        </Link>
                                        <Link href="/employees" className="block w-full text-center text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 transform hover:shadow-lg">
                                            Employee
                                        </Link>
                                    </div>

                                    {/* Services Section */}
                                    <div className="space-y-3">
                                        <Link href="/services" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Services</Link>
                                        <Link href="/" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Home</Link>
                                        <Link href="/recruitment" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Recruitment Services</Link>
                                        <Link href="/communityService" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Community Services</Link>
                                        <Link href="/facilityService" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Facility Management</Link>
                                    </div>

                                    {/* Why Demand Recruitment */}
                                    <div className="space-y-3">
                                        <Link href="/whyDemand" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Why Demand Recruitment</Link>
                                        <div className="pl-4 space-y-2">
                                            <h4 className="text-xs font-medium text-gray-400">INSIGHTS & NEWS</h4>
                                            <Link href="/newsEvent" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">News & Events</Link>
                                            <Link href="/caseStudies" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Case Studies</Link>
                                            <Link href="/insight" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Insights & White Papers</Link>
                                            <Link href="/podcastVideo" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Podcasts & Video</Link>
                                            
                                            <h4 className="text-xs font-medium text-gray-400 mt-4">TECHNOLOGY & INNOVATION</h4>
                                            <Link href="/artificialIntelligence" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Artificial Intelligence</Link>
                                            <Link href="/facilitiesTransformation" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Facilities Transformation</Link>
                                            <Link href="/zeroNavigator" className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform">Net Zero Navigator 2025</Link>
                                        </div>
                                    </div>

                                    {/* Other Links */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">More</h3>
                                        <Link href="/allJobs" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Find a Job</Link>
                                        <Link href="/aboutUs" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">About Us</Link>
                                        <Link href="/contactUs" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Contact Us</Link>
                                        <Link href="/referAFriend" className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform">Refer</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;