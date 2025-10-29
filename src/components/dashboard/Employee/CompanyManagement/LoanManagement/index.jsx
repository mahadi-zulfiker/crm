import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Download,
  Search,
  Plus,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function LoanManagement() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLoanRequest, setNewLoanRequest] = useState({
    type: "",
    amount: "",
    purpose: "",
    repaymentMonths: "",
  });

  // Fetch loan data from the database
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        if (!session?.user?.id) return;

        setLoading(true);
        const response = await fetch(
          `/api/employee/loan?employeeId=${session.user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setLoanData(data.data);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch loan data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch loan data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, [session]);

  const handleExport = () => {
    toast({
      title: "Loan Export Started",
      description:
        "Your loan report export has started. You'll receive a notification when it's ready.",
    });
  };

  const handleApplyLoan = () => {
    setIsLoanModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoanModalOpen(false);
    // Reset form
    setNewLoanRequest({
      type: "",
      amount: "",
      purpose: "",
      repaymentMonths: "",
    });
  };

  const handleInputChange = (field, value) => {
    setNewLoanRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitLoanRequest = async () => {
    try {
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "User not authenticated",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch("/api/employee/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session.user.id,
          name: session.user.name,
          email: session.user.email,
          ...newLoanRequest,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Loan request submitted successfully",
        });

        // Add new request to the list
        setLoanData((prev) => [...prev, data.data]);

        handleCloseModal();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit loan request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting loan request:", error);
      toast({
        title: "Error",
        description: "Failed to submit loan request",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLoans = loanData.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading loan data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Loan Management</h1>
          <p className="text-gray-600">View and apply for loans</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search loan records..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleApplyLoan} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Apply Loan-
          </Button>
        </div>
      </div>

      {/* Loan Records */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Loan History</CardTitle>
              <CardDescription>Your loan application records</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Loan Type</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Purpose</th>
                  <th className="text-left py-3 px-4">Repayment Months</th>
                  <th className="text-left py-3 px-4">Monthly Installment</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((record) => (
                    <tr key={record._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{record.type}</td>
                      <td className="py-3 px-4">
                        ${record.amount?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{record.purpose}</td>
                      <td className="py-3 px-4">{record.repaymentMonths}</td>
                      <td className="py-3 px-4">
                        ${record.monthlyInstallment?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(record.appliedDate).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No loan records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Loan Application Modal */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply for Loan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Loan Type
                </label>
                <Select
                  value={newLoanRequest.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal Loan</SelectItem>
                    <SelectItem value="Home">Home Loan</SelectItem>
                    <SelectItem value="Car">Car Loan</SelectItem>
                    <SelectItem value="Education">Education Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount ($)
                </label>
                <Input
                  type="number"
                  placeholder="Loan amount"
                  value={newLoanRequest.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Purpose
                </label>
                <Input
                  type="text"
                  placeholder="Purpose of loan"
                  value={newLoanRequest.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Repayment Months
                </label>
                <Input
                  type="number"
                  placeholder="Repayment period in months"
                  value={newLoanRequest.repaymentMonths}
                  onChange={(e) =>
                    handleInputChange("repaymentMonths", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmitLoanRequest}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
