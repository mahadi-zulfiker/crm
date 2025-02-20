"use client";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { FiSearch, FiDownload, FiEye } from "react-icons/fi";

// Generate Mock Resume Data
function generateMockResumes(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: faker.person.jobTitle(),
    company: faker.company.name(),
    resumeLink: "#", // Placeholder for resume download
  }));
}

function ViewResumeVendor() {
  const [resumes] = useState(generateMockResumes(6));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vendor Resumes</h1>
      
      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <FiSearch className="mr-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search vendor resumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>
      
      {/* Resume List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{resume.name}</h2>
            <p className="text-gray-600">{resume.role} at {resume.company}</p>
            <p className="text-gray-600">Email: {resume.email}</p>
            <p className="text-gray-600">Phone: {resume.phone}</p>
            
            {/* Action Buttons */}
            <div className="mt-4 flex space-x-3">
              <a
                href={resume.resumeLink}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
              >
                <FiEye /> <span>View Resume</span>
              </a>
              <a
                href={resume.resumeLink}
                download
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
              >
                <FiDownload /> <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewResumeVendor;
