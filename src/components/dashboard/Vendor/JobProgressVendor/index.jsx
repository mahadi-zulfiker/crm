"use client";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { FiSearch } from "react-icons/fi";

function generateMockJobs(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(), // ✅ Corrected UUID generation
    title: faker.company.catchPhrase(),
    client: faker.company.name(),
    startDate: faker.date.past().toLocaleDateString(),
    status: faker.helpers.arrayElement(["Not Started", "In Progress", "Completed"]),
    progress: faker.number.int({ min: 0, max: 100 }), // ✅ Updated number generation
    tasks: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => ({
      id: faker.string.uuid(),
      description: faker.hacker.phrase(),
      completed: faker.datatype.boolean(),
    })),
  }));
}

function JobProgressVendor() {
  const [jobs] = useState(generateMockJobs(5));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Progress Dashboard</h1>
      <div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <FiSearch className="mr-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">Client: {job.client}</p>
            <p className="text-gray-600">Start Date: {job.startDate}</p>
            <p
              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${
                job.status === "Completed"
                  ? "bg-green-500"
                  : job.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {job.status}
            </p>
            <div className="mt-4 relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ width: `${job.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Progress: {job.progress}%</p>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Tasks:</h3>
              <ul className="mt-2 space-y-1">
                {job.tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                  >
                    • {task.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobProgressVendor;
