import React, { useState } from "react";
import Swal from "sweetalert2";

// Fake JSON data for approved jobs
const approvedJobsData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  jobTitle: `Job Title ${index + 1}`,
  duration: `${Math.floor(Math.random() * 12) + 1} months`,
  schedule: ["Full-time", "Part-time", "Remote"][
    Math.floor(Math.random() * 3)
  ],
  status: "Approved",
}));

const ApprovedJobs = () => {
  const [jobs, setJobs] = useState(approvedJobsData);

  const handleMarkComplete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this job as completed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    });

    if (result.isConfirmed) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id ? { ...job, status: "Completed" } : job
        )
      );
      Swal.fire("Marked!", "The job has been marked as completed.", "success");
    }
  };

  const handleResign = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will resign from this job.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, resign!",
    });

    if (result.isConfirmed) {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      Swal.fire("Resigned!", "You have resigned from the job.", "success");
    }
  };

  const handleArrangeMeeting = async (jobTitle) => {
    await Swal.fire({
      title: "Meeting Arranged!",
      text: `Meeting has been arranged for: ${jobTitle}`,
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Approved Jobs</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-3 text-gray-600 font-medium">Job Title</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Duration</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Schedule</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Arrange Meeting</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{job.jobTitle}</td>
                <td className="px-6 py-4">{job.duration}</td>
                <td className="px-6 py-4">{job.schedule}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleArrangeMeeting(job.jobTitle)}
                  >
                    Arrange Meeting
                  </button>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handleMarkComplete(job.id)}
                  >
                    Mark as Complete
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleResign(job.id)}
                  >
                    Resign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedJobs;