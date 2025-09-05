"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Loader2,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchAllApplications = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/employeeApplications?email=${session.user.email}`
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch applications: ${response.status} ${response.statusText}`
            );
          }

          const data = await response.json();

          // Use allApplications to show all statuses
          setApplications(data.allApplications || []);
          setFilteredApplications(data.allApplications || []);
        } catch (err) {
          console.error("Error fetching applications:", err);
          setError(err.message || "Failed to fetch applications");
        } finally {
          setLoading(false);
        }
      };

      fetchAllApplications();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(
        (app) => app.status?.toLowerCase() === statusFilter
      );
      setFilteredApplications(filtered);
    }
  }, [statusFilter, applications]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-blue-100 text-blue-700";
      case "interview-scheduled":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
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
      case "pending review":
        return "Pending Review";
      default:
        return status;
    }
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not scheduled";
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-8 text-center">
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
            Error Loading Applications
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (!session?.user?.email) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-8 text-center">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please sign in to view your applied jobs.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate statistics
  const stats = {
    total: applications.length,
    applied: applications.filter(
      (app) => app.status?.toLowerCase() === "applied"
    ).length,
    interviewScheduled: applications.filter(
      (app) => app.status?.toLowerCase() === "interview-scheduled"
    ).length,
    approved: applications.filter(
      (app) => app.status?.toLowerCase() === "approved"
    ).length,
    hired: applications.filter((app) => app.status?.toLowerCase() === "hired")
      .length,
    pending: applications.filter(
      (app) =>
        app.status?.toLowerCase() === "pending" ||
        app.status?.toLowerCase() === "pending review" ||
        app.status?.toLowerCase() === "shortlisted"
    ).length,
    rejected: applications.filter(
      (app) => app.status?.toLowerCase() === "rejected"
    ).length,
    completed: applications.filter(
      (app) => app.status?.toLowerCase() === "completed"
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header with title and interview button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            All Job Applications
          </h1>
          <p className="text-gray-600">
            Overview of all your job applications and their current status
          </p>
        </div>
        {stats.interviewScheduled > 0 && (
          <Button
            onClick={() =>
              (window.location.href = "/dashboard/employee/interviewedJobs")
            }
            className="bg-green-600 hover:bg-green-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            View Interviewed Jobs ({stats.interviewScheduled})
          </Button>
        )}
      </div>

      {/* Summary Stats - Moved to top */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <p className="text-sm text-gray-600">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.applied}
            </div>
            <p className="text-sm text-gray-600">Applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.interviewScheduled}
            </div>
            <p className="text-sm text-gray-600">Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.approved}
            </div>
            <p className="text-sm text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {stats.hired}
            </div>
            <p className="text-sm text-gray-600">Hired</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">
              {stats.completed}
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by Status:
              </span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview-scheduled">
                  Interview Scheduled
                </SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List - Moved to bottom */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Job Applications
          </CardTitle>
          <CardDescription>
            {filteredApplications.length > 0 ? (
              <span>
                Showing {filteredApplications.length} of {applications.length}{" "}
                applications
              </span>
            ) : (
              <span>No applications match the selected filter</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Applications Found
              </h3>
              <p className="text-gray-600 mb-4">
                {statusFilter === "all"
                  ? "You haven't applied to any jobs yet. Start exploring opportunities!"
                  : `You don't have any applications with "${statusFilter}" status.`}
              </p>
              {statusFilter !== "all" && (
                <Button
                  onClick={() => setStatusFilter("all")}
                  variant="outline"
                  className="mr-2"
                >
                  Clear Filter
                </Button>
              )}
              <Button onClick={() => (window.location.href = "/allJobs")}>
                Browse Jobs
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={
                                app.companyLogo ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={app.company || "Company"}
                            />
                            <AvatarFallback className="bg-gray-200">
                              {app.company?.charAt(0) || "J"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {app.position || app.title || "Job Title"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.company || "Company Name"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {app.fullName || session.user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
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
                        <div className="text-sm text-gray-500">
                          {app.appliedAt
                            ? new Date(app.appliedAt).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                }
                              )
                            : ""}
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
                                  {formatDateTime(
                                    app.interviewSchedule.date,
                                    app.interviewSchedule.time
                                  )}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            getStatusColor(app.status)
                          )}
                        >
                          {formatStatus(app.status) || "Pending"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-transparent"
                          onClick={() =>
                            (window.location.href = `/singleJob/${
                              app.jobId || app._id
                            }`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
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
