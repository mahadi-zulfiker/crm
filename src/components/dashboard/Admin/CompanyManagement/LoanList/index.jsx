import React, { useState } from "react";
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
  DollarSign,
  CreditCard,
  Filter,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
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

  // Mock data for employee loans
  const [loanData, setLoanData] = useState([
    {
      id: 1,
      employee: "John Smith",
      department: "Engineering",
      loanType: "Personal Loan",
      amount: 5000,
      balance: 3000,
      status: "Active",
      nextPayment: "2023-06-20",
      appliedDate: "2023-05-15",
      approvalDate: "2023-05-20",
      interestRate: 5.5,
      repaymentMonths: 12,
      monthlyInstallment: 450,
      installments: [
        { date: "2023-06-20", amount: 450, status: "Paid" },
        { date: "2023-07-20", amount: 450, status: "Pending" },
        { date: "2023-08-20", amount: 450, status: "Pending" },
      ],
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      department: "Marketing",
      loanType: "Home Loan",
      amount: 50000,
      balance: 45000,
      status: "Active",
      nextPayment: "2023-06-25",
      appliedDate: "2023-01-10",
      approvalDate: "2023-01-15",
      interestRate: 3.5,
      repaymentMonths: 120,
      monthlyInstallment: 500,
      installments: [
        { date: "2023-02-15", amount: 500, status: "Paid" },
        { date: "2023-03-15", amount: 500, status: "Paid" },
        { date: "2023-04-15", amount: 500, status: "Paid" },
        { date: "2023-05-15", amount: 500, status: "Paid" },
        { date: "2023-06-15", amount: 500, status: "Paid" },
        { date: "2023-07-15", amount: 500, status: "Pending" },
      ],
    },
    {
      id: 3,
      employee: "Michael Brown",
      department: "Sales",
      loanType: "Car Loan",
      amount: 25000,
      balance: 15000,
      status: "Active",
      nextPayment: "2023-06-18",
      appliedDate: "2023-03-01",
      approvalDate: "2023-03-05",
      interestRate: 4.2,
      repaymentMonths: 48,
      monthlyInstallment: 580,
      installments: [
        { date: "2023-04-05", amount: 580, status: "Paid" },
        { date: "2023-05-05", amount: 580, status: "Paid" },
        { date: "2023-06-05", amount: 580, status: "Paid" },
        { date: "2023-07-05", amount: 580, status: "Pending" },
      ],
    },
    {
      id: 4,
      employee: "Emily Davis",
      department: "HR",
      loanType: "Personal Loan",
      amount: 10000,
      balance: 0,
      status: "Completed",
      nextPayment: "-",
      appliedDate: "2022-01-10",
      approvalDate: "2022-01-15",
      interestRate: 6.0,
      repaymentMonths: 24,
      monthlyInstallment: 450,
      completedDate: "2024-01-15",
      installments: [
        { date: "2022-02-15", amount: 450, status: "Paid" },
        { date: "2022-03-15", amount: 450, status: "Paid" },
        // ... more installments
        { date: "2024-01-15", amount: 450, status: "Paid" },
      ],
    },
    {
      id: 5,
      employee: "Robert Wilson",
      department: "Finance",
      loanType: "Education Loan",
      amount: 30000,
      balance: 20000,
      status: "Active",
      nextPayment: "2023-06-30",
      appliedDate: "2023-04-01",
      approvalDate: "2023-04-05",
      interestRate: 2.5,
      repaymentMonths: 60,
      monthlyInstallment: 550,
      installments: [
        { date: "2023-05-05", amount: 550, status: "Paid" },
        { date: "2023-06-05", amount: 550, status: "Paid" },
        { date: "2023-07-05", amount: 550, status: "Pending" },
      ],
    },
  ]);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Loan list export has started.",
    });
  };

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setIsViewModalOpen(true);
  };

  const handleApproveLoan = (id) => {
    setLoanData(
      loanData.map((loan) =>
        loan.id === id ? { ...loan, status: "Active" } : loan
      )
    );
    toast({
      title: "Loan Approved",
      description: "Loan request has been approved successfully.",
    });
  };

  const handleRejectLoan = (id) => {
    setLoanData(
      loanData.map((loan) =>
        loan.id === id ? { ...loan, status: "Rejected" } : loan
      )
    );
    toast({
      title: "Loan Rejected",
      description: "Loan request has been rejected.",
    });
  };

  // Get unique departments for filter
  const departments = [...new Set(loanData.map((loan) => loan.department))];

  // Filter loan data
  const filteredLoanData = loanData.filter((loan) => {
    const matchesSearch =
      loan.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                {filteredLoanData.map((loan) => (
                  <tr key={loan.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{loan.employee}</td>
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
                ))}
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
    </div>
  );
}
