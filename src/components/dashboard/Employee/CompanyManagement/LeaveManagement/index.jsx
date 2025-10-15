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
  Calendar,
  Download,
  Search,
  Plus,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function LeaveManagement() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({
    annual: { total: 20, used: 0, remaining: 20 },
    sick: { total: 10, used: 0, remaining: 10 },
    casual: { total: 5, used: 0, remaining: 5 },
    maternity: { total: 90, used: 0, remaining: 90 },
  });
  const [loading, setLoading] = useState(true);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Fetch leave data from the database
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        if (!session?.user?.id) return;

        setLoading(true);
        const response = await fetch(
          `/api/employee/leave?employeeId=${session.user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setLeaveData(data.data);
          // Calculate leave balance based on fetched data
          calculateLeaveBalance(data.data);
        } else {
          Swal.fire({
            title: "Error",
            text: data.error || "Failed to fetch leave data",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch leave data",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [session]);

  const calculateLeaveBalance = (leaveRequests) => {
    // Calculate used leave days by type
    const usedLeave = {
      annual: 0,
      sick: 0,
      casual: 0,
      maternity: 0,
    };

    leaveRequests.forEach((request) => {
      if (request.status === "approved") {
        const days =
          Math.ceil(
            (new Date(request.endDate) - new Date(request.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1;
        switch (request.type.toLowerCase()) {
          case "annual":
            usedLeave.annual += days;
            break;
          case "sick":
            usedLeave.sick += days;
            break;
          case "casual":
            usedLeave.casual += days;
            break;
          case "maternity":
            usedLeave.maternity += days;
            break;
        }
      }
    });

    // Update leave balance state
    setLeaveBalance({
      annual: {
        total: 20,
        used: usedLeave.annual,
        remaining: Math.max(0, 20 - usedLeave.annual),
      },
      sick: {
        total: 10,
        used: usedLeave.sick,
        remaining: Math.max(0, 10 - usedLeave.sick),
      },
      casual: {
        total: 5,
        used: usedLeave.casual,
        remaining: Math.max(0, 5 - usedLeave.casual),
      },
      maternity: {
        total: 90,
        used: usedLeave.maternity,
        remaining: Math.max(0, 90 - usedLeave.maternity),
      },
    });
  };

  const handleExport = () => {
    Swal.fire({
      title: "Leave Export Started",
      text: "Your leave report export has started. You'll receive a notification when it's ready.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const handleApplyLeave = () => {
    setIsLeaveModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLeaveModalOpen(false);
    // Reset form
    setNewLeaveRequest({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleInputChange = (field, value) => {
    setNewLeaveRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitLeaveRequest = async () => {
    try {
      if (!session?.user?.id) {
        Swal.fire({
          title: "Error",
          text: "User not authenticated",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      // Validate dates
      if (!newLeaveRequest.startDate || !newLeaveRequest.endDate) {
        Swal.fire({
          title: "Error",
          text: "Please select both start and end dates",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (
        new Date(newLeaveRequest.startDate) > new Date(newLeaveRequest.endDate)
      ) {
        Swal.fire({
          title: "Error",
          text: "End date must be after start date",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const response = await fetch("/api/employee/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session.user.id,
          employeeName: session.user.name,
          employeeEmail: session.user.email,
          ...newLeaveRequest,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Leave request submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Add new request to the list
        setLeaveData((prev) => [...prev, data.data]);

        // Recalculate leave balance
        calculateLeaveBalance([...leaveData, data.data]);

        handleCloseModal();
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Failed to submit leave request",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit leave request",
        icon: "error",
        confirmButtonText: "OK",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading leave data...</p>
        </div>
      </div>
    );
  }

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
                {filteredLeave.length > 0 ? (
                  filteredLeave.map((record) => {
                    // Calculate number of days
                    const startDate = new Date(record.startDate);
                    const endDate = new Date(record.endDate);
                    const days =
                      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) +
                      1;

                    return (
                      <tr
                        key={record._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{record.type}</td>
                        <td className="py-3 px-4">
                          {startDate.toLocaleDateString("en-US")}
                        </td>
                        <td className="py-3 px-4">
                          {endDate.toLocaleDateString("en-US")}
                        </td>
                        <td className="py-3 px-4">{days}</td>
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
                          {record.status === "rejected" &&
                            record.rejectionReason && (
                              <div className="text-xs text-red-600 mt-1">
                                Reason: {record.rejectionReason}
                              </div>
                            )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No leave records found
                    </td>
                  </tr>
                )}
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
                <Select
                  value={newLeaveRequest.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual">Annual Leave</SelectItem>
                    <SelectItem value="Sick">Sick Leave</SelectItem>
                    <SelectItem value="Casual">Casual Leave</SelectItem>
                    <SelectItem value="Maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={newLeaveRequest.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  value={newLeaveRequest.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason</label>
                <Input
                  type="text"
                  placeholder="Reason for leave"
                  value={newLeaveRequest.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmitLeaveRequest}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
