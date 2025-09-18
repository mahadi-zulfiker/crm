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
  Calendar,
  Download,
  Search,
  Plus,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LeaveManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const handleExport = () => {
    toast({
      title: "Leave Export Started",
      description:
        "Your leave report export has started. You'll receive a notification when it's ready.",
    });
  };

  const handleApplyLeave = () => {
    setIsLeaveModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLeaveModalOpen(false);
  };

  // Mock data for leave records
  const leaveData = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2023-06-15",
      endDate: "2023-06-17",
      days: 3,
      status: "approved",
      reason: "Family vacation",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2023-05-20",
      endDate: "2023-05-22",
      days: 3,
      status: "approved",
      reason: "Medical appointment",
    },
    {
      id: 3,
      type: "Casual Leave",
      startDate: "2023-07-10",
      endDate: "2023-07-10",
      days: 1,
      status: "pending",
      reason: "Personal work",
    },
    {
      id: 4,
      type: "Maternity Leave",
      startDate: "2023-08-01",
      endDate: "2023-08-15",
      days: 15,
      status: "rejected",
      reason: "Planning for baby",
    },
  ];

  const leaveBalance = {
    annual: { total: 20, used: 5, remaining: 15 },
    sick: { total: 10, used: 3, remaining: 7 },
    casual: { total: 5, used: 1, remaining: 4 },
    maternity: { total: 90, used: 0, remaining: 90 },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeave = leaveData.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Leave Management</h1>
          <p className="text-gray-600">View and apply for leave</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search leave records..."
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
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={handleApplyLeave}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Apply Leave
          </Button>
        </div>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
            <Calendar className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveBalance.annual.remaining}
            </div>
            <p className="text-xs text-gray-500">
              Remaining of {leaveBalance.annual.total}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
            <UserX className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveBalance.sick.remaining}
            </div>
            <p className="text-xs text-gray-500">
              Remaining of {leaveBalance.sick.total}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveBalance.casual.remaining}
            </div>
            <p className="text-xs text-gray-500">
              Remaining of {leaveBalance.casual.total}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Maternity Leave
            </CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveBalance.maternity.remaining}
            </div>
            <p className="text-xs text-gray-500">
              Remaining of {leaveBalance.maternity.total}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Records */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Leave History</CardTitle>
              <CardDescription>Your leave application records</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Leave Type</th>
                  <th className="text-left py-3 px-4">Start Date</th>
                  <th className="text-left py-3 px-4">End Date</th>
                  <th className="text-left py-3 px-4">Days</th>
                  <th className="text-left py-3 px-4">Reason</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeave.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{record.type}</td>
                    <td className="py-3 px-4">
                      {new Date(record.startDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(record.endDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-3 px-4">{record.days}</td>
                    <td className="py-3 px-4">{record.reason}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Leave Application Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Leave Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason</label>
                <Input type="text" placeholder="Reason for leave" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleCloseModal}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
