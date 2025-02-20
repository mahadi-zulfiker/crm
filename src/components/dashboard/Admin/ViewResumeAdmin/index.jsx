"use client";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { FiSearch, FiDownload, FiCheck, FiX } from "react-icons/fi";

function generateMockResumes(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    position: faker.person.jobTitle(),
    uploadedAt: faker.date.past().toLocaleDateString(),
    resumeUrl: "https://www.example.com/sample-resume.pdf",
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
  }));
}

function ViewResumeAdmin() {
  const [resumes, setResumes] = useState(generateMockResumes(10));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = (id, newStatus) => {
    setResumes((prevResumes) =>
      prevResumes.map((resume) =>
        resume.id === id ? { ...resume, status: newStatus } : resume
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Resume Dashboard</h1>
      
      <div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <FiSearch className="mr-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search resumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{resume.name}</h2>
            <p className="text-gray-600">{resume.email}</p>
            <p className="text-gray-600">Applied for: {resume.position}</p>
            <p className="text-gray-600">Uploaded: {resume.uploadedAt}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <a
                href={resume.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center"
              >
                <FiDownload className="mr-1" /> Download Resume
              </a>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  resume.status === "Approved"
                    ? "bg-green-500"
                    : resume.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {resume.status}
              </span>
            </div>
            
            <div className="flex justify-end mt-4 space-x-3">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center"
                onClick={() => updateStatus(resume.id, "Approved")}
              >
                <FiCheck className="mr-1" /> Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center"
                onClick={() => updateStatus(resume.id, "Rejected")}
              >
                <FiX className="mr-1" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewResumeAdmin;