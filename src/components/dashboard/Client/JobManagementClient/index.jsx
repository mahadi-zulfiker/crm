"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaClock } from "react-icons/fa";

export default function JobManagementClient() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobManagementClient");
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleSetDeadline = async (job) => {
    const { value: deadline } = await Swal.fire({
      title: "Set Deadline",
      input: "date",
      inputValue: job.deadline,
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (deadline) {
      await fetch("/api/jobManagementClient", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job._id, deadline }),
      });
      setJobs(jobs.map((j) => (j._id === job._id ? { ...j, deadline } : j)));
      Swal.fire("Updated!", "Deadline updated successfully.", "success");
    }
  };

  const handleMakePayment = async (job) => {
    if (job.status !== "Completed") {
      return Swal.fire(
        "Error!",
        "You can only make payments for completed jobs.",
        "error"
      );
    }

    const { value: payment } = await Swal.fire({
      title: "Enter Payment Amount",
      input: "number",
      inputValue: job.payment || "",
      showCancelButton: true,
      confirmButtonText: "Pay",
    });

    if (payment) {
      await fetch("/api/jobManagementClient", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          payment: Number.parseFloat(payment),
        }), // Ensure payment is a number
      });
      setJobs(
        jobs.map((j) =>
          j._id === job._id ? { ...j, payment: Number.parseFloat(payment) } : j
        )
      );
      Swal.fire("Success!", "Payment made successfully.", "success");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Client Job Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Deadline</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Payment</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border text-gray-800">{job.title}</td>
                <td className="p-3 border text-gray-600">{job.description}</td>
                <td className="p-3 border text-gray-600">
                  {job.deadline || "Not set"}
                </td>
                <td className="p-3 border font-semibold text-gray-700">
                  {job.status}
                </td>
                <td className="p-3 border text-gray-700">
                  {job.payment ? `$${job.payment}` : "Not paid"}
                </td>
                <td className="p-3 border flex justify-center gap-2">
                  {job.status !== "Completed" && !job.payment && (
                    <button
                      onClick={() => handleSetDeadline(job)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
                    >
                      <FaClock /> Set Deadline
                    </button>
                  )}
                  {job.status === "Completed" && !job.payment && (
                    <button
                      onClick={() => handleMakePayment(job)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                      <FaMoneyBillWave /> Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
