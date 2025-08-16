"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  TrendingUp,
  Clock,
  CheckCircle,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "react-calendar/dist/Calendar.css";

export default function TimeSheetJob() {
  const [date, setDate] = useState(new Date());
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, [date]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const selectedDate = date.toISOString().split("T")[0];
      const response = await fetch(`/api/timeSheetJob?date=${selectedDate}`);
      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch jobs:", data.error);
        toast({
          title: "Error",
          description: data.error || "Failed to fetch jobs",
          variant: "destructive",
        });
        return;
      }

      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch job data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusCounts = {
    Completed: filteredJobs.filter((job) => job.status === "Completed").length,
    "In Progress": filteredJobs.filter(
      (job) => job.status === "In Progress" || job.status === "Ongoing"
    ).length,
    Pending: filteredJobs.filter((job) => job.status === "Pending").length,
    Active: filteredJobs.filter((job) => job.status === "Active").length,
  };

  const chartData = Object.keys(statusCounts)
    .filter((key) => statusCounts[key] > 0)
    .map((key) => ({
      name: key,
      count: statusCounts[key],
    }));

  const pieData = Object.keys(statusCounts)
    .filter((key) => statusCounts[key] > 0)
    .map((key, index) => ({
      name: key,
      value: statusCounts[key],
      color: getStatusColor(key, true),
    }));

  function getStatusColor(status, forChart = false) {
    const colors = {
      Completed: forChart ? "#10b981" : "bg-green-500 hover:bg-green-600",
      "In Progress": forChart ? "#f59e0b" : "bg-yellow-500 hover:bg-yellow-600",
      Ongoing: forChart ? "#f59e0b" : "bg-yellow-500 hover:bg-yellow-600",
      Pending: forChart ? "#6b7280" : "bg-gray-500 hover:bg-gray-600",
      Active: forChart ? "#3b82f6" : "bg-blue-500 hover:bg-blue-600",
    };
    return (
      colors[status] || (forChart ? "#6b7280" : "bg-gray-500 hover:bg-gray-600")
    );
  }

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TimeSheet Job Dashboard
          </h1>
          <p className="text-gray-600">
            Track job progress and statistics by date
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {filteredJobs.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {statusCounts.Completed}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {statusCounts["In Progress"]}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-600">
                    {statusCounts.Pending}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Calendar */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <CalendarDays className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Calendar
                onChange={setDate}
                value={date}
                className="rounded-lg w-full bg-white border border-gray-200"
              />
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Selected:{" "}
                  <span className="font-medium text-gray-900">
                    {date.toDateString()}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Job Status Chart */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <TrendingUp className="h-5 w-5" />
                Job Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#374151" fontSize={12} />
                      <YAxis stroke="#374151" fontSize={12} />
                      <Tooltip
                        cursor={{ fill: "#f3f4f6" }}
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        barSize={40}
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  {pieData.length > 0 && (
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      No jobs available on this date
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try selecting a different date
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Job List */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                Jobs on {date.toDateString()}
              </span>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-200 bg-blue-50"
              >
                {filteredJobs.length} Jobs
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center justify-between p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md hover:bg-white transition-all duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {job.title}
                        </h3>
                        <Badge
                          className={`${getStatusColor(
                            job.status
                          )} text-white ml-4`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Posted: {new Date(job.postedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <p className="text-xs text-gray-500 mb-1">Job ID</p>
                      <p className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {job._id.slice(-8)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500">
                  No jobs were posted on {date.toDateString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Try selecting a different date to view jobs
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
