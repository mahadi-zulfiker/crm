"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import StickyHeader from "@/components/StickyHeader";

const UploadCV = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    file: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please upload your CV.");
      return;
    }

    // FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("category", formData.category);
    data.append("file", formData.file);

    // try {
    //     // Replace this with your actual API endpoint
    //     const res = await fetch("/api/upload-cv", {
    //         method: "POST",
    //         body: data,
    //     });

    //     if (res.ok) {
    //         setSubmitted(true);
    //         setFormData({ name: "", email: "", phone: "", category: "", file: null });
    //     } else {
    //         alert("Upload failed. Please try again.");
    //     }
    // } catch (error) {
    //     console.error("Error uploading CV:", error);
    //     alert("Something went wrong.");
    // }
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />
      <StickyHeader></StickyHeader>
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            Upload Your CV
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Submit your resume and get discovered by top employers.
          </p>

          {submitted ? (
            <div className="bg-green-100 text-green-800 px-6 py-4 rounded-lg text-center font-semibold">
              Your CV has been uploaded successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interested Category (Optional)
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Web Development, Marketing"
                  className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-dashed border-gray-400 p-3 rounded-md bg-gray-100 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-teal-700 hover:file:bg-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Submit CV
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadCV;
