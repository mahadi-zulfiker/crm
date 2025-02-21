"use client";
import React, { useEffect, useState } from "react";

function CompletedJobs() {
    const [allJobs, setAllJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("/api/applicationManagement");
                const data = await response.json();

                if (data.success) {
                    setAllJobs(data.data);
                    const completed = data.data.filter(job => job.statusJob === "Completed");
                    setCompletedJobs(completed);
                } else {
                    setError("Failed to fetch data");
                }
            } catch (err) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-semibold">{error}</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Completed Jobs</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-green-800 text-white">
                            <th className="p-3 text-left">Full Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Schedule</th>
                            <th className="p-3 text-left">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedJobs.length > 0 ? (
                            completedJobs.map((job, index) => (
                                <tr key={job._id || index} className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="p-3">{job.fullName}</td>
                                    <td className="p-3">{job.email}</td>
                                    <td className="p-3">{job.phone}</td>
                                    <td className="p-3">{job.position}</td>
                                    <td className="p-3">{job.appliedAt}</td>
                                    <td className="p-3">{job.feedback || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-3 text-center text-gray-500">No completed jobs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompletedJobs;
