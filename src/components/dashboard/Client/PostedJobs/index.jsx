import React, { useState } from 'react';

const postedJobsData = [
    { id: 1, title: 'Frontend Developer', description: 'Develop user-facing features.', location: 'New York, NY', datePosted: '2025-01-15', applicationDeadline: '2025-02-15', status: 'Open' },
    { id: 2, title: 'Backend Developer', description: 'Build server-side logic.', location: 'San Francisco, CA', datePosted: '2025-01-10', applicationDeadline: '2025-02-10', status: 'Closed' },
    { id: 3, title: 'UI/UX Designer', description: 'Design intuitive user interfaces.', location: 'Los Angeles, CA', datePosted: '2025-01-12', applicationDeadline: '2025-02-12', status: 'Open' },
    { id: 4, title: 'Data Analyst', description: 'Analyze business data trends.', location: 'Chicago, IL', datePosted: '2025-01-08', applicationDeadline: '2025-02-08', status: 'Open' },
    { id: 5, title: 'Project Manager', description: 'Oversee project timelines.', location: 'Seattle, WA', datePosted: '2025-01-18', applicationDeadline: '2025-02-18', status: 'Closed' },
    { id: 6, title: 'DevOps Engineer', description: 'Manage CI/CD pipelines.', location: 'Austin, TX', datePosted: '2025-01-07', applicationDeadline: '2025-02-07', status: 'Open' },
    { id: 7, title: 'QA Engineer', description: 'Test and debug software.', location: 'Boston, MA', datePosted: '2025-01-11', applicationDeadline: '2025-02-11', status: 'Closed' },
    { id: 8, title: 'Marketing Specialist', description: 'Develop marketing campaigns.', location: 'Miami, FL', datePosted: '2025-01-09', applicationDeadline: '2025-02-09', status: 'Open' },
    { id: 9, title: 'Product Manager', description: 'Define product strategies.', location: 'Denver, CO', datePosted: '2025-01-05', applicationDeadline: '2025-02-05', status: 'Open' },
    { id: 10, title: 'Cybersecurity Analyst', description: 'Ensure data protection.', location: 'Washington, DC', datePosted: '2025-01-14', applicationDeadline: '2025-02-14', status: 'Closed' },
    { id: 11, title: 'Technical Writer', description: 'Create technical documentation.', location: 'Dallas, TX', datePosted: '2025-01-06', applicationDeadline: '2025-02-06', status: 'Open' },
    { id: 12, title: 'AI Engineer', description: 'Develop AI-driven solutions.', location: 'San Diego, CA', datePosted: '2025-01-13', applicationDeadline: '2025-02-13', status: 'Open' },
    { id: 13, title: 'Sales Manager', description: 'Lead sales teams.', location: 'Phoenix, AZ', datePosted: '2025-01-17', applicationDeadline: '2025-02-17', status: 'Closed' },
    { id: 14, title: 'Graphic Designer', description: 'Create engaging visuals.', location: 'Philadelphia, PA', datePosted: '2025-01-04', applicationDeadline: '2025-02-04', status: 'Open' },
    { id: 15, title: 'HR Coordinator', description: 'Manage hiring processes.', location: 'Houston, TX', datePosted: '2025-01-03', applicationDeadline: '2025-02-03', status: 'Closed' },
    { id: 16, title: 'Cloud Architect', description: 'Design cloud solutions.', location: 'San Jose, CA', datePosted: '2025-01-02', applicationDeadline: '2025-02-02', status: 'Open' },
    { id: 17, title: 'Customer Support Rep', description: 'Handle customer inquiries.', location: 'Las Vegas, NV', datePosted: '2025-01-20', applicationDeadline: '2025-02-20', status: 'Open' },
    { id: 18, title: 'Business Analyst', description: 'Analyze business needs.', location: 'Atlanta, GA', datePosted: '2025-01-16', applicationDeadline: '2025-02-16', status: 'Closed' },
    { id: 19, title: 'Content Writer', description: 'Produce high-quality content.', location: 'Portland, OR', datePosted: '2025-01-01', applicationDeadline: '2025-02-01', status: 'Open' },
    { id: 20, title: 'Operations Manager', description: 'Manage daily operations.', location: 'Charlotte, NC', datePosted: '2025-01-19', applicationDeadline: '2025-02-19', status: 'Open' }
];


function PostedJobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    // Filter and search logic
    const filteredJobs = postedJobsData.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Posted Jobs</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by job title..."
                    className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            {/* Job Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-orange-800 text-white">
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Location</th>
                            <th className="p-3 text-left">Date Posted</th>
                            <th className="p-3 text-left">Application Deadline</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((job) => (
                            <tr key={job.id} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="p-3">{job.title}</td>
                                <td className="p-3">{job.description}</td>
                                <td className="p-3">{job.location}</td>
                                <td className="p-3">{job.datePosted}</td>
                                <td className="p-3">{job.applicationDeadline}</td>
                                <td className="p-3 font-semibold text-green-600">{job.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-orange-800 text-white' : 'bg-white text-orange-800'}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PostedJobs;
