"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Download,
  Eye,
  Star,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react";

export default function CompletedJobsClientPage() {
  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "New York, NY",
      jobType: "Full-time",
      category: "Technology",
      description: "Senior frontend developer role with React expertise",
      salary: "8500",
      jobReference: "REF-001",
      vacancy: 2,
      featured: true,
      postedAt: "2024-01-15T10:00:00.000Z",
      vendor: "John Smith",
      status: "Completed",
      rating: 5,
      payment: "850",
      deadline: "2024-02-15",
      completedAt: "2024-02-10T15:30:00.000Z",
      hiredCandidate: {
        name: "Alice Johnson",
        email: "alice.johnson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "6 years",
        rating: 4.8,
      },
      totalApplications: 45,
      interviewsCompleted: 8,
      timeToHire: "18 days",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      jobType: "Contract",
      category: "Design",
      description: "Creative UX/UI designer for mobile applications",
      salary: "6500",
      jobReference: "REF-002",
      vacancy: 1,
      featured: false,
      postedAt: "2024-01-10T09:00:00.000Z",
      vendor: "Sarah Wilson",
      status: "Completed",
      rating: 4,
      payment: "650",
      deadline: "2024-02-10",
      completedAt: "2024-02-05T12:00:00.000Z",
      hiredCandidate: {
        name: "Mike Chen",
        email: "mike.chen@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "4 years",
        rating: 4.5,
      },
      totalApplications: 32,
      interviewsCompleted: 5,
      timeToHire: "12 days",
    },
    {
      id: 3,
      title: "Customer Support Specialist",
      company: "TechCorp Inc.",
      location: "Remote",
      jobType: "Full-time",
      category: "Customer Support",
      description: "Customer support specialist for technical products",
      salary: "4500",
      jobReference: "REF-003",
      vacancy: 3,
      featured: false,
      postedAt: "2024-01-05T14:00:00.000Z",
      vendor: "David Brown",
      status: "Completed",
      rating: 5,
      payment: "450",
      deadline: "2024-02-05",
      completedAt: "2024-01-30T16:45:00.000Z",
      hiredCandidate: {
        name: "Emma Davis",
        email: "emma.davis@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "3 years",
        rating: 4.9,
      },
      totalApplications: 28,
      interviewsCompleted: 6,
      timeToHire: "15 days",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "TechCorp Inc.",
      location: "Boston, MA",
      jobType: "Full-time",
      category: "Technology",
      description: "Backend engineer with Node.js and Python experience",
      salary: "9200",
      jobReference: "REF-004",
      vacancy: 1,
      featured: true,
      postedAt: "2023-12-20T11:00:00.000Z",
      vendor: "Lisa Garcia",
      status: "Completed",
      rating: 4,
      payment: "920",
      deadline: "2024-01-20",
      completedAt: "2024-01-18T10:30:00.000Z",
      hiredCandidate: {
        name: "Robert Taylor",
        email: "robert.taylor@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "7 years",
        rating: 4.7,
      },
      totalApplications: 67,
      interviewsCompleted: 12,
      timeToHire: "22 days",
    },
  ]);

  const [filteredJobs, setFilteredJobs] = useState(completedJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    let filtered = completedJobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.hiredCandidate.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          job.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (ratingFilter !== "all") {
      const rating = Number.parseInt(ratingFilter);
      filtered = filtered.filter((job) => job.rating >= rating);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, categoryFilter, ratingFilter, completedJobs]);

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const stats = {
    totalCompleted: completedJobs.length,
    totalPayment: completedJobs.reduce(
      (sum, job) => sum + Number.parseFloat(job.payment),
      0
    ),
    averageRating: (
      completedJobs.reduce((sum, job) => sum + job.rating, 0) /
      completedJobs.length
    ).toFixed(1),
    totalHires: completedJobs.reduce((sum, job) => sum + job.vacancy, 0),
    averageTimeToHire: Math.round(
      completedJobs.reduce(
        (sum, job) => sum + Number.parseInt(job.timeToHire),
        0
      ) / completedJobs.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Completed Jobs</h1>
          <p className="text-gray-600 mt-1">
            Review your successfully completed job postings and hiring outcomes.
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalCompleted}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Payment
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ${stats.totalPayment.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hires</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalHires}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Time to Hire
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.averageTimeToHire} days
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by job title, candidate, or vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="customer support">
                  Customer Support
                </SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Completed Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Job Information */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        {job.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Featured
                          </Badge>
                        )}
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.jobType}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.vacancy} position{job.vacancy > 1 ? "s" : ""}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {getRatingStars(job.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({job.rating})
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        ${job.payment} earned
                      </div>
                    </div>
                  </div>

                  {/* Hired Candidate Info */}
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      Hired Candidate
                    </h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={job.hiredCandidate.avatar || "/placeholder.svg"}
                          alt={job.hiredCandidate.name}
                        />
                        <AvatarFallback className="bg-green-500 text-white">
                          {job.hiredCandidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {job.hiredCandidate.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {job.hiredCandidate.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">
                                {job.hiredCandidate.rating}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {job.hiredCandidate.experience}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">
                        {job.totalApplications}
                      </div>
                      <div className="text-gray-600">Applications</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-semibold text-purple-600">
                        {job.interviewsCompleted}
                      </div>
                      <div className="text-gray-600">Interviews</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-semibold text-orange-600">
                        {job.timeToHire}
                      </div>
                      <div className="text-gray-600">Time to Hire</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">
                        ${job.salary}
                      </div>
                      <div className="text-gray-600">Monthly Salary</div>
                    </div>
                  </div>
                </div>

                {/* Job Details Sidebar */}
                <div className="lg:w-64 space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Job Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-medium">
                            {job.jobReference}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{job.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vendor:</span>
                          <span className="font-medium">{job.vendor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Posted:</span>
                          <span className="font-medium">
                            {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium">
                            {new Date(job.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium">
                            {new Date(job.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <CheckCircle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No completed jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
