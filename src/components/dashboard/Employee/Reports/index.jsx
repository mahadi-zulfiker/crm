import React, { useEffect, useState } from "react";
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
  FileText,
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeReports() {
  const { data: session } = useSession();
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        if (!session?.user?.id) return;

        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockAttendance = [
          { date: "2023-06-01", status: "present" },
          { date: "2023-06-02", status: "present" },
          { date: "2023-06-03", status: "weekend" },
          { date: "2023-06-04", status: "weekend" },
          { date: "2023-06-05", status: "present" },
          { date: "2023-06-06", status: "absent" },
          { date: "2023-06-07", status: "present" },
          { date: "2023-06-08", status: "present" },
          { date: "2023-06-09", status: "leave" },
          { date: "2023-06-10", status: "weekend" },
          { date: "2023-06-11", status: "weekend" },
        ];

        const mockLeave = [
          {
            id: 1,
            type: "vacation",
            startDate: "2023-06-15",
            endDate: "2023-06-20",
            status: "approved",
          },
          {
            id: 2,
            type: "sick",
            startDate: "2023-06-10",
            endDate: "2023-06-12",
            status: "pending",
          },
          {
            id: 3,
            type: "casual",
            startDate: "2023-05-20",
            endDate: "2023-05-21",
            status: "rejected",
          },
        ];

        const mockLoan = [
          {
            id: 1,
            type: "Personal Loan",
            amount: 5000,
            status: "approved",
            appliedDate: "2023-05-15",
          },
          {
            id: 2,
            type: "Education Loan",
            amount: 10000,
            status: "pending",
            appliedDate: "2023-06-01",
          },
        ];

        setAttendanceData(mockAttendance);
        setLeaveData(mockLeave);
        setLoanData(mockLoan);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report data:", error);
        toast.error("Failed to fetch report data");
        setLoading(false);
      }
    };

    fetchReportData();
  }, [session]);

  const handleExport = async (reportType) => {
    try {
      setExporting(true);
      // In a real implementation, this would generate and download a report
      // For now, we'll just show a toast
      toast.info(`Exporting ${reportType} report...`);

      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`${reportType} report exported successfully!`);
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error(`Failed to export ${reportType} report`);
    } finally {
      setExporting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      case "weekend":
        return "bg-gray-100 text-gray-800";
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

  const calculateAttendanceSummary = () => {
    const totalDays = attendanceData.length;
    const presentDays = attendanceData.filter(
      (record) => record.status === "present"
    ).length;
    const absentDays = attendanceData.filter(
      (record) => record.status === "absent"
    ).length;
    const leaveDays = attendanceData.filter(
      (record) => record.status === "leave"
    ).length;

    return {
      totalDays,
      presentDays,
      absentDays,
      leaveDays,
      attendanceRate:
        totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
    };
  };

  const calculateLeaveSummary = () => {
    const totalRequests = leaveData.length;
    const approvedRequests = leaveData.filter(
      (request) => request.status === "approved"
    ).length;
    const pendingRequests = leaveData.filter(
      (request) => request.status === "pending"
    ).length;
    const rejectedRequests = leaveData.filter(
      (request) => request.status === "rejected"
    ).length;

    return {
      totalRequests,
      approvedRequests,
      pendingRequests,
      rejectedRequests,
    };
  };

  const calculateLoanSummary = () => {
    const totalRequests = loanData.length;
    const approvedRequests = loanData.filter(
      (request) => request.status === "approved"
    ).length;
    const pendingRequests = loanData.filter(
      (request) => request.status === "pending"
    ).length;

    const totalAmount = loanData.reduce(
      (sum, loan) => sum + (loan.amount || 0),
      0
    );
    const approvedAmount = loanData
      .filter((request) => request.status === "approved")
      .reduce((sum, loan) => sum + (loan.amount || 0), 0);

    return {
      totalRequests,
      approvedRequests,
      pendingRequests,
      totalAmount,
      approvedAmount,
    };
  };

  const attendanceSummary = calculateAttendanceSummary();
  const leaveSummary = calculateLeaveSummary();
  const loanSummary = calculateLoanSummary();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reports</h1>
        <p className="text-gray-600">View your personal reports and history</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="loan">Loan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Attendance Summary */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Attendance Summary
                </CardTitle>
                <CardDescription>Your attendance statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      {attendanceSummary.presentDays}
                    </div>
                    <div className="text-sm text-green-600">Present</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">
                      {attendanceSummary.absentDays}
                    </div>
                    <div className="text-sm text-red-600">Absent</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">
                      {attendanceSummary.leaveDays}
                    </div>
                    <div className="text-sm text-yellow-600">On Leave</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {attendanceSummary.attendanceRate}%
                    </div>
                    <div className="text-sm text-blue-600">Attendance Rate</div>
                  </div>
                </div>
                <Button
                  onClick={() => handleExport("Attendance")}
                  disabled={exporting}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Attendance Report
                </Button>
              </CardContent>
            </Card>

            {/* Leave Summary */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Leave Summary
                </CardTitle>
                <CardDescription>Your leave request statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      {leaveSummary.approvedRequests}
                    </div>
                    <div className="text-sm text-green-600">Approved</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">
                      {leaveSummary.pendingRequests}
                    </div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">
                      {leaveSummary.rejectedRequests}
                    </div>
                    <div className="text-sm text-red-600">Rejected</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {leaveSummary.totalRequests}
                    </div>
                    <div className="text-sm text-blue-600">Total Requests</div>
                  </div>
                </div>
                <Button
                  onClick={() => handleExport("Leave")}
                  disabled={exporting}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Leave Report
                </Button>
              </CardContent>
            </Card>

            {/* Loan Summary */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Loan Summary
                </CardTitle>
                <CardDescription>Your loan request statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      ${loanSummary.approvedAmount?.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">Approved</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">
                      {loanSummary.pendingRequests}
                    </div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg col-span-2">
                    <div className="text-2xl font-bold text-blue-700">
                      ${loanSummary.totalAmount?.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">Total Requested</div>
                  </div>
                </div>
                <Button
                  onClick={() => handleExport("Loan")}
                  disabled={exporting}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Loan Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Attendance History
                  </CardTitle>
                  <CardDescription>Detailed attendance records</CardDescription>
                </div>
                <Button
                  onClick={() => handleExport("Attendance History")}
                  disabled={exporting}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Day</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
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
        </TabsContent>

        <TabsContent value="leave">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Leave History
                  </CardTitle>
                  <CardDescription>Your leave request records</CardDescription>
                </div>
                <Button
                  onClick={() => handleExport("Leave History")}
                  disabled={exporting}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Dates</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Applied On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveData.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{request.type}</td>
                        <td className="py-3 px-4">
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
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
                        <td className="py-3 px-4">
                          {new Date(request.startDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Loan History
                  </CardTitle>
                  <CardDescription>Your loan request records</CardDescription>
                </div>
                <Button
                  onClick={() => handleExport("Loan History")}
                  disabled={exporting}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Loan Type</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Applied On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanData.map((loan) => (
                      <tr key={loan.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{loan.type}</td>
                        <td className="py-3 px-4">
                          ${loan.amount?.toLocaleString()}
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
                        <td className="py-3 px-4">
                          {new Date(loan.appliedDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
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
