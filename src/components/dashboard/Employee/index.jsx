import { ChartTooltip } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  FileText,
  Eye,
  Heart,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Loader2,
  Calendar,
} from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function UserDashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      applicationsSent: 0,
      profileViews: 0,
      savedJobs: 0,
      interviewInvites: 0,
    },
    recentJobs: [],
    skillsData: [],
    applicationTimelineData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in a single request
        const response = await fetch(
          `/api/employee/dashboard?email=${session.user.email}`
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch dashboard data");
        }

        // Process recent jobs
        const processedJobs = result.data.recentJobs.map((app) => ({
          id: app.jobId || app._id, // Use jobId if available, otherwise use _id
          title: app.position || "Unknown Position",
          company: app.company || "Unknown Company",
          location: app.location || "Not specified",
          salary: app.salary || "Not specified",
          type: app.jobType || "Full-time",
          posted: new Date(app.appliedAt).toLocaleDateString() || "Unknown",
          status: app.status || "Applied",
          avatar: "/placeholder.svg?height=40&width=40",
          interviewSchedule: app.interviewSchedule || null, // Add interview schedule data
        }));

        // Process skills data
        const processedSkills = result.data.skills.map((skill, index) => ({
          name: skill.name || skill.skillName || `Skill ${index + 1}`,
          percentage: skill.level || skill.proficiency || 50,
          color: [
            "bg-yellow-400",
            "bg-blue-500",
            "bg-green-500",
            "bg-purple-500",
          ][index % 4],
        }));

        // Update all dashboard data at once
        setDashboardData({
          stats: result.data.stats,
          recentJobs: processedJobs,
          skillsData: processedSkills,
          applicationTimelineData: result.data.timelineData,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchData();
    }
  }, [session]);

  // Process timeline data from actual applications
  const processTimelineData = (applications) => {
    // Group applications by month
    const monthlyData = {};

    applications.forEach((app) => {
      if (app.appliedAt) {
        const date = new Date(app.appliedAt);
        const monthYear = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;

        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { applications: 0, interviews: 0 };
        }

        monthlyData[monthYear].applications += 1;
        if (
          app.status === "interview-scheduled" ||
          app.status === "shortlisted"
        ) {
          monthlyData[monthYear].interviews += 1;
        }
      }
    });

    // Convert to array format for chart
    return Object.entries(monthlyData).map(([name, data]) => ({
      name,
      applications: data.applications,
      interviews: data.interviews,
    }));
  };

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

  const statsData = [
    {
      title: "Applications Sent",
      value: dashboardData.stats.applicationsSent,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Profile Views",
      value: dashboardData.stats.profileViews,
      icon: Eye,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Saved Jobs",
      value: dashboardData.stats.savedJobs,
      icon: Heart,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Interview Invites",
      value: dashboardData.stats.interviewInvites,
      icon: Briefcase,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
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
        {/* Recent Job Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Job Activity
              </CardTitle>
              <CardDescription>
                Your latest job applications and saved positions
              </CardDescription>
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
                            src={job.avatar || "/placeholder.svg"}
                            alt={job.company}
                          />
                          <AvatarFallback className="bg-gray-200">
                            {job.company
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-600">{job.company}</p>
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
                              <Clock className="w-3 h-3 mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          {/* Show interview schedule if available */}
                          {job.status === "interview-scheduled" &&
                            job.interviewSchedule && (
                              <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                                <div className="text-xs text-green-700 font-medium flex items-center mb-1">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Interview Scheduled
                                </div>
                                <div className="text-xs text-green-600">
                                  {new Date(
                                    `${job.interviewSchedule.date}T${job.interviewSchedule.time}`
                                  ).toLocaleString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                                <div className="text-xs text-green-600 capitalize">
                                  {job.interviewSchedule.type}
                                </div>
                                {job.interviewSchedule.meetingLink && (
                                  <a
                                    href={job.interviewSchedule.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 underline hover:text-blue-800"
                                  >
                                    Meeting Link
                                  </a>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            job.status === "applied" ||
                            job.status === "interview-scheduled"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            job.status === "applied" ||
                            job.status === "interview-scheduled"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                        >
                          {job.status === "interview-scheduled"
                            ? "Interview Scheduled"
                            : job.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/singleJob/${job.id}`)
                          }
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent job activity found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Progress */}
        <div>
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Skills Progress
              </CardTitle>
              <CardDescription>Your skill development overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.skillsData.length > 0 ? (
                  dashboardData.skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-gray-500">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${skill.color} flex items-center justify-end pr-2`}
                          style={{ width: `${skill.percentage}%` }}
                        >
                          {skill.percentage > 20 && (
                            <span className="text-xs text-white font-bold">
                              {skill.percentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No skills data available
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-medium">
                    {dashboardData.skillsData.length > 0
                      ? Math.round(
                          dashboardData.skillsData.reduce(
                            (sum, skill) => sum + skill.percentage,
                            0
                          ) / dashboardData.skillsData.length
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{
                      width: `${
                        dashboardData.skillsData.length > 0
                          ? Math.round(
                              dashboardData.skillsData.reduce(
                                (sum, skill) => sum + skill.percentage,
                                0
                              ) / dashboardData.skillsData.length
                            )
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <Button
                variant="link"
                className="w-full text-blue-600 hover:text-blue-700 p-0 h-auto mt-4"
              >
                View All Skills <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Timeline */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Application Timeline
                </CardTitle>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm">Applications</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm">Interviews</span>
                  </div>
                </div>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ChartContainer
                config={{
                  applications: {
                    label: "Applications",
                    color: "hsl(var(--chart-1)",
                  },
                  interviews: {
                    label: "Interviews",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.applicationTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="applications"
                      stroke="var(--color-applications)"
                      name="Applications"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="interviews"
                      stroke="var(--color-interviews)"
                      name="Interviews"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 text-center text-sm text-gray-500">
                Track your application and interview progress over time
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = "/allJobs")}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Search Jobs
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  (window.location.href =
                    "/dashboard/employee/profileManagement")
                }
              >
                <FileText className="w-4 h-4 mr-2" />
                Update Resume
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  (window.location.href = "/dashboard/employee/appliedJobs")
                }
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Applications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
