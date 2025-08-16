"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  User,
  Mail,
  ArrowLeft,
  Send,
  Search,
  Eye,
  Loader2,
  Briefcase,
  Download,
  CheckCircle,
} from "lucide-react";

export default function InterviewScheduleClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateId");

  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // Interview form state
  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    duration: "60",
    type: "video",
    location: "",
    meetingLink: "",
    interviewer: "",
    interviewerEmail: "",
    notes: "",
    agenda: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      try {
        setLoading(true);
        // Fetch client's posted jobs
        const jobsResponse = await fetch(
          `/api/postedJobs?email=${session?.user?.email}`
        );
        if (!jobsResponse.ok) throw new Error("Failed to fetch jobs");
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);

        // Fetch candidates with "interview-scheduled" status for client's jobs
        const endpoint = jobId
          ? `/api/applicationManagementClient/${jobId}?status=interview-scheduled`
          : `/api/applicationManagementClient?status=interview-scheduled&clientId=${session.user.id}`;
        const candidatesResponse = await fetch(endpoint);
        if (!candidatesResponse.ok)
          throw new Error("Failed to fetch candidates");
        const { data } = await candidatesResponse.json();

        const mappedCandidates = data.map((candidate) => ({
          id: candidate._id,
          name: candidate.fullName,
          jobTitle: candidate.position,
          appliedDate: new Date(candidate.appliedAt).toLocaleDateString(),
          location: candidate.location || "N/A",
          email: candidate.email || "N/A",
          phone: candidate.phone || "N/A",
          avatar: candidate.avatar || "/placeholder.svg",
          status: candidate.status || "interview-scheduled",
          resumeUrl: candidate.resumeId
            ? `/api/resumes/${candidate.resumeId}`
            : null,
          jobId: candidate.jobId,
          coverLetter: candidate.coverLetter || "N/A",
          // Include existing interview schedule data
          interviewSchedule: candidate.interviewSchedule || null,
        }));

        setCandidates(mappedCandidates);
        setFilteredCandidates(mappedCandidates);

        // If jobId and candidateId are provided, set selected candidate and job
        if (jobId && candidateId) {
          const job = jobsData.find((j) => j._id === jobId);
          const candidate = mappedCandidates.find((c) => c.id === candidateId);
          if (job && candidate) {
            setSelectedJob(job);
            setSelectedCandidate(candidate);

            // Pre-populate form with existing interview schedule data
            if (candidate.interviewSchedule) {
              setInterviewData({
                date: candidate.interviewSchedule.date || "",
                time: candidate.interviewSchedule.time || "",
                duration:
                  candidate.interviewSchedule.duration?.toString() || "60",
                type: candidate.interviewSchedule.type || "video",
                location: candidate.interviewSchedule.location || "",
                meetingLink: candidate.interviewSchedule.meetingLink || "",
                interviewer: candidate.interviewSchedule.interviewer || "",
                interviewerEmail:
                  candidate.interviewSchedule.interviewerEmail || "",
                notes: candidate.interviewSchedule.notes || "",
                agenda: candidate.interviewSchedule.agenda || "",
              });
            }

            setShowScheduleForm(true);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, jobId, candidateId, toast]);

  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (jobFilter !== "all") {
      filtered = filtered.filter((candidate) => candidate.jobId === jobFilter);
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, jobFilter, candidates]);

  const handleInputChange = (field, value) => {
    setInterviewData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleInterview = async () => {
    try {
      // Validation first
      if (
        !interviewData.date ||
        !interviewData.time ||
        !interviewData.interviewer
      ) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Send PUT request to update application with schedule + status
      const response = await fetch("/api/addSchedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: selectedCandidate.id,
          jobId: selectedCandidate.jobId,
          clientId: session.user.id,
          ...interviewData,
        }),
      });

      if (response.ok) {
        // Update state locally
        const updatedInterviewSchedule = {
          ...interviewData,
          updatedAt: new Date().toISOString(),
        };

        setCandidates(
          candidates.map((candidate) =>
            candidate.id === selectedCandidate.id
              ? {
                  ...candidate,
                  interviewSchedule: updatedInterviewSchedule,
                }
              : candidate
          )
        );

        toast({
          title: "Success!",
          description:
            "Interview schedule updated successfully. Candidate will be notified.",
        });

        // Reset form
        setShowScheduleForm(false);
        setSelectedCandidate(null);
        setSelectedJob(null);
        setInterviewData({
          date: "",
          time: "",
          duration: "60",
          type: "video",
          location: "",
          meetingLink: "",
          interviewer: "",
          interviewerEmail: "",
          notes: "",
          agenda: "",
        });
      } else {
        throw new Error("Failed to schedule interview");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleClick = (candidate) => {
    const job = jobs.find((j) => j._id === candidate.jobId);
    setSelectedCandidate(candidate);
    setSelectedJob(job);

    // Pre-populate form with existing interview schedule data if available
    if (candidate.interviewSchedule) {
      setInterviewData({
        date: candidate.interviewSchedule.date || "",
        time: candidate.interviewSchedule.time || "",
        duration: candidate.interviewSchedule.duration?.toString() || "60",
        type: candidate.interviewSchedule.type || "video",
        location: candidate.interviewSchedule.location || "",
        meetingLink: candidate.interviewSchedule.meetingLink || "",
        interviewer: candidate.interviewSchedule.interviewer || "",
        interviewerEmail: candidate.interviewSchedule.interviewerEmail || "",
        notes: candidate.interviewSchedule.notes || "",
        agenda: candidate.interviewSchedule.agenda || "",
      });
    } else {
      // Reset form for new schedule
      setInterviewData({
        date: "",
        time: "",
        duration: "60",
        type: "video",
        location: "",
        meetingLink: "",
        interviewer: "",
        interviewerEmail: "",
        notes: "",
        agenda: "",
      });
    }

    setShowScheduleForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "interview-scheduled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not scheduled";
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = {
    total: candidates.length,
    interviewScheduled: candidates.filter(
      (c) => c.status === "interview-scheduled"
    ).length,
    withScheduleDetails: candidates.filter((c) => c.interviewSchedule).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (showScheduleForm && selectedCandidate && selectedJob) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              setShowScheduleForm(false);
              setSelectedCandidate(null);
              setSelectedJob(null);
            }}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCandidate.interviewSchedule
                ? "Update Interview"
                : "Schedule Interview"}
            </h1>
            <p className="text-gray-600 mt-1">
              {selectedCandidate.interviewSchedule ? "Update" : "Set"} interview
              details for {selectedCandidate.name}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Candidate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedCandidate.avatar || "/placeholder.svg"}
                      alt={selectedCandidate.name}
                    />
                    <AvatarFallback className="bg-teal-500 text-white">
                      {selectedCandidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedCandidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedCandidate.jobTitle}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedCandidate.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  {selectedJob.title}
                </h3>
                <p className="text-sm text-gray-600">{selectedJob.location}</p>
                <p className="text-sm text-gray-600">
                  ${selectedJob.salaryMin?.toLocaleString()} - $
                  {selectedJob.salaryMax?.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            {/* Current Schedule Info */}
            {selectedCandidate.interviewSchedule && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Current Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      {formatDateTime(
                        selectedCandidate.interviewSchedule.date,
                        selectedCandidate.interviewSchedule.time
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>
                      {selectedCandidate.interviewSchedule.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedCandidate.interviewSchedule.type === "video" && (
                      <Video className="w-4 h-4 text-gray-400" />
                    )}
                    {selectedCandidate.interviewSchedule.type === "phone" && (
                      <Phone className="w-4 h-4 text-gray-400" />
                    )}
                    {selectedCandidate.interviewSchedule.type ===
                      "in-person" && (
                      <MapPin className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="capitalize">
                      {selectedCandidate.interviewSchedule.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>
                      {selectedCandidate.interviewSchedule.interviewer}
                    </span>
                  </div>
                  {selectedCandidate.interviewSchedule.updatedAt && (
                    <div className="text-xs text-gray-500 mt-2">
                      Last updated:{" "}
                      {new Date(
                        selectedCandidate.interviewSchedule.updatedAt
                      ).toLocaleString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Interview Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={interviewData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        className="pl-10"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Interview Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="time"
                        type="time"
                        value={interviewData.time}
                        onChange={(e) =>
                          handleInputChange("time", e.target.value)
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      value={interviewData.duration}
                      onValueChange={(value) =>
                        handleInputChange("duration", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Interview Type</Label>
                    <Select
                      value={interviewData.type}
                      onValueChange={(value) =>
                        handleInputChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Video Call
                          </div>
                        </SelectItem>
                        <SelectItem value="phone">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Call
                          </div>
                        </SelectItem>
                        <SelectItem value="in-person">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            In Person
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {interviewData.type === "video" && (
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      value={interviewData.meetingLink}
                      onChange={(e) =>
                        handleInputChange("meetingLink", e.target.value)
                      }
                    />
                  </div>
                )}

                {interviewData.type === "in-person" && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Office address or meeting room"
                      value={interviewData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interviewer">Interviewer Name *</Label>
                    <Input
                      id="interviewer"
                      placeholder="Enter interviewer name"
                      value={interviewData.interviewer}
                      onChange={(e) =>
                        handleInputChange("interviewer", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interviewerEmail">Interviewer Email</Label>
                    <Input
                      id="interviewerEmail"
                      type="email"
                      placeholder="interviewer@company.com"
                      value={interviewData.interviewerEmail}
                      onChange={(e) =>
                        handleInputChange("interviewerEmail", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agenda">Interview Agenda</Label>
                  <Textarea
                    id="agenda"
                    placeholder="Outline the interview structure and topics..."
                    value={interviewData.agenda}
                    onChange={(e) =>
                      handleInputChange("agenda", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information for the candidate..."
                    value={interviewData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleScheduleInterview}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {selectedCandidate.interviewSchedule
                      ? "Update Interview"
                      : "Schedule Interview"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowScheduleForm(false);
                      setSelectedCandidate(null);
                      setSelectedJob(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Interview Schedule
          </h1>
          <p className="text-gray-600 mt-1">
            Manage scheduled interviews for your job postings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">
                Total Scheduled Interviews
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {stats.interviewScheduled}
              </p>
              <p className="text-sm text-gray-600">Active Interviews</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.withScheduleDetails}
              </p>
              <p className="text-sm text-gray-600">With Schedule Details</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search candidates by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job._id} value={job._id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                    />
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
                        {candidate.interviewSchedule && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Scheduled
                          </Badge>
                        )}
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
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {candidate.phone}
                      </div>
                    </div>

                    {/* Show existing interview schedule if available */}
                    {candidate.interviewSchedule && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <h4 className="font-medium text-green-800">
                            Interview Scheduled
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {formatDateTime(
                              candidate.interviewSchedule.date,
                              candidate.interviewSchedule.time
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {candidate.interviewSchedule.duration} minutes
                          </div>
                          <div className="flex items-center gap-2">
                            {candidate.interviewSchedule.type === "video" && (
                              <Video className="w-3 h-3" />
                            )}
                            {candidate.interviewSchedule.type === "phone" && (
                              <Phone className="w-3 h-3" />
                            )}
                            {candidate.interviewSchedule.type ===
                              "in-person" && <MapPin className="w-3 h-3" />}
                            <span className="capitalize">
                              {candidate.interviewSchedule.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {candidate.interviewSchedule.interviewer}
                          </div>
                        </div>
                      </div>
                    )}

                    {candidate.coverLetter &&
                      candidate.coverLetter !== "N/A" && (
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
                <div className="flex flex-col gap-3 lg:w-48">
                  <Button
                    size="sm"
                    onClick={() => handleScheduleClick(candidate)}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {candidate.interviewSchedule
                      ? "Update Schedule"
                      : "Set Schedule"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 bg-transparent"
                    onClick={() =>
                      router.push(
                        `/dashboard/client/viewEmployeeProfile?email=${candidate.email}`
                      )
                    }
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
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
              No scheduled interviews found
            </h3>
            <p className="text-gray-600">
              No candidates with scheduled interviews match your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
