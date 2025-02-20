'use client';
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

// Generate fake job history data
const generateFakeJobHistory = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['Completed', 'In Progress', 'Cancelled']),
        earnings: faker.helpers.maybe(() => faker.finance.amount(100, 5000, 2, '$'), 0.7),
    }));
};

export default function JobHistory() {
    const [jobHistory] = useState(generateFakeJobHistory());

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Job History</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3">Status</th>
                            <th className="border border-gray-300 p-3">Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobHistory.map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3">{job.description}</td>
                                <td className={`border border-gray-300 p-3 font-semibold ${job.status === 'Completed' ? 'text-green-600' : job.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{job.status}</td>
                                <td className="border border-gray-300 p-3">{job.earnings || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}