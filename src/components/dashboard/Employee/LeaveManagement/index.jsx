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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  History,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EmployeeLeaveManagement() {
  const { data: session } = useSession();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({
    sick: 10,
    casual: 15,
    vacation: 20,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        if (!session?.user?.id) return;

        // Fetch leave requests from the database
        const response = await fetch(
          `/api/leaveManagement?employeeId=${session.user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setLeaveRequests(data.data || []);
        } else {
          console.error("Error fetching leave data:", data.error);
          toast.error("Failed to fetch leave data");
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        toast.error("Failed to fetch leave data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setNewLeaveRequest((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !newLeaveRequest.type ||
      !newLeaveRequest.startDate ||
      !newLeaveRequest.endDate ||
      !newLeaveRequest.reason
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (
      new Date(newLeaveRequest.startDate) > new Date(newLeaveRequest.endDate)
    ) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      setSubmitting(true);

      // Submit to the database
      const response = await fetch("/api/leaveManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session?.user?.id,
          type: newLeaveRequest.type,
          startDate: newLeaveRequest.startDate,
          endDate: newLeaveRequest.endDate,
          reason: newLeaveRequest.reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the new request to the local state
        setLeaveRequests((prev) => [data.data, ...prev]);

        // Reset form
        setNewLeaveRequest({
          type: "",
          startDate: "",
          endDate: "",
          reason: "",
        });

        toast.success("Leave request submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "sick":
        return "bg-red-100 text-red-800";
      case "casual":
        return "bg-blue-100 text-blue-800";
      case "vacation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

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
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-gray-600">
          Request leave and track your leave status
        </p>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
            <Plus className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.sick} days</div>
            <p className="text-xs text-gray-500">Available balance</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
            <Plus className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.casual} days</div>
            <p className="text-xs text-gray-500">Available balance</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vacation Leave
            </CardTitle>
            <Plus className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveBalance.vacation} days
            </div>
            <p className="text-xs text-gray-500">Available balance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="request" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="request">Request Leave</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Leave Request
              </CardTitle>
              <CardDescription>
                Submit a new leave request for approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Leave Type</Label>
                    <Select
                      value={newLeaveRequest.type}
                      onValueChange={handleSelectChange}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="casual">Casual Leave</SelectItem>
                        <SelectItem value="vacation">Vacation Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newLeaveRequest.startDate}
                      onChange={handleInputChange}
                      disabled={submitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newLeaveRequest.endDate}
                      onChange={handleInputChange}
                      disabled={submitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {newLeaveRequest.startDate && newLeaveRequest.endDate ? (
                        <span>
                          {calculateLeaveDays(
                            newLeaveRequest.startDate,
                            newLeaveRequest.endDate
                          )}{" "}
                          days
                        </span>
                      ) : (
                        <span className="text-gray-500">Select dates</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leave</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={newLeaveRequest.reason}
                    onChange={handleInputChange}
                    placeholder="Please provide a reason for your leave request"
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

        <TabsContent value="history">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Leave History
              </CardTitle>
              <CardDescription>
                View your past leave requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leaveRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Dates</th>
                        <th className="text-left py-3 px-4">Duration</th>
                        <th className="text-left py-3 px-4">Reason</th>
                        <th className="text-left py-3 px-4">Applied On</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRequests.map((request) => (
                        <tr
                          key={request._id || request.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                                request.type
                              )}`}
                            >
                              {request.type.charAt(0).toUpperCase() +
                                request.type.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(request.startDate).toLocaleDateString()} -{" "}
                            {new Date(request.endDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {calculateLeaveDays(
                              request.startDate,
                              request.endDate
                            )}{" "}
                            days
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate">
                            {request.reason}
                          </td>
                          <td className="py-3 px-4">
                            {new Date(request.appliedDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                request.status
                              )}`}
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No leave requests found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
