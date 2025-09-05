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
  XCircle,
  Mail,
  Phone,
  FileText,
  Calendar,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";

function RejectedJobs() {
  const { data: session, status } = useSession();
  const [allJobs, setAllJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchRejectedJobs();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchRejectedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/applicationManagementEmployee?email=${session.user.email}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch applications: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Filter for rejected jobs
      const rejected =
        data.allApplications?.filter(
          (job) => job.status === "Rejected" || job.statusJob === "Rejected"
        ) || [];

      setRejectedJobs(rejected);
      setAllJobs(data.allApplications || []);
    } catch (err) {
      console.error("Error fetching rejected jobs:", err);
      setError(err.message || "Failed to fetch rejected applications");
    } finally {
      setLoading(false);
    }
  };

  const getRejectionRate = () => {
    if (allJobs.length === 0) return 0;
    return Math.round((rejectedJobs.length / allJobs.length) * 100);
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
            Please sign in to view your rejected applications.
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
          <p className="text-gray-600 mt-4">Loading rejected applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Rejected Applications
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchRejectedJobs}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <XCircle className="w-8 h-8 text-red-600" />
            Rejected Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Applications that were not successful
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Total Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rejectedJobs.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {allJobs.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rejection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {getRejectionRate()}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rejected Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Rejected Job Applications
          </CardTitle>
          <CardDescription>
            Review your rejected applications to understand areas for
            improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rejectedJobs.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No rejected applications</p>
              <p className="text-gray-500 mt-2">
                Great news! You don't have any rejected applications yet
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
                      Applied Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Rejection Reason
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedJobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {job.position || job.title || "Job Title"}
                        </div>
                        <Badge className="bg-red-100 text-red-800 mt-1">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700">
                          {job.company || "Company"}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
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
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-red-100 text-red-800">
                          {job.status || job.statusJob || "Rejected"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-700 max-w-xs">
                          {job.reason ||
                            job.rejectionReason ||
                            "No specific reason provided"}
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

      {/* Tips for Improvement */}
      {rejectedJobs.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Tips for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-700">
              <li>
                • Review the rejection reasons to understand what employers are
                looking for
              </li>
              <li>
                • Consider updating your resume and cover letter based on
                feedback
              </li>
              <li>• Research companies thoroughly before applying</li>
              <li>
                • Tailor your applications to match job requirements more
                closely
              </li>
              <li>
                • Consider gaining additional skills or certifications in your
                field
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default RejectedJobs;
