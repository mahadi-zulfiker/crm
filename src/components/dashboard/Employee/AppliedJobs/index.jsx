// AppliedJobs.js
import React from "react";

const fakeJobApplications = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    duration: "6 months",
    schedule: "Full-time",
    status: "Pending",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    duration: "1 year",
    schedule: "Part-time",
    status: "Accepted",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    duration: "3 months",
    schedule: "Contract",
    status: "Rejected",
  },
  // Add more fake job data here
  ...Array.from({ length: 17 }).map((_, index) => ({
    id: index + 4,
    jobTitle: `Job Title ${index + 4}`,
    duration: `${Math.ceil(Math.random() * 12)} months`,
    schedule: ["Full-time", "Part-time", "Contract"][
      Math.floor(Math.random() * 3)
    ],
    status: ["Pending", "Accepted", "Rejected"][
      Math.floor(Math.random() * 3)
    ],
  })),
];

const AppliedJobs = () => {
  return (
    <div className="flex flex-col items-start w-full px-8 py-6">
      <h1 className="text-3xl font-bold mb-4">Applied Jobs</h1>
      <p className="text-gray-600 mb-6">Here are your applied jobs and their statuses:</p>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium">Job Title</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Duration</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Schedule</th>
              <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {fakeJobApplications.map((job) => (
              <tr
                key={job.id}
                className="border-t hover:bg-gray-100 transition duration-150"
              >
                <td className="px-6 py-4 text-sm text-gray-800">{job.jobTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{job.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{job.schedule}</td>
                <td
                  className={`px-6 py-4 text-sm font-medium text-gray-800 ${
                    job.status === "Accepted"
                      ? "text-green-600"
                      : job.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {job.status}
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
