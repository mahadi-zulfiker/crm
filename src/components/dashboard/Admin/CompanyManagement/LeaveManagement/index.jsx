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
  UserMinus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LeaveManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for leave requests from database
  const [leaveData, setLeaveData] = useState([]);
  const [employees, setEmployees] = useState({});

  // Fetch leave requests from the database
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/leaveManagement");
        const data = await response.json();

        if (response.ok) {
          // Transform the data to match the existing structure
          const transformedData = data.data.map((request) => ({
            id: request._id,
            employeeId: request.employeeId,
            employee: request.employeeName || "Unknown Employee",
            department: request.department || "Not assigned",
            type: request.type || "Leave",
            startDate: request.startDate || "",
            endDate: request.endDate || "",
            days: request.days || 0,
            status: request.status
              ? request.status.charAt(0).toUpperCase() + request.status.slice(1)
              : "Pending",
            reason: request.reason || "",
            appliedDate: request.appliedDate || "",
            rejectionReason: request.rejectionReason || "",
            balance: {
              annual: 15,
              sick: 10,
              casual: 10,
            },
          }));
          setLeaveData(transformedData);

          // Fetch employee details for each leave request
          fetchEmployeeDetails(transformedData);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch leave requests",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch leave requests",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployeeDetails = async (leaveRequests) => {
      try {
        // Get unique employee IDs
        const employeeIds = [
          ...new Set(
            leaveRequests.map((req) => req.employeeId).filter(Boolean)
          ),
        ];

        if (employeeIds.length > 0) {
          // Fetch employee details
          const response = await fetch("/api/employeeManagement");
          const employeesData = await response.json();

          if (response.ok) {
            // Create a map of employee ID to employee details
            const employeeMap = {};
            employeesData.forEach((emp) => {
              employeeMap[emp._id] = emp;
            });
            setEmployees(employeeMap);
          }
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch("/api/admin/leaveManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "approved",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLeaveData(
          leaveData.map((leave) =>
            leave.id === id ? { ...leave, status: "Approved" } : leave
          )
        );
        toast({
          title: "Leave Approved",
          description: "Leave request has been approved successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to approve leave request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error approving leave request:", error);
      toast({
        title: "Error",
        description: "Failed to approve leave request",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id) => {
    // Show a prompt for rejection reason
    const rejectionReason = prompt("Please provide a reason for rejection:");

    if (rejectionReason === null) return; // User cancelled

    try {
      const response = await fetch("/api/admin/leaveManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "rejected",
          rejectionReason: rejectionReason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLeaveData(
          leaveData.map((leave) =>
            leave.id === id
              ? { ...leave, status: "Rejected", rejectionReason }
              : leave
          )
        );
        toast({
          title: "Leave Rejected",
          description: "Leave request has been rejected.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to reject leave request",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      toast({
        title: "Error",
        description: "Failed to reject leave request",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Leave management report export has started.",
    });
  };

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setIsViewModalOpen(true);
  };

  // Get unique departments for filter
  const departments = [...new Set(leaveData.map((leave) => leave.department))];

  // Filter leave data
  const filteredLeaveData = leaveData.filter((leave) => {
    const matchesSearch =
      leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment && filterDepartment !== "all"
        ? leave.department === filterDepartment
        : true;
    const matchesStatus =
      filterStatus && filterStatus !== "all"
        ? leave.status === filterStatus
        : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

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

  // Calculate summary stats
  const pendingRequests = leaveData.filter(
    (leave) => leave.status === "Pending"
  ).length;
  const approvedRequests = leaveData.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejectedRequests = leaveData.filter(
    (leave) => leave.status === "Rejected"
  ).length;
  const totalLeaveDays = leaveData.reduce(
    (total, leave) => total + leave.days,
    0
  );

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
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <p className="text-gray-600">
            Manage employee leave requests and approvals
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
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
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-gray-500">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedRequests}</div>
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
            <div className="text-2xl font-bold">{totalLeaveDays}</div>
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
                {filteredLeaveData.map((request) => (
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
                            onClick={() => handleApprove(request.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(request.id)}
                            variant="outline"
                            size="sm"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewLeave(request)}
                        >
                          View Details
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

      {/* View Leave Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Detailed information about the leave request
            </DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Employee
                    </h3>
                    <p className="font-medium">{selectedLeave.employee}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Department
                    </h3>
                    <p className="font-medium">{selectedLeave.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Leave Type
                    </h3>
                    <p className="font-medium">{selectedLeave.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Applied Date
                    </h3>
                    <p className="font-medium">{selectedLeave.appliedDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dates</h3>
                    <p className="font-medium">
                      {selectedLeave.startDate} to {selectedLeave.endDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Duration
                    </h3>
                    <p className="font-medium">{selectedLeave.days} days</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          selectedLeave.status
                        )}`}
                      >
                        {selectedLeave.status}
                      </span>
                    </p>
                  </div>
                  {selectedLeave.rejectionReason && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Rejection Reason
                      </h3>
                      <p className="font-medium text-red-600">
                        {selectedLeave.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Reason for Leave
                </h3>
                <p className="font-medium">{selectedLeave.reason}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Leave Balance
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-500">Annual</p>
                    <p className="font-medium">
                      {selectedLeave.balance.annual} days
                    </p>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-500">Sick</p>
                    <p className="font-medium">
                      {selectedLeave.balance.sick} days
                    </p>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-500">Casual</p>
                    <p className="font-medium">
                      {selectedLeave.balance.casual} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
