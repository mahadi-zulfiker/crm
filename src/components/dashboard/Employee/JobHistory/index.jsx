"use client";
import { useState, useEffect } from "react";
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
  History,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  XCircle,
  Loader2,
} from "lucide-react";

export default function JobHistory() {
  const [jobHistory, setJobHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobHistory();
  }, []);

  const fetchJobHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/jobHistoryEmployee");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch job history: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setJobHistory(data);
    } catch (err) {
      console.error("Error fetching job history:", err);
      setError(err.message || "Error fetching job history data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Completed: { className: "bg-green-100 text-green-800" },
      "In Progress": { className: "bg-blue-100 text-blue-800" },
      Cancelled: { className: "bg-red-100 text-red-800" },
      "On Hold": { className: "bg-yellow-100 text-yellow-800" },
      Approved: { className: "bg-purple-100 text-purple-800" },
      Pending: { className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status] || {
      className: "bg-gray-100 text-gray-800",
    };
    return <Badge className={config.className}>{status}</Badge>;
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

  const getTotalEarnings = () => {
    return jobHistory.reduce((total, job) => {
      const payment = Number.parseFloat(job.payment) || 0;
      return total + payment;
    }, 0);
  };

  const getAveragePayment = () => {
    if (jobHistory.length === 0) return 0;
    return getTotalEarnings() / jobHistory.length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="text-gray-600 mt-4">Loading job history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Job History
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchJobHistory}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <History className="w-8 h-8" />
            Job History
          </h1>
          <p className="text-gray-600 mt-1">
            Complete history of all your job activities
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {jobHistory.length}
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
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {jobHistory.filter((job) => job.status === "Completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              $
              {getAveragePayment().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Job History</CardTitle>
          <CardDescription>
            All your job activities and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {jobHistory.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No job history found</p>
              <p className="text-gray-500 mt-2">
                Your job history will appear here as you work on projects
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
                      Payment
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobHistory.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {job.title || job.position || "Job Title"}
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
                        {getStatusBadge(job.status || "Pending")}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-600">
                          $
                          {Number.parseFloat(job.payment || 0).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </div>
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
