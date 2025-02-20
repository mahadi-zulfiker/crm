'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { FaCheckCircle, FaClipboardList, FaPaperPlane } from 'react-icons/fa';

// Generate fake job postings
const generateFakeJobs = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['Open', 'In Progress', 'Completed']),
        assigned: faker.datatype.boolean(),
    }));
};

export default function JobApplyManagement() {
    const [jobs, setJobs] = useState(generateFakeJobs());
    const [appliedJobs, setAppliedJobs] = useState([]);

    // Apply for a Job
    const handleApply = (id) => {
        const job = jobs.find(job => job.id === id);
        if (job) {
            setAppliedJobs([...appliedJobs, job]);
            Swal.fire('Applied!', 'You have successfully applied for the job.', 'success');
        }
    };

    // Request Job Completion Approval
    const handleRequestApproval = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Pending Approval' } : job));
        Swal.fire('Requested!', 'Job completion approval has been requested.', 'info');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Job Application & Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.filter(job => job.status === 'Open').map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3">{job.description}</td>
                                <td className="border border-gray-300 p-3 flex justify-center">
                                    <button onClick={() => handleApply(job.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaPaperPlane className="mr-2" /> Apply
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mt-6 overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4">Assigned Jobs</h2>
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3">Status</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.filter(job => job.assigned).map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3">{job.description}</td>
                                <td className={`border border-gray-300 p-3 font-semibold ${job.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{job.status}</td>
                                <td className="border border-gray-300 p-3 flex justify-center">
                                    {job.status !== 'Completed' && (
                                        <button onClick={() => handleRequestApproval(job.id)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                                            <FaCheckCircle className="mr-2" /> Request Completion Approval
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
