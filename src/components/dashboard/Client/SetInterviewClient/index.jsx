"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
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
} from "lucide-react";

export default function SetInterViewClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const candidateId = searchParams.get("candidateId");
  const jobId = searchParams.get("jobId");

  const [candidate, setCandidate] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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
      try {
        // Fetch candidate details
        const candidateResponse = await fetch(
          `/api/candidates/details/${candidateId}`
        );
        const candidateData = await candidateResponse.json();
        setCandidate(candidateData);

        // Fetch job details
        const jobResponse = await fetch(`/api/jobs/${jobId}`);
        const jobData = await jobResponse.json();
        setJob(jobData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (candidateId && jobId) {
      fetchData();
    }
  }, [candidateId, jobId, toast]);

  const handleInputChange = (field, value) => {
    setInterviewData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleInterview = async () => {
    try {
      // Validate required fields
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

      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          jobId,
          ...interviewData,
        }),
      });

      if (response.ok) {
        // Update candidate status to "Interview Scheduled"
        await fetch(`/api/candidates/${jobId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ candidateId, status: "Interview Scheduled" }),
        });

        toast({
          title: "Success!",
          description:
            "Interview scheduled successfully. Candidate will be notified.",
        });

        // Redirect back to candidates page
        router.push(`/dashboard/client/candidates/${jobId}`);
      } else {
        throw new Error("Failed to schedule interview");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive",
      });
    }
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Schedule Interview
          </h1>
          <p className="text-gray-600 mt-1">
            Set up an interview with the selected candidate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate & Job Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Candidate Card */}
          {candidate && (
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
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                    />
                    <AvatarFallback className="bg-teal-500 text-white">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {candidate.jobTitle}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Card */}
          {job && (
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-600">
                  ${job.salaryMin?.toLocaleString()} - $
                  {job.salaryMax?.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interview Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date and Time */}
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

              {/* Duration and Type */}
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
                    onValueChange={(value) => handleInputChange("type", value)}
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

              {/* Location/Meeting Link */}
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

              {/* Interviewer Details */}
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

              {/* Agenda */}
              <div className="space-y-2">
                <Label htmlFor="agenda">Interview Agenda</Label>
                <Textarea
                  id="agenda"
                  placeholder="Outline the interview structure and topics to be covered..."
                  value={interviewData.agenda}
                  onChange={(e) => handleInputChange("agenda", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Notes */}
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

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleScheduleInterview}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
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
