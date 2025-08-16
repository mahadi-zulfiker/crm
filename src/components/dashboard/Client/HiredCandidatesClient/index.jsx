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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  UserCheck,
  DollarSign,
  Clock,
  CreditCard,
  Send,
  Loader2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function HiredCandidatesClient() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
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
  const { data: session, status } = useSession();
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
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5;

  useEffect(() => {
    const fetchJobAndHiredCandidates = async () => {
      try {
        setLoading(true);

        // Fetch job details
        const jobResponse = await fetch(`/api/jobs/${jobId}`);
        if (!jobResponse.ok) {
          throw new Error("Failed to fetch job details");
        }
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch hired candidates
        const candidatesResponse = await fetch(`/api/hiredCandidates/${jobId}`);
        if (!candidatesResponse.ok) {
          throw new Error("Failed to fetch hired candidates");
        }
        const candidatesData = await candidatesResponse.json();
        console.log("Hired candidates data:", candidatesData);

        const candidatesArray =
          candidatesData.success && candidatesData.data
            ? candidatesData.data
            : Array.isArray(candidatesData)
            ? candidatesData
            : [candidatesData].filter(Boolean);

        const formattedCandidates = candidatesArray.map((candidate) => {
          const id = candidate._id
            ? candidate._id.toString()
            : `temp-${Date.now()}`;
          return {
            _id: id,
            id: id,
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
              : "N/A",
            location: candidate.location || "N/A",
            experience: candidate.experience || "N/A",
            skills: Array.isArray(candidate.skills)
              ? candidate.skills
                  .filter((skill) => skill && skill.name && skill.name.trim())
                  .map((skill) => skill.name.trim())
              : [],
            rating: candidate.rating || 0,
            offeredSalary: candidate.offeredSalary || 0,
            department: candidate.department || "N/A",
            taskStatus: candidate.taskStatus || "pending",
            paymentStatus: candidate.paymentStatus || "pending",
            totalPayments: candidate.totalPayments || 0,
            avatar: "/placeholder.svg",
            coverLetter: candidate.coverLetter || "N/A",
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

    if (jobId && status === "authenticated" && session) {
      fetchJobAndHiredCandidates();
    }
  }, [jobId, session, status, toast]);

  useEffect(() => {
    let filtered = hiredCandidates;

    if (searchTerm) {
      filtered = hiredCandidates.filter(
        (candidate) =>
          (candidate.fullName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (candidate.email || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          candidate.skills.some((skill) =>
            (skill || "").toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCandidates(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, hiredCandidates]);

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Payment processing failed");
      }

      if (result.success) {
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
      amount: candidate.offeredSalary?.toString() || "",
      description: `Payment for ${candidate.position} work completion`,
    });
    setPaymentDialog(true);
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "partially_completed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  if (status === "loading" || loading) {
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hired Candidates</h1>
          <p className="text-gray-600 mt-1">
            Manage payments and track progress for hired candidates
          </p>
        </div>
        <Button
          variant="outline"
          className="text-gray-600 hover:bg-gray-100 bg-transparent"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Job Info */}
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
                <p className="font-semibold text-teal-600">
                  ${job.salaryMin?.toLocaleString() || "N/A"} - $
                  {job.salaryMax?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hired</p>
                <p className="text-2xl font-bold text-teal-600">
                  {stats.totalHired}
                </p>
              </div>
              <div className="p-2 bg-teal-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Salary</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${Math.round(stats.averageSalary).toLocaleString()}
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
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
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
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${stats.totalPayments.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.completedTasks}
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
                <p className="text-sm font-medium text-gray-600">Pending Pay</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.pendingPayments}
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
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

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-6">
        {currentCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="hover:shadow-md transition-shadow border-l-4 border-l-teal-500"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
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
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {candidate.rating}
                          </span>
                        </div>
                        <Badge className="bg-teal-100 text-teal-800">
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
                        Hired {candidate.hiredAt}
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
                            className="text-xs border-teal-200 text-teal-700"
                          >
                            {skill}
                          </Badge>
                        ))}
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

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Task Status:
                        </span>
                        <Badge
                          className={getTaskStatusColor(candidate.taskStatus)}
                        >
                          {candidate.taskStatus.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Payment:</span>
                        <Badge
                          className={getPaymentStatusColor(
                            candidate.paymentStatus
                          )}
                        >
                          {candidate.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-80">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">
                      Hiring Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Offered Salary:</span>
                        <span className="font-medium text-teal-700">
                          ${candidate.offeredSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Paid:</span>
                        <span className="font-medium text-blue-700">
                          ${candidate.totalPayments.toLocaleString()}
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
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-teal-600 hover:bg-teal-50 bg-transparent"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
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
              Showing {indexOfFirstCandidate + 1} to{" "}
              {Math.min(indexOfLastCandidate, filteredCandidates.length)} of{" "}
              {filteredCandidates.length} candidates
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Process Payment</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make a payment to {selectedCandidate?.name || "Unknown"} for
              completed work.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Payment Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
                className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
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
                className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
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
                <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
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
                <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialog(false)}
              className="text-gray-600 hover:bg-gray-100 bg-transparent"
              disabled={paymentLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={paymentLoading || !paymentData.amount}
              className="bg-teal-600 hover:bg-teal-700 text-white"
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
  );
}
