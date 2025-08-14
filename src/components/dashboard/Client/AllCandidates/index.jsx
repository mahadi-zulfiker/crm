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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">
            Review and manage job applications from candidates.
          </p>
        </div>
        <Button variant="outline" className="text-gray-600 hover:bg-gray-100">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {stats.applied}
              </p>
              <p className="text-sm text-gray-600">Applied</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {stats.shortlisted}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {stats.interviewed}
              </p>
              <p className="text-sm text-gray-600">Interviewed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
              <p className="text-sm text-gray-600">Hired</p>
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
                  placeholder="Search candidates by name, job title, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview-scheduled">
                  Interview Scheduled
                </SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="frontend developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="backend engineer">
                  Backend Engineer
                </SelectItem>
                <SelectItem value="ux/ui designer">UX/UI Designer</SelectItem>
                <SelectItem value="product manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback className="bg-teal-500 text-white text-lg">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <p className="text-gray-600">{candidate.jobTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Applied {candidate.appliedDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {candidate.jobTitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {candidate.phone}
                      </div>
                    </div>

                    {candidate.coverLetter && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Cover Letter:
                        </p>
                        <p className="text-sm text-gray-600">
                          {candidate.coverLetter.substring(0, 50)}...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  <div className="flex flex-col gap-2">
                    <Link
                      className="w-full"
                      href={`/dashboard/client/viewEmployeeProfile?email=${candidate?.email}`}
                    >
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 w-full"
                        disabled={!candidate.resumeUrl}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!candidate.resumeUrl}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>

                  <Select
                    value={candidate.status}
                    onValueChange={(value) =>
                      updateCandidateStatus(candidate.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview-scheduled">
                        Interview Scheduled
                      </SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates found
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
