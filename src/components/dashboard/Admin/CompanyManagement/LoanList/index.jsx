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
import { Label } from "@/components/ui/label";
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
  Filter,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  PlusCircle,
  UserSearch,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LoanList() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddLoanModalOpen, setIsAddLoanModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newLoanData, setNewLoanData] = useState({
    type: "",
    amount: "",
    purpose: "",
    repaymentMonths: "",
  });
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchingEmployees, setSearchingEmployees] = useState(false);

  // State for loan requests from database
  const [loanData, setLoanData] = useState([]);

  // Fetch loan requests from the database
  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/loanManagement");
        const data = await response.json();

        if (response.ok) {
          // Transform the data to match the existing structure
          const transformedData = data.data.map((loan) => ({
            id: loan._id,
            employee: loan.name || loan.employeeName || "Unknown Employee",
            email: loan.email || "N/A",
            department: loan.department || "Not assigned",
            loanType: loan.type || "Loan",
            amount: loan.amount || 0,
            balance: loan.balance || 0,
            status: loan.status
              ? loan.status.charAt(0).toUpperCase() + loan.status.slice(1)
              : "Pending",
            nextPayment: loan.nextPayment || "-",
            appliedDate: loan.appliedDate || "",
            approvalDate: loan.approvalDate || "",
            interestRate: loan.interestRate || 0,
            repaymentMonths: loan.repaymentMonths || 0,
            monthlyInstallment: loan.monthlyInstallment || 0,
            completedDate: loan.completedDate || "",
            installments: loan.installments || [],
          }));
          setLoanData(transformedData);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch loan requests",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching loan requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch loan requests",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoanRequests();
  }, []);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Loan list export has started.",
    });
  };

  const handleAddLoan = () => {
    // Reset form data
    setNewLoanData({
      type: "",
      amount: "",
      purpose: "",
      repaymentMonths: "",
    });
    setIsAddLoanModalOpen(true);
  };

  const handleSearchEmployees = async (searchTerm) => {
    if (!searchTerm) {
      setEmployees([]);
      return;
    }

    try {
      setSearchingEmployees(true);
      const response = await fetch(
        `/api/companyEmployeeUserManagement?search=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        setEmployees(data);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch employees",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      toast({
        title: "Error",
        description: "Failed to search employees",
        variant: "destructive",
      });
    } finally {
      setSearchingEmployees(false);
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEmployees([]);
  };

  const handleInputChange = (field, value) => {
    setNewLoanData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateLoan = async () => {
    if (!selectedEmployee) {
      toast({
        title: "Error",
        description: "Please select an employee",
        variant: "destructive",
      });
      return;
    }

    if (
      !newLoanData.type ||
      !newLoanData.amount ||
      !newLoanData.purpose ||
      !newLoanData.repaymentMonths
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/loanManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: selectedEmployee._id,
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          ...newLoanData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add new loan to the list
        const transformedLoan = {
          id: data.data._id,
          employee: data.data.name || "Unknown Employee",
          email: data.data.email || "N/A",
          department: selectedEmployee.department || "Not assigned",
          loanType: data.data.type || "Loan",
          amount: data.data.amount || 0,
          balance: data.data.balance || 0,
          status: data.data.status
            ? data.data.status.charAt(0).toUpperCase() +
              data.data.status.slice(1)
            : "Pending",
          nextPayment: data.data.nextPayment || "-",
          appliedDate: data.data.appliedDate || "",
          approvalDate: data.data.approvalDate || "",
          interestRate: data.data.interestRate || 0,
          repaymentMonths: data.data.repaymentMonths || 0,
          monthlyInstallment: data.data.monthlyInstallment || 0,
          completedDate: data.data.completedDate || "",
          installments: data.data.installments || [],
        };

        setLoanData((prev) => [transformedLoan, ...prev]);

        toast({
          title: "Success",
          description: "Loan created successfully",
        });

        // Close modal and reset form
        setIsAddLoanModalOpen(false);
        setSelectedEmployee(null);
        setNewLoanData({
          type: "",
          amount: "",
          purpose: "",
          repaymentMonths: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create loan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating loan:", error);
      toast({
        title: "Error",
        description: "Failed to create loan",
        variant: "destructive",
      });
    }
  };

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setIsViewModalOpen(true);
  };

  const handleApproveLoan = async (id) => {
    try {
      const response = await fetch("/api/admin/loanManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "approved",
          approvalDate: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoanData(
          loanData.map((loan) =>
            loan.id === id ? { ...loan, status: "Active" } : loan
          )
        );
        toast({
          title: "Loan Approved",
          description: "Loan request has been approved successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to approve loan request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error approving loan request:", error);
      toast({
        title: "Error",
        description: "Failed to approve loan request",
        variant: "destructive",
      });
    }
  };

  const handleRejectLoan = async (id) => {
    try {
      const response = await fetch("/api/admin/loanManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "rejected",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoanData(
          loanData.map((loan) =>
            loan.id === id ? { ...loan, status: "Rejected" } : loan
          )
        );
        toast({
          title: "Loan Rejected",
          description: "Loan request has been rejected.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to reject loan request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error rejecting loan request:", error);
      toast({
        title: "Error",
        description: "Failed to reject loan request",
        variant: "destructive",
      });
    }
  };

  // Get unique departments for filter
  const departments = [...new Set(loanData.map((loan) => loan.department))];

  // Filter loan data
  const filteredLoanData = loanData.filter((loan) => {
    const matchesSearch =
      loan.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment && filterDepartment !== "all"
        ? loan.department === filterDepartment
        : true;
    const matchesStatus =
      filterStatus && filterStatus !== "all"
        ? loan.status === filterStatus
        : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate summary stats
  const totalLoans = loanData.length;
  const activeLoans = loanData.filter(
    (loan) => loan.status === "Active"
  ).length;
  const totalAmount = loanData.reduce((sum, loan) => sum + loan.amount, 0);
  const outstandingBalance = loanData.reduce(
    (sum, loan) => sum + loan.balance,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Loans</h1>
          <p className="text-gray-600">
            Manage and track employee loan records
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search employees..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddLoan} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Loan
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLoans}</div>
            <p className="text-xs text-gray-500">Active and completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLoans}</div>
            <p className="text-xs text-gray-500">Currently processing</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Loaned to employees</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <DollarSign className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${outstandingBalance.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Remaining balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Loan Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Loan Records</CardTitle>
          <CardDescription>View all employee loan details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Loan Type</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Balance</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Next Payment</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoanData.length > 0 ? (
                  filteredLoanData.map((loan) => (
                    <tr key={loan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{loan.employee}</td>
                      <td className="py-3 px-4">{loan.email}</td>
                      <td className="py-3 px-4">{loan.department}</td>
                      <td className="py-3 px-4">{loan.loanType}</td>
                      <td className="py-3 px-4">
                        ${loan.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        ${loan.balance.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            loan.status
                          )}`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{loan.nextPayment}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLoan(loan)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {loan.status === "Pending" && (
                            <>
                              <Button
                                onClick={() => handleApproveLoan(loan.id)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handleRejectLoan(loan.id)}
                                variant="outline"
                                size="sm"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
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

      {/* View Loan Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
            <DialogDescription>
              Detailed information about the employee loan
            </DialogDescription>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Employee
                    </h3>
                    <p className="font-medium">{selectedLoan.employee}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="font-medium">{selectedLoan.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Department
                    </h3>
                    <p className="font-medium">{selectedLoan.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Loan Type
                    </h3>
                    <p className="font-medium">{selectedLoan.loanType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Applied Date
                    </h3>
                    <p className="font-medium">{selectedLoan.appliedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Approval Date
                    </h3>
                    <p className="font-medium">{selectedLoan.approvalDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Loan Amount
                    </h3>
                    <p className="font-medium">
                      ${selectedLoan.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Outstanding Balance
                    </h3>
                    <p className="font-medium">
                      ${selectedLoan.balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Interest Rate
                    </h3>
                    <p className="font-medium">{selectedLoan.interestRate}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Repayment Period
                    </h3>
                    <p className="font-medium">
                      {selectedLoan.repaymentMonths} months
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Monthly Installment
                    </h3>
                    <p className="font-medium">
                      ${selectedLoan.monthlyInstallment}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Status
                </h3>
                <p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedLoan.status
                    )}`}
                  >
                    {selectedLoan.status}
                  </span>
                </p>
              </div>

              {selectedLoan.status === "Completed" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Completed Date
                  </h3>
                  <p className="font-medium">{selectedLoan.completedDate}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Installment History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Date</th>
                        <th className="text-left py-2 px-3">Amount</th>
                        <th className="text-left py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLoan.installments.map((installment, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-3">{installment.date}</td>
                          <td className="py-2 px-3">${installment.amount}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                installment.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {installment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Loan Modal */}
      <Dialog open={isAddLoanModalOpen} onOpenChange={setIsAddLoanModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Loan for Employee</DialogTitle>
            <DialogDescription>
              Create a new loan request for an employee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Employee Search */}
            <div className="space-y-2">
              <Label>Employee</Label>
              {selectedEmployee ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{selectedEmployee.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedEmployee.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEmployee(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <UserSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search employees by name or email..."
                      className="pl-10"
                      onChange={(e) => handleSearchEmployees(e.target.value)}
                    />
                  </div>
                  {searchingEmployees && (
                    <div className="flex items-center justify-center py-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  {employees.length > 0 && (
                    <div className="border rounded-lg max-h-40 overflow-y-auto">
                      {employees.map((employee) => (
                        <div
                          key={employee._id}
                          className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSelectEmployee(employee)}
                        >
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">
                            {employee.email}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Loan Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Loan Type</Label>
                <Select
                  value={newLoanData.type}
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
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="Loan amount"
                  value={newLoanData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                />
              </div>
              <div>
                <Label>Purpose</Label>
                <Input
                  type="text"
                  placeholder="Purpose of loan"
                  value={newLoanData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
              <div>
                <Label>Repayment Months</Label>
                <Input
                  type="number"
                  placeholder="Repayment period in months"
                  value={newLoanData.repaymentMonths}
                  onChange={(e) =>
                    handleInputChange("repaymentMonths", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddLoanModalOpen(false);
                  setSelectedEmployee(null);
                  setNewLoanData({
                    type: "",
                    amount: "",
                    purpose: "",
                    repaymentMonths: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateLoan}>Create Loan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
