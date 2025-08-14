"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  CreditCard,
  Briefcase,
} from "lucide-react";

export default function JobManagementClientPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobManagementClient");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch jobs. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchJobs();
  }, [toast]);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.status.toLowerCase().replace(" ", "-") === statusFilter
      );
    }

    if (paymentFilter !== "all") {
      if (paymentFilter === "paid") {
        filtered = filtered.filter((job) => job.payment && job.payment > 0);
      } else if (paymentFilter === "unpaid") {
        filtered = filtered.filter((job) => !job.payment || job.payment === 0);
      }
    }

    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, paymentFilter, jobs]);

  const handleSetDeadline = async () => {
    if (!selectedJob || !newDeadline) return;

    try {
      const response = await fetch("/api/jobManagementClient", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: selectedJob._id, deadline: newDeadline }),
      });

      if (response.ok) {
        setJobs(
          jobs.map((j) =>
            j._id === selectedJob._id ? { ...j, deadline: newDeadline } : j
          )
        );
        toast({
          title: "Success!",
          description: "Deadline updated successfully.",
        });
        setShowDeadlineModal(false);
        setNewDeadline("");
        setSelectedJob(null);
      } else {
        throw new Error("Failed to update deadline");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deadline. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMakePayment = async () => {
    if (!selectedJob || !paymentAmount) return;

    if (selectedJob.status !== "Completed") {
      toast({
        title: "Error!",
        description: "You can only make payments for completed jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/jobManagementClient", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob._id,
          payment: Number.parseFloat(paymentAmount),
        }),
      });

      if (response.ok) {
        setJobs(
          jobs.map((j) =>
            j._id === selectedJob._id
              ? { ...j, payment: Number.parseFloat(paymentAmount) }
              : j
          )
        );
        toast({
          title: "Success!",
          description: "Payment made successfully.",
        });
        setShowPaymentModal(false);
        setPaymentAmount("");
        setSelectedJob(null);
      } else {
        throw new Error("Failed to make payment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to make payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    totalJobs: jobs.length,
    completedJobs: jobs.filter((job) => job.status === "Completed").length,
    inProgressJobs: jobs.filter((job) => job.status === "In Progress").length,
    totalPayments: jobs.reduce((sum, job) => sum + (job.payment || 0), 0),
    unpaidJobs: jobs.filter(
      (job) => job.status === "Completed" && (!job.payment || job.payment === 0)
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">
            Manage deadlines and payments for your job postings.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalJobs}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
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
                  {stats.completedJobs}
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
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.inProgressJobs}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${stats.totalPayments.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.unpaidJobs}
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-orange-600" />
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
                  placeholder="Search jobs by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Management ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {job.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-gray-600">
                        {job.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {job.deadline || "Not set"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(job.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(job.status)}
                          {job.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span
                          className={
                            job.payment
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {job.payment
                            ? `$${job.payment.toLocaleString()}`
                            : "Not paid"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {job.status !== "Completed" && !job.payment && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedJob(job);
                              setNewDeadline(job.deadline || "");
                              setShowDeadlineModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            Set Deadline
                          </Button>
                        )}
                        {job.status === "Completed" &&
                          (!job.payment || job.payment === 0) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedJob(job);
                                setPaymentAmount("");
                                setShowPaymentModal(true);
                              }}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CreditCard className="w-4 h-4 mr-1" />
                              Make Payment
                            </Button>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Briefcase className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Deadline Modal */}
      {showDeadlineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Set Deadline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job: {selectedJob?.title}
                </label>
                <Input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  placeholder="Select deadline date"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeadlineModal(false);
                    setSelectedJob(null);
                    setNewDeadline("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSetDeadline}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Update Deadline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job: {selectedJob?.title}
                </label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedJob(null);
                    setPaymentAmount("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleMakePayment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
