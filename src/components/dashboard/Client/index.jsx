"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatsCard from "@/components/ui/state-card";
import {
  Briefcase,
  Users,
  Eye,
  DollarSign,
  TrendingUp,
  Plus,
  MoreHorizontal,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 12,
    totalApplications: 156,
    shortlistedCandidates: 23,
    totalSpent: 15420,
  });

  const [recentJobs, setRecentJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "New York, NY",
      type: "Full-time",
      applications: 45,
      status: "Active",
      postedDate: "2024-01-15",
      salary: "$80,000 - $120,000",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      location: "San Francisco, CA",
      type: "Contract",
      applications: 32,
      status: "Active",
      postedDate: "2024-01-12",
      salary: "$70,000 - $90,000",
    },
    {
      id: 3,
      title: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      applications: 28,
      status: "Draft",
      postedDate: "2024-01-10",
      salary: "$90,000 - $130,000",
    },
  ]);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      candidateName: "John Smith",
      jobTitle: "Senior Frontend Developer",
      appliedDate: "2024-01-16",
      status: "Under Review",
      experience: "5 years",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      jobTitle: "UX/UI Designer",
      appliedDate: "2024-01-15",
      status: "Shortlisted",
      experience: "3 years",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      candidateName: "Mike Davis",
      jobTitle: "Backend Engineer",
      appliedDate: "2024-01-14",
      status: "Interview Scheduled",
      experience: "7 years",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Shortlisted":
        return "bg-purple-100 text-purple-800";
      case "Interview Scheduled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
        <Link href="/dashboard/client/jobs/create">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={Briefcase}
          trend="+2 this week"
          trendUp={true}
        />
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={Users}
          trend="+12 this week"
          trendUp={true}
        />
        <StatsCard
          title="Shortlisted"
          value={stats.shortlistedCandidates}
          icon={Eye}
          trend="+5 this week"
          trendUp={true}
        />
        <StatsCard
          title="Total Spent"
          value={`$${stats.totalSpent.toLocaleString()}`}
          icon={DollarSign}
          trend="+8% this month"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Postings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Job Postings
            </CardTitle>
            <Link href="/dashboard/client/jobs">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
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
                    <p className="text-sm text-gray-500 mt-1">{job.salary}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
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
                      <AvatarFallback>
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
                      {application.appliedDate}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/client/jobs/create">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
              >
                <Plus className="w-6 h-6" />
                Post New Job
              </Button>
            </Link>
            <Link href="/dashboard/client/candidates">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
              >
                <Users className="w-6 h-6" />
                Review Applications
              </Button>
            </Link>
            <Link href="/dashboard/client/analytics">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 bg-transparent"
              >
                <TrendingUp className="w-6 h-6" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
