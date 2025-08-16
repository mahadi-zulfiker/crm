"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
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
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function CompletedJobsClientPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      }
    >
      <InnerCompletedJobsClientPage />
    </Suspense>
  );
}

function InnerCompletedJobsClientPage() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [completedJobs, setCompletedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    if (session?.user?.email && status === "authenticated") {
      fetchCompletedJobs();
    }
  }, [session, status]);

  const fetchCompletedJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/postedJobs?email=${session?.user?.email}`
      );
      const data = await response.json();

      console.log("fetchCompletedJobs:", data);

      if (response.ok && Array.isArray(data)) {
        const jobsMap = new Map();

        for (const job of data) {
          if (job.taskStatus === "Completed" && job.status === "hired") {
            const jobId = job._id?.toString();
            if (!jobId) continue;

            try {
              const jobResponse = await fetch(`/api/jobs/${jobId}`);
              if (!jobResponse.ok) {
                throw new Error(`Failed to fetch job details for ${jobId}`);
              }
              const jobData = await jobResponse.json();

              const hiredCandidatesResponse = await fetch(
                `/api/hiredCandidates/${jobId}`
              );
              if (!hiredCandidatesResponse.ok) {
                throw new Error(
                  `Failed to fetch hired candidates for ${jobId}`
                );
              }
              const candidatesData = await hiredCandidatesResponse.json();
              const candidatesArray =
                candidatesData.success && candidatesData.data
                  ? candidatesData.data
                  : Array.isArray(candidatesData)
                  ? candidatesData
                  : [candidatesData].filter(Boolean);

              const formattedCandidates = candidatesArray.map((candidate) => ({
                name: candidate.fullName || "Unknown",
                email: candidate.email || "N/A",
                avatar:
                  candidate.profileImage ||
                  "/placeholder.svg?height=40&width=40",
                experience: candidate.experience || "N/A",
                rating: candidate.rating || 4.5,
                appliedAt: candidate.appliedAt || null,
                hiredAt: candidate.hiredAt || null,
                totalPayments: candidate.totalPayments || 0,
                interviewSchedule: candidate.interviewSchedule || null,
                paymentHistory: candidate.paymentHistory || [],
              }));

              jobsMap.set(jobId, {
                _id: jobId,
                title: jobData.title || job.position || "Unknown Position",
                company: jobData.company || "Company Name",
                location: jobData.location || job.location || "Remote",
                jobType: jobData.jobType || "Full-time",
                category: jobData.category || "General",
                description:
                  jobData.description ||
                  `${job.position || "Unknown"} position`,
                salary: jobData.salary || job.offeredSalary || 0,
                jobReference: jobData.jobReference || jobId.slice(-6),
                vacancy: jobData.vacancy || 1,
                featured: jobData.featured || false,
                postedAt: jobData.createdAt || job.appliedAt || null,
                vendor: jobData.vendorName || "Direct Hire",
                status: "Completed",
                rating: formattedCandidates[0]?.rating || 4.5,
                payment: formattedCandidates.reduce(
                  (sum, c) => sum + (c.totalPayments || 0),
                  0
                ),
                deadline: jobData.deadline || null,
                completedAt:
                  formattedCandidates[0]?.hiredAt || job.updatedAt || null,
                hiredCandidates: formattedCandidates,
                totalApplications: job.totalApplications || 1,
                interviewsCompleted: formattedCandidates.filter(
                  (c) => c.interviewSchedule
                ).length,
                timeToHire: calculateTimeToHire(
                  formattedCandidates[0]?.appliedAt,
                  formattedCandidates[0]?.hiredAt
                ),
                paymentHistory: formattedCandidates.flatMap(
                  (c) => c.paymentHistory || []
                ),
              });
            } catch (jobError) {
              console.error(`Error fetching job ${jobId}:`, jobError);
              jobsMap.set(jobId, {
                _id: jobId,
                title: job.position || "Unknown Position",
                company: "Company Name",
                location: job.location || "Remote",
                jobType: "Full-time",
                category: "General",
                description: `${job.position || "Unknown"} position`,
                salary: job.offeredSalary || 0,
                jobReference: jobId.slice(-6),
                vacancy: 1,
                featured: false,
                postedAt: job.appliedAt || null,
                vendor: "Direct Hire",
                status: "Completed",
                rating: 4.5,
                payment: 0,
                deadline: null,
                completedAt: job.updatedAt || null,
                hiredCandidates: [
                  {
                    name: job.fullName || "Unknown",
                    email: job.email || "N/A",
                    avatar: "/placeholder.svg?height=40&width=40",
                    experience: job.experience || "N/A",
                    rating: job.rating || 4.5,
                    appliedAt: job.appliedAt || null,
                    hiredAt: job.hiredAt || null,
                    totalPayments: job.totalPayments || 0,
                    interviewSchedule: job.interviewSchedule || null,
                    paymentHistory: job.paymentHistory || [],
                  },
                ],
                totalApplications: 1,
                interviewsCompleted: job.interviewSchedule ? 1 : 0,
                timeToHire: calculateTimeToHire(job.appliedAt, job.hiredAt),
                paymentHistory: job.paymentHistory || [],
              });
            }
          }
        }

        const completedJobsArray = Array.from(jobsMap.values());
        setCompletedJobs(completedJobsArray);
        setFilteredJobs(completedJobsArray);
      } else {
        throw new Error("Failed to fetch completed jobs");
      }
    } catch (error) {
      console.error("Error fetching completed jobs:", error);
      setError("Failed to fetch completed jobs. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch completed jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeToHire = (appliedAt, hiredAt) => {
    if (!appliedAt || !hiredAt) return "N/A";
    const applied = new Date(appliedAt);
    const hired = new Date(hiredAt);
    const timeDiff = hired - applied;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysDiff} days`;
  };

  useEffect(() => {
    let filtered = completedJobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.hiredCandidates.some((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          job.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (ratingFilter !== "all") {
      const rating = Number.parseInt(ratingFilter);
      filtered = filtered.filter((job) =>
        job.hiredCandidates.some((c) => c.rating >= rating)
      );
    }

    if (dateRange !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateRange) {
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (job) => new Date(job.completedAt) >= filterDate
      );
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, ratingFilter, dateRange, completedJobs]);

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
      (sum, job) => sum + (Number.parseFloat(job.payment) || 0),
      0
    ),
    averageRating:
      completedJobs.length > 0
        ? (
            completedJobs.reduce(
              (sum, job) =>
                sum +
                job.hiredCandidates.reduce((s, c) => s + (c.rating || 0), 0) /
                  job.hiredCandidates.length,
              0
            ) / completedJobs.length
          ).toFixed(1)
        : "0.0",
    totalHires: completedJobs.reduce((sum, job) => sum + (job.vacancy || 0), 0),
    averageTimeToHire:
      completedJobs.length > 0
        ? Math.round(
            completedJobs.reduce((sum, job) => {
              const timeStr = job.timeToHire;
              if (timeStr === "N/A") return sum;
              const days = Number.parseInt(timeStr.split(" ")[0]);
              return sum + (isNaN(days) ? 0 : days);
            }, 0) / completedJobs.length
          )
        : 0,
  };

  const exportReport = () => {
    const csvContent = [
      [
        "Job Title",
        "Company",
        "Location",
        "Hired Candidates",
        "Payment",
        "Rating",
        "Completed Date",
      ].join(","),
      ...filteredJobs.map((job) =>
        [
          job.title,
          job.company,
          job.location,
          job.hiredCandidates.map((c) => c.name).join("; "),
          job.payment,
          job.rating,
          new Date(job.completedAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "completed-jobs-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === "loading" || loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      </div>
    );
  }

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
        <Button
          variant="outline"
          onClick={exportReport}
          className="text-gray-600 hover:bg-gray-100 bg-transparent"
        >
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

      {error && (
        <Card>
          <CardContent className="p-4">
            <div className="text-red-600 text-center">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Completed Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {currentJobs.map((job) => (
          <Card
            key={job._id}
            className="hover:shadow-md transition-shadow border-l-4 border-l-teal-500"
          >
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
                        {getRatingStars(job.rating || 0)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({job.rating || 0})
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        ${job.payment || 0} earned
                      </div>
                    </div>
                  </div>

                  {/* Hired Candidates Info */}
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      Hired Candidates
                    </h4>
                    {job.hiredCandidates.map((candidate, index) => (
                      <div key={index} className="flex items-center gap-3 mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={candidate.avatar}
                            alt={candidate.name}
                          />
                          <AvatarFallback className="bg-green-500 text-white">
                            {candidate.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "N/A"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {candidate.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {candidate.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">
                                  {candidate.rating || "N/A"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {candidate.experience || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Job Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">
                        {job.totalApplications || 0}
                      </div>
                      <div className="text-gray-600">Applications</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-semibold text-purple-600">
                        {job.interviewsCompleted || 0}
                      </div>
                      <div className="text-gray-600">Interviews</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-semibold text-orange-600">
                        {job.timeToHire || "N/A"}
                      </div>
                      <div className="text-gray-600">Time to Hire</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">
                        ${job.salary || 0}
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
                            {job.jobReference || job._id?.slice(-6)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{job.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vendor:</span>
                          <span className="font-medium">
                            {job.vendor || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Posted:</span>
                          <span className="font-medium">
                            {job.postedAt
                              ? new Date(job.postedAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium">
                            {job.completedAt
                              ? new Date(job.completedAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium">
                            {job.deadline
                              ? new Date(job.deadline).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100 bg-transparent"
                      asChild
                    >
                      <Link href={`/hired-candidates?jobId=${job._id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Hired Candidates
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100 bg-transparent"
                    >
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => paginate(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
              Showing {indexOfFirstJob + 1} to{" "}
              {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
              {filteredJobs.length} jobs
            </div>
          </CardContent>
        </Card>
      )}

      {filteredJobs.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <CheckCircle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No completed jobs found
            </h3>
            <p className="text-gray-600">
              {searchTerm ||
              categoryFilter !== "all" ||
              ratingFilter !== "all" ||
              dateRange !== "all"
                ? "Try adjusting your search criteria or filters."
                : "You haven't completed any jobs yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
