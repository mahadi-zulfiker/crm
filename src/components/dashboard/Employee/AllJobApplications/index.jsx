"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Calendar,
  MapPin,
  DollarSign,
  Loader2,
  XCircle,
} from "lucide-react";

export default function AllJobApplications() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [categorizedApplications, setCategorizedApplications] = useState({
    applied: [],
    interviewScheduled: [],
    approved: [],
    rejected: [],
    completed: [],
    pending: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchAllJobApplications();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchAllJobApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/employeeApplications?email=${session.user.email}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch job applications: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setApplications(data.allApplications || []);

      // Set categorized applications for stats
      setCategorizedApplications({
        applied: data.appliedJobs || [],
        interviewScheduled: data.interviewScheduled || [],
        approved: data.approvedJobs || [],
        rejected: data.rejectedJobs || [],
        completed: data.completedJobs || [],
        pending: data.pendingReview || [],
      });
    } catch (err) {
      console.error("Error fetching job applications:", err);
      setError(err.message || "Error fetching job applications data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-blue-100 text-blue-700";
      case "interview-scheduled":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending review":
        return "bg-yellow-100 text-yellow-700";
      case "hired":
        return "bg-purple-100 text-purple-700";
      case "approved":
        return "bg-indigo-100 text-indigo-700";
      case "completed":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "interview-scheduled":
        return "Interview Scheduled";
      default:
        return status;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="text-gray-600 mt-4">Loading job applications...</p>
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
            Please sign in to view your job applications.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Job Applications
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchAllJobApplications}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            All Job Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Complete history of all your job applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {applications.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Applied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {categorizedApplications.applied.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {categorizedApplications.interviewScheduled.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">
              {categorizedApplications.approved.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {categorizedApplications.rejected.length}
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
            <div className="text-2xl font-bold text-teal-600">
              {categorizedApplications.completed.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Job Applications</CardTitle>
          <CardDescription>
            Complete list of all your job applications and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No job applications found</p>
              <p className="text-gray-500 mt-2">
                Your job applications will appear here once you apply for jobs
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Job Details
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {app.position || app.title || "Job Title"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.jobType} • ${app.salary}
                        </div>
                        {/* Show interview schedule if available */}
                        {app.status === "interview-scheduled" &&
                          app.interviewSchedule && (
                            <div className="text-sm text-green-600 mt-2 p-2 bg-green-50 rounded border border-green-200">
                              <div className="font-medium mb-1 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Interview Details
                              </div>
                              <div className="flex items-center text-xs mb-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>
                                  {new Date(
                                    app.interviewSchedule.date
                                  ).toLocaleDateString()}{" "}
                                  at {app.interviewSchedule.time}
                                </span>
                              </div>
                              <div className="flex items-center text-xs mb-1">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>
                                  {app.interviewSchedule.duration} minutes
                                </span>
                              </div>
                              <div className="flex items-center text-xs mb-1">
                                {app.interviewSchedule.type === "video" && (
                                  <Video className="w-3 h-3 mr-1" />
                                )}
                                {app.interviewSchedule.type === "phone" && (
                                  <Phone className="w-3 h-3 mr-1" />
                                )}
                                {app.interviewSchedule.type === "in-person" && (
                                  <MapPin className="w-3 h-3 mr-1" />
                                )}
                                <span className="capitalize">
                                  {app.interviewSchedule.type}
                                </span>
                              </div>
                              {app.interviewSchedule.meetingLink && (
                                <div className="text-xs mt-1">
                                  <a
                                    href={app.interviewSchedule.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                  >
                                    Meeting Link
                                  </a>
                                </div>
                              )}
                              <div className="text-xs mt-1">
                                Interviewer: {app.interviewSchedule.interviewer}
                              </div>
                            </div>
                          )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={app.companyLogo || "/placeholder.svg"}
                              alt={app.company || "Company"}
                            />
                            <AvatarFallback className="bg-gray-200 text-xs">
                              {app.company?.charAt(0) || "C"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-gray-700">
                            {app.company || "Company"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {app.appliedAt
                            ? new Date(app.appliedAt).toLocaleDateString(
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
                        <Badge
                          className={`${getStatusColor(
                            app.status
                          )} px-2 py-1 text-xs font-medium rounded-full`}
                        >
                          {formatStatus(app.status) || "Pending"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() =>
                            (window.location.href = `/singleJob/${
                              app.jobId || app._id
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
