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
  ArrowLeft,
  ClockIcon,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

export default function InterviewedJobs() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchInterviewedApplications = async () => {
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

          // Filter to show interview-scheduled applications and shortlisted applications
          const interviewedApps =
            data.allApplications?.filter(
              (app) =>
                app.status === "interview-scheduled" ||
                app.status === "shortlisted"
            ) || [];

          setApplications(interviewedApps);
        } catch (err) {
          console.error("Error fetching interviewed applications:", err);
          setError(err.message || "Failed to fetch interviewed applications");
        } finally {
          setLoading(false);
        }
      };

      fetchInterviewedApplications();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

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

  const getApplicationStatus = (app) => {
    if (app.status === "interview-scheduled") {
      return "Interview Scheduled";
    } else if (app.status === "shortlisted") {
      return "Shortlisted";
    }
    return app.status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "interview-scheduled":
        return "bg-green-100 text-green-800";
      case "shortlisted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "interview-scheduled":
        return CheckCircle;
      case "shortlisted":
        return ClockIcon;
      default:
        return AlertCircle;
    }
  };

  const handleCancelInterview = async (appId) => {
    const result = await Swal.fire({
      title: "Cancel Interview Request?",
      text: "Are you sure you want to cancel this interview request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        // In a real implementation, this would call an API to cancel the interview
        Swal.fire(
          "Cancelled!",
          "Your interview request has been cancelled.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Failed to cancel interview request.", "error");
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading your session...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please sign in to view your interviewed jobs.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">
            Loading your interviewed applications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-8 text-center">
          <div className="text-red-600 mb-4">
            <XCircle className="w-16 h-16 mx-auto mb-4" />
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
            Please sign in to view your interviewed jobs.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Separate applications into scheduled and shortlisted
  const scheduledInterviews = applications.filter(
    (app) => app.status === "interview-scheduled"
  );
  const shortlistedApplications = applications.filter(
    (app) => app.status === "shortlisted"
  );

  // Calculate statistics
  const stats = {
    total: applications.length,
    scheduled: scheduledInterviews.length,
    shortlisted: shortlistedApplications.length,
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            Interview Status
          </h1>
          <p className="text-gray-600 mt-1">
            Track your interview schedules and upcoming opportunities
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            (window.location.href = "/dashboard/employee/appliedJobs")
          }
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Applications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Scheduled Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.scheduled}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              Shortlisted Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.shortlisted}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Total Interview Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.total}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Interviews Section */}
      {scheduledInterviews.length > 0 && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Scheduled Interviews
            </CardTitle>
            <CardDescription>
              <span>
                Showing all {scheduledInterviews.length} scheduled interview
                {scheduledInterviews.length !== 1 ? "s" : ""}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      Interview Details
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduledInterviews.map((app) => (
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
                        {app.status === "interview-scheduled" &&
                          app.interviewSchedule && (
                            <div className="text-sm text-green-600 p-3 bg-green-50 rounded-lg border border-green-200">
                              <div className="font-medium mb-2 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Interview Scheduled
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center text-xs">
                                  <Calendar className="w-3 h-3 mr-2" />
                                  <span className="font-medium">
                                    Date & Time:
                                  </span>
                                  <span className="ml-1">
                                    {formatDateTime(
                                      app.interviewSchedule.date,
                                      app.interviewSchedule.time
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <Clock className="w-3 h-3 mr-2" />
                                  <span className="font-medium">Duration:</span>
                                  <span className="ml-1">
                                    {app.interviewSchedule.duration} minutes
                                  </span>
                                </div>
                                <div className="flex items-center text-xs">
                                  {app.interviewSchedule.type === "video" && (
                                    <Video className="w-3 h-3 mr-2" />
                                  )}
                                  {app.interviewSchedule.type === "phone" && (
                                    <Phone className="w-3 h-3 mr-2" />
                                  )}
                                  {app.interviewSchedule.type ===
                                    "in-person" && (
                                    <MapPin className="w-3 h-3 mr-2" />
                                  )}
                                  <span className="font-medium">Type:</span>
                                  <span className="ml-1 capitalize">
                                    {app.interviewSchedule.type}
                                  </span>
                                </div>
                                {app.interviewSchedule.meetingLink && (
                                  <div className="text-xs mt-1">
                                    <span className="font-medium">
                                      Meeting Link:
                                    </span>
                                    <a
                                      href={app.interviewSchedule.meetingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline hover:text-blue-800 ml-1"
                                    >
                                      Join Meeting
                                    </a>
                                  </div>
                                )}
                                <div className="text-xs mt-1">
                                  <span className="font-medium">
                                    Interviewer:
                                  </span>
                                  <span className="ml-1">
                                    {app.interviewSchedule.interviewer}
                                  </span>
                                </div>
                                {app.interviewSchedule.interviewerEmail && (
                                  <div className="text-xs">
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-1">
                                      {app.interviewSchedule.interviewerEmail}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
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
                          View Job
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelInterview(app._id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shortlisted Applications Section */}
      {shortlistedApplications.length > 0 && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-blue-600" />
              Shortlisted Applications
            </CardTitle>
            <CardDescription>
              <span>
                These applications have been shortlisted and are awaiting
                interview scheduling by the client
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shortlistedApplications.map((app) => (
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
                        <Badge
                          className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1",
                            getStatusColor(app.status)
                          )}
                        >
                          {React.createElement(getStatusIcon(app.status), {
                            className: "w-3 h-3",
                          })}
                          {getApplicationStatus(app)}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Interview will be scheduled by the client soon
                        </div>
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
                          View Job
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {applications.length === 0 && (
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Interview Status Updates
            </h3>
            <p className="text-gray-600 mb-4">
              You don't have any scheduled interviews or shortlisted
              applications yet.
            </p>
            <Button
              onClick={() =>
                (window.location.href = "/dashboard/employee/appliedJobs")
              }
            >
              View All Applications
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
