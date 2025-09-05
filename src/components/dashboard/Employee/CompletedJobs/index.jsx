"use client";
import { useEffect, useState } from "react";
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
  DollarSign,
  Briefcase,
  Building2,
  MapPin,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";

function CompletedJobs() {
  const { data: session, status } = useSession();
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchCompletedJobs();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchCompletedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/applicationManagementEmployee?email=${session.user.email}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch completed jobs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Filter for completed jobs
      const completed =
        data.allApplications?.filter(
          (job) => job.statusJob === "Completed" || job.status === "Completed"
        ) || [];

      setCompletedJobs(completed);
    } catch (err) {
      console.error("Error fetching completed jobs:", err);
      setError(err.message || "Failed to fetch completed jobs");
    } finally {
      setLoading(false);
    }
  };

  const getTotalEarnings = () => {
    return completedJobs.reduce((total, job) => {
      const salary = Number.parseFloat(job.salary) || 0;
      return total + salary;
    }, 0);
  };

  const getAverageSalary = () => {
    if (completedJobs.length === 0) return 0;
    return getTotalEarnings() / completedJobs.length;
  };

  const getJobTypeBadge = (jobType) => {
    const typeConfig = {
      "Full-time": { className: "bg-green-100 text-green-800" },
      "Part-time": { className: "bg-blue-100 text-blue-800" },
      Contract: { className: "bg-purple-100 text-purple-800" },
      Freelance: { className: "bg-orange-100 text-orange-800" },
      Internship: { className: "bg-teal-100 text-teal-800" },
    };

    const config = typeConfig[jobType] || {
      className: "bg-gray-100 text-gray-800",
    };

    return <Badge className={config.className}>{jobType}</Badge>;
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
            Please sign in to view your completed jobs.
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
          <p className="text-gray-600 mt-4">Loading completed jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Completed Jobs
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchCompletedJobs}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Completed Jobs</h1>
          <p className="text-gray-600 mt-1">
            Your successfully completed job assignments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Total Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedJobs.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              $
              {getTotalEarnings().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Average Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              $
              {getAverageSalary().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Jobs History</CardTitle>
          <CardDescription>
            All your successfully completed job assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedJobs.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No completed jobs found</p>
              <p className="text-gray-500 mt-2">
                Your completed jobs will appear here once you finish assignments
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
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Job Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Salary
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Completed Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completedJobs.map((job) => (
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
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {job.company || "Company"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {job.location || "Location"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getJobTypeBadge(job.jobType || "Full-time")}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-600">
                          $
                          {Number.parseFloat(job.salary || 0).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {job.statusJob || job.status || "Completed"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {job.completedAt
                          ? new Date(job.completedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : job.appliedAt
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() =>
                            (window.location.href = `/singleJob/${
                              job.jobId || job._id
                            }`)
                          }
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
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
}

export default CompletedJobs;
