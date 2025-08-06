"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyPage = () => {
  const { jobId } = useParams();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      toast.error("Please upload a resume!");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("jobId", jobId);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Application submitted successfully!");
        setFormData({
          fullName: "",
          email: session?.user?.email || "",
          phone: "",
          position: "",
          resume: null,
          coverLetter: "",
        });
        document.getElementById("resume").value = "";
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <ToastContainer />

      {/* Hero Banner */}
      <div
        className="w-full h-64 bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/Job.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Apply for Your Dream Job</h1>
          <p className="mt-3 text-lg text-gray-200">
            Fill out the form below and submit your resume to get started.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex justify-center items-center py-12 px-4">
        <div className="bg-white w-full max-w-3xl shadow-2xl rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Quick Apply & Upload Resume
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Position Applying For</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                id="resume"
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="5"
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition duration-300"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplyPage;
