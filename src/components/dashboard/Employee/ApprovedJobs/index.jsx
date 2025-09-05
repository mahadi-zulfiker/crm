"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Briefcase,
  Loader2,
  Eye,
} from "lucide-react";
import { useSession } from "next-auth/react";

const ApprovedJobs = () => {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchApprovedJobs();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchApprovedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/applicationManagementEmployee?email=${session.user.email}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch approved jobs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Filter for approved jobs
      const approvedJobs =
        data.allApplications?.filter(
          (job) => job.status === "Approved" || job.statusJob === "Approved"
        ) || [];

      setJobs(approvedJobs);
    } catch (err) {
      console.error("Error fetching approved jobs:", err);
      setError(err.message || "Failed to fetch approved jobs");
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (id, action) => {
    try {
      const confirmText =
        action === "complete"
          ? "You are about to mark this job as completed."
          : "You will resign from this job.";

      const result = await Swal.fire({
        title: "Are you sure?",
        text: confirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${action}!`,
      });

      if (result.isConfirmed) {
        const response = await fetch("/api/approvedJobsEmployee", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, action }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.message || "Failed to update job");
        }

        // Update the local state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === id
              ? {
                  ...job,
                  statusJob: action === "complete" ? "Completed" : "Resigned",
                }
              : job
          )
        );

        Swal.fire("Success!", `Job marked as ${action}.`, "success");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      Swal.fire(
        "Error!",
        error.message || "Failed to update job status",
        "error"
      );
    }
  };

  const handleArrangeMeeting = async (jobTitle) => {
    await Swal.fire({
      title: "Meeting Arranged!",
      text: `Meeting has been arranged for: ${jobTitle}`,
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Completed: {
        variant: "default",
        className: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      Resigned: {
        variant: "destructive",
        className: "bg-red-100 text-red-800",
        icon: XCircle,
      },
      Approved: {
        variant: "secondary",
        className: "bg-blue-100 text-blue-800",
        icon: Briefcase,
      },
    };

    const config = statusConfig[status] || statusConfig["Approved"];
    const IconComponent = config.icon;

    return (
      <Badge className={`flex items-center gap-1 ${config.className}`}>
        <IconComponent className="w-3 h-3" />
        {status || "Approved"}
      </Badge>
    );
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="text-gray-600 mt-4">Loading session...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please sign in to view your approved jobs.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="text-gray-600 mt-4">Loading approved jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Approved Jobs
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchApprovedJobs}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approved Jobs</h1>
          <p className="text-gray-600 mt-1">
            Manage your approved job applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter((job) => job.statusJob === "Completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {
                jobs.filter(
                  (job) =>
                    job.statusJob !== "Completed" &&
                    job.statusJob !== "Resigned"
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approved Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Approved Jobs</CardTitle>
          <CardDescription>
            Jobs that have been approved and are ready for action
          </CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No approved jobs found</p>
              <p className="text-gray-500 mt-2">
                Your approved job applications will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Job Title
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Company
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Schedule
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Meeting
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {job.position || job.title || "Job Title"}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700">
                          {job.company || "Company"}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {job.appliedAt
                          ? new Date(job.appliedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(job.statusJob || job.status)}
                      </td>
                      <td className="py-4 px-4">
                        <Link href="/scheduleMeet">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 bg-transparent"
                            onClick={() =>
                              handleArrangeMeeting(job.position || job.title)
                            }
                          >
                            <Calendar className="w-4 h-4" />
                            Arrange Meeting
                          </Button>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-transparent"
                            onClick={() =>
                              (window.location.href = `/singleJob/${
                                job.jobId || job._id
                              }`)
                            }
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {job.statusJob !== "Completed" &&
                            job.statusJob !== "Resigned" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() =>
                                    updateJobStatus(job._id, "complete")
                                  }
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Complete
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    updateJobStatus(job._id, "resign")
                                  }
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Resign
                                </Button>
                              </>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovedJobs;
