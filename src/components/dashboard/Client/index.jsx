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

export default function UserDashboard() {
  const { data: session } = useSession();
  console.log("session : ", session);

  const stats = [
    {
      title: "Applications Sent",
      value: "12",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Profile Views",
      value: "48",
      icon: Eye,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Saved Jobs",
      value: "6",
      icon: Heart,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Interview Invites",
      value: "3",
      icon: Briefcase,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  const recentJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      status: "Applied",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$90k - $110k",
      type: "Full-time",
      posted: "1 week ago",
      status: "Saved",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $130k",
      type: "Full-time",
      posted: "3 days ago",
      status: "Viewed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const skillsData = [
    { name: "JavaScript", percentage: 90, color: "bg-yellow-400" },
    { name: "React", percentage: 85, color: "bg-blue-500" },
    { name: "Node.js", percentage: 75, color: "bg-green-500" },
    { name: "Python", percentage: 60, color: "bg-purple-500" },
  ];

  const applicationTimelineData = [
    { name: "Jan", applications: 10, interviews: 3 },
    { name: "Feb", applications: 15, interviews: 5 },
    { name: "Mar", applications: 12, interviews: 4 },
    { name: "Apr", applications: 18, interviews: 7 },
    { name: "May", applications: 20, interviews: 8 },
    { name: "Jun", applications: 16, interviews: 6 },
  ];

  return (
    <div className="space-y-6  ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                {recentJobs.map((job, index) => (
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
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          job.status === "Applied" ? "default" : "secondary"
                        }
                        className={
                          job.status === "Applied"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                      >
                        {job.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
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
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-gray-500">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color}`}
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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
              <ChartContainer
                config={{
                  applications: {
                    label: "Applications",
                    color: "hsl(var(--chart-1))",
                  },
                  interviews: {
                    label: "Interviews",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationTimelineData}>
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
                    />
                    <Line
                      type="monotone"
                      dataKey="interviews"
                      stroke="var(--color-interviews)"
                      name="Interviews"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
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
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                <Briefcase className="w-4 h-4 mr-2" />
                Search Jobs
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                Update Resume
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
