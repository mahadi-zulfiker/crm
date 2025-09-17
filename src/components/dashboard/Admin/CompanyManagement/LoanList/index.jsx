import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoanList() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Loan list export has started.",
    });
  };

  // Mock data for employee loans
  const loanData = [
    {
      id: 1,
      employee: "John Smith",
      department: "Engineering",
      loanType: "Personal Loan",
      amount: 5000,
      balance: 3000,
      status: "Active",
      nextPayment: "2023-06-20",
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
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
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
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Active and completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500">Currently processing</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,65,000</div>
            <p className="text-xs text-gray-500">Loaned to employees</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <DollarSign className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,03,000</div>
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
                {loanData.map((loan) => (
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
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
