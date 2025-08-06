"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { UserPlus, Rocket, Handshake, BarChart2 } from "lucide-react";
import Swal from "sweetalert2"; // Import Swal2

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;

    const router = useRouter();

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("/api/jobs");
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                    setFilteredJobs(data);
                    setCategories([...new Set(data.map((job) => job.category))]);
                } else {
                    setError("Failed to fetch jobs. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError("An error occurred while fetching jobs.");
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    useEffect(() => {
        let filtered = jobs;

        if (searchQuery) {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
        setCurrentPage(1);
    }, [searchQuery, jobs]);

    const handleJobClick = (jobId) => {
        router.push(`/singleJob/${jobId}`);
    };

    // Function to handle "Apply Now"
    const handleApplyNow = async (e, jobTitle) => {
        e.stopPropagation(); // Stop event propagation to prevent triggering handleJobClick

        const { value: formValues } = await Swal.fire({
            title: `<span class="text-2xl font-bold text-gray-800">Apply for ${jobTitle}</span>`,
            html: `
                <div class="space-y-4 text-left p-4">
                    <div>
                        <label for="swal-input-name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input id="swal-input-name" class="swal2-input custom-swal-input" placeholder="John Doe">
                    </div>
                    <div>
                        <label for="swal-input-email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input id="swal-input-email" type="email" class="swal2-input custom-swal-input" placeholder="john.doe@example.com">
                    </div>
                    <div>
                        <label for="swal-input-role" class="block text-sm font-medium text-gray-700 mb-1">Role Preference</label>
                        <select id="swal-input-role" class="swal2-select custom-swal-input">
                            <option value="">Select a role</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div>
                        <label for="swal-input-cv" class="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF, DOC, DOCX)</label>
                        <input id="swal-input-cv" type="file" class="swal2-file custom-swal-file" accept=".pdf,.doc,.docx">
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Submit Application',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
            },
            buttonsStyling: false, // Disable default Swal2 button styling to use custom classes
            preConfirm: () => {
                const name = document.getElementById('swal-input-name').value;
                const email = document.getElementById('swal-input-email').value;
                const rolePreference = document.getElementById('swal-input-role').value;
                const cvFile = document.getElementById('swal-input-cv').files[0];

                if (!name || !email || !rolePreference || !cvFile) {
                    Swal.showValidationMessage('All fields are required!');
                    return false;
                }

                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    Swal.showValidationMessage('Please enter a valid email address.');
                    return false;
                }

                // File type validation (already handled by accept attribute but good to have server-side too)
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (cvFile && !allowedTypes.includes(cvFile.type)) {
                    Swal.showValidationMessage('Please upload a PDF, DOC, or DOCX file for your CV.');
                    return false;
                }

                return { name, email, rolePreference, cvFile };
            }
        });

        if (formValues) {
            // In a real application, you would send formValues.name, formValues.email,
            // formValues.rolePreference, and formValues.cvFile to your backend for processing.
            // Example of how you might prepare data for FormData if sending to an API:
            // const formData = new FormData();
            // formData.append('name', formValues.name);
            // formData.append('email', formValues.email);
            // formData.append('rolePreference', formValues.rolePreference);
            // formData.append('cv', formValues.cvFile);
            //
            // try {
            //     const response = await fetch('/api/apply', {
            //         method: 'POST',
            //         body: formData,
            //     });
            //     if (response.ok) {
            //         Swal.fire({
            //             icon: 'success',
            //             title: 'Application Submitted!',
            //             text: `Thank you, ${formValues.name}! Your application for "${jobTitle}" has been received.`,
            //             confirmButtonText: 'OK'
            //         });
            //     } else {
            //         Swal.fire({
            //             icon: 'error',
            //             title: 'Submission Failed',
            //             text: 'There was an issue submitting your application. Please try again.',
            //             confirmButtonText: 'OK'
            //         });
            //     }
            // } catch (error) {
            //     console.error("Error submitting application:", error);
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Submission Failed',
            //         text: 'An unexpected error occurred. Please try again.',
            //         confirmButtonText: 'OK'
            //     });
            // }

            // For this example, we'll just simulate a successful submission.
            console.log("Application Data:", formValues);

            Swal.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: `Thank you, ${formValues.name}! Your application for "${jobTitle}" has been received. We'll be in touch.`,
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-success-popup',
                    confirmButton: 'custom-swal-confirm-button',
                },
                buttonsStyling: false,
            });
        }
    };

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p className="text-lg font-semibold">Loading jobs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p className="text-lg font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-center text-gray-800">
                        Find Work That Works For You.
                    </h1>
                    <p className="text-lg mb-5 mt-4 text-center text-gray-600">We connect professionals to temp, perm, and contract jobs across the UK.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-10 text-center">
                        <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
                            <UserPlus className="h-6 w-6 text-teal-600 mb-2" />
                            <p className="text-gray-600 font-semibold">Free to Register With Us</p>
                        </div>
                        <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
                            <Rocket className="h-6 w-6 text-teal-600 mb-2" />
                            <p className="text-gray-600 font-semibold">Fast-track to Top Employers</p>
                        </div>
                        <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
                            <Handshake className="h-6 w-6 text-teal-600 mb-2" />
                            <p className="text-gray-600 font-semibold">1:1 Support from Our Team</p>
                        </div>
                        <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
                            <BarChart2 className="h-6 w-6 text-teal-600 mb-2" />
                            <p className="text-gray-600 font-semibold">Career Growth Resources</p>
                        </div>
                    </div>

                    {/* Filters Area */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => router.push("/signUp")}
                                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 shadow-sm transition-all"
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => router.push("/uploadCV")}
                                    className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 shadow-sm transition-all"
                                >
                                    Upload Your CV
                                </button>
                            </div>

                            <div className="relative w-full md:w-[350px]">
                                <input
                                    type="text"
                                    className="w-full p-3 pl-10 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 text-gray-700"
                                    placeholder="Search by keywords, company"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>
                    </div>
                    {/* Categories as Tiles */}
                    {categories.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">Browse by Categories</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {categories.map((cat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 cursor-pointer text-center border border-gray-200 text-md font-medium text-gray-700 hover:bg-indigo-50"
                                        onClick={() => setSearchQuery(cat)}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Job Listings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentJobs.length > 0 ? (
                            currentJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{job.title}</h2>
                                        <p className="flex items-center text-gray-600 mb-2 text-sm">
                                            <FaBuilding className="mr-2 text-gray-500" />
                                            <span className="font-medium line-clamp-1">{job.company}</span>
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-3 text-sm">
                                            <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                            <span className="font-medium">{job.location}</span>
                                        </p>
                                        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                                        <div className="flex items-center justify-between">
                                            {job.salary && (
                                                <p className="flex items-center text-green-600 font-semibold text-sm">
                                                    <FaMoneyBillWave className="mr-2 text-green-500" />
                                                    <span className="font-bold">${job.salary}</span>
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 italic">
                                                Posted on: {new Date(job.postedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center gap-2">
                                            <button
                                                onClick={(e) => handleJobClick(job._id)}
                                                className="flex-grow bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm text-sm"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={(e) => handleApplyNow(e, job.title)}
                                                className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm text-sm"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600">No jobs match your current search criteria.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 mx-1 rounded-md font-semibold focus:outline-none ${page === currentPage
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            {/* Styled JSX for scoped CSS */}
            <style jsx global>{`
                /* Custom styles for Swal2 modal */
                .custom-swal-popup {
                    padding-top: 20px !important;
                    border-radius: 0.75rem !important; /* Tailwind's rounded-lg */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; /* Tailwind's shadow-lg */
                    background-color: #ffffff !important;
                    color: #333333 !important;
                    font-family: 'Inter', sans-serif !important; /* Use a common clean font */
                }

                .custom-swal-title {
                    color: #1f2937 !important; /* Tailwind's gray-800 */
                    font-size: 1.5rem !important; /* Tailwind's text-2xl */
                    font-weight: 700 !important; /* Tailwind's font-bold */
                    margin-bottom: 1.5rem !important;
                }

                .custom-swal-input {
                    width: 100% !important;
                    padding: 0.75rem !important;
                    border: 1px solid #d1d5db !important; /* Tailwind's border-gray-300 */
                    border-radius: 0.375rem !important; /* Tailwind's rounded-md */
                    font-size: 1rem !important;
                    color: #374151 !important; /* Tailwind's gray-700 */
                    margin: 0 !important;
                    margin-top: 0.25rem !important; /* Added for spacing with label */
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
                    
                }

                .custom-swal-input:focus {
                    border-color: #6366f1 !important; /* Tailwind's indigo-500 or blue-500 */
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25) !important; /* Focus ring */
                    outline: none !important;
                }

                .custom-swal-file {
                    /* Basic styling for file input */
                    padding: 0.75rem !important;
                    border: 1px solid #d1d5db !important;
                    border-radius: 0.375rem !important;
                    font-size: 1rem !important;
                    color: #374151 !important;
                    background-color: #f9fafb !important; /* Light background */
                    margin-top: 0.25rem !important;
                    width: 100% !important;
                }

                .custom-swal-file::file-selector-button {
                    background-color: #4f46e5 !important; /* Tailwind's indigo-600 */
                    color: white !important;
                    border: none !important;
                    padding: 0.5rem 1rem !important;
                    border-radius: 0.375rem !important;
                    cursor: pointer !important;
                    margin-right: 1rem !important;
                    transition: background-color 0.15s ease-in-out !important;
                }

                .custom-swal-file::file-selector-button:hover {
                    background-color: #4338ca !important; /* Darker indigo on hover */
                }

                .custom-swal-confirm-button {
                    background-color: #4f46e5 !important; /* Tailwind's indigo-600 */
                    color: white !important;
                    font-weight: 600 !important; /* Tailwind's font-semibold */
                    padding: 0.625rem 1.5rem !important; /* Tailwind's py-2.5 px-6 */
                    border-radius: 0.375rem !important; /* Tailwind's rounded-md */
                    transition: background-color 0.2s ease-in-out !important;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
                }

                .custom-swal-confirm-button:hover {
                    background-color: #4338ca !important; /* Tailwind's indigo-700 */
                }

                .custom-swal-cancel-button {
                    background-color: #ef4444 !important; /* Tailwind's red-500 */
                    color: white !important;
                    font-weight: 600 !important;
                    padding: 0.625rem 1.5rem !important;
                    border-radius: 0.375rem !important;
                    transition: background-color 0.2s ease-in-out !important;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
                    margin-left: 0.75rem !important; /* Added for spacing */
                }

                .custom-swal-cancel-button:hover {
                    background-color: #dc2626 !important; /* Tailwind's red-600 */
                }

                /* Specific styling for the success modal */
                .custom-swal-success-popup {
                    border-left: 5px solid #22c55e !important; /* Tailwind's green-500 */
                }

                /* Ensure the swal2-input, swal2-select, swal2-file reset some default styles */
                .swal2-input, .swal2-select, .swal2-file {
                    box-sizing: border-box !important; /* Important for consistent sizing */
                }
            `}</style>
        </div>
    );
}

export default AllJobs;