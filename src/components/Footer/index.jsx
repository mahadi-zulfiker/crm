import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/homePage" className="hover:text-teal-600 transition-all">Home</Link></li>
            <li><Link href="/aboutUs" className="hover:text-teal-600 transition-all">About Us</Link></li>
            <li><Link href="/services" className="hover:text-teal-600 transition-all">Services</Link></li>
            <li><Link href="/jobs" className="hover:text-teal-600 transition-all">Jobs</Link></li>
            <li><Link href="/projects" className="hover:text-teal-600 transition-all">Projects</Link></li>
            <li><Link href="/contactUs" className="hover:text-teal-600 transition-all">Contact Us</Link></li>
            <li><Link href="/FAQ" className="hover:text-teal-600 transition-all">FAQ</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/recruitment" className="hover:text-teal-600 transition-all">Recruitment</Link></li>
            <li><Link href="/careerCounseling" className="hover:text-teal-600 transition-all">Career Counseling</Link></li>
            <li><Link href="/cvWriting" className="hover:text-teal-600 transition-all">CV Writing</Link></li>
            <li><Link href="/jobSeekerResource" className="hover:text-teal-600 transition-all">Job Seeker Resource</Link></li>
            <li><Link href="/employerResource" className="hover:text-teal-600 transition-all">Employer Resource</Link></li>
            <li><Link href="/talentAcquisition" className="hover:text-teal-600 transition-all">Talent Acquisition</Link></li>
            <li><Link href="/permanentRecruitment" className="hover:text-teal-600 transition-all">Permanent Recruitment</Link></li>
          </ul>
        </div>

        {/* More Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">More Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="/backgroundChecks" className="hover:text-teal-600 transition-all">Background Checks</Link></li>
            <li><Link href="/facilityService" className="hover:text-teal-600 transition-all">Facility Service</Link></li>
            <li><Link href="/fireSafety" className="hover:text-teal-600 transition-all">Fire Safety</Link></li>
            <li><Link href="/engineeringConstruction" className="hover:text-teal-600 transition-all">Engineering & Construction</Link></li>
            <li><Link href="/wasteManagement" className="hover:text-teal-600 transition-all">Waste Management</Link></li>
            <li><Link href="/staffingSolution" className="hover:text-teal-600 transition-all">Staffing Solution</Link></li>
            <li><Link href="/vendorCoordination" className="hover:text-teal-600 transition-all">Vendor Coordination</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* Newsletter */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mb-4">Stay updated with our latest news and services.</p>
          <form className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-500 transition-all w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-5 mt-6 justify-center sm:justify-start">
            <FaFacebook className="text-teal-400 text-2xl cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="text-teal-400 text-2xl cursor-pointer hover:scale-110 transition" />
            <FaLinkedin className="text-teal-400 text-2xl cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Demand Recruitment Service. All Rights Reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="/privacyPolicy" className="hover:text-teal-600 transition-all">Privacy Policy</Link>
          <span>|</span>
          <Link href="/termsOfService" className="hover:text-teal-600 transition-all">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
