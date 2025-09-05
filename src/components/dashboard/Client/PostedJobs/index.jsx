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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  FileText,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Building,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PostedJobsPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 5;

  useEffect(() => {
    if (status === "authenticated" && session) {
      const fetchJobs = async () => {
        try {
          const response = await fetch(
            `/api/postedJobs?email=${session?.user?.email}`
          );
          const data = await response.json();
          setJobs(data);
          setFilteredJobs(data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }
  }, [session, status]);

  useEffect(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "All") {
      filtered = filtered.filter((job) => {
        if (filterStatus === "Active") {
          return job.status === "Active" || job.status !== "Completed";
        }
        return job.status === filterStatus;
      });
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterStatus, jobs]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading your posted jobs...</p>
        </div>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteJob = async (jobId) => {
    console.log("Deleting job:", jobId);
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        const res = await fetch(`/api/applicationManagementClient/${jobId}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          alert(`Deleted ${data.deletedCount} applications for this job`);
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        } else {
          alert(`Failed to delete: ${data.error || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Delete job error:", err);
        alert("Error deleting job. Please try again.");
      }
    }
  };

  // Calculate stats
  const stats = {
    total: jobs.length,
    active: jobs.filter(
      (job) => job.status === "Active" || job.status !== "Completed"
    ).length,
    completed: jobs.filter((job) => job.status === "Completed").length,
    draft: jobs.filter((job) => job.status === "Draft").length,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Posted Jobs
          </h1>
          <p className="text-gray-600 mt-1 text-xs md:text-sm">
            Monitor and manage all your job postings with detailed information.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="text-gray-600 hover:bg-gray-100 bg-transparent w-full sm:w-auto h-9 text-xs md:text-sm"
          >
            <Download className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Export</span>
          </Button>
          <Link href="/dashboard/client/jobs/create">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto h-9 text-xs md:text-sm">
              <FileText className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Post Job</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {stats.total}
              </p>
              <p className="text-xs text-gray-600">Total Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-blue-600">
                {stats.active}
              </p>
              <p className="text-xs text-gray-600">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-green-600">
                {stats.completed}
              </p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-orange-600">
                {stats.draft}
              </p>
              <p className="text-xs text-gray-600">Draft Jobs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="rounded-lg">
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-8 text-xs md:text-sm h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-32 md:w-40 h-9 text-xs md:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="text-xs md:text-sm">
                  All Statuses
                </SelectItem>
                <SelectItem value="Active" className="text-xs md:text-sm">
                  Active
                </SelectItem>
                <SelectItem value="Completed" className="text-xs md:text-sm">
                  Completed
                </SelectItem>
                <SelectItem value="Draft" className="text-xs md:text-sm">
                  Draft
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="text-gray-900 font-semibold text-xs py-2">
                    Job Title
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2 hidden md:table-cell">
                    Company
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2 hidden lg:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2 hidden md:table-cell">
                    Salary
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold text-xs py-2">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <TableRow
                      key={job._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900 py-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs md:text-sm truncate">
                              {job.title}
                            </div>
                            <div className="md:hidden text-xs text-gray-500 mt-1 space-y-1">
                              <div className="flex items-center gap-1">
                                <Building className="w-2.5 h-2.5" />
                                <span className="truncate">{job.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-2.5 h-2.5" />
                                <span>{job.salary}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 py-2 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs md:text-sm truncate">
                            {job.company}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 py-2 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs md:text-sm truncate">
                            {job.location}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 py-2 text-xs md:text-sm">
                        {job.jobType}
                      </TableCell>
                      <TableCell className="text-gray-600 py-2 hidden md:table-cell">
                        <div className="flex items-center gap-1 font-medium text-teal-600">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm">
                            {job.salary}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge
                          className={`${getStatusColor(
                            job.status
                          )} font-semibold text-[10px] md:text-xs py-1 px-2`}
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/dashboard/client/allCandidates?jobId=${job._id}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-teal-600 hover:bg-teal-50 h-7 w-7 md:h-8 md:w-8 p-0"
                              title="View Candidates"
                            >
                              <Eye className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/client/jobDetailsClient?jobId=${job._id}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-blue-600 hover:bg-blue-50 bg-transparent h-7 w-7 md:h-8 md:w-8 p-0"
                              title="Edit Job"
                            >
                              <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-red-600 hover:bg-red-50 h-7 w-7 md:h-8 md:w-8 p-0"
                            title="Delete Job"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-gray-600 hover:bg-gray-50 bg-transparent h-7 w-7 md:h-8 md:w-8 p-0"
                                title="More Options"
                              >
                                <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/client/interviewScheduleClient?jobId=${job._id}`}
                                  className="flex items-center gap-2 cursor-pointer text-xs md:text-sm"
                                >
                                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                  Interview Schedule
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/client/hiredCandidatesClient?jobId=${job._id}`}
                                  className="flex items-center gap-2 cursor-pointer text-xs md:text-sm"
                                >
                                  <Users className="w-3 h-3 md:w-4 md:h-4" />
                                  Hired Candidates
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 md:py-8">
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="w-8 h-8 md:w-10 h-10 text-gray-400" />
                        <p className="text-base font-medium text-gray-900">
                          No jobs found
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm">
                          Try adjusting your search or filter settings.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="rounded-lg">
          <CardContent className="p-3 md:p-4">
            <div className="flex justify-center items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed h-7 w-7 md:h-8 md:w-8 p-0"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => paginate(index + 1)}
                  className={`h-7 w-7 md:h-8 md:w-8 p-0 text-xs md:text-sm ${
                    currentPage === index + 1
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed h-7 w-7 md:h-8 md:w-8 p-0"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>

            <div className="text-center mt-2 text-xs text-gray-600">
              Showing {indexOfFirstJob + 1} to{" "}
              {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
              {filteredJobs.length} jobs
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
