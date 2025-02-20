'use client';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

export default function JobManagementClient() {
  const [jobs, setJobs] = useState([]);

  // Generate fake job postings on mount
  useEffect(() => {
    const loadJobs = async () => {
      const { faker } = await import("@faker-js/faker"); // Dynamic import

      const generateFakeJobs = () => {
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: faker.person.jobTitle(),
          description: faker.lorem.sentences(2),
          payment: faker.finance.amount(100, 1000, 2, "$"),
          deadline: faker.date.future().toDateString(),
          status: "Open",
          applicants: faker.number.int({ min: 1, max: 10 }),
        }));
      };

      setJobs(generateFakeJobs());
    };

    loadJobs();
  }, []);

  // Create a new job
  const handleCreateJob = async () => {
    const { value } = await Swal.fire({
      title: "Create New Job",
      html: `
        <input id="jobTitle" class="swal2-input" placeholder="Job Title">
        <textarea id="jobDesc" class="swal2-textarea" placeholder="Job Description"></textarea>
        <input id="jobPayment" type="number" class="swal2-input" placeholder="Payment ($)">
        <input id="jobDeadline" type="date" class="swal2-input">
      `,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => ({
        title: document.getElementById("jobTitle").value,
        description: document.getElementById("jobDesc").value,
        payment: `$${document.getElementById("jobPayment").value}`,
        deadline: document.getElementById("jobDeadline").value,
      }),
    });

    if (value && value.title && value.description && value.payment && value.deadline) {
      const newJob = {
        id: jobs.length + 1,
        title: value.title,
        description: value.description,
        payment: value.payment,
        deadline: new Date(value.deadline).toDateString(),
        status: "Open",
        applicants: 0,
      };
      setJobs([...jobs, newJob]);
      Swal.fire("Success!", "Job created successfully.", "success");
    }
  };

  // Edit Job
  const handleEditJob = async (job) => {
    const { value } = await Swal.fire({
      title: "Edit Job",
      html: `
        <input id="jobTitle" class="swal2-input" value="${job.title}" placeholder="Job Title">
        <textarea id="jobDesc" class="swal2-textarea">${job.description}</textarea>
        <input id="jobPayment" type="number" class="swal2-input" value="${job.payment.replace("$", "")}" placeholder="Payment ($)">
        <input id="jobDeadline" type="date" class="swal2-input" value="${new Date(job.deadline).toISOString().split("T")[0]}">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => ({
        title: document.getElementById("jobTitle").value,
        description: document.getElementById("jobDesc").value,
        payment: `$${document.getElementById("jobPayment").value}`,
        deadline: document.getElementById("jobDeadline").value,
      }),
    });

    if (value) {
      setJobs(
        jobs.map((j) =>
          j.id === job.id
            ? { ...j, title: value.title, description: value.description, payment: value.payment, deadline: new Date(value.deadline).toDateString() }
            : j
        )
      );
      Swal.fire("Updated!", "Job has been updated.", "success");
    }
  };

  // Delete Job
  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setJobs(jobs.filter((job) => job.id !== id));
        Swal.fire("Deleted!", "Job has been deleted.", "error");
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Job Management</h1>
      <button
        onClick={handleCreateJob}
        className="mb-4 flex items-center bg-green-500 hover:bg-green-700 text-white px-5 py-3 rounded-md transition duration-300"
      >
        <FaPlusCircle className="mr-2" /> Create Job
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 p-3">Title</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3">Payment</th>
              <th className="border border-gray-300 p-3">Deadline</th>
              <th className="border border-gray-300 p-3">Status</th>
              <th className="border border-gray-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{job.title}</td>
                <td className="border border-gray-300 p-3">{job.description}</td>
                <td className="border border-gray-300 p-3 font-semibold">{job.payment}</td>
                <td className="border border-gray-300 p-3">{job.deadline}</td>
                <td className={`border border-gray-300 p-3 font-semibold ${job.status === "Completed" ? "text-green-600" : "text-blue-600"}`}>
                  {job.status}
                </td>
                <td className="border border-gray-300 p-3 flex justify-center gap-2 flex-wrap">
                  <button onClick={() => handleEditJob(job)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaEdit className="" />
                  </button>
                  <button onClick={() => handleDeleteJob(job.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaTrash className="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
