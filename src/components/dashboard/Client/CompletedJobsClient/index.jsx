"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jobsPerPage = 10; // Declare jobsPerPage variable

function CompletedJobsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [hasError, setHasError] = useState(false); // New state for error

  useEffect(() => {
    const fetchCompletedJobs = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setHasError(false); // Reset error state
      try {
        const response = await fetch("/api/completedJobs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompletedJobs(data);
      } catch (error) {
        console.error("Error fetching completed jobs:", error);
        toast.error("Failed to fetch completed jobs!");
        setHasError(true); // Set error state
      } finally {
        setIsLoading(false); // Set loading to false after fetch attempt
      }
    };
    fetchCompletedJobs();
  }, []);

  const filteredJobs = completedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-700">
        Completed Jobs
      </h1>

      {/* Search Input */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
        />
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
              <th className="p-4 font-semibold">Salary</th>
              <th className="p-4 font-semibold">Posted At</th>
              <th className="p-4 font-semibold rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="bg-white">
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  Loading completed jobs...
                </td>
              </tr>
            ) : hasError ? (
              <tr className="bg-white">
                <td colSpan={7} className="text-center py-8 text-red-500">
                  Error loading jobs. Please try again later.
                </td>
              </tr>
            ) : currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="p-4 font-medium text-gray-900">{job.title}</td>
                  <td className="p-4 text-gray-700">{job.company}</td>
                  <td className="p-4 text-gray-700">{job.location}</td>
                  <td className="p-4 text-gray-700">{job.jobType}</td>
                  <td className="p-4 text-gray-700">${job.salary}</td>
                  <td className="p-4 text-gray-700">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No completed jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && !hasError && filteredJobs.length > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === i + 1
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-teal-600 border border-teal-300 hover:bg-teal-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
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

export default CompletedJobsClient;
