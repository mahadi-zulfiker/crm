import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  UserMinus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LeaveManagement() {
  const { toast } = useToast();

  const handleApprove = (employeeName) => {
    toast({
      title: "Leave Approved",
      description: `Leave request for ${employeeName} has been approved.`,
    });
  };

  const handleReject = (employeeName) => {
    toast({
      title: "Leave Rejected",
      description: `Leave request for ${employeeName} has been rejected.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Leave management report export has started.",
    });
  };

  // Mock data for leave requests
  const leaveData = [
    {
      id: 1,
      employee: "John Smith",
      department: "Engineering",
      type: "Annual Leave",
      startDate: "2023-06-20",
      endDate: "2023-06-25",
      days: 5,
      status: "Pending",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      department: "Marketing",
      type: "Sick Leave",
      startDate: "2023-06-18",
      endDate: "2023-06-20",
      days: 3,
      status: "Approved",
    },
    {
      id: 3,
      employee: "Michael Brown",
      department: "Sales",
      type: "Personal Leave",
      startDate: "2023-06-22",
      endDate: "2023-06-23",
      days: 2,
      status: "Pending",
    },
    {
      id: 4,
      employee: "Emily Davis",
      department: "HR",
      type: "Maternity Leave",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      days: 90,
      status: "Approved",
    },
    {
      id: 5,
      employee: "Robert Wilson",
      department: "Finance",
      type: "Annual Leave",
      startDate: "2023-06-15",
      endDate: "2023-06-17",
      days: 3,
      status: "Rejected",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <p className="text-gray-600">
            Manage employee leave requests and approvals
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
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Leave Days
            </CardTitle>
            <UserMinus className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">103</div>
            <p className="text-xs text-gray-500">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>
            View and manage employee leave applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Leave Type</th>
                  <th className="text-left py-3 px-4">Dates</th>
                  <th className="text-left py-3 px-4">Days</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {request.employee}
                    </td>
                    <td className="py-3 px-4">{request.department}</td>
                    <td className="py-3 px-4">{request.type}</td>
                    <td className="py-3 px-4">
                      {request.startDate} to {request.endDate}
                    </td>
                    <td className="py-3 px-4">{request.days}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {request.status === "Pending" ? (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(request.employee)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleReject(request.employee)}
                            variant="outline"
                            size="sm"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      )}
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
