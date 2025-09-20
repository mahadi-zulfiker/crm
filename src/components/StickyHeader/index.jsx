// components/StickyHeader.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../public/drWhiteLogo.png";

const StickyHeader = ({ thresholdHeight }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isWhyDemandRecruitmentMenuOpen, setIsWhyDemandRecruitmentMenuOpen] =
    useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  let dropdownTimeout;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky header on desktop
      if (isMobile) {
        setIsVisible(false);
        return;
      }

      const scrollY = window.scrollY;
      const shouldShow = scrollY > (thresholdHeight || 100);
      setIsVisible(shouldShow);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [thresholdHeight, isMobile]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Sticky Header - Desktop Only */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl backdrop-blur-sm
                           transition-all duration-300 ease-in-out transform
                           ${
                             isVisible
                               ? "opacity-100 visible translate-y-0"
                               : "opacity-0 invisible -translate-y-full pointer-events-none"
                           }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src={logo}
                alt="Demand Recruitment Services"
                width={60}
                height={40}
                className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
              <Link
                href="/"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-2 xs:px-3 py-2 rounded-md text-white hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform text-sm 2xl:text-base whitespace-nowrap">
                  <Link href="/services" className="flex items-center space-x-1">
                    <span>Our Services</span>
                    <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                </button>
                {isServicesMenuOpen && (
                  <div className="absolute top-full left-0 bg-white text-gray-800 shadow-2xl w-56 mt-2 p-4 rounded-lg z-50 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Link
                        href="/recruitment"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Recruitment Services
                        </div>
                        <div className="text-xs text-gray-500">
                          Find the perfect talent
                        </div>
                      </Link>
                      <Link
                        href="/communityService"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Community Services
                        </div>
                        <div className="text-xs text-gray-500">
                          Supporting local communities
                        </div>
                      </Link>
                      <Link
                        href="/facilityService"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Facility Management
                        </div>
                        <div className="text-xs text-gray-500">
                          Comprehensive facility solutions
                        </div>
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
                <Link href="/whyDemand" className="px-2 xs:px-3 py-2 rounded-md text-white hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform text-sm 2xl:text-base whitespace-nowrap">
                  <span>Why Demand Recruitment</span>
                  <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                {isWhyDemandRecruitmentMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-6 rounded-lg z-50 w-[600px] grid grid-cols-2 gap-6 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-gray-700 border-b border-gray-200 pb-2">
                        INSIGHTS & NEWS
                      </h3>
                      <div className="space-y-3">
                        <Link
                          href="/newsEvent"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          News & Events
                        </Link>
                        <Link
                          href="/caseStudies"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Case Studies
                        </Link>
                        <Link
                          href="/insight"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Insights & White Papers
                        </Link>
                        <Link
                          href="/podcastVideo"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Podcasts & Video
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-gray-700 border-b border-gray-200 pb-2">
                        TECHNOLOGY & INNOVATION
                      </h3>
                      <div className="space-y-3">
                        <Link
                          href="/artificialIntelligence"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Artificial Intelligence
                        </Link>
                        <Link
                          href="/facilitiesTransformation"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Facilities Transformation
                        </Link>
                        <Link
                          href="/zeroNavigator"
                          className="block py-2 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                        >
                          Net Zero Navigator 2025
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/insight"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                Insights
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/allJobs"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                Find a Job
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contactUs"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/aboutUs"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/referAFriend"
                className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium group text-sm 2xl:text-base whitespace-nowrap"
              >
                Refer
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Get Started Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter("getStarted")}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-2 xs:px-3 py-2 rounded-md text-white hover:text-teal-400 hover:bg-gray-800 transition-all duration-300 font-medium flex items-center space-x-1 group-hover:scale-105 transform text-sm 2xl:text-base whitespace-nowrap">
                  <span>Get Started</span>
                  <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {isGetStartedOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl mt-2 p-4 rounded-lg z-50 w-48 border border-gray-200 transform opacity-100 scale-100 transition-all duration-300 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Link
                        href="/requestEmployee"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Request Services
                        </div>
                      </Link>
                      <Link
                        href="/signUp"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Join Our Team
                        </div>
                      </Link>
                      <Link
                        href="/contactUs"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">
                          Subscribe
                        </div>
                      </Link>
                      <Link
                        href="/insight"
                        className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-teal-500 hover:translate-x-1 transform"
                      >
                        <div className="font-semibold text-gray-800">Login</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 xl:space-x-3 ml-2 xl:ml-4">
                <Link
                  href="/employer"
                  className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 transform text-sm"
                >
                  Employers
                </Link>
                <Link
                  href="/employees"
                  className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 transform text-sm"
                >
                  Employee
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button - Hidden on mobile since this is desktop-only */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-white hover:text-teal-400 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Desktop Only (for tablet) */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-white text-gray-800 transform transition-transform duration-300 z-50 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center space-x-3">
                <Image
                  src={logo}
                  alt="Logo"
                  width={40}
                  height={30}
                  className="transition-all duration-300 hover:scale-110"
                />
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
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Main Navigation
                    </h3>
                    <Link
                      href="/"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Home
                    </Link>
                    <Link
                      href="/ourSupport"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Our Support
                    </Link>
                    <Link
                      href="/environment"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Environment
                    </Link>
                    <Link
                      href="/socialValue"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Social Value
                    </Link>
                    <Link
                      href="/governance"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Governance
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Quick Actions
                    </h3>
                    <Link
                      href="/employer"
                      className="block w-full text-center text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 hover:scale-105 transform hover:shadow-lg"
                    >
                      Employers
                    </Link>
                    <Link
                      href="/employees"
                      className="block w-full text-center text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 transform hover:shadow-lg"
                    >
                      Employee
                    </Link>
                  </div>

                  {/* Services Section */}
                  <div className="space-y-3">
                    <Link href="/services" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Services
                    </Link>
                    <Link
                      href="/recruitment"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Recruitment Services
                    </Link>
                    <Link
                      href="/communityService"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Community Services
                    </Link>
                    <Link
                      href="/facilityService"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Facility Management
                    </Link>
                  </div>

                  {/* Why Demand Recruitment */}
                  <div className="space-y-3">
                    <Link href="/whyDemand" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Why Demand Recruitment
                    </Link>
                    <div className="pl-4 space-y-2">
                      <h4 className="text-xs font-medium text-gray-400">
                        INSIGHTS & NEWS
                      </h4>
                      <Link
                        href="/newsEvent"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        News & Events
                      </Link>
                      <Link
                        href="/caseStudies"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Case Studies
                      </Link>
                      <Link
                        href="/insight"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Insights & White Papers
                      </Link>
                      <Link
                        href="/podcastVideo"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Podcasts & Video
                      </Link>

                      <h4 className="text-xs font-medium text-gray-400 mt-4">
                        TECHNOLOGY & INNOVATION
                      </h4>
                      <Link
                        href="/artificialIntelligence"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Artificial Intelligence
                      </Link>
                      <Link
                        href="/facilitiesTransformation"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Facilities Transformation
                      </Link>
                      <Link
                        href="/zeroNavigator"
                        className="block py-1 text-gray-600 hover:text-teal-600 transition-all duration-300 text-sm hover:translate-x-2 transform"
                      >
                        Net Zero Navigator 2025
                      </Link>
                    </div>
                  </div>

                  {/* Other Links */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      More
                    </h3>
                    <Link
                      href="/allJobs"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Find a Job
                    </Link>
                    <Link
                      href="/aboutUs"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contactUs"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/referAFriend"
                      className="block py-2 text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium hover:translate-x-2 transform"
                    >
                      Refer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StickyHeader;