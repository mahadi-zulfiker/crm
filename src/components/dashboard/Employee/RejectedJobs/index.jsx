"use client";
import React from 'react';

const rejectedJobsData = [
    { id: 1, title: "Software Engineer", duration: "6 months", schedule: "Full-time", reason: "Position filled" },
    { id: 2, title: "UI/UX Designer", duration: "3 months", schedule: "Part-time", reason: "Overqualified" },
    { id: 3, title: "Data Analyst", duration: "1 year", schedule: "Full-time", reason: "Better candidate selected" },
    { id: 4, title: "Backend Developer", duration: "6 months", schedule: "Remote", reason: "Lack of experience" },
    { id: 5, title: "Marketing Specialist", duration: "1 year", schedule: "Full-time", reason: "Budget constraints" },
    { id: 6, title: "Project Manager", duration: "9 months", schedule: "Hybrid", reason: "Not a good fit" },
    { id: 7, title: "QA Engineer", duration: "6 months", schedule: "Full-time", reason: "Position closed" },
    { id: 8, title: "DevOps Engineer", duration: "1 year", schedule: "Remote", reason: "More experienced candidate selected" },
    { id: 9, title: "Frontend Developer", duration: "6 months", schedule: "Full-time", reason: "Underqualified" },
    { id: 10, title: "System Administrator", duration: "1 year", schedule: "Hybrid", reason: "Company restructuring" },
    { id: 11, title: "HR Manager", duration: "9 months", schedule: "Part-time", reason: "Position filled internally" },
    { id: 12, title: "Technical Writer", duration: "3 months", schedule: "Remote", reason: "Not enough experience" },
    { id: 13, title: "Cybersecurity Analyst", duration: "1 year", schedule: "Full-time", reason: "Failed background check" },
    { id: 14, title: "Database Administrator", duration: "6 months", schedule: "On-site", reason: "Job canceled" },
    { id: 15, title: "Cloud Engineer", duration: "1 year", schedule: "Remote", reason: "Better cultural fit found" },
    { id: 16, title: "SEO Specialist", duration: "3 months", schedule: "Freelance", reason: "Company priorities changed" },
    { id: 17, title: "AI Engineer", duration: "1 year", schedule: "Full-time", reason: "Skill mismatch" },
    { id: 18, title: "Graphic Designer", duration: "6 months", schedule: "Contract", reason: "Budget cut" },
    { id: 19, title: "Product Manager", duration: "1 year", schedule: "Hybrid", reason: "More experienced hire" },
    { id: 20, title: "Customer Support", duration: "6 months", schedule: "Part-time", reason: "Better language skills needed" },
];

function RejectedJobs() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Rejected Jobs</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Duration</th>
                            <th className="p-3 text-left">Schedule</th>
                            <th className="p-3 text-left">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rejectedJobsData.map((job, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="p-3">{job.title}</td>
                                <td className="p-3">{job.duration}</td>
                                <td className="p-3">{job.schedule}</td>
                                <td className="p-3">{job.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RejectedJobs;