"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaClock,
  FaBriefcase,
  FaUsers,
  FaEye,
  FaBookmark,
  FaShare,
  FaHome,
  FaExclamationTriangle,
  FaStar,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Link from "next/link";
import { Loader2 } from "@/components/ui/loader2";

function SingleJob() {
  const params = useParams();
  const jobId = params?.jobId;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs`);
        if (!res.ok) {
          throw new Error("Failed to fetch job details.");
        }
        const data = await res.json();
        const selectedJob = data.find((job) => job._id === jobId);
        if (selectedJob) {
          setJob(selectedJob);
        } else {
          setError("Job not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-screen w-screen">
          <div className="text-center flex justify-center items-center  bg-white p-8 rounded-lg shadow-md h-screen w-screen">
            <div className="align-middle">
              <Loader2 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                Loading job details...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please wait while we fetch the information
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md border border-red-200">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-lg font-semibold text-red-600 mb-2">{error}</p>
            <Link href="/jobs">
              <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Back to Jobs
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse skills into an array
  const skillsArray = job.skills
    ? job.skills.split(",").map((skill) => skill.trim())
    : [];
  const benefitsArray = job.benefits
    ? job.benefits.split(",").map((benefit) => benefit.trim())
    : [];
  const requirementsArray = job.requirements
    ? job.requirements.split(",").map((req) => req.trim())
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Professional Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <FaBuilding className="text-white text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    {job.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                        <FaStar className="mr-1" />
                        Featured
                      </span>
                    )}
                    {job.isUrgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                        <FaExclamationTriangle className="mr-1" />
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-teal-600 font-medium">
                    {job.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-teal-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-teal-600" />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-teal-600" />
                  <span>{job.experienceLevel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHome className="text-teal-600" />
                  <span>{job.workType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-teal-600" />
                  <span>
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-lg border transition-colors ${
                  isBookmarked
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-teal-600 hover:text-teal-600"
                }`}
              >
                <FaBookmark />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg border bg-white text-gray-600 border-gray-300 hover:border-teal-600 hover:text-teal-600 transition-colors"
              >
                <FaShare />
              </button>
              <Link href={`/singleJob/${jobId}/apply`}>
                <button className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-teal-600 rounded-full mr-3"></span>
              Job Overview
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {job.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FaUsers className="text-2xl text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Vacancies</p>
                <p className="font-semibold text-gray-900">{job.vacancy}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FaEye className="text-2xl text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Job Reference</p>
                <p className="font-semibold text-gray-900">
                  {job.jobReference}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FaMoneyBillWave className="text-2xl text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Salary</p>
                <p className="font-semibold text-gray-900">
                  {job.currency} {job.salaryMin} - {job.salaryMax}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FaCalendarAlt className="text-2xl text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-semibold text-gray-900">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-teal-600 rounded-full mr-3"></span>
              Key Responsibilities
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">{job.responsibilities}</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  Lead and mentor junior developers
                </span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  Collaborate with cross-functional teams
                </span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  Ensure code quality and best practices
                </span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  Participate in technical decision making
                </span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-teal-600 rounded-full mr-3"></span>
              Requirements & Qualifications
            </h2>
            <div className="space-y-4 mb-6">
              {requirementsArray.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    Experience with {requirement}
                  </span>
                </div>
              ))}
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  5+ years of experience in relevant field
                </span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700">
                  {job.educationLevel} or equivalent
                </span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-teal-600 rounded-full mr-3"></span>
              Benefits & Perks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefitsArray.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-teal-50 rounded-lg"
                >
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  <span className="text-gray-700 font-medium capitalize">
                    {benefit}
                  </span>
                </div>
              ))}
              <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                <span className="text-gray-700 font-medium">
                  Health Insurance
                </span>
              </div>
              <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                <span className="text-gray-700 font-medium">
                  Professional Development
                </span>
              </div>
              <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                <span className="text-gray-700 font-medium">
                  Performance Bonuses
                </span>
              </div>
              <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                <span className="text-gray-700 font-medium">
                  Competitive Salary
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors font-semibold"
              onClick={() => (window.location.href = "/jobs")}
            >
              ← Back to Search
            </button>
            <Link href={`/singleJob/${jobId}/apply`} className="flex-1">
              <button className="w-full bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                Apply for this Position →
              </button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Company Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <FaBuilding className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold text-gray-900">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <FaMapMarkerAlt className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <FaMoneyBillWave className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-semibold text-gray-900">
                    {job.currency} {job.salaryMin} - {job.salaryMax}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Job Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Job Type:</span>
                <span className="font-semibold text-gray-900">
                  {job.jobType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-semibold text-gray-900">
                  {job.experienceLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold text-gray-900">
                  {job.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work Type:</span>
                <span className="font-semibold text-gray-900">
                  {job.workType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Education:</span>
                <span className="font-semibold text-gray-900">
                  {job.educationLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vacancies:</span>
                <span className="font-semibold text-gray-900">
                  {job.vacancy}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <FaEnvelope className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {job.contactEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <FaPhone className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {job.contactPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Job */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Share this Job
            </h3>
            <div className="flex justify-center gap-3">
              <button className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FaFacebook />
              </button>
              <button className="w-12 h-12 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaTwitter />
              </button>
              <button className="w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                <FaLinkedin />
              </button>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Similar Jobs
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Frontend Developer",
                  company: "TechCorp",
                  location: "Dhaka, Bangladesh",
                },
                {
                  title: "React Developer",
                  company: "DevInc",
                  location: "Chittagong, Bangladesh",
                },
                {
                  title: "Full Stack Developer",
                  company: "WebCorp",
                  location: "Sylhet, Bangladesh",
                },
              ].map((similarJob, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-teal-600 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-gray-900 text-sm">
                    {similarJob.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {similarJob.company} • {similarJob.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SingleJob;
