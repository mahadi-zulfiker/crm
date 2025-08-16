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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posted Jobs</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all your job postings with detailed information.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-gray-600 hover:bg-gray-100 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Link href="/dashboard/client/jobs/create">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              <p className="text-sm text-gray-600">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {stats.draft}
              </p>
              <p className="text-sm text-gray-600">Draft Jobs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="text-gray-900 font-semibold">
                    Job Title
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Company
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Location
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Job Type
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Salary
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-900 font-semibold">
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
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-teal-600" />
                          {job.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          {job.company}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {job.jobType}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-1 font-medium text-teal-600">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            job.status
                          )} font-semibold`}
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/dashboard/client/allCandidates?jobId=${job._id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-600 hover:bg-teal-50"
                              title="View Candidates"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/client/jobDetailsClient?jobId=${job._id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 hover:bg-blue-50 bg-transparent"
                              title="Edit Job"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-red-600 hover:bg-red-50"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-600 hover:bg-gray-50 bg-transparent"
                                title="More Options"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/client/interviewScheduleClient?jobId=${job._id}`}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <Calendar className="w-4 h-4" />
                                  Interview Schedule
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/client/hiredCandidatesClient?jobId=${job._id}`}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <Users className="w-4 h-4" />
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
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <FileText className="w-12 h-12 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900">
                          No jobs found
                        </p>
                        <p className="text-gray-600">
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
    </div>
  );
}
