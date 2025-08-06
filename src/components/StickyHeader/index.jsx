// components/StickyHeader.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/drWhiteLogo.png"; // Ensure this path is correct

const StickyHeader = ({ thresholdHeight }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isWhyDemandRecruitmentMenuOpen, setIsWhyDemandRecruitmentMenuOpen] = useState(false);

    let dropdownTimeout;

    const handleMouseEnter = (menu) => {
        clearTimeout(dropdownTimeout);
        if (menu === "services") {
            setIsServicesMenuOpen(true);
            setIsWhyDemandRecruitmentMenuOpen(false);
        } else if (menu === "whyDemandRecruitment") {
            setIsWhyDemandRecruitmentMenuOpen(true);
            setIsServicesMenuOpen(false);
        }
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsServicesMenuOpen(false);
            setIsWhyDemandRecruitmentMenuOpen(false);
        }, 200);
    };

    useEffect(() => {
        const handleScroll = () => {
            // Only show sticky header if scrolled past the original header's height
            if (thresholdHeight && window.scrollY > thresholdHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [thresholdHeight]); // Re-run if thresholdHeight changes

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-lg
                       transition-opacity duration-300 ease-in-out
                       ${isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/">
                    <Image src={logo} alt="LOGO" width={70} height={50} className="opacity-70" /> {/* Slightly smaller logo for sticky? */}
                </Link>

                {/* Minimal Main Menu for Sticky Header */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link href="/" className="px-3 py-2 rounded-md text-gray-300 hover:text-teal-600 transition font-semibold">Home</Link>

                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("services")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/services">
                            <button className="px-3 py-2 rounded-md hover:text-teal-600 transition flex items-center font-semibold text-gray-300 ">
                                <span>Our Services</span> <span className="ml-1 text-xs">▼</span>
                            </button>
                        </Link>
                        {isServicesMenuOpen && (
                            <div className="absolute bg-white text-gray-800 shadow-xl w-48 mt-2 p-4 rounded-lg z-[10000000] border border-gray-200">
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
                        <Link href="/why-demand-recruitment">
                            <button className="px-3 py-2 rounded-md text-gray-300 hover:text-teal-600 transition flex items-center font-semibold">
                                <span>Why Demand Recruitment</span> <span className="ml-1 text-xs">▼</span>
                            </button>
                        </Link>
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

                    <Link href="/insight" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold text-gray-300 ">Insights</Link>
                    <Link href="/allJobs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold text-gray-300 ">Find a Job</Link>
                    <Link href="/contactUs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold text-gray-300 ">Contact Us</Link>
                    <Link href="/aboutUs" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold text-gray-300 ">About Us</Link>
                    <Link href="/referAFriend" className="px-3 py-2 rounded-md hover:text-teal-600 transition font-semibold text-gray-300 ">Refer</Link>
                </div>
                {/* You'll need to decide if the mobile toggle should be here as well */}
            </div>
        </nav>
    );
};

export default StickyHeader;