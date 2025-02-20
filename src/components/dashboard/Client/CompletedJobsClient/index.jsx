"use client";
import React, { useState } from 'react';

const completedJobsData = [
    { id: 1, title: 'Website Redesign', description: 'Complete overhaul of the company website.', completionDate: '2025-01-15', clientFeedback: 'Outstanding work!', status: 'Approved' },
    { id: 2, title: 'Mobile App Development', description: 'Developed a cross-platform mobile application.', completionDate: '2025-01-10', clientFeedback: 'Met all expectations.', status: 'Approved' },
    { id: 3, title: 'SEO Optimization', description: 'Improved search engine rankings.', completionDate: '2025-01-12', clientFeedback: 'Significant improvement in traffic.', status: 'Approved' },
    { id: 4, title: 'Social Media Campaign', description: 'Managed a successful social media campaign.', completionDate: '2025-01-08', clientFeedback: 'Great engagement metrics.', status: 'Approved' },
    { id: 5, title: 'E-commerce Platform', description: 'Developed an online store.', completionDate: '2025-01-18', clientFeedback: 'Sales have increased.', status: 'Approved' },
    { id: 6, title: 'Logo Design', description: 'Created a new company logo.', completionDate: '2025-01-07', clientFeedback: 'Love the new logo!', status: 'Approved' },
    { id: 7, title: 'Content Writing', description: 'Produced blog articles.', completionDate: '2025-01-11', clientFeedback: 'Well-written and informative.', status: 'Approved' },
    { id: 8, title: 'Email Marketing', description: 'Launched an email marketing campaign.', completionDate: '2025-01-09', clientFeedback: 'High open rates.', status: 'Approved' },
    { id: 9, title: 'Video Production', description: 'Created promotional videos.', completionDate: '2025-01-05', clientFeedback: 'Professional quality.', status: 'Approved' },
    { id: 10, title: 'Market Research', description: 'Conducted market analysis.', completionDate: '2025-01-14', clientFeedback: 'Valuable insights.', status: 'Approved' },
    { id: 11, title: 'Brand Strategy', description: 'Developed a brand strategy.', completionDate: '2025-01-06', clientFeedback: 'Clear and effective.', status: 'Approved' },
    { id: 12, title: 'Product Launch', description: 'Managed product launch.', completionDate: '2025-01-13', clientFeedback: 'Successful launch.', status: 'Approved' },
    { id: 13, title: 'Customer Survey', description: 'Conducted customer satisfaction survey.', completionDate: '2025-01-17', clientFeedback: 'Useful feedback.', status: 'Approved' },
    { id: 14, title: 'IT Support', description: 'Provided IT support services.', completionDate: '2025-01-04', clientFeedback: 'Issues resolved quickly.', status: 'Approved' },
    { id: 15, title: 'Training Session', description: 'Conducted staff training.', completionDate: '2025-01-03', clientFeedback: 'Informative and engaging.', status: 'Approved' },
    { id: 16, title: 'Data Analysis', description: 'Analyzed sales data.', completionDate: '2025-01-02', clientFeedback: 'Detailed report.', status: 'Approved' },
    { id: 17, title: 'Public Relations', description: 'Managed PR activities.', completionDate: '2025-01-20', clientFeedback: 'Positive media coverage.', status: 'Approved' },
    { id: 18, title: 'Event Planning', description: 'Organized corporate event.', completionDate: '2025-01-16', clientFeedback: 'Event was a success.', status: 'Approved' },
    { id: 19, title: 'Software Development', description: 'Developed custom software.', completionDate: '2025-01-01', clientFeedback: 'Software works flawlessly.', status: 'Approved' },
    { id: 20, title: 'Graphic Design', description: 'Created marketing materials.', completionDate: '2025-01-19', clientFeedback: 'Visually appealing designs.', status: 'Approved' }
];

function CompletedJobsClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const filteredJobs = completedJobsData.filter(job =>
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
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Completed Jobs</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-orange-800 text-white">
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Completion Date</th>
                            <th className="p-3 text-left">Client Feedback</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((job, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="p-3">{job.title}</td>
                                <td className="p-3">{job.description}</td>
                                <td className="p-3">{job.completionDate}</td>
                                <td className="p-3">{job.clientFeedback}</td>
                                <td className="p-3 font-semibold text-green-600">{job.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CompletedJobsClient;