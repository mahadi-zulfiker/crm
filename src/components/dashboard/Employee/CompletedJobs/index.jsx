import React from 'react';

const completedJobsData = [
    { id: 1, title: "Software Engineer", duration: "6 months", schedule: "Full-time", feedback: "Excellent performance" },
    { id: 2, title: "UI/UX Designer", duration: "3 months", schedule: "Part-time", feedback: "Great design skills" },
    { id: 3, title: "Data Analyst", duration: "1 year", schedule: "Full-time", feedback: "Detailed and accurate reports" },
    { id: 4, title: "Backend Developer", duration: "6 months", schedule: "Remote", feedback: "Optimized and scalable code" },
    { id: 5, title: "Marketing Specialist", duration: "1 year", schedule: "Full-time", feedback: "Effective campaigns" },
    { id: 6, title: "Project Manager", duration: "9 months", schedule: "Hybrid", feedback: "Strong leadership" },
    { id: 7, title: "QA Engineer", duration: "6 months", schedule: "Full-time", feedback: "Thorough testing" },
    { id: 8, title: "DevOps Engineer", duration: "1 year", schedule: "Remote", feedback: "Smooth CI/CD pipeline" },
    { id: 9, title: "Frontend Developer", duration: "6 months", schedule: "Full-time", feedback: "Great UI implementation" },
    { id: 10, title: "System Administrator", duration: "1 year", schedule: "Hybrid", feedback: "Efficient system management" },
];

function CompletedJobs() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Completed Jobs</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-green-800 text-white">
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Duration</th>
                            <th className="p-3 text-left">Schedule</th>
                            <th className="p-3 text-left">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedJobsData.map((job, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="p-3">{job.title}</td>
                                <td className="p-3">{job.duration}</td>
                                <td className="p-3">{job.schedule}</td>
                                <td className="p-3">{job.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompletedJobs;
