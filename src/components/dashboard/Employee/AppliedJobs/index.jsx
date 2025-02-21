"use client";

import React, { useEffect, useState } from "react";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applicationManagement");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();

        // Extract `data` properly
        if (Array.isArray(data.data)) {
          setApplications(data.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading applications...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="flex flex-col items-start w-full px-8 py-6">
      <h1 className="text-3xl font-bold mb-4">Applied Jobs</h1>
      <p className="text-gray-600 mb-6">Here are your applied jobs and their statuses:</p>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium">Applicant</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Email</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Phone</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Applied At</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 text-sm text-gray-800">{app.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{app.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{app.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td
                  className={`px-6 py-4 text-sm font-medium text-gray-800 ${app.status === "Accepted"
                    ? "text-green-600"
                    : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                    }`}
                >
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
