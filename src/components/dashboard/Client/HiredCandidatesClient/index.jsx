"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
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
  Clock,
  CreditCard,
  Send,
  Users,
  TrendingUp,
  Award,
  Wallet,
  Target,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function HiredCandidatesClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="text-gray-600">Loading hired candidates...</p>
          </div>
        </div>
      }
    >
      <InnerHiredCandidatesClient />
    </Suspense>
  );
}

function InnerHiredCandidatesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState(null);
  const [hiredCandidates, setHiredCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    description: "",
    paymentMethod: "bank_transfer",
    taskCompletion: "completed",
  });

  useEffect(() => {
    const fetchJobAndHiredCandidates = async () => {
      try {
        setLoading(true);

        // Fetch job details
        const jobResponse = await fetch(`/api/jobs/${jobId}`);
        if (jobResponse.ok) {
          const jobData = await jobResponse.json();
          setJob(jobData);
        }

        // Fetch hired candidates
        const candidatesResponse = await fetch(`/api/hiredCandidates/${jobId}`);
        if (!candidatesResponse.ok) {
          throw new Error("Failed to fetch hired candidates");
        }

        const candidatesData = await candidatesResponse.json();
        console.log("Hired candidates data:", candidatesData);

        // Handle the response structure from the backend
        const candidatesArray =
          candidatesData.success && candidatesData.data
            ? candidatesData.data
            : [];

        // Format candidates data to match frontend expectations
        const formattedCandidates = candidatesArray.map((candidate) => {
          // Process skills array
          const processedSkills = Array.isArray(candidate.skills)
            ? candidate.skills
                .filter((skill) => skill && skill.name && skill.name.trim())
                .map((skill) => skill.name.trim())
            : [];

          return {
            _id: candidate._id,
            id: candidate._id,
            name: candidate.fullName || "Unknown",
            fullName: candidate.fullName || "Unknown",
            email: candidate.email || "N/A",
            phone: candidate.phone || "N/A",
            position: candidate.position || "N/A",
            jobTitle: candidate.position || "N/A",
            appliedAt: candidate.appliedAt
              ? new Date(candidate.appliedAt).toLocaleDateString()
              : "N/A",
            hiredAt: candidate.hiredAt
              ? new Date(candidate.hiredAt).toLocaleDateString()
              : "N/A",
            startDate: candidate.startDate
              ? new Date(candidate.startDate).toLocaleDateString()
              : "Not Set",
            location: candidate.location || "Remote",
            experience: candidate.experience || "Not Specified",
            skills: processedSkills,
            rating: candidate.rating || 4.5,
            offeredSalary: candidate.offeredSalary || 0,
            department: candidate.department || "General",
            taskStatus: candidate.taskStatus || "pending",
            paymentStatus: candidate.paymentStatus || "pending",
            totalPayments: candidate.totalPayments || 0,
            lastPaymentDate: candidate.lastPaymentDate,
            paymentHistory: candidate.paymentHistory || [],
            avatar: "/placeholder.svg",
            coverLetter: candidate.coverLetter || "",
            interviewSchedule: candidate.interviewSchedule || null,
          };
        });

        setHiredCandidates(formattedCandidates);
        setFilteredCandidates(formattedCandidates);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch hired candidates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (jobId && session) {
      fetchJobAndHiredCandidates();
    }
  }, [jobId, session, toast]);

  useEffect(() => {
    let filtered = hiredCandidates;

    if (searchTerm) {
      filtered = hiredCandidates.filter(
        (candidate) =>
          candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, hiredCandidates]);

  const handlePayment = async () => {
    if (!selectedCandidate || !paymentData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required payment details.",
        variant: "destructive",
      });
      return;
    }

    try {
      setPaymentLoading(true);

      const paymentPayload = {
        candidateId: selectedCandidate._id,
        jobId: jobId,
        amount: Number.parseFloat(paymentData.amount),
        description:
          paymentData.description ||
          `Payment for ${selectedCandidate.position}`,
        paymentMethod: paymentData.paymentMethod,
        taskCompletion: paymentData.taskCompletion,
        clientEmail: session?.user?.email,
      };

      console.log("Sending payment payload:", paymentPayload);

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });

      const result = await response.json();
      console.log("Payment response:", result);

      if (!response.ok) {
        throw new Error(result.error || "Payment processing failed");
      }

      if (result.success) {
        // Update local state with the new payment information
        const paymentAmount = Number.parseFloat(paymentData.amount);
        setHiredCandidates((prev) =>
          prev.map((candidate) =>
            candidate._id === selectedCandidate._id
              ? {
                  ...candidate,
                  paymentStatus: "paid",
                  totalPayments:
                    result.data.totalPayments ||
                    (candidate.totalPayments || 0) + paymentAmount,
                  taskStatus: paymentData.taskCompletion,
                  lastPaymentDate: new Date().toISOString(),
                }
              : candidate
          )
        );

        toast({
          title: "Payment Successful",
          description: `Payment of $${paymentData.amount} has been processed successfully. Transaction ID: ${result.data.transactionId}`,
        });

        setPaymentDialog(false);
        setSelectedCandidate(null);
        setPaymentData({
          amount: "",
          description: "",
          paymentMethod: "bank_transfer",
          taskCompletion: "completed",
        });
      } else {
        throw new Error(result.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description:
          error.message ||
          "There was an error processing the payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const openPaymentDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setPaymentData({
      ...paymentData,
      amount:
        candidate.offeredSalary > 0 ? candidate.offeredSalary.toString() : "",
      description: `Payment for ${candidate.position} work completion`,
    });
    setPaymentDialog(true);
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "partially_completed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
    totalPayments: hiredCandidates.reduce(
      (sum, c) => sum + (c.totalPayments || 0),
      0
    ),
    completedTasks: hiredCandidates.filter((c) => c.taskStatus === "completed")
      .length,
    pendingPayments: hiredCandidates.filter(
      (c) => c.paymentStatus === "pending"
    ).length,
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading hired candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2 hover:bg-teal-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                Hired Candidates
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage payments and track progress for hired candidates
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-teal-200 text-teal-700 hover:bg-teal-50 w-full sm:w-auto bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Job Info Card */}
        {job && (
          <Card className="border-l-4 border-l-teal-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {job.location} • {job.jobType} • {job.workType}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-600">Budget Range</p>
                  <p className="font-semibold text-teal-700">
                    ${job.salaryMin?.toLocaleString() || "N/A"} - $
                    {job.salaryMax?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <Card className="hover:shadow-md transition-shadow border-teal-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Hired
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-teal-600">
                    {stats.totalHired}
                  </p>
                </div>
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-blue-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Avg Salary
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">
                    ${Math.round(stats.averageSalary).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-yellow-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Avg Rating
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                    {stats.averageRating.toFixed(1)}
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-purple-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Paid
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">
                    ${stats.totalPayments.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-green-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Completed
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {stats.completedTasks}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-orange-100">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Pending Pay
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">
                    {stats.pendingPayments}
                  </p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search hired candidates by name, email, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Candidates List */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-teal-500 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Candidate Info */}
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-teal-200">
                      <AvatarImage
                        src={candidate.avatar || "/placeholder.svg"}
                        alt={candidate.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-orange-500 text-white text-sm sm:text-lg font-semibold">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                            {candidate.name}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {candidate.jobTitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {candidate.rating}
                            </span>
                          </div>
                          <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Hired
                          </Badge>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            {candidate.experience}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            Hired {candidate.hiredAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            Start {candidate.startDate}
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      {candidate.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            Skills:
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {candidate.skills
                              .slice(0, 6)
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-teal-200 text-teal-700"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            {candidate.skills.length > 6 && (
                              <Badge
                                variant="outline"
                                className="text-xs border-gray-200 text-gray-600"
                              >
                                +{candidate.skills.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1 min-w-0">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{candidate.phone}</span>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Task Status:
                          </span>
                          <Badge
                            className={`text-xs ${getTaskStatusColor(
                              candidate.taskStatus
                            )}`}
                          >
                            {candidate.taskStatus.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Payment:
                          </span>
                          <Badge
                            className={`text-xs ${getPaymentStatusColor(
                              candidate.paymentStatus
                            )}`}
                          >
                            {candidate.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hiring Details & Actions */}
                  <div className="flex flex-col gap-3 lg:w-80">
                    <div className="bg-gradient-to-br from-teal-50 to-orange-50 p-4 rounded-lg border border-teal-100">
                      <h4 className="font-semibold text-teal-800 mb-3 text-sm sm:text-base">
                        Hiring Details
                      </h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Offered Salary:</span>
                          <span className="font-medium text-teal-700">
                            ${candidate.offeredSalary.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Paid:</span>
                          <span className="font-medium text-orange-700">
                            ${candidate.totalPayments.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium truncate ml-2">
                            {candidate.department}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Position:</span>
                          <span className="font-medium truncate ml-2">
                            {candidate.position}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-700 hover:bg-teal-50 bg-transparent"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all"
                        onClick={() => openPaymentDialog(candidate)}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {candidate.paymentStatus === "paid"
                          ? "Add Payment"
                          : "Make Payment"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <UserCheck className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hired candidates found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "No candidates have been hired for this job yet."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Payment Dialog */}
        <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
          <DialogContent className="sm:max-w-[500px] mx-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                Process Payment
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Make a payment to {selectedCandidate?.name || "Unknown"} for
                completed work.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Payment Amount ($) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={paymentData.amount}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, amount: e.target.value })
                  }
                  className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Payment Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this payment is for..."
                  value={paymentData.description}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      description: e.target.value,
                    })
                  }
                  className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 min-h-[80px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paymentMethod" className="text-sm font-medium">
                  Payment Method
                </Label>
                <Select
                  value={paymentData.paymentMethod}
                  onValueChange={(value) =>
                    setPaymentData({ ...paymentData, paymentMethod: value })
                  }
                >
                  <SelectTrigger className="border-teal-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Credit Card (Stripe)</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="taskCompletion" className="text-sm font-medium">
                  Task Status
                </Label>
                <Select
                  value={paymentData.taskCompletion}
                  onValueChange={(value) =>
                    setPaymentData({ ...paymentData, taskCompletion: value })
                  }
                >
                  <SelectTrigger className="border-teal-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="partially_completed">
                      Partially Completed
                    </SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setPaymentDialog(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                disabled={paymentLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={paymentLoading || !paymentData.amount}
                className="bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white w-full sm:w-auto"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Process Payment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
