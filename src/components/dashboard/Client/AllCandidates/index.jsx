"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AllCandidates() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerAllCandidates />
    </Suspense>
  );
}

function InnerAllCandidates() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const endpoint = jobId
          ? `/api/applicationManagementClient/${jobId}`
          : "/api/applicationManagementClient"; // Fallback to fetch all applications if no jobId
        const response = await fetch(endpoint);
        if (response.ok) {
          const { data } = await response.json();
          setCandidates(
            data.map((candidate) => ({
              ...candidate,
              id: candidate._id, // Map _id to id for consistency
              name: candidate.fullName,
              jobTitle: candidate.position,
              appliedDate: new Date(candidate.appliedAt).toLocaleDateString(),
              // Provide defaults for fields not in API
              location: "N/A",
              experience: "N/A",
              education: "N/A",
              skills: [],
              rating: 0,
              salary: "N/A",
              availability: "N/A",
              resumeUrl: candidate.resumeId
                ? `/api/resumes/${candidate.resumeId}`
                : null,
              avatar: "/placeholder.svg",
            }))
          );
        } else {
          console.error("Failed to fetch candidates");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCandidates();
    }
  }, [session, jobId]);

  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (candidate) =>
          candidate.status.toLowerCase().replace(" ", "-") === statusFilter
      );
    }

    if (jobFilter !== "all") {
      filtered = filtered.filter((candidate) =>
        candidate.jobTitle.toLowerCase().includes(jobFilter.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, statusFilter, jobFilter, candidates]);

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-purple-100 text-purple-800";
      case "interview-scheduled":
        return "bg-orange-100 text-orange-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
      // Ensure candidateId is a string
      const idString =
        typeof candidateId === "string" ? candidateId : candidateId.toString();

      const response = await fetch("/api/applicationManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idString, status: newStatus }),
      });

      if (response.ok) {
        setCandidates(
          candidates.map((candidate) =>
            // Compare with string version of _id
            candidate._id.toString() === idString
              ? { ...candidate, status: newStatus }
              : candidate
          )
        );
      } else {
        console.error("Failed to update candidate status");
      }
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  const stats = {
    total: candidates.length,
    applied: candidates.filter((c) => c.status === "applied").length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    interviewed: candidates.filter((c) => c.status === "interview-scheduled")
      .length,
    hired: candidates.filter((c) => c.status === "hired").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Search className="w-6 h-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Candidates
          </h1>
          <p className="text-gray-600 mt-1 text-xs md:text-sm">
            Review and manage job applications from candidates.
          </p>
        </div>
        <Button
          variant="outline"
          className="text-gray-600 hover:bg-gray-100 h-9 text-xs md:text-sm"
        >
          <Download className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
          <span className="hidden xs:inline">Export</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {stats.total}
              </p>
              <p className="text-xs text-gray-600">Total Apps</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-blue-600">
                {stats.applied}
              </p>
              <p className="text-xs text-gray-600">Applied</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-purple-600">
                {stats.shortlisted}
              </p>
              <p className="text-xs text-gray-600">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-orange-600">
                {stats.interviewed}
              </p>
              <p className="text-xs text-gray-600">Interviewed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-green-600">
                {stats.hired}
              </p>
              <p className="text-xs text-gray-600">Hired</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-lg">
        <CardContent className="p-3">
          <div className="flex flex-col gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 text-xs md:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full h-9 text-xs md:text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs md:text-sm">
                    All Status
                  </SelectItem>
                  <SelectItem value="applied" className="text-xs md:text-sm">
                    Applied
                  </SelectItem>
                  <SelectItem
                    value="shortlisted"
                    className="text-xs md:text-sm"
                  >
                    Shortlisted
                  </SelectItem>
                  <SelectItem
                    value="interview-scheduled"
                    className="text-xs md:text-sm"
                  >
                    Interview Scheduled
                  </SelectItem>
                  <SelectItem value="hired" className="text-xs md:text-sm">
                    Hired
                  </SelectItem>
                  <SelectItem value="rejected" className="text-xs md:text-sm">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-full h-9 text-xs md:text-sm">
                  <SelectValue placeholder="Job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs md:text-sm">
                    All Jobs
                  </SelectItem>
                  <SelectItem
                    value="frontend developer"
                    className="text-xs md:text-sm"
                  >
                    Frontend Developer
                  </SelectItem>
                  <SelectItem
                    value="backend engineer"
                    className="text-xs md:text-sm"
                  >
                    Backend Engineer
                  </SelectItem>
                  <SelectItem
                    value="ux/ui designer"
                    className="text-xs md:text-sm"
                  >
                    UX/UI Designer
                  </SelectItem>
                  <SelectItem
                    value="product manager"
                    className="text-xs md:text-sm"
                  >
                    Product Manager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="hover:shadow-md transition-shadow rounded-lg"
          >
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                {/* Candidate Info */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback className="bg-teal-500 text-white text-sm">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {candidate.name}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm truncate">
                          {candidate.jobTitle}
                        </p>
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          candidate.status
                        )} text-[10px] md:text-xs py-0.5 px-1.5`}
                      >
                        {candidate.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span>Applied {candidate.appliedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 sm:col-span-2">
                        <Briefcase className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{candidate.jobTitle}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate max-w-[120px]">
                          {candidate.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 flex-shrink-0" />
                        <span>{candidate.phone}</span>
                      </div>
                    </div>

                    {candidate.coverLetter && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-600 mb-1">
                          Cover Letter:
                        </p>
                        <p className="text-xs text-gray-600">
                          {candidate.coverLetter.substring(0, 80)}...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <Link
                    className="flex-1 min-w-[120px]"
                    href={`/dashboard/client/viewEmployeeProfile?email=${candidate?.email}`}
                  >
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 w-full h-8 text-xs"
                      disabled={!candidate.resumeUrl}
                    >
                      <Eye className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
                      <span className="hidden xs:inline">View Profile</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    disabled={!candidate.resumeUrl}
                  >
                    <Download className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">Resume</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <MessageSquare className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">Message</span>
                  </Button>
                  <div className="w-full sm:w-auto sm:flex-1 min-w-[150px]">
                    <Select
                      value={candidate.status}
                      onValueChange={(value) =>
                        updateCandidateStatus(candidate.id, value)
                      }
                    >
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied" className="text-xs">
                          Applied
                        </SelectItem>
                        <SelectItem value="shortlisted" className="text-xs">
                          Shortlisted
                        </SelectItem>
                        <SelectItem
                          value="interview-scheduled"
                          className="text-xs"
                        >
                          Interview Scheduled
                        </SelectItem>
                        <SelectItem value="hired" className="text-xs">
                          Hired
                        </SelectItem>
                        <SelectItem value="rejected" className="text-xs">
                          Rejected
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card className="rounded-lg">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-10 h-10 mx-auto" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
