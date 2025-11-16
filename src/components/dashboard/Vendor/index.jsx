import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Loader2,
  MapPin,
  Clock,
  AlertCircle,
  ArrowUpRight,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "@/components/ui/chart";

function Vendor() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalServices: 0,
      activeProjects: 0,
      totalRevenue: 0,
      clientFeedback: 0,
      completionRate: 0,
      onTimeDelivery: 0,
    },
    recentJobs: [],
    timelineData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in a single request
        const response = await fetch(
          `/api/vendor/dashboard?email=${session?.user?.email}`
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch dashboard data");
        }

        setDashboardData(result.data);
      } catch (err) {
        console.error("Error fetching vendor dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    // Check authentication status
    if (status === "loading") {
      return; // Still loading session
    }

    if (!session?.user?.email) {
      setError("You must be logged in as a vendor to view this dashboard");
      setLoading(false);
      return;
    }

    fetchDashboardData();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
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
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Services",
      value: dashboardData.stats.totalServices,
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      title: "Active Projects",
      value: dashboardData.stats.activeProjects,
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "+3",
      changeColor: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${dashboardData.stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "+$2,500",
      changeColor: "text-green-600",
    },
    {
      title: "Client Feedback",
      value: dashboardData.stats.clientFeedback,
      icon: TrendingUp,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      change: "4.8/5.0",
      changeColor: "text-green-600",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your services.
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() =>
            (window.location.href = "/dashboard/vendor/jobManagementVendor")
          }
        >
          Add New Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`text-xs mt-1 ${stat.changeColor}`}>
                      <ArrowUpRight className="w-3 h-3 inline mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.iconBg}`}>
                    <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Recent Projects</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href =
                    "/dashboard/vendor/jobManagementVendor")
                }
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentJobs.length > 0 ? (
                  dashboardData.recentJobs.map((job, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt={job.title}
                          />
                          <AvatarFallback className="bg-gray-200">
                            {job.title
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {job.title}
                          </h4>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {job.applications} applicants
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/dashboard/vendor/jobManagementVendor`)
                          }
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No recent projects found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-sm">
                      Completion Rate
                    </span>
                    <span className="font-semibold">
                      {dashboardData.stats.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${dashboardData.stats.completionRate}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-sm">
                      On-time Delivery
                    </span>
                    <span className="font-semibold">
                      {dashboardData.stats.onTimeDelivery}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${dashboardData.stats.onTimeDelivery}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-sm">
                      Client Satisfaction
                    </span>
                    <span className="font-semibold">
                      {dashboardData.stats.clientFeedback}/5.0
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(dashboardData.stats.clientFeedback)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-sm">Response Time</span>
                    <span className="font-semibold">2 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Timeline Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line
                      type="monotone"
                      dataKey="jobsPosted"
                      stroke="#3b82f6"
                      name="Jobs Posted"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="jobsCompleted"
                      stroke="#10b981"
                      name="Jobs Completed"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start bg-teal-600 hover:bg-teal-700"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/vendor/jobManagementVendor")
                  }
                >
                  <Package className="w-4 h-4 mr-2" />
                  Manage Jobs
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    (window.location.href = "/dashboard/vendor/meeting")
                  }
                >
                  <Users className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/vendor/vendorProfileManagement")
                  }
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/vendor/reportsAnalyticsVendor")
                  }
                >
                  <LineChartIcon className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
