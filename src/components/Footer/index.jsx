import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-[#F97316]">Demand Recruitment Service</h2>
          <p className="mt-4 text-gray-400">
            <span className="font-semibold text-white">Address:</span><br />
            Demand Recruitment Services Ltd <br />
            20-22 Wenlock Road, London England - N1 7GU
          </p>
          <p className="mt-2 text-gray-400">
            <span className="font-semibold text-white">Phone:</span> +44 0203 876 1531<br />
            <span className="font-semibold text-white">Email:</span> info@demandrecruitmentservices.co.uk
          </p>
          <div className="flex gap-5 mt-10">
            <FaFacebook className="text-orange-600 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110" />
            <FaTwitter className="text-orange-400 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110" />
            <FaLinkedin className="text-orange-700 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="ml-20">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/homePage" className="hover:text-[#F97316] transition-all">Home</Link></li>
            <li><Link href="/aboutUs" className="hover:text-[#F97316] transition-all">About Us</Link></li>
            <li><Link href="/services" className="hover:text-[#F97316] transition-all">Services</Link></li>
            <li><Link href="/jobs" className="hover:text-[#F97316] transition-all">Jobs</Link></li>
            <li><Link href="/projects" className="hover:text-[#F97316] transition-all">Projects</Link></li>
            <li><Link href="/contactUs" className="hover:text-[#F97316] transition-all">Contact Us</Link></li>
            <li><Link href="/FAQ" className="hover:text-[#F97316] transition-all">FAQ</Link></li>
          </ul>
        </div>

        {/* Additional Links Column 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/recruitment" className="hover:text-[#F97316] transition-all">Recruitment</Link></li>
            <li><Link href="/careerCounseling" className="hover:text-[#F97316] transition-all">Career Counseling</Link></li>
            <li><Link href="/cvWriting" className="hover:text-[#F97316] transition-all">CV Writing</Link></li>
            <li><Link href="/jobSeekerResource" className="hover:text-[#F97316] transition-all">Job Seeker Resource</Link></li>
            <li><Link href="/employerResource" className="hover:text-[#F97316] transition-all">Employer Resource</Link></li>
            <li><Link href="/talentAcquisition" className="hover:text-[#F97316] transition-all">Talent Acquisition</Link></li>
            <li><Link href="/permanentRecruitment" className="hover:text-[#F97316] transition-all">Permanent Recruitment</Link></li>
          </ul>
        </div>

        {/* Additional Links Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">More Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/backgroundChecks" className="hover:text-[#F97316] transition-all">Background Checks</Link></li>
            <li><Link href="/facilityService" className="hover:text-[#F97316] transition-all">Facility Service</Link></li>
            <li><Link href="/fireSafety" className="hover:text-[#F97316] transition-all">Fire Safety</Link></li>
            <li><Link href="/engineeringConstruction" className="hover:text-[#F97316] transition-all">Engineering & Construction</Link></li>
            <li><Link href="/wasteManagement" className="hover:text-[#F97316] transition-all">Waste Management</Link></li>
            <li><Link href="/staffingSolution" className="hover:text-[#F97316] transition-all">Staffing Solution</Link></li>
            <li><Link href="/vendorCoordination" className="hover:text-[#F97316] transition-all">Vendor Coordination</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Demand Recruitment Service. All Rights Reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="/privacyPolicy" className="hover:text-[#F97316] transition-all">Privacy Policy</Link>
          <span>|</span>
          <Link href="/termsOfService" className="hover:text-[#F97316] transition-all">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
