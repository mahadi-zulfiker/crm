import React from "react";

function JobHistoryReports() {
  // Sample job data
  const jobHistory = [
    { id: 1, jobTitle: "Website Development", status: "Completed", date: "Jan 12, 2024", rating: 4.8 },
    { id: 2, jobTitle: "Graphic Design", status: "In Progress", date: "Feb 5, 2024", rating: null },
    { id: 3, jobTitle: "SEO Optimization", status: "Completed", date: "Dec 22, 2023", rating: 4.5 },
    { id: 4, jobTitle: "Content Writing", status: "Completed", date: "Nov 30, 2023", rating: 4.7 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Job History & Reports</h1>
        <p className="text-gray-600 mb-6">View past jobs and performance reports.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border">
            <h3 className="text-xl font-semibold text-gray-700">Total Jobs</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">4</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border">
            <h3 className="text-xl font-semibold text-gray-700">Completed Jobs</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {jobHistory.filter(job => job.status === "Completed").length}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 border">
            <h3 className="text-xl font-semibold text-gray-700">Average Rating</h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {(
                jobHistory.reduce((sum, job) => sum + (job.rating || 0), 0) /
                jobHistory.filter(job => job.rating).length
              ).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Job History Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 border overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job History</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left border">Job Title</th>
                <th className="p-3 text-left border">Status</th>
                <th className="p-3 text-left border">Date</th>
                <th className="p-3 text-left border">Rating</th>
              </tr>
            </thead>
            <tbody>
              {jobHistory.map((job) => (
                <tr key={job.id} className="border">
                  <td className="p-3 border">{job.jobTitle}</td>
                  <td
                    className={`p-3 border font-semibold ${
                      job.status === "Completed" ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {job.status}
                  </td>
                  <td className="p-3 border">{job.date}</td>
                  <td className="p-3 border">
                    {job.rating ? (
                      <span className="text-yellow-500 font-semibold">{job.rating} ⭐</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobHistoryReports;
