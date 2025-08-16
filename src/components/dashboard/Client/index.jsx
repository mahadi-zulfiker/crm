"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  Briefcase,
  Users,
  DollarSign,
  Plus,
  MoreHorizontal,
  MapPin,
  Clock,
  AlertCircle,
  UserCheck,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeJobs: 0,
      totalApplications: 0,
      shortlistedCandidates: 0,
      totalSpent: 0,
      completedJobs: 0,
      hiredCandidates: 0,
      averageRating: 0,
    },
    recentJobs: [],
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stream state for progressive data loading
  const [streamedData, setStreamedData] = useState({
    stats: null,
    recentJobs: null,
    recentApplications: null,
  });

  const fetchDashboardData = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      setError("");

      // Stream posted jobs
      const postedJobsStream = await fetch(
        `/api/postedJobs?email=${session.user.email}`
      );
      const postedJobs = await postedJobsStream.json();
      const jobsArray = Array.isArray(postedJobs) ? postedJobs : [];

      // Update stats progressively
      const activeJobs = jobsArray.filter(
        (job) => job.status === "Active"
      ).length;


      const candidatesArray = jobsArray;
      const totalApplications = candidatesArray.length;
      const hiredCandidates = candidatesArray.filter(
        (candidate) => candidate.status === "hired"
      );
      const shortlistedCandidates = candidatesArray.filter(
        (candidate) =>
          candidate.status === "shortlisted" || candidate.status === "hired"
      );
      const completedCandidates = candidatesArray.filter(
        (candidate) =>
          candidate.taskStatus === "completed" ||
          candidate.taskStatus === "Completed"
      );
      setLoading(false);

      
      // Stream payment history
      const paymentHistoryStream = await fetch(`/api/paymentHistoryClient`);
      const paymentHistoryData = await paymentHistoryStream.json();
      const payments = Array.isArray(paymentHistoryData)
        ? paymentHistoryData
        : [];
      const totalSpent = payments.reduce(
        (sum, payment) => sum + (payment.payment || payment.amount || 0),
        0
      );

      const averageRating =
        hiredCandidates.length > 0
          ? (
              hiredCandidates.reduce(
                (sum, candidate) => sum + (candidate.rating || 4.5),
                0
              ) / hiredCandidates.length
            ).toFixed(1)
          : 0;

      // Update stats
      setStreamedData((prev) => ({
        ...prev,
        stats: {
          activeJobs,
          totalApplications,
          shortlistedCandidates: shortlistedCandidates.length,
          totalSpent,
          completedJobs: completedCandidates.length,
          hiredCandidates: hiredCandidates.length,
          averageRating: Number.parseFloat(averageRating),
        },
      }));

      // Update recent jobs
      const recentJobs = jobsArray.slice(0, 5).map((job) => ({
        id: job._id,
        title: job.title || "Untitled Job",
        location: job.location || "Remote",
        type: job.jobType || "Full-time",
        applications: candidatesArray.filter(
          (candidate) => candidate.jobId === job._id
        ).length,
        status: job.status || "Draft",
        postedDate: job.createdAt || job.postedDate,
        salary: job.salary || "Not specified",
      }));
      setStreamedData((prev) => ({ ...prev, recentJobs }));

      // Update recent applications
      const recentApplications = candidatesArray
        .slice(0, 5)
        .map((candidate) => ({
          id: candidate._id,
          candidateName: candidate.fullName || "Unknown Candidate",
          jobTitle: candidate.position || "Unknown Position",
          appliedDate: candidate.appliedAt,
          status: candidate.status || "applied",
          experience: candidate.experience || "N/A",
          avatar:
            candidate.profileImage || "/placeholder.svg?height=40&width=40",
        }));
      setStreamedData((prev) => ({ ...prev, recentApplications }));

      // Final data update
      setDashboardData({
        stats: {
          activeJobs,
          totalApplications,
          shortlistedCandidates: shortlistedCandidates.length,
          totalSpent,
          completedJobs: completedCandidates.length,
          hiredCandidates: hiredCandidates.length,
          averageRating: Number.parseFloat(averageRating),
        },
        recentJobs,
        recentApplications,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const calculateAverageTimeToHire = (candidates) => {
    if (candidates.length === 0) return 0;

    const totalDays = candidates.reduce((sum, candidate) => {
      if (candidate.appliedAt && candidate.hiredAt) {
        const applied = new Date(candidate.appliedAt);
        const hired = new Date(candidate.hiredAt);
        const days = Math.ceil((hired - applied) / (1000 * 60 * 60 * 24));
        return sum + (days > 0 ? days : 0);
      }
      return sum + 15;
    }, 0);

    return Math.round(totalDays / candidates.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "shortlisted":
        return "bg-purple-100 text-purple-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div>
            <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              className="border-l-4 border-l-gray-200 animate-pulse"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Sections Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, sectionIndex) => (
            <Card key={sectionIndex} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-5 w-40 bg-gray-200 rounded"></div>
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                          <div className="flex items-center gap-4">
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-6 w-28 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your job postings.
          </p>
        </div>
        <Link href="/dashboard/client/createJobs">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-medium text-red-800">Error Loading Data</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button
                size="sm"
                onClick={fetchDashboardData}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-teal-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {streamedData.stats?.activeJobs ??
                    dashboardData.stats.activeJobs}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {(streamedData.stats?.activeJobs ??
                    dashboardData.stats.activeJobs) > 0
                    ? "Active"
                    : "No active jobs"}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <Briefcase className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {streamedData.stats?.totalApplications ??
                    dashboardData.stats.totalApplications}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {streamedData.stats?.shortlistedCandidates ??
                    dashboardData.stats.shortlistedCandidates}{" "}
                  shortlisted
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Hired Candidates
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {streamedData.stats?.hiredCandidates ??
                    dashboardData.stats.hiredCandidates}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {streamedData.stats?.completedJobs ??
                    dashboardData.stats.completedJobs}{" "}
                  completed
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">
                  $
                  {(
                    streamedData.stats?.totalSpent ??
                    dashboardData.stats.totalSpent
                  ).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Postings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Job Postings
            </CardTitle>
            <Link href="/dashboard/client/posted-jobs">
              <Button
                variant="outline"
                size="sm"
                className="text-teal-600 hover:bg-teal-50 bg-transparent"
              >
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(streamedData.recentJobs ?? dashboardData.recentJobs).length >
              0 ? (
                (streamedData.recentJobs ?? dashboardData.recentJobs).map(
                  (job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {job.title}
                          </h3>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {job.applications} applications
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          ${job.salary}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent job postings</p>
                  <Link href="/dashboard/client/jobs/create">
                    <Button className="mt-2 bg-teal-600 hover:bg-teal-700">
                      Post Your First Job
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Applications
            </CardTitle>
            <Link href="/dashboard/client/candidates">
              <Button
                variant="outline"
                size="sm"
                className="text-teal-600 hover:bg-teal-50 bg-transparent"
              >
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(
                streamedData.recentApplications ??
                dashboardData.recentApplications
              ).length > 0 ? (
                (
                  streamedData.recentApplications ??
                  dashboardData.recentApplications
                ).map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={application.avatar || "/placeholder.svg"}
                          alt={application.candidateName}
                        />
                        <AvatarFallback className="bg-teal-500 text-white">
                          {application.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {application.candidateName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {application.jobTitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {application.experience} exp
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {application.appliedDate
                          ? new Date(
                              application.appliedDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-1">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent applications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
