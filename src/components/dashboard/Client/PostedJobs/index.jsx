"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/postedJobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Filter and search logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && job.status === "Completed") ||
      (filterStatus === "Not Completed" && job.status !== "Completed") ||
      (filterStatus === "Active" && job.status === "Active");

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-700">
        Your Posted Jobs
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by job title..."
          className="flex-1 w-full md:max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-[180px] p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          onChange={(e) => setFilterStatus(e.target.value)}
          defaultValue="All"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-teal-600 text-white text-left">
              <th className="p-4 font-semibold rounded-tl-lg">Job Title</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Job Type</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Salary</th>
              <th className="p-4 font-semibold rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="p-4 font-medium text-gray-900">{job.title}</td>
                  <td className="p-4 text-gray-700">{job.company}</td>
                  <td className="p-4 text-gray-700">{job.location}</td>
                  <td className="p-4 text-gray-700">{job.jobType}</td>
                  <td className="p-4 text-gray-700">{job.category}</td>
                  <td className="p-4 text-gray-700">${job.salary}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                        job.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700" // For "Not Completed" or other statuses
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No jobs found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-teal-600 border border-teal-300 hover:bg-teal-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
