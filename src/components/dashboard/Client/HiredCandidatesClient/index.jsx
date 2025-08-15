"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Download,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  ArrowLeft,
  UserCheck,
  DollarSign,
  Clock,
  Award,
} from "lucide-react";

export default function HiredCandidatesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerHiredCandidatesPage />
    </Suspense>
  );
}

function InnerHiredCandidatesPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const { toast } = useToast();

  const router = useRouter();
  console.log("Job ID:", jobId);
  const params = useParams();

  const [job, setJob] = useState(null);
  const [hiredCandidates, setHiredCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndHiredCandidates = async () => {
      try {
        // Fetch job details
        const jobResponse = await fetch(`/api/jobs/${jobId}`);
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch hired candidates for this job
        const candidatesResponse = await fetch(
          `/api/hired-candidates/${jobId}`
        );
        const candidatesData = await candidatesResponse.json();
        setHiredCandidates(candidatesData);
        setFilteredCandidates(candidatesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hired candidates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobAndHiredCandidates();
    }
  }, [jobId, toast]);

  useEffect(() => {
    let filtered = hiredCandidates;

    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, hiredCandidates]);

  const stats = {
    totalHired: hiredCandidates.length,
    averageSalary:
      hiredCandidates.length > 0
        ? hiredCandidates.reduce((sum, c) => sum + (c.offeredSalary || 0), 0) /
          hiredCandidates.length
        : 0,
    averageRating:
      hiredCandidates.length > 0
        ? hiredCandidates.reduce((sum, c) => sum + (c.rating || 0), 0) /
          hiredCandidates.length
        : 0,
    totalCost: hiredCandidates.reduce(
      (sum, c) => sum + (c.offeredSalary || 0),
      0
    ),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hired Candidates
            </h1>
            <p className="text-gray-600 mt-1">
              Successfully hired candidates for {job?.title}
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Job Info Card */}
      {job && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600">
                  {job.location} • {job.jobType} • {job.workType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Budget Range</p>
                <p className="font-semibold">
                  ${job.salaryMin?.toLocaleString()} - $
                  {job.salaryMax?.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hired</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalHired}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Salary
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ${stats.averageSalary.toLocaleString()}
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
                  {stats.averageRating.toFixed(1)}
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
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${stats.totalCost.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search hired candidates by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hired Candidates List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="hover:shadow-md transition-shadow border-l-4 border-l-green-500"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                    />
                    <AvatarFallback className="bg-green-500 text-white text-lg">
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
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {candidate.rating}
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Hired
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Hired {candidate.hiredDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        Start {candidate.startDate}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
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
                  </div>
                </div>

                {/* Hiring Details */}
                <div className="flex flex-col gap-3 lg:w-64">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Hiring Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Offered Salary:</span>
                        <span className="font-medium text-green-700">
                          ${candidate.offeredSalary?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">
                          {candidate.startDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">
                          {candidate.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Position:</span>
                        <span className="font-medium">
                          {candidate.position}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Contract
                    </Button>
                  </div>
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
              <UserCheck className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hired candidates found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "No candidates have been hired for this job yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
