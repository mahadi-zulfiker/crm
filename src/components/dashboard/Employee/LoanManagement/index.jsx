import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  DollarSign,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  History,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EmployeeLoanManagement() {
  const { data: session } = useSession();
  const [loanRequests, setLoanRequests] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newLoanRequest, setNewLoanRequest] = useState({
    type: "",
    amount: "",
    purpose: "",
    repaymentMonths: "",
  });

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        if (!session?.user?.id) return;

        // Fetch loan requests from the database
        const response = await fetch(
          `/api/loanManagement?employeeId=${session.user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          // Separate active loans (pending/approved) from history (rejected/completed)
          const activeLoans = data.data.filter(
            (loan) => loan.status === "pending" || loan.status === "approved"
          );

          const historyLoans = data.data.filter(
            (loan) => loan.status === "rejected" || loan.status === "completed"
          );

          setLoanRequests(activeLoans);
          setLoanHistory(historyLoans);
        } else {
          console.error("Error fetching loan data:", data.error);
          toast.error("Failed to fetch loan data");
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
        toast.error("Failed to fetch loan data");
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoanRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setNewLoanRequest((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !newLoanRequest.type ||
      !newLoanRequest.amount ||
      !newLoanRequest.purpose ||
      !newLoanRequest.repaymentMonths
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (newLoanRequest.amount <= 0) {
      toast.error("Loan amount must be greater than zero");
      return;
    }

    if (newLoanRequest.repaymentMonths <= 0) {
      toast.error("Repayment months must be greater than zero");
      return;
    }

    try {
      setSubmitting(true);

      // Submit to the database
      const response = await fetch("/api/loanManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session?.user?.id,
          type: newLoanRequest.type,
          amount: parseFloat(newLoanRequest.amount),
          purpose: newLoanRequest.purpose,
          repaymentMonths: parseInt(newLoanRequest.repaymentMonths),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the new request to the local state
        setLoanRequests((prev) => [data.data, ...prev]);

        // Reset form
        setNewLoanRequest({
          type: "",
          amount: "",
          purpose: "",
          repaymentMonths: "",
        });

        toast.success("Loan request submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit loan request");
      }
    } catch (error) {
      console.error("Error submitting loan request:", error);
      toast.error("Failed to submit loan request");
    } finally {
      setSubmitting(false);
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

  const calculateMonthlyInstallment = (amount, months) => {
    // Simple calculation with 5% annual interest rate
    const annualInterestRate = 0.05;
    const monthlyInterestRate = annualInterestRate / 12;
    const monthlyPayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -months));
    return monthlyPayment.toFixed(2);
  };

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
      <div>
        <h1 className="text-3xl font-bold">Loan Management</h1>
        <p className="text-gray-600">
          Request loans and track your loan status
        </p>
      </div>

      <Tabs defaultValue="request" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="request">Request Loan</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="history">Loan History</TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Loan Request
              </CardTitle>
              <CardDescription>
                Submit a new loan request for approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Loan Type</Label>
                    <Select
                      value={newLoanRequest.type}
                      onValueChange={handleSelectChange}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal Loan">
                          Personal Loan
                        </SelectItem>
                        <SelectItem value="Home Loan">Home Loan</SelectItem>
                        <SelectItem value="Car Loan">Car Loan</SelectItem>
                        <SelectItem value="Education Loan">
                          Education Loan
                        </SelectItem>
                        <SelectItem value="Medical Loan">
                          Medical Loan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={newLoanRequest.amount}
                        onChange={handleInputChange}
                        placeholder="Enter loan amount"
                        disabled={submitting}
                        required
                        className="pl-10"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repaymentMonths">
                      Repayment Period (Months)
                    </Label>
                    <Input
                      id="repaymentMonths"
                      name="repaymentMonths"
                      type="number"
                      value={newLoanRequest.repaymentMonths}
                      onChange={handleInputChange}
                      placeholder="Enter number of months"
                      disabled={submitting}
                      required
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Estimated Monthly Installment</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {newLoanRequest.amount &&
                      newLoanRequest.repaymentMonths ? (
                        <span>
                          $
                          {calculateMonthlyInstallment(
                            newLoanRequest.amount,
                            newLoanRequest.repaymentMonths
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          Enter amount and period
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Loan</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    value={newLoanRequest.purpose}
                    onChange={handleInputChange}
                    placeholder="Please describe the purpose of your loan request"
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Active Loans
              </CardTitle>
              <CardDescription>Your currently approved loans</CardDescription>
            </CardHeader>
            <CardContent>
              {loanRequests.filter((loan) => loan.status === "approved")
                .length > 0 ? (
                <div className="space-y-4">
                  {loanRequests
                    .filter((loan) => loan.status === "approved")
                    .map((loan) => (
                      <div
                        key={loan._id || loan.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {loan.type}
                            </h3>
                            <p className="text-gray-600">{loan.purpose}</p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              loan.status
                            )}`}
                          >
                            Approved
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Loan Amount</p>
                            <p className="font-semibold">
                              ${loan.amount?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Monthly Payment
                            </p>
                            <p className="font-semibold">
                              $
                              {loan.monthlyInstallment ||
                                calculateMonthlyInstallment(
                                  loan.amount,
                                  loan.repaymentMonths
                                )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Repayment Period
                            </p>
                            <p className="font-semibold">
                              {loan.repaymentMonths} months
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Approved On</p>
                            <p className="font-semibold">
                              {loan.approvalDate
                                ? new Date(
                                    loan.approvalDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Button variant="outline" size="sm">
                            View Installment History
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No active loans found
                </div>
              )}

              {loanRequests.filter((loan) => loan.status === "pending").length >
                0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">
                    Pending Requests
                  </h3>
                  <div className="space-y-4">
                    {loanRequests
                      .filter((loan) => loan.status === "pending")
                      .map((loan) => (
                        <div
                          key={loan._id || loan.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {loan.type}
                              </h3>
                              <p className="text-gray-600">{loan.purpose}</p>
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                loan.status
                              )}`}
                            >
                              Pending
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Loan Amount
                              </p>
                              <p className="font-semibold">
                                ${loan.amount?.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Repayment Period
                              </p>
                              <p className="font-semibold">
                                {loan.repaymentMonths} months
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Applied On
                              </p>
                              <p className="font-semibold">
                                {new Date(
                                  loan.appliedDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Loan History
              </CardTitle>
              <CardDescription>
                Your completed and past loan records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loanHistory.length > 0 ||
              loanRequests.filter((loan) => loan.status === "completed")
                .length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Loan Type</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Purpose</th>
                        <th className="text-left py-3 px-4">Applied On</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanHistory.map((loan) => (
                        <tr
                          key={loan._id || loan.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">{loan.type}</td>
                          <td className="py-3 px-4">
                            ${loan.amount?.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate">
                            {loan.purpose}
                          </td>
                          <td className="py-3 px-4">
                            {new Date(loan.appliedDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                loan.status
                              )}`}
                            >
                              {loan.status.charAt(0).toUpperCase() +
                                loan.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {loanRequests
                        .filter((loan) => loan.status === "completed")
                        .map((loan) => (
                          <tr
                            key={loan._id || loan.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{loan.type}</td>
                            <td className="py-3 px-4">
                              ${loan.amount?.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 max-w-xs truncate">
                              {loan.purpose}
                            </td>
                            <td className="py-3 px-4">
                              {new Date(loan.appliedDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  loan.status
                                )}`}
                              >
                                {loan.status.charAt(0).toUpperCase() +
                                  loan.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No loan history found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
