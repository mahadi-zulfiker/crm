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
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Users,
  UserCheck,
  UserX,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

export default function ReportsAnalytics() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState({
    attendance: {
      presentDays: 0,
      absentDays: 0,
      leaveDays: 0,
      attendanceRate: 0,
      records: []
    },
    leave: {
      approved: 0,
      pending: 0,
      rejected: 0,
      records: []
    },
    loans: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      completed: 0,
      totalAmount: 0,
      records: []
    }
  });

  // Fetch reports data from the database
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        if (!session?.user?.id) return;
        
        setLoading(true);
        // Calculate days based on selected date range
        let days = 30; // Default to monthly
        let months = 12; // Default to 12 months
        
        switch (selectedDateRange) {
          case "daily":
            days = 1;
            months = 1;
            break;
          case "weekly":
            days = 7;
            months = 3;
            break;
          case "monthly":
            days = 30;
            months = 12;
            break;
          case "quarterly":
            days = 90;
            months = 12;
            break;
          case "yearly":
            days = 365;
            months = 12;
            break;
        }
        
        const response = await fetch(
          `/api/employee/reports?employeeId=${session.user.id}&days=${days}&months=${months}`
        );
        const data = await response.json();

        if (response.ok) {
          setReportsData(data.data);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch reports data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching reports data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch reports data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, [session, selectedDateRange]);

  const handleExport = (reportType) => {
    toast({
      title: `${reportType} Export Started`,
      description: `${reportType} report export has started. You'll receive a notification when it's ready.`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading reports data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Reports & Analytics</h1>
          <p className="text-gray-600">
            Personal reports and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search reports..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedDateRange}
            onValueChange={setSelectedDateRange}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleExport("All Reports")}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Present Days
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.attendance.presentDays}</div>
                <p className="text-xs text-gray-500">Days you were present</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Absent Days
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.attendance.absentDays}</div>
                <p className="text-xs text-gray-500">Days you were absent</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leave Days
                </CardTitle>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.attendance.leaveDays}</div>
                <p className="text-xs text-gray-500">Days you were on leave</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Rate
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.attendance.attendanceRate}%</div>
                <p className="text-xs text-gray-500">Your overall attendance rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Records */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Recent Attendance Records</CardTitle>
              <CardDescription>
                Your recent attendance history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Check In</th>
                      <th className="text-left py-3 px-4">Check Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.attendance.records.length > 0 ? (
                      reportsData.attendance.records.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{record.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              record.status === "present" 
                                ? "bg-green-100 text-green-800" 
                                : record.status === "absent" 
                                  ? "bg-red-100 text-red-800" 
                                  : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">{record.checkIn || "-"}</td>
                          <td className="py-3 px-4">{record.checkOut || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approved Leaves
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.leave.approved}</div>
                <p className="text-xs text-gray-500">Approved leave requests</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Leaves
                </CardTitle>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.leave.pending}</div>
                <p className="text-xs text-gray-500">Pending leave requests</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rejected Leaves
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.leave.rejected}</div>
                <p className="text-xs text-gray-500">Rejected leave requests</p>
              </CardContent>
            </Card>
          </div>

          {/* Leave Records */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
              <CardDescription>
                Your leave application records
              </CardDescription>
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
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.leave.records.length > 0 ? (
                      reportsData.leave.records.map((record) => {
                        // Calculate number of days
                        const startDate = new Date(record.startDate);
                        const endDate = new Date(record.endDate);
                        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                        
                        return (
                          <tr key={record._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{record.type}</td>
                            <td className="py-3 px-4">
                              {startDate.toLocaleDateString("en-US")}
                            </td>
                            <td className="py-3 px-4">
                              {endDate.toLocaleDateString("en-US")}
                            </td>
                            <td className="py-3 px-4">{days}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                record.status === "approved" 
                                  ? "bg-green-100 text-green-800" 
                                  : record.status === "pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                              }`}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                          No leave records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Loans
                </CardTitle>
                <CreditCard className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.loans.total}</div>
                <p className="text-xs text-gray-500">Total loan applications</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Loan Amount
                </CardTitle>
                <DollarSign className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${reportsData.loans.totalAmount.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Total amount requested</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approved Loans
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.loans.approved}</div>
                <p className="text-xs text-gray-500">Approved loan requests</p>
              </CardContent>
            </Card>
          </div>

          {/* Loan Records */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Loan History</CardTitle>
              <CardDescription>
                Your loan application records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Loan Type</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Purpose</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.loans.records.length > 0 ? (
                      reportsData.loans.records.map((record) => (
                        <tr key={record._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{record.type}</td>
                          <td className="py-3 px-4">${record.amount?.toLocaleString()}</td>
                          <td className="py-3 px-4">{record.purpose}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              record.status === "approved" 
                                ? "bg-green-100 text-green-800" 
                                : record.status === "pending" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : record.status === "rejected" 
                                    ? "bg-red-100 text-red-800" 
                                    : "bg-blue-100 text-blue-800"
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(record.appliedDate).toLocaleDateString("en-US")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                          No loan records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}